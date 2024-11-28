import { useProfileStore } from "~/modules/profile/stores/profile";

export async function getPurchases() {
  const { $purchasesRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $purchasesRep.getPurchases(param);
    profileStore.purchases = res.data.purchases;
  } catch (error) {
    console.error("Не удалось получить /purchases: ", error);
  }
}
