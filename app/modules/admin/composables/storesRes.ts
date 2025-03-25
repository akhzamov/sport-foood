import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudStoresResponse = () => {
  async function getCrudStores() {
    const { $crudStoresRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudStoresRep.getStores();
      adminStore.stores = res.data.stores ? res.data.stores : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCrudStore(id: number) {
    const { $crudStoresRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudStoresRep.getStoreById(id);
      adminStore.store = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  type storeBody = {
    name: string;
    sort: number;
    syncStoreId?: number;
    products: number[];
    cities: number[];
  };

  async function createStore(body: storeBody, photo?: File) {
    const { $crudStoresRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("sort", body.sort.toString());

      body.products.forEach((productId, index) => {
        formData.append(`products[${index}]`, productId.toString());
      });

      body.cities.forEach((cityId, index) => {
        formData.append(`cities[${index}]`, cityId.toString());
      });

      if (photo) {
        formData.append("photo", photo);
      }

      if (body.syncStoreId) {
        formData.append("sync_store_id", body.syncStoreId.toString());
      }

      const res = await $crudStoresRep.createStore(formData);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Магазин успешно создан!";

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
      mainStore.rightAlertShowText = "Не удалось создать магазин!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editStore(id: number, body: storeBody, photo?: File) {
    const { $crudStoresRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const formData = new FormData();
      formData.append("name", body.name);
      formData.append("sort", body.sort.toString());

      // Для массива products
      body.products.forEach((productId, index) => {
        formData.append(`products[${index}]`, productId.toString());
      });

      // Для массива cities
      body.cities.forEach((cityId, index) => {
        formData.append(`cities[${index}]`, cityId.toString());
      });

      if (photo) {
        formData.append("photo", photo);
      }

      if (body.syncStoreId) {
        formData.append("sync_store_id", body.syncStoreId.toString());
      }

      const res = await $crudStoresRep.editStoreById(id, formData);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Магазин успешно изменен!";

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
      mainStore.rightAlertShowText = "Не удалось изменить магазин!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteStore(id: number) {
    const { $crudStoresRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudStoresRep.deleteStoreById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Магазин успешно удален!";

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
      mainStore.rightAlertShowText = "Не удалось удалить магазин!";

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
    getCrudStores,
    getCrudStore,
    createStore,
    editStore,
    deleteStore,
  };
};
