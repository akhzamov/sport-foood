import { useProfileStore } from "~/modules/profile/stores/profile";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

export async function getAreas() {
  const { $areasRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.areas = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $areasRep.getAreas(param);
    for (const areaId in res.data.areas) {
      if (res.data.areas.hasOwnProperty(areaId)) {
        const area = res.data.areas[areaId];

        if (area) {
          area.checked = false;
          area.menuOpen = false;

          for (const cityId in area.cities) {
            if (area.cities.hasOwnProperty(cityId)) {
              if (area.cities[cityId]) {
                area.cities[cityId].checked = false;
              }
            }
          }
        }
      }
    }
    warehouseStore.areas = res.data.areas;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/areas: ", error);
  }
}
export async function getStorageTypes() {
  const { $storageTypesRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const warehouseStore = useWarehouseStore();
  warehouseStore.storageTypes = null;
  warehouseStore.isLoading = true;
  try {
    const param = {
      store_id: profileStore.selectedBranch,
    };
    const res = await $storageTypesRep.getStorageTypes(param);
    warehouseStore.storageTypes = res.data;
    warehouseStore.isLoading = false;
  } catch (error) {
    console.error("Не удалось получить /api/storage-types: ", error);
  }
}
