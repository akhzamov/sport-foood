import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useMainStore } from "~/stores/main";

export async function getUsers() {
  const { $usersRep } = useNuxtApp();
  const personalStore = usePersonalStore();
  try {
    const params = {
      page: personalStore.employeesPage,
      per_page: personalStore.employeesPerPage,
    };
    const res = await $usersRep.getUsers(params);
    personalStore.employees = res.data;
    personalStore.employeesFiltered = res.data;
    personalStore.employeesPagination = res.pagination;
  } catch (error) {
    console.error("Не удалось получить /crud/users: ", error);
  }
}

export async function getUserById(id: number) {
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

export async function editUserById(
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
export async function createUser(data: {
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
  mainStore.isLoading = true;
  try {
    const body = data;
    const res = await $usersRep.createUser(body);
    await getUsers();
    mainStore.isLoading = false;
  } catch (error) {
    console.error(`Не удалось изменить /crud/user `, error);
  }
}
