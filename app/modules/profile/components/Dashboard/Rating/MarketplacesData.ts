import { useProfileStore } from "~/modules/profile/stores/profile";


export async function getMarketplacesData() {
  const { $salesPlanMarketplaceRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.marketplacesData = null;
  try {
    const params = {
      store_id: profileStore.selectedBranch,
      days: profileStore.activeDayFilter,
    };
    const res = await $salesPlanMarketplaceRep.getMarketplace(params);
    profileStore.marketplacesData = res.data;
    profileStore.marketplacesTotalProfit = res.totalProfit;
    profileStore.marketplacesTotalSold = res.totalSold;
    profileStore.marketplacesTotalSpending = res.totalSpending;
  } catch (error) {
    console.error("Не удалось получить /sales-plan/marketplace: ", error);
  }
}
