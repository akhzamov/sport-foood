import { useMainStore } from "~/stores/main";
import { useAdminStore } from "../stores/admin";

export const useCrudCitiesResponse = () => {
  async function getAreas() {
    const { $crudCitiesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudCitiesRep.getAreas();
      adminStore.areas = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCitiesByArea() {
    const { $crudCitiesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudCitiesRep.getCitiesByArea();
      adminStore.citiesByArea = res.data.areas;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCities() {
    const { $crudCitiesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const params: {
        page: number;
        per_page: number;
        area_id?: number;
        name?: string;
      } = {
        page: adminStore.citiesPage,
        per_page: adminStore.perPage,
      };

      if (adminStore.selectedArea) {
        params.area_id = adminStore.selectedArea;
      }

      if (adminStore.searchCities) {
        params.name = adminStore.searchCities;
      }

      const res = await $crudCitiesRep.getCities(params);
      adminStore.cities = res.data.cities ? res.data.cities : [];
      adminStore.citiesPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getCity(id: number) {
    const { $crudCitiesRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudCitiesRep.getCityById(id);
      adminStore.city = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createCity(body: { name: string; area_id: number }) {
    const { $crudCitiesRep } = useNuxtApp();
    const { openEditTab, closeTab } = useTabs();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudCitiesRep.createCityById(body);
      openEditTab(res.data.id ?? 0, `settings-city-edit-${res.data?.id ?? 0}`, "Сотрудник");
      closeTab("settings-city-add");
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
