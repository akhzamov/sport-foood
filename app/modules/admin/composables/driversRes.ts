import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

export const useCrudDriversResponse = () => {
  async function getDrivers() {
    const { $driversRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const params = {
        page: adminStore.driversPage,
        per_page: adminStore.perPage,
      };
      const res = await $driversRep.getDrivers(params);
      adminStore.drivers = res.data.drivers;
      adminStore.driversPagination = res.pagination;
    } catch (error) {
      console.error("Не удалось получить /crud/drivers: ", error);
    }
  }

  async function getDriverById(id: number) {
    const { $driversRep } = useNuxtApp();
    const adminStore = useAdminStore();
    try {
      const res = await $driversRep.getDriverById(id);
      console.log(res);
      adminStore.driver = res.data;
    } catch (error) {
      console.error(`Не удалось получить /crud/drivers/${id}: `, error);
    }
  }

  async function editDriverById(
    id: number,
    data: { name: string; contact: string; city_id: string | number }
  ) {
    const { $driversRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const body = data;
      const res = await $driversRep.editDriverById(id, body);
      await getDrivers();
      mainStore.isLoading = false;
    } catch (error) {
      console.error(`Не удалось получить /crud/drivers/${id}/update: `, error);
    }
  }

  async function createDriver(data: { name: string; contact: string; city_id: string | number }) {
    const { $driversRep } = useNuxtApp();
    const { openEditTab, closeTab } = useTabs();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const body = data;
      const res = await $driversRep.createDriver(body);
      openEditTab(res.data?.id ?? 0, `drivers-edit-${res.data?.id ?? 0}`, "Водитель");
      closeTab("drivers-add");
      await getDrivers();
      mainStore.isLoading = false;
    } catch (error) {
      console.error(`Не удалось создать /crud/drivers/store: `, error);
    }
  }

  async function deleteDriverById(id: number) {
    const { $driversRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    try {
      const res = await $driversRep.deleteDriverById(id);
      mainStore.isLoading = false;
    } catch (error) {
      console.error(`Не удалось создать /crud/drivers/store: `, error);
    }
  }

  return {
    getDrivers,
    getDriverById,
    editDriverById,
    createDriver,
    deleteDriverById,
  };
};
