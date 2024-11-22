import { useAdminStore } from "~/modules/admin/stores/admin";

export async function getPermissions() {
  const { $permissionsRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.permissions = null;
  try {
    const res = await $permissionsRep.getPermissions();
    adminStore.permissions = res;
  } catch (error) {
    console.error("Не удалось получить /permissions: ", error);
  }
}
