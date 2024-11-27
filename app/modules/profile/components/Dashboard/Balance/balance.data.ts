import { useProfileStore } from "~/modules/profile/stores/profile";

export async function gerIndexMarketplaces() {
  const { $indexMarketplacesRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $indexMarketplacesRep.getIndexMarketplaces(param);
    profileStore.indexMarketplacesLeft = res.data.marketplaces;
  } catch (error) {
    console.error("Не удалось получить /index-marketplaces-left: ", error);
  }
}
