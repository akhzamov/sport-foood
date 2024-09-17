import axios from "axios";
import { useProfileStore } from "~/modules/profile/stores/profile";
import type { ISalesPlanDay } from "~/modules/profile/types/salesPlanDay.type";

export async function getSalesPlanDay() {
	const profileStore = useProfileStore();
	const authCookie = useCookie("auth");
	profileStore.salesPlanDay = null;
	profileStore.salesPlanDayFirstRes = true;
	try {
		const res = await axios.get<ISalesPlanDay>(
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
