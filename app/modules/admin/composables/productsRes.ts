import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "../stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudProductsResponse = () => {
  async function getProducts() {
    const { $productsRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    localitiesStore.products = null;
    try {
      const res = await $productsRep.getProducts();
      localitiesStore.products = res.data.products ? res.data.products : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getProduct(id: number) {
    const { $productsRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $productsRep.getProductById(id);
      localitiesStore.product = res.data ?? null;
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
    const { $productsRep } = useNuxtApp();
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

      const res = await $productsRep.createProductById(formData);
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
    const { $productsRep } = useNuxtApp();
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
      const res = await $productsRep.editProductById(id, formData);
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
    const { $productsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $productsRep.deleteProductById(id);
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

  const openNewTab = (id: string) => {
    const adminStore = useAdminStore();
    const mainStore = useMainStore();
    const exists = adminStore.activeOpenTabs.some((item) => item.id === id);

    if (exists) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "error";
      mainStore.alertShowTitle = "Ошибка";
      mainStore.alertShowText =
        "Нельзя открыть несколько одинаковых окон! Закройте или сохраните предыдущее окно";
    } else {
      adminStore.activeOpenTabs.push({
        id,
        title: "Новый",
        name: "Продукт",
      });
    }
  };
  const openEditTab = (id: number, textId: string) => {
    const adminStore = useAdminStore();
    const exists = adminStore.activeOpenTabs.some((item) => item.id === textId);
    adminStore.openUser = id;

    if (exists) {
      adminStore.activeOpenTab = textId;
    } else {
      adminStore.activeOpenTabs.push({
        id: textId,
        title: `#${id}`,
        name: "Продукт",
      });
    }
  };

  return {
    getProducts,
    getProduct,
    createProduct,
    editProduct,
    deleteProduct,
    openNewTab,
    openEditTab,
  };
};
