import { useAdminStore } from "~/modules/admin/stores/admin";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { useMainStore } from "~/stores/main";

export async function getDrivers() {
  const { $driversRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.drivers = null;
  try {
    const params = {
      page: adminStore.salesAgentsPage,
      per_page: adminStore.salesAgentsPerPage,
    };
    const res = await $driversRep.getDrivers(params);
    adminStore.drivers = res.data.drivers;
    adminStore.driversPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/drivers: ", error);
  }
}

export async function getDriverAreas() {
  const { $driversRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.driverAreas = null;
  try {
    const res = await $driversRep.getDriverAreas();
    adminStore.driverAreas = res.data.areas;
  } catch (error) {
    console.error("Не удалось получить /crud/drivers: ", error);
  }
}

export async function getDriverById(id: number) {
  const { $driversRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.driver = null;
  console.log("work");

  try {
    const res = await $driversRep.getDriverById(id);
    console.log(res);
    adminStore.driver = res.data;
  } catch (error) {
    console.error(`Не удалось получить /crud/drivers/${id}: `, error);
  }
}

export async function editDriverById(
  id: number,
  data: { name: string; contact: string; city_id: string | number }
) {
  const { $driversRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.isLoading = true
  try {
    const body = data;
    const res = await $driversRep.editDriverById(id, body);
    if (res.errors) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "error";
      mainStore.alertShowTitle = "Ошибка";
      mainStore.alertShowText = res.message;
    } else if (res.success) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "success";
      mainStore.alertShowTitle = "Успешно";
      mainStore.alertShowText = "Данные успешно изменены";
      getDrivers()
    }
    setTimeout(() => {
      mainStore.alertShow = false;
      mainStore.alertShowType = "";
      mainStore.alertShowTitle = "";
      mainStore.alertShowText = "";
    }, 6000);
    mainStore.isLoading = false
  } catch (error) {
    console.error(`Не удалось получить /crud/drivers/${id}/update: `, error);
  }
}

export async function createDriverById(
  data: { name: string; contact: string; city_id: string | number }
) {
  const { $driversRep } = useNuxtApp();
  const adminStore = useAdminStore();
  const mainStore = useMainStore();
  try {
    const body = data;
    const res = await $driversRep.createDriver(body);
    if (res.errors) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "error";
      mainStore.alertShowTitle = "Ошибка";
      mainStore.alertShowText = res.message;
    } else if (res.success) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "success";
      mainStore.alertShowTitle = "Успешно";
      mainStore.alertShowText = "Данные успешно изменены";
      getDrivers();
    }
    setTimeout(() => {
      mainStore.alertShow = false;
      mainStore.alertShowType = "";
      mainStore.alertShowTitle = "";
      mainStore.alertShowText = "";
    }, 6000);
  } catch (error) {
    console.error(`Не удалось создать /crud/drivers/store: `, error);
  }
}

export async function deleteSalesAgentById(id: number) {
  const { $driversRep } = useNuxtApp();
  const adminStore = useAdminStore();
  const mainStore = useMainStore();
  try {
    const res = await $driversRep.deleteDriverById(id);
    if (res.success) {
      mainStore.alertShow = true;
      mainStore.alertShowType = "success";
      mainStore.alertShowTitle = "Успешно";
      mainStore.alertShowText = "Данные успешно изменены";
    } else {
      mainStore.alertShow = true;
      mainStore.alertShowType = "error";
      mainStore.alertShowTitle = "Ошибка";
      mainStore.alertShowText = "Не удалось удалить водителя!";
    }
    setTimeout(() => {
      mainStore.alertShow = false;
      mainStore.alertShowType = "";
      mainStore.alertShowTitle = "";
      mainStore.alertShowText = "";
    }, 6000);
  } catch (error) {
    console.error(`Не удалось создать /crud/drivers/store: `, error);
  }
}
