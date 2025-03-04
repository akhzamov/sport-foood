import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "../stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudMarketplacesResponse = () => {
  async function getMarketplaces() {
    const { $marketplacesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    localitiesStore.districts = null;
    try {
      const res = await $marketplacesRep.getMarketplaces();
      localitiesStore.marketplaces = res.data ? res.data : [];
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getMarketplace(id: number) {
    const { $marketplacesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $marketplacesRep.getMarketplaceById(id);
      localitiesStore.marketplace = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createMarketplace(body: { name: string }) {
    const { $marketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $marketplacesRep.createMarketplace(body);
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
    const { $marketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $marketplacesRep.editMarketplaceById(id, body);
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
    const { $marketplacesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $marketplacesRep.deleteMarketplaceById(id);
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
        title: "Новая",
        name: "Площадка",
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
        name: "Площадка",
      });
    }
  };

  return {
    getMarketplaces,
    getMarketplace,
    createMarketplace,
    editMarketplace,
    deleteMarketplace,
    openNewTab,
    openEditTab,
  };
};
