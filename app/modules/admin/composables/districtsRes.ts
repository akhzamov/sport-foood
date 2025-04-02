import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudDistrictsResponse = () => {
  async function getDistricts() {
    const { $crudDistrictsRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const params: {
        page: number;
        per_page: number;
        city_id?: number;
        name?: string;
      } = {
        page: adminStore.districtsPage,
        per_page: adminStore.perPage,
      };

      if (adminStore.selectedCityByArea) {
        params.city_id = adminStore.selectedCityByArea;
      }

      if (adminStore.searchDistricts) {
        params.name = adminStore.searchDistricts;
      }

      const res = await $crudDistrictsRep.getDistricts(params);
      adminStore.districts = res.data.districts ? res.data.districts : [];
      adminStore.districtsPagination = res.pagination;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function getDistrict(id: number) {
    const { $crudDistrictsRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $crudDistrictsRep.getDistrictById(id);
      adminStore.district = res.data ?? null;
    } catch (error: any) {
      console.error(error.response?.data);
    }
  }

  async function createDistrict(body: { name: string; city_id: number }) {
    const { $crudDistrictsRep } = useNuxtApp();
    const { openEditTab, closeTab } = useTabs();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $crudDistrictsRep.createDistrictById(body);
      openEditTab(res.data?.id ?? 0, `settings-district-edit-${res.data?.id ?? 0}`, "Сотрудник");
      closeTab("settings-district-add");
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

  async function editDistrict(id: number, body: { name: string; city_id: number }) {
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

  return {
    getDistricts,
    getDistrict,
    createDistrict,
    editDistrict,
    deleteDistrict,
  };
};
