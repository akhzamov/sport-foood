<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { getSalesPlan } from "~/modules/profile/components/Header/profileHeader.data";
	import { getMarketplacesData } from "~/modules/profile/components/Analysis/Modules/Rating/MarketplacesData";

	const profileStore = useProfileStore();
	const activeMoreInfo = computed(() => profileStore.activeMoreInfo);
	const activeDayFilterBlocked = computed(
		() => profileStore.activeDayFilterBlocked
	);
	const salesPlan = computed(() => profileStore.salesPlan);
	const marketplacesData = computed(
		() => profileStore.marketplacesData
	);
	const isChartReady = ref(false);

	const daysFilter = reactive([
		{ id: 1, title: "30 д", value: 30 },
		{ id: 2, title: "14 д", value: 14 },
		{ id: 3, title: "7 д", value: 7 },
		{ id: 4, title: "24 ч", value: 0 },
	]);

	const activeTab = async (value: number) => {
		profileStore.activeMoreInfo = false;
		if (!profileStore.activeDayFilterBlocked) {
			const activeItem = daysFilter.find(
				(item) => item.value === value
			);

			if (activeItem) {
				profileStore.activeDayFilterBlocked = true;
				profileStore.activeDayFilter = value;
				await getSalesPlan();
				await getMarketplacesData();
				profileStore.activeDayFilterBlocked = false;
			}
		}
	};

	const moreInfo = ref<HTMLElement | null>(null);

	const scrollTo = () => {
		if (moreInfo.value) {
			moreInfo.value.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	};

	watch(
		activeMoreInfo,
		(newValue) => {
			if (newValue) {
				setTimeout(() => {
					scrollTo();
				}, 500);
			}
		},
		{ immediate: true }
	);

	watch(salesPlan, async (newSalesPlan) => {
		if (newSalesPlan) {
			await nextTick();
			isChartReady.value = true;
		} else {
			isChartReady.value = false;
		}
	});
</script>

<template>
	<div class="flex items-center justify-between pt-12">
		<h2 class="text-32-semi text-gray-90-color">Анализ</h2>
		<div
			class="flex items-center justify-center gap-2 rounded-md p-1"
			:class="{
				'bg-dark-onix-color': !activeDayFilterBlocked,
				'bg-gray-15-color': activeDayFilterBlocked,
			}"
		>
			<div
				v-for="day in daysFilter"
				:key="day.id"
				class="w-20 h-[30px] flex items-center justify-center rounded-[4px]"
				:class="{
					'bg-primary-color':
						profileStore.activeDayFilter == day.value &&
						!activeDayFilterBlocked,
					'bg-gray-40-color':
						profileStore.activeDayFilter == day.value &&
						activeDayFilterBlocked,
					'cursor-pointer': !activeDayFilterBlocked,
					'cursor-not-allowed': activeDayFilterBlocked,
					'bg-transparent': profileStore.activeDayFilter != day.value,
				}"
				@click="activeTab(day.value)"
			>
				<span
					class="text-14-med"
					:class="{
						'text-dark-night-color':
							profileStore.activeDayFilter == day.value &&
							!activeDayFilterBlocked,
						'text-gray-90-color':
							profileStore.activeDayFilter != day.value &&
							!activeDayFilterBlocked,
						'text-dark-charcoal-color':
							profileStore.activeDayFilter == day.value &&
							activeDayFilterBlocked,
						'text-gray-40-color':
							profileStore.activeDayFilter != day.value &&
							activeDayFilterBlocked,
					}"
					>{{ day.title }}</span
				>
			</div>
		</div>
	</div>

	<div
		class="w-full grid grid-cols-custom-3-390 gap-6 justify-center mt-4"
	>
		<div class="grid col-span-1">
			<AnalysisModulesChartLoadChart v-if="!salesPlan" />
			<AnalysisModulesChartBarLine v-if="salesPlan" />
		</div>
		<div class="grid col-span-1">
			<AnalysisModulesChartLoadChart v-if="!marketplacesData" />
			<AnalysisModulesRatingMarketplaces v-if="marketplacesData" />
		</div>
		<div class="grid col-span-1">
			<ReportModulesWarehouseBalancesAndReserve />
		</div>
	</div>

	<div
		class="w-full grid grid-cols-1 mt-4 pb-16"
		ref="moreInfo"
	>
		<Transition name="salesRanking">
			<AnalysisModulesGraphSalesRanking
				v-if="
					profileStore.selectedDate.length > 0 &&
					profileStore.activeMoreInfo
				"
			/>
		</Transition>
	</div>
</template>

<style scoped>
	.salesRanking-enter-active,
	.salesRanking-leave-active {
		height: 400px;
		overflow: visible;
		transition: height 0.5s linear;
	}

	.salesRanking-enter-from,
	.salesRanking-leave-to {
		height: 0;
		overflow: hidden;
		transition: height 0.5s linear;
	}
</style>
