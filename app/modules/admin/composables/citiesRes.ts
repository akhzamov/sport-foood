import { useLocalitiesStore } from "~/modules/admin/stores/localities";
import { useAdminStore } from "../stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudCitiesResponse = () => {
  async function getAreas() {
    const { $crudCitiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $crudCitiesRep.getAreas();
      localitiesStore.areas = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCitiesByArea() {
    const { $crudCitiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $crudCitiesRep.getCitiesByArea();
      localitiesStore.citiesByArea = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCities() {
    const { $crudCitiesRep } = useNuxtApp();
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

      const res = await $crudCitiesRep.getCities(params);
      localitiesStore.cities = res.data.cities ? res.data.cities : [];
      localitiesStore.citiesPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCity(id: number) {
    const { $crudCitiesRep } = useNuxtApp();
    const localitiesStore = useLocalitiesStore();
    try {
      const res = await $crudCitiesRep.getCityById(id);
      localitiesStore.city = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createCity(body: { name: string; area_id: number }) {
    const { $crudCitiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudCitiesRep.createCityById(body);
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
    const { $crudCitiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudCitiesRep.editCityById(id, body);
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
    const { $crudCitiesRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudCitiesRep.deleteCityById(id);
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

  return {
    getAreas,
    getCities,
    getCity,
    getCitiesByArea,
    createCity,
    editCity,
    deleteCity,
  };
};
