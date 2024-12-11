import { useAdminStore } from "~/modules/admin/stores/admin";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { useMainStore } from "~/stores/main";

export async function getSalesAgents() {
  const { $salesAgentsRep } = useNuxtApp();
  const adminStore = useAdminStore();
  const profileStore = useProfileStore();
  adminStore.salesAgents = null;
  try {
    const params = {
      store_id:
        profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
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
      store_id:
        profileStore.selectedBranch > 0 ? profileStore.selectedBranch : 5,
    };
    const res = await $salesAgentsRep.getSalesAgentById(id, params);
    adminStore.salesAgent = res.data;
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
  mainStore.isLoading = true
  try {
    const res = await $salesAgentsRep.updateSalesAgentById(id, data);
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
      getSalesAgents();
    }
    setTimeout(() => {
      mainStore.alertShow = false;
      mainStore.alertShowType = "";
      mainStore.alertShowTitle = "";
      mainStore.alertShowText = "";
    }, 6000);
    mainStore.isLoading = true
  } catch (error) {
    console.error(`Не удалось получить /crud/agents/${id}: `, error);
  }
}

export async function deleteSalesAgentById(id: number) {
  const { $usersRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.employee = null;
  try {
    const res = await $usersRep.getUserById(id);
  } catch (error) {
    console.error(`Не удалось получить /crud/users/${id}: `, error);
  }
}
