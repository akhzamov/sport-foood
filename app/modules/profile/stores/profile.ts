import { defineStore } from "pinia";
import type { IProfileStore } from "~/modules/profile/types/profileStore.type";

export const useProfileStore = defineStore("profile", {
	state: (): IProfileStore => ({
		activeTab: null,
		activeDayFilter: null,
		activeDayFilterBlocked: false,
		activeStoresSelect: false,
		monthAnnotation: 0,
		activeMoreInfo: false,
		stores: null,
		selectedBranch: null,
		salesPlan: null,
		chartLoader: false,
		selectedDate: "",
		salesPlanDay: null,
		salesPlanDayFirstRes: false,
	}),
	actions: {
		async filterData() {
			console.log("filtered");
		},
	},
});
