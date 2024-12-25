import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { useMainStore } from "~/stores/main";

export async function getSalesAgents() {
  const { $salesAgentsRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  const profileStore = useProfileStore();
  try {
    const params = {
      store_id:
        profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
      page: personalStore.salesAgentsPage,
      per_page: personalStore.salesAgentsPerPage,
    };
    const res = await $salesAgentsRep.getSalesAgents(params);
    personalStore.salesAgents = res.data.agents;
    personalStore.salesAgentsPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/agents: ", error);
  }
}

export async function getSalesAgentById(id: number) {
  const { $salesAgentsRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  const profileStore = useProfileStore();
  try {
    const params = {
      store_id:
        profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
    };
    const res = await $salesAgentsRep.getSalesAgentById(id, params);
    personalStore.salesAgent = res.data;
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}

export async function editSalesAgentById(
  id: number,
  data: {
    name: string;
    contact: string;
    stores: number[];
  }
) {
  const { $salesAgentsRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.isLoading = true;
  try {
    const res = await $salesAgentsRep.updateSalesAgentById(id, data);
    await getSalesAgents();
    mainStore.isLoading = false;
  } catch (error) {
    console.error(`Не удалось получить /crud/agents/${id}: `, error);
  }
}

export async function deleteSalesAgentById(id: number) {
  const { $usersRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  try {
    const res = await $usersRep.getUserById(id);
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}
