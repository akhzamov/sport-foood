import { useAdminStore } from "~/modules/admin/stores/admin";

export async function getUsers() {
  const { $usersRep } = useNuxtApp();
  const adminStore = useAdminStore();
  adminStore.employees = null;
  try {
    const params = {
      page: adminStore.employeesPage,
      per_page: adminStore.employeesPerPage,
    };
    const res = await $usersRep.getUsers(params);
    adminStore.employees = res.data;
    adminStore.employeesPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/users: ", error);
  }
}

export async function getUserById(id: number) {
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

export async function editUserById(id: number | null) {
  const { $usersRep } = useNuxtApp();
  const adminStore = useAdminStore();
  if (id) {
    try {
      const storeIds =
        adminStore.employee?.stores?.map((store) => store.id) || [];
      const body = {
        username: adminStore.employee?.username,
        contact: adminStore.employee?.contact ?? "",
        stores: storeIds,
        permissions: adminStore.employee?.permissions,
        status: adminStore.employee?.status,
        role: adminStore.employee?.role,
      };
      const res = await $usersRep.editUserById(id, body);
      adminStore.activeOpenTab = "";
      adminStore.activeOpenTabs = [];
      getUsers();
    } catch (error) {
      console.error(`Не удалось изменить /crud/users/${id}: `, error);
    }
  }
}
