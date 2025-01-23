import { useProfileStore } from "~/modules/profile/stores/profile";
import { getMarketplacesData } from "~/modules/profile/components/Dashboard/Rating/MarketplacesData";
import { useRouter } from "#app";
import { usePaymentStore } from "~/modules/admin/stores/payment";
import { getSpending } from "../Dashboard/Expenses/expenses.data";
import { useMainStore } from "~/stores/main";

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function getDateRange(days: number | string) {
  const today = new Date(); // Текущая дата
  const dateTo = new Date(today); // Конец периода (сегодняшняя дата)
  const dateFrom = new Date(today); // Начало периода

  if (days === 0) {
    // Устанавливаем начало месяца
    dateFrom.setDate(1);
  } else if (typeof days === "number") {
    // Если это число (например, 30, 14, 7, 1)
    dateFrom.setDate(today.getDate() - days + 1);
  }

  return {
    date_from: formatDate(dateFrom),
    date_to: formatDate(dateTo),
  };
}

export async function getStores() {
  const { $storesRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const mainStore = useMainStore();
  const router = useRouter();
  profileStore.salesPlan = null;
  try {
    const res = await $storesRep.getStores();
    res.forEach((item) => {
      item.checked = false;
    });
    mainStore.stores = res;
    profileStore.selectedBranch = res ? res[0]?.id || 0 : 0;
    if (res.length > 0) {
      const dates = getDateRange(profileStore.activeDayFilter ?? 0);
      profileStore.activeDayFilterValue = {
        date_from: dates.date_from,
        date_to: dates.date_to,
      };
    }
    getSalesPlan();
    getMarketplacesData();
    getSpending();
  } catch (error: any) {
    console.error("Не удалось получить /stores: ", error);
    if (error.status === 401) {
      router.push("/sign-in");
      router.go(1);
    }
  }
}

export async function getSalesPlan() {
  const { $salesPlanRep } = useNuxtApp();
  const profileStore = useProfileStore();
  const router = useRouter();
  profileStore.salesPlan = null;
  try {
    const params = {
      store_id: profileStore.selectedBranch,
      date_from: profileStore.activeDayFilterValue?.date_from,
      date_to: profileStore.activeDayFilterValue?.date_to,
    };
    const res = await $salesPlanRep.getPlan(params);
    profileStore.salesPlan = res.data;
    profileStore.monthAnnotation = res.salesPlan;
  } catch (error: any) {
    console.error("Не удалось получить /sales-plan: ", error);
    if (error.status === 401) {
      router.push("/sign-in");
      router.go(1);
    }
  }
}
