import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useProfileStore } from "~/modules/profile/stores/profile";

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

export async function getSpending() {
  const { $salesPlanSpendingRep } = useNuxtApp();
  const profileStore = useProfileStore();
  try {
    const dates = getDateRange(profileStore.activeDayFilter ?? 0);
    // profileStore.activeDayFilterValue = {
    //   date_from: dates.date_from,
    //   date_to: dates.date_to,
    // };
    const params = {
      store_id: profileStore.selectedBranch,
      date_from: profileStore.activeDayFilterValue?.date_from,
      date_to: profileStore.activeDayFilterValue?.date_to,
    };
    const res = await $salesPlanSpendingRep.getSpending(params);
    profileStore.spending = res.data.types;
    profileStore.spendingTotalAmount = res.data.total_amount;
  } catch (error) {
    console.error("Не удалось получить /crud/users: ", error);
  }
}
