import { useMainStore } from "~/stores/main";
import type {
  IPointSchemaFormLogistic,
  ISchemaFormLogistic,
} from "../modules/logistic/types/Logistics/schemaForm.type";
import { useLogisticStore } from "../stores/logistic";
import type {
  IShipmentPackage,
  IShipmentPackageGroup,
  TShipment,
  TShipmentGetPoint,
} from "../types/Others/Logistic/shipments";

export const useCrudLogisticResponse = () => {
  async function getShipments() {
    const { $crudLogisticRep } = useNuxtApp();
    const logisticStore = useLogisticStore();
    try {
      const params: {
        page: number;
        per_page: number;
      } = {
        page: logisticStore.shipmentsPage,
        per_page: logisticStore.perPage,
      };
      const res = await $crudLogisticRep.getShipments(params);
      const sortedData: TShipment[] = Object.values(res.data).sort(
        (a, b) => b.id - a.id
      );
      logisticStore.shipments = sortedData;
      logisticStore.shipmentsPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  function groupPackages(
    packages: IShipmentPackage[]
  ): IShipmentPackageGroup[] {
    const chunkSize = 50;
    const grouped: IShipmentPackageGroup[] = [];

    for (let i = 0; i < packages.length; i += chunkSize) {
      grouped.push({
        id: i + chunkSize - 1, // Например, 099 для диапазона 0-99
        value: `${i}-${i + chunkSize - 1}`,
        packages: packages.slice(i, i + chunkSize).map((pkg) => ({
          ...pkg,
          value: `${pkg.value} ${pkg.unit.toLowerCase()}`,
        })),
      });
    }

    return grouped;
  }

  function transformPoints(
    pointsData: Record<number, TShipmentGetPoint>
  ): IPointSchemaFormLogistic[] {
    return Object.values(pointsData).map((point) => ({
      id: point.id,
      name: point.name,
      city_id: point.city_id,
      point_products: Object.values(point.point_products || {}).map(
        (product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          kg_price: product.kg_price,
          packageId: 0, // Если packageId нужно получить из другого источника — замени
          packageName: "", // Если packageName нужно получить из другого источника — замени
        })
      ),
    }));
  }

  async function getShipment(id?: number) {
    const { $crudLogisticRep } = useNuxtApp();
    const logisticStore = useLogisticStore();
    if (id) {
      logisticStore.shipmentArrPoints = null;
      logisticStore.shipment = null;
    }
    try {
      const res = await $crudLogisticRep.getShipmentById(id);
      const packages = res.data.packages as IShipmentPackage[];
      const groupedPackages = groupPackages(packages);
      logisticStore.shipmentPackages = groupedPackages;
      if (id && res.data.shipment) {
        logisticStore.shipment = res.data.shipment;
        logisticStore.shipmentArrPoints = transformPoints(
          res.data.shipment.points
        );
      }
    } catch (error) {}
  }

  async function createShipment(
    body: ISchemaFormLogistic,
    images?: Record<number, File>
  ) {
    const { $crudLogisticRep } = useNuxtApp();
    const mainStore = useMainStore();
    const formData = new FormData();

    formData.append("supplier_id", body.supplierId?.toString() ?? "");
    formData.append("driver_id", body.driverId?.toString() ?? "");
    formData.append(
      "get_date",
      body.getDate?.toISOString().slice(0, 19).replace("T", " ") ?? ""
    );
    formData.append("amount", body.amount?.toString() ?? "");
    formData.append("driver_amount", body.driverAmount?.toString() ?? "");
    formData.append("additional", body.additional ?? "");

    body.points.forEach((point, pointIndex) => {
      formData.append(
        `point[${pointIndex}][point-city]`,
        point.city_id.toString()
      );

      point.point_products.forEach((product, productIndex) => {
        formData.append(
          `point[${pointIndex}][product][${productIndex}][product]`,
          product.id.toString()
        );
        formData.append(
          `point[${pointIndex}][product][${productIndex}][product-package_id]`,
          product.packageId.toString()
        );
        formData.append(
          `point[${pointIndex}][product][${productIndex}][product-count]`,
          product.quantity.toString()
        );
        formData.append(
          `point[${pointIndex}][product][${productIndex}][price-gm]`,
          product.kg_price.toString()
        );
      });
    });

    if (images) {
      Object.values(images).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    try {
      const res = await $crudLogisticRep.createShipment(formData);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Закуп успешно создан!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.log(res);
      return res;
    } catch (error: any) {
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "error";
      mainStore.rightAlertShowText = "Не удалось создать закуп!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  return {
    getShipments,
    getShipment,
    createShipment,
  };
};
