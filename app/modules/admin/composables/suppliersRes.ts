import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudSuppliersResponse = () => {
  async function getSuppliers() {
    const { $crudSuppliersRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudSuppliersRep.getSuppliers();
      adminStore.suppliers = res.data ? res.data : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getSupplier(id: number) {
    const { $crudSuppliersRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudSuppliersRep.getSupplierById(id);
      adminStore.supplier = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createSupplier(body: { name: string }) {
    const { $crudSuppliersRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudSuppliersRep.createSupplier(body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Поставщик успешно создан!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      return res;
    } catch (error: any) {
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "error";
      mainStore.rightAlertShowText = "Не удалось создать поставщика!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editSupplier(
    id: number,
    body: {
      name: string;
    }
  ) {
    const { $crudSuppliersRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudSuppliersRep.editSupplierById(id, body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Поставщик успешно изменен!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      return res;
    } catch (error: any) {
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "error";
      mainStore.rightAlertShowText = "Не удалось изменить поставщика!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteSupplier(id: number) {
    const { $crudSuppliersRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudSuppliersRep.deleteSupplierById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Поставщик успешно удален!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      return res;
    } catch (error: any) {
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "error";
      mainStore.rightAlertShowText = "Не удалось удалить поставщика!";

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
    getSuppliers,
    getSupplier,
    createSupplier,
    editSupplier,
    deleteSupplier,
  };
};
