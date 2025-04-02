import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useAdminStore } from "../stores/admin";

export const usePersonalEmployeesResponse = () => {
  async function getUsers() {
    const { $usersRep } = useNuxtApp();
    const personalStore = usePersonalStore();
    try {
      const params: {
        page: number;
        per_page: number;
        username?: string;
      } = {
        page: personalStore.employeesPage,
        per_page: personalStore.employeesPerPage,
      };
      if (personalStore.searchEmployee) {
        params.username = personalStore.searchEmployee;
      }
      const res = await $usersRep.getUsers(params);
      personalStore.employees = res.data;
      personalStore.employeesFiltered = res.data;
      personalStore.employeesPagination = res.pagination;
    } catch (error) {
      console.error("Не удалось получить /crud/users: ", error);
    }
  }

  async function getUserById(id: number) {
    const { $usersRep } = useNuxtApp();
    const personalStore = usePersonalStore();
    try {
      const res = await $usersRep.getUserById(id);
      if (res.data) {
        personalStore.employee = res.data;
      }
    } catch (error) {
      console.error(`Не удалось получить /crud/users/${id}: `, error);
    }
  }

  async function editUserById(
    id: number,
    data: {
      username: string;
      contact: string;
      stores: number[];
      permissions: string[];
    }
  ) {
    const { $usersRep } = useNuxtApp();
    const mainStore = useMainStore();
    mainStore.isLoading = true;
    if (id) {
      try {
        const body = data;
        const res = await $usersRep.editUserById(id, body);
        await getUsers();
        await getUserById(id);
        mainStore.isLoading = false;
      } catch (error) {
        console.error(`Не удалось изменить /crud/users/${id}: `, error);
      }
    }
  }

  async function createUser(data: {
    username: string;
    contact: string;
    password: string;
    password_confirmation: string;
    stores: number[];
    permissions: string[];
    role: string;
  }) {
    const { $usersRep } = useNuxtApp();
    const mainStore = useMainStore();
    const adminStore = useAdminStore();
    const { openEditTab, closeTab } = useTabs();
    mainStore.isLoading = true;
    try {
      const body = data;
      const res = await $usersRep.createUser(body);
      openEditTab(res.data?.id ?? 0, `employees-edit-${res.data?.id ?? 0}`, "Сотрудник");
      closeTab("employees-add");
      await getUsers();
      mainStore.isLoading = false;
    } catch (error) {
      console.error(`Не удалось изменить /crud/user `, error);
    }
  }

  return {
    getUsers,
    getUserById,
    editUserById,
    createUser,
  };
};
