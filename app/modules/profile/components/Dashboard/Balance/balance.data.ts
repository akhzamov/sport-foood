import { useProfileStore } from "~/modules/profile/stores/profile";

export async function getIndexMarketplaces() {
  const { $indexBalanceRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $indexBalanceRep.getIndexMarketplaces(param);
    profileStore.indexMarketplacesLeft = res.data.marketplaces;
  } catch (error) {
    console.error("Не удалось получить /index-marketplaces-left: ", error);
  }
}

export async function getIndexAgents() {
  const { $indexBalanceRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $indexBalanceRep.getIndexAgents(param);
    profileStore.indexAgentsLeft = res.data.agents;
  } catch (error) {
    console.error("Не удалось получить /index-agents-left: ", error);
  }
}

export async function getIndexStorages() {
  const { $indexBalanceRep } = useNuxtApp();
  const profileStore = useProfileStore();
  profileStore.salesPlanDay = null;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $indexBalanceRep.getIndexStorages(param);
    profileStore.indexStoragesLeft = res.data.products;
  } catch (error) {
    console.error("Не удалось получить /storages-index-left: ", error);
  }
}
