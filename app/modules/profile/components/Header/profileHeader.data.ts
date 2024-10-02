import type { IStore } from "~/modules/profile/types/stores.type";
import type { ISalesPlan } from "~/modules/profile/types/salesPlan.type";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { getAuthToken } from "~/utils/auth";
import axios from "axios";
import { useRouter } from "#app";

export async function getStores() {
	const profileStore = useProfileStore();
	const token = getAuthToken();
	const router = useRouter();
	profileStore.salesPlan = null;
	try {
		const res = await axios.get<IStore[]>(`/api/stores`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		profileStore.stores = res.data;
		profileStore.selectedBranch = res.data ? res.data[0]?.id || 0 : 0;
		if (res.data.length > 0) {
			getSalesPlan();
		}
	} catch (error: any) {
		console.error("Не удалось получить /stores: ", error);
		if (error.status === 401) {
			router.push("/sign-in");
			router.go(1);
		}
	}
}

export async function getSalesPlan() {
	const profileStore = useProfileStore();
	const token = getAuthToken();
	const router = useRouter();
	profileStore.salesPlan = null;
	try {
		const res = await axios.get<ISalesPlan>(`/api/sales-plan`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			params: {
				store_id: profileStore.selectedBranch,
				days: profileStore.activeDayFilter,
			},
		});
		profileStore.salesPlan = res.data.data;
		profileStore.monthAnnotation = res.data.salesPlan;
	} catch (error: any) {
		console.error("Не удалось получить /sales-plan: ", error);
		if (error.status === 401) {
			router.push("/sign-in");
			router.go(1);
		}
	}
}
