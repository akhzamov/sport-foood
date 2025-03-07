import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "../stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudDistrictsResponse = () => {
  async function getDistricts() {
    const { $crudDistrictsRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const params: {
        page: number;
        per_page: number;
        city_id?: number;
        name?: string;
      } = {
        page: localitiesStore.districtsPage,
        per_page: localitiesStore.perPage,
      };

      if (localitiesStore.selectedCityByArea) {
        params.city_id = localitiesStore.selectedCityByArea;
      }

      if (localitiesStore.searchDistricts) {
        params.name = localitiesStore.searchDistricts;
      }

      const res = await $crudDistrictsRep.getDistricts(params);
      localitiesStore.districts = res.data.districts ? res.data.districts : [];
      localitiesStore.districtsPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getDistrict(id: number) {
    const { $crudDistrictsRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $crudDistrictsRep.getDistrictById(id);
      localitiesStore.district = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createDistrict(body: { name: string; city_id: number }) {
    const { $crudDistrictsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudDistrictsRep.createDistrictById(body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Район успешно создан!";

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
      mainStore.rightAlertShowText = "Не удалось создать район!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editDistrict(
    id: number,
    body: { name: string; city_id: number }
  ) {
    const { $crudDistrictsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudDistrictsRep.editDistrictById(id, body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Район успешно изменен!";

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
      mainStore.rightAlertShowText = "Не удалось изменить район!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteDistrict(id: number) {
    const { $crudDistrictsRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudDistrictsRep.deleteDistrictById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Район успешно удален!";

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
      mainStore.rightAlertShowText = "Не удалось удалить район!";

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
        name: "Район",
      });
    }
  };
  const openEditTab = (id: number, textId: string) => {
    const adminStore = useAdminStore();
    const exists = adminStore.activeOpenTabs.some((item) => item.id === textId);

    if (exists) {
      adminStore.activeOpenTab = textId;
    } else {
      adminStore.activeOpenTabs.push({
        id: textId,
        title: `#${id}`,
        name: "Район",
      });
    }
  };

  return {
    getDistricts,
    getDistrict,
    createDistrict,
    editDistrict,
    deleteDistrict,
    openNewTab,
    openEditTab,
  };
};
