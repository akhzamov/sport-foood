import { useProfileStore } from "~/modules/profile/stores/profile";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

export async function getStoragesLeft() {
  const { $storagesLeftRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.storagesLeft = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
      type: warehouseStore.activeStorageType,
    };
    const res = await $storagesLeftRep.getStoragesLeft(param);
    warehouseStore.storagesLeft = res.data.storageCities;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/storages-left: ", error);
  }
}
