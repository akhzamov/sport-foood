import type { IStore } from "~/modules/profile/types/stores.type";
import type { ISalesPlan } from "~/modules/profile/types/salesPlan.type";
import axios from "axios";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { baseUrl } from "~/api";
import type { ISalesPlanDay } from "~/modules/profile/types/salesPlanDay.type";
import apiClient from "~/apiClient";

export async function getSalesPlanDay() {
	const profileStore = useProfileStore();
	const authCookie = useCookie("auth");
	profileStore.salesPlanDay = null;
	profileStore.salesPlanDayFirstRes = true;
	try {
		const res = await apiClient.get<ISalesPlanDay>(
			`/api/sales-plan/day/detail?`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authCookie.value}`,
				},
				params: {
					store_id: profileStore.selectedBranch,
					day: profileStore.selectedDate,
				},
			}
		);
		profileStore.salesPlanDay = res.data;
	} catch (error) {
		console.error(
			"Не удалось получить /sales-plan/day/detail: ",
			error
		);
	}
}
