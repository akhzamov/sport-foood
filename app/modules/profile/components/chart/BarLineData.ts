import axios from "axios";
import { useProfileStore } from "~/modules/profile/stores/profile";
import type { ISalesPlanDay } from "~/modules/profile/types/salesPlanDay.type";
import { getAuthToken } from "~/utils/auth";

export async function getSalesPlanDay() {
	const profileStore = useProfileStore();
	const token = getAuthToken();
	profileStore.salesPlanDay = null;
	try {
		const res = await axios.get<ISalesPlanDay>(
			`/api/sales-plan/day/detail?`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				params: {
					store_id: profileStore.selectedBranch,
					day: profileStore.selectedDate,
				},
			}
		);
		profileStore.salesPlanDay = res.data;
		profileStore.salesPlanDayFirstRes = true;
	} catch (error) {
		console.error(
			"Не удалось получить /sales-plan/day/detail: ",
			error
		);
	}
}
