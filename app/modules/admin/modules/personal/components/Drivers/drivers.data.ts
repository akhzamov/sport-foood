import { usePaymentStore } from "~/modules/admin/stores/payment";
import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useMainStore } from "~/stores/main";

export async function getDrivers() {
  const { $driversRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  try {
    const params = {
      page: personalStore.salesAgentsPage,
      per_page: personalStore.salesAgentsPerPage,
    };
    const res = await $driversRep.getDrivers(params);
    personalStore.drivers = res.data.drivers;
    personalStore.driversPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/drivers: ", error);
  }
}

export async function getDriverAreas() {
  const { $driversRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  const paymentStore = usePaymentStore();
  try {
    const res = await $driversRep.getDriverAreas();
    personalStore.driverAreas = res.data.areas;
    paymentStore.areas = res.data.areas;
  } catch (error) {
    console.error("Не удалось получить /crud/drivers: ", error);
  }
}

export async function getDriverById(id: number) {
  const { $driversRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  try {
    const res = await $driversRep.getDriverById(id);
    console.log(res);
    personalStore.driver = res.data;
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

export async function createDriverById(data: {
  name: string;
  contact: string;
  city_id: string | number;
}) {
  const { $driversRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.isLoading = true;
  try {
    const body = data;
    const res = await $driversRep.createDriver(body);
    await getDrivers();
    mainStore.isLoading = false;
  } catch (error) {
    console.error(`Не удалось создать /crud/drivers/store: `, error);
  }
}

export async function deleteSalesAgentById(id: number) {
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
