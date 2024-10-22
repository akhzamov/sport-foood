import { useProfileStore } from "~/modules/profile/stores/profile";

export async function getSalesPlanDay() {
  const { $salesPlanDayRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
      day: profileStore.selectedDate,
    };
    const res = await $salesPlanDayRep.getSalesPlanDay(param)
    profileStore.salesPlanDay = res.data;
    profileStore.salesPlanDayFirstRes = true;
  } catch (error) {
    console.error("Не удалось получить /sales-plan/day/detail: ", error);
  }
}
