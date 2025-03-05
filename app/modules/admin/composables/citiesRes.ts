import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "../stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudCitiesResponse = () => {
  async function getAreas() {
    const { $citiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $citiesRep.getAreas();
      localitiesStore.areas = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCitiesByArea() {
    const { $citiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $citiesRep.getCitiesByArea();
      localitiesStore.citiesByArea = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCities() {
    const { $citiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const params: {
        page: number;
        per_page: number;
        area_id?: number;
        name?: string;
      } = {
        page: localitiesStore.citiesPage,
        per_page: localitiesStore.perPage,
      };

      if (localitiesStore.selectedArea) {
        params.area_id = localitiesStore.selectedArea;
      }

      if (localitiesStore.searchCities) {
        params.name = localitiesStore.searchCities;
      }

      const res = await $citiesRep.getCities(params);
      localitiesStore.cities = res.data.cities ? res.data.cities : [];
      localitiesStore.citiesPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCity(id: number) {
    const { $citiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $citiesRep.getCityById(id);
      localitiesStore.city = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createCity(body: { name: string; area_id: number }) {
    const { $citiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $citiesRep.createCityById(body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Город успешно создан!";

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
      mainStore.rightAlertShowText = "Не удалось создать город!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function editCity(id: number, body: { name: string; area_id: number }) {
    const { $citiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $citiesRep.editCityById(id, body);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Город успешно изменен!";

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
      mainStore.rightAlertShowText = "Не удалось изменить город!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

  async function deleteCity(id: number) {
    const { $citiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $citiesRep.deleteCityById(id);
      mainStore.rightAlertShow = true;
      mainStore.rightAlertShowType = "success";
      mainStore.rightAlertShowText = "Город успешно удален!";

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
      mainStore.rightAlertShowText = "Не удалось удалить город!";

      setTimeout(() => {
        mainStore.rightAlertShow = false;
        mainStore.rightAlertShowType = "";
        mainStore.rightAlertShowText = "";
      }, 3000);

      mainStore.isLoading = false;
      console.error(error.response?.data);
    }
  }

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
        name: "Город",
      });
    }
  };

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
        name: "Город",
      });
    }
  };

  return {
    getAreas,
    getCities,
    getCity,
    getCitiesByArea,
    createCity,
    editCity,
    deleteCity,
    openEditTab,
    openNewTab,
  };
};
