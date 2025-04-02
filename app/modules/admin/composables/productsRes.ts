import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudProductsResponse = () => {
  async function getProducts() {
    const { $crudProductsRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudProductsRep.getProducts();
      adminStore.products = res.data.products ? res.data.products : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getProduct(id: number) {
    const { $crudProductsRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudProductsRep.getProductById(id);
      adminStore.product = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createProduct(
    body: {
      name: string;
      description?: string;
    },
    photo?: File
  ) {
    const { $crudProductsRep } = useNuxtApp();
    const { openEditTab, closeTab } = useTabs();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      if (photo) {
        formData.append("photo", photo);
      }
      if (body.description) {
        formData.append("description", body.description);
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Должно вывести ключи и значения
      }

      const res = await $crudProductsRep.createProductById(formData);
      openEditTab(res.data?.id ?? 0, `settings-product-edit-${res.data?.id ?? 0}`, "Сотрудник");
      closeTab("settings-product-add");
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Продукт успешно создан!";

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
      mainStore.rightAlertShowText = "Не удалось создать продукт!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editProduct(
    id: number,
    body: {
      name: string;
      description?: string;
    },
    photo?: File
  ) {
    const { $crudProductsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      if (photo) {
        formData.append("photo", photo);
      }
      if (body.description) {
        formData.append("description", body.description);
      }

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Должно вывести ключи и значения
      }
      const res = await $crudProductsRep.editProductById(id, formData);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Продукт успешно изменен!";

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
      mainStore.rightAlertShowText = "Не удалось изменить продукт!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteProduct(id: number) {
    const { $crudProductsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudProductsRep.deleteProductById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Продукт успешно удален!";

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
      mainStore.rightAlertShowText = "Не удалось удалить продукт!";

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
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
  };
};
