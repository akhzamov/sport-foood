import { useAdminStore } from "~/modules/admin/stores/admin";
import { useProfileStore } from "~/modules/profile/stores/profile";

export async function getSalesAgents() {
  const { $salesAgentsRep } = useNuxtApp();
  const adminStore = useAdminStore();
  const profileStore = useProfileStore();
  adminStore.salesAgents = null;
  try {
    const params = {
      store_id: profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
      page: adminStore.salesAgentsPage,
      per_page: adminStore.salesAgentsPerPage,
    };
    const res = await $salesAgentsRep.getSalesAgents(params);
    adminStore.salesAgents = res.data.agents;
    adminStore.salesAgentsPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/agents: ", error);
  }
}

export async function getSalesAgentById(id: number) {
  const { $salesAgentsRep } = useNuxtApp();
  const adminStore = useAdminStore();
  const profileStore = useProfileStore();
  adminStore.salesAgent = null;
  try {
    const params = {
      store_id: profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
    };
    const res = await $salesAgentsRep.getSalesAgentById(id, params);
    adminStore.salesAgent = res.data;
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}

export async function editSalesAgentById(id: number) {
  const { $usersRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.employee = null;
  try {
    const res = await $usersRep.getUserById(id);
    adminStore.employee = res.data;
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}

export async function deleteSalesAgentById(id: number) {
  const { $usersRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.employee = null;
  try {
    const res = await $usersRep.getUserById(id);
    adminStore.employee = res.data;
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}
