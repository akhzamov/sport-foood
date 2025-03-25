import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudMarketplacesResponse = () => {
  async function getMarketplaces() {
    const { $crudMarketplacesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudMarketplacesRep.getMarketplaces();
      adminStore.marketplaces = res.data ? res.data : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getMarketplace(id: number) {
    const { $crudMarketplacesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudMarketplacesRep.getMarketplaceById(id);
      adminStore.marketplace = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createMarketplace(body: { name: string }) {
    const { $crudMarketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudMarketplacesRep.createMarketplace(body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Торговая площадка успешно создан!";

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
      mainStore.rightAlertShowText = "Не удалось создать торговую площадку!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editMarketplace(id: number, body: { name: string }) {
    const { $crudMarketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudMarketplacesRep.editMarketplaceById(id, body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Торговая площадка успешно изменен!";

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
      mainStore.rightAlertShowText = "Не удалось изменить торговую площадку!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteMarketplace(id: number) {
    const { $crudMarketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudMarketplacesRep.deleteMarketplaceById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Торговая площадка успешно удалена!";

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
      mainStore.rightAlertShowText = "Не удалось удалить торговую площадку!";

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
    getMarketplaces,
    getMarketplace,
    createMarketplace,
    editMarketplace,
    deleteMarketplace,
  };
};
