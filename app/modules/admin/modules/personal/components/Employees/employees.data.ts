import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";

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
    if (res.data) {
      adminStore.employee = res.data;
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
        getUsers();
      }
      setTimeout(() => {
        mainStore.alertShow = false;
        mainStore.alertShowType = "";
        mainStore.alertShowTitle = "";
        mainStore.alertShowText = "";
      }, 6000);
      mainStore.isLoading = false;
    } catch (error) {
      console.error(`Не удалось изменить /crud/users/${id}: `, error);
    }
  }
}
