import { useProfileStore } from "~/modules/profile/stores/profile";
import { getMarketplacesData } from "~/modules/profile/components/Dashboard/Rating/MarketplacesData";
import { useRouter } from "#app";


export async function getStores() {
  const { $storesRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const router = useRouter();
  profileStore.salesPlan = null;
  try {
    const res = await $storesRep.getStores();
    profileStore.stores = res;
    profileStore.selectedBranch = res ? res[0]?.id || 0 : 0;
    if (res.length > 0) {
      getSalesPlan();
      getMarketplacesData();
    }
  } catch (error: any) {
    console.error("Не удалось получить /stores: ", error);
    if (error.status === 401) {
      router.push("/sign-in");
      router.go(1);
    }
  }
}

export async function getSalesPlan() {
  const { $salesPlanRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const router = useRouter();
  profileStore.salesPlan = null;
  try {
    const params = {
      store_id: profileStore.selectedBranch,
      days: profileStore.activeDayFilter,
    };
    const res = await $salesPlanRep.getPlan(params);
    profileStore.salesPlan = res.data;
    profileStore.monthAnnotation = res.salesPlan;
  } catch (error: any) {
    console.error("Не удалось получить /sales-plan: ", error);
    if (error.status === 401) {
      router.push("/sign-in");
      router.go(1);
    }
  }
}
