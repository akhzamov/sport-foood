import { useProfileStore } from "~/modules/profile/stores/profile";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

export async function getSalesAgentLeft() {
  const { $salesAgentLeftRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.salesAgentLeft = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
      cities: warehouseStore.selectedCities.join(","),
    };
    const res = await $salesAgentLeftRep.getSalesAgent(param);
    warehouseStore.salesAgentLeft = res.data.cities;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/sales-agent-left: ", error);
  }
}
