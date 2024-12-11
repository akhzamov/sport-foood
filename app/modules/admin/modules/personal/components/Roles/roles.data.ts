import { useAdminStore } from "~/modules/admin/stores/admin";

export async function getPermissions() {
  const { $permissionsRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.permissions = null;
  try {
    const res = await $permissionsRep.getPermissions();
    for (const key in res.data) {
      for (const key2 in res.data[key]) {
        res.data[key][key2]?.forEach((item) => {
          item.checked = false;
        });
      }
    }
    adminStore.permissions = res.data;
  } catch (error) {
    console.error("Не удалось получить /permissions: ", error);
  }
}
