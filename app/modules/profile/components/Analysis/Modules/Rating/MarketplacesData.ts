import axios from "axios";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { getAuthToken } from "~/utils/auth";
import type { IMarketplaceData } from "~/modules/profile/types/marketplaceData.type";

export async function getMarketplacesData() {
	const profileStore = useProfileStore();
	const token = getAuthToken();
	profileStore.marketplacesData = null;
	try {
		const res = await axios.get<IMarketplaceData>(
			`/api/sales-plan/marketplace?`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				params: {
					store_id: profileStore.selectedBranch,
					days: profileStore.activeDayFilter,
				},
			}
		);
		profileStore.marketplacesData = res.data.data;
		profileStore.marketplacesTotalProfit = res.data.totalProfit;
		profileStore.marketplacesTotalSold = res.data.totalSold;
		profileStore.marketplacesTotalSpending = res.data.totalSpending;
	} catch (error) {
		console.error(
			"Не удалось получить /sales-plan/marketplace: ",
			error
		);
	}
}
