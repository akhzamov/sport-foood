<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { getSalesPlan } from "~/modules/profile/components/Header/profileHeader.data";

	const profileStore = useProfileStore();
	const activeMoreInfo = computed(() => profileStore.activeMoreInfo);
	const activeDayFilterBlocked = computed(
		() => profileStore.activeDayFilterBlocked
	);
	const chartLoader = computed(() => profileStore.chartLoader);
	const salesPlan = computed(() => profileStore.salesPlan);
	const isChartReady = ref(false);

	const daysFilter = reactive([
		{ id: 1, title: "30 д", value: 30, active: true },
		{ id: 2, title: "14 д", value: 14, active: false },
		{ id: 3, title: "7 д", value: 7, active: false },
		{ id: 4, title: "24 ч", value: 0, active: false },
	]);

	const activeTab = async (value: number) => {
		if (!profileStore.activeDayFilterBlocked) {
			const activeItem = daysFilter.find(
				(item) => item.value === value
			);

			if (activeItem) {
				activeItem.active = true;

				profileStore.activeDayFilterBlocked = true;
				profileStore.activeDayFilter = value;
				await getSalesPlan();
				profileStore.activeDayFilterBlocked = false;

				daysFilter.forEach((item) => {
					if (item !== activeItem) {
						item.active = false;
					}
				});
			}
		}
	};

	const moreInfo = ref<HTMLElement | null>(null);

	const scrollTo = () => {
		if (moreInfo.value) {
			moreInfo.value.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
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

	onMounted(() => {
		profileStore.activeDayFilter = 30;
	});
</script>

<template>
	<div class="container-custom">
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
						'bg-primary-color': day.active && !activeDayFilterBlocked,
						'bg-gray-40-color': day.active && activeDayFilterBlocked,
						'cursor-pointer': !activeDayFilterBlocked,
						'cursor-not-allowed': activeDayFilterBlocked,
						'bg-transparent': !day.active,
					}"
					@click="activeTab(day.value)"
				>
					<span
						class="text-14-med"
						:class="{
							'text-dark-night-color':
								day.active && !activeDayFilterBlocked,
							'text-gray-90-color':
								!day.active && !activeDayFilterBlocked,
							'text-dark-charcoal-color':
								day.active && activeDayFilterBlocked,
							'text-gray-40-color':
								!day.active && activeDayFilterBlocked,
						}"
						>{{ day.title }}</span
					>
				</div>
			</div>
		</div>

		<div
			class="w-full grid grid-cols-custom-3-390 gap-6 justify-center mt-4"
		>
			<ChartLoadChart v-if="!salesPlan" />
			<ChartBarLine v-if="salesPlan && isChartReady" />
			<RatingMarketplaces />
		</div>

		<div
			class="w-full grid grid-cols-1 mt-4 pb-16"
			ref="moreInfo"
		>
			<GraphSalesRanking />
		</div>
	</div>
</template>
