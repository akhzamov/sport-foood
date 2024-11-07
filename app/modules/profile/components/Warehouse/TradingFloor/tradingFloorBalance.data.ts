import { useProfileStore } from "~/modules/profile/stores/profile";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

export async function getMarketplaceLeft() {
  const { $marketplaceLeftRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.marketplaceLeft = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
      cities:warehouseStore.selectedCities.join(","),
    };
    const res = await $marketplaceLeftRep.getMarketplaceLeft(param);
    warehouseStore.marketplaceLeft = res.data.areas;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/storages-left: ", error);
  }
}
