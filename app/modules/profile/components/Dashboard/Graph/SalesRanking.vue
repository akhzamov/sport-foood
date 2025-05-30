<script lang="ts" setup>
	import type { ISalesPlanDayProducts } from "~/modules/profile/types/Dashboard/salesPlanDay.type";
	import { useProfileStore } from "~/modules/profile/stores/profile";

	const profileStore = useProfileStore();
	const data = computed(() => profileStore.salesPlanDay);
	const showProductItemID = ref<number | null>(null);
	const showProductID = ref<number | null>(null);

	const calculateDeviation = (
		soldWeight: number | null | undefined,
		plan: string | number
	) => {
		const planNumber = Number(plan);

		// Проверяем, что norm не равен нулю
		if (planNumber === 0) {
			return "пусто"; // Можно вернуть соответствующее сообщение или значение
		}

		// Проверяем, что currentValue определен и преобразуем его в число
		const soldWeightNumber = Number(soldWeight);
		const percentageDeviation = (soldWeightNumber / planNumber) * 100;
		return `${Math.abs(percentageDeviation).toFixed(1)}%`;
	};

	const totalPlan = (item: ISalesPlanDayProducts) => {
		if (Number(item.plan) > item.soldWeight) {
			return Number(item.plan);
		} else {
			return item.soldWeight;
		}
	};

	const totalCount = (item: ISalesPlanDayProducts) => {
		let total = 0;
		const packageCounts = Object.values(item.packages).map(
			(pkg) => pkg.count
		);
		total = packageCounts.reduce((acc, count) => acc + count, 0);
		return total.toLocaleString();
	};

	const totalWeight = (item: ISalesPlanDayProducts) => {
		let total = 0;
		const packageCounts = Object.values(item.packages).map(
			(pkg) => pkg.weightTotal
		);
		total = packageCounts.reduce((acc, count) => acc + count, 0);
		return total.toFixed(2).toLocaleString();
	};

	const totalSum = (item: ISalesPlanDayProducts) => {
		let total = 0;
		const packageCounts = Object.values(item.packages).map(
			(pkg) => pkg.amount
		);
		total = packageCounts.reduce((acc, count) => acc + count, 0);
		return total.toLocaleString();
	};

	const closeSalesRanking = () => {
		profileStore.selectedDate = "";
		profileStore.salesPlanDay = null;
		profileStore.salesPlanDayFirstRes = false;
		profileStore.activeMoreInfo = false;
	};
</script>

<template>
	<div class="w-full">
		<div
			class="px-5 h-[40px] flex items-center justify-between bg-dark-gunmental rounded-tl-lg rounded-tr-lg"
		>
			<h4 class="text-14-bold text-gray-90">
				Расшифровка продаж за {{ profileStore.selectedDateRU }}
			</h4>
			<IconClose
				class="text-gray-90 cursor-pointer"
				@click="closeSalesRanking()"
			/>
		</div>
		<div
			class="chart-wrapper grid grid-cols-3 grid-rows-subgrid bg-dark-charcoal rounded-bl-lg rounded-br-lg"
		>
			<template v-if="data">
				<div
					class="w-full h-full flex flex-col"
					v-for="item in data"
					:key="item.name"
				>
					<div
						class="w-full h-9 flex items-center justify-between bg-dark-charcoal px-2 border-l border-gray-15 py-2"
					>
						<div class="flex h-full items-center justify-start gap-2">
							<img
								src="~/assets/img/ozon.png"
								alt="marketplace-image"
								class="w-7 h-7 object-fill object-center rounded-[50%]"
							/>
							<div class="flex flex-col items-start">
								<p class="text-12-bold text-gray-90">
									{{ item.name }}
								</p>
								<p class="text-12-ext text-gray-75">
									{{ item.type }}
								</p>
							</div>
						</div>
						<div class="flex h-full items-center justify-end gap-1">
							<p class="text-12-bold text-gray-90">
								{{ item.totalSum.toLocaleString() }}
							</p>
							<IconCoinsStacked class="text-gray-90" />
						</div>
					</div>
					<div
						class="h-full flex flex-col bg-gray-15 border-l border-dark-charcoal"
					>
						<div
							class="relative flex items-center gap-[4px] hover:bg-gray-25 px-2 py-1 z-[50]"
							v-for="product in item.products"
							@mouseenter="
								(showProductItemID = item.id),
									(showProductID = product.id)
							"
							@mouseleave="
								(showProductItemID = null), (showProductID = null)
							"
						>
							<p class="flex-grow text-12-reg text-gray-90">
								{{ product.name }}
							</p>
							<div class="w-[150px]">
								<div
									class="totalPlan flex w-full h-2 bg-gray-40 rounded-lg"
								>
									<div
										class="sold relative flex h-full bg-mint rounded-lg"
										:style="`width: calc(${
											(product.soldCount /
												(totalPlan(product) * 1.3)) *
											80
										}%)`"
									>
										<div
											class="min-w-[4px] w-[4px] min-h-[12px] h-[12px] absolute top-[50%] translate-y-[-50%] z-[2]"
											:style="`left: calc(${
												(Number(product.plan) /
													(product.soldWeight * 1.3)) *
												100
											}%)`"
											:key="product.id"
										>
											<div
												class="w-full h-full plan cursor-pointer flex rounded-[1px] bg-success-400"
											></div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="w-[160px] flex items-center justify-end gap-[7px]"
							>
								<span class="text-12-reg text-gray-90">
									{{ product.soldWeight.toFixed(2).toLocaleString() }}
									кг
								</span>
								<span
									class="text-10-reg w-[70px] text-end"
									:class="{
										'text-success-400':
											product.soldWeight > product.plan,
										'text-error-400':
											product.soldWeight < product.plan,
									}"
								>
									({{
										calculateDeviation(
											product.soldWeight,
											product.plan
										)
									}})
								</span>
							</div>
							<template
								v-if="
									showProductItemID == item.id &&
									showProductID == product.id
								"
							>
								<div
									class="w-max absolute bottom-[100%] left-[50%] translate-x-[-50%] translate-y-[-8px] z-[50] bg-dark-eerie-black border border-gray-40 rounded-lg p-3 flex flex-col items-start justify-start"
								>
									<div class="w-max flex mb-2">
										<p
											class="w-[65px] text-10-reg text-gray-90 text-left"
										>
											Фасовка
										</p>
										<p
											class="w-[50px] text-10-reg text-gray-90 text-right"
										>
											Кол-во
										</p>
										<p
											class="w-[80px] text-10-reg text-gray-90 text-right"
										>
											Вес
										</p>
										<p
											class="w-[80px] text-10-reg text-gray-90 text-right"
										>
											Сумма
										</p>
									</div>
									<div
										class="w-full h-[1px] bg-dark-charcoal"
									></div>
									<div class="w-max flex my-2">
										<div
											class="w-[65px] flex gap-2 flex-col items-start justify-center"
										>
											<p
												class="text-10-ext text-gray-40"
												v-for="(pack, index) in product.packages"
												:key="index"
											>
												{{
													pack.packageWeight
														.toFixed(2)
														.toLocaleString()
												}}
												кг
											</p>
										</div>
										<div
											class="w-[50px] flex gap-2 flex-col items-end justify-center"
										>
											<p
												class="text-10-ext text-gray-90"
												v-for="(pack, index) in product.packages"
												:key="index"
											>
												{{ pack.count.toLocaleString() }}
											</p>
										</div>
										<div
											class="w-[80px] flex gap-2 flex-col items-end justify-center"
										>
											<p
												class="text-10-ext text-gray-90"
												v-for="(pack, index) in product.packages"
												:key="index"
											>
												{{
													pack.weightTotal.toFixed(2).toLocaleString()
												}}
												кг
											</p>
										</div>
										<div
											class="w-[80px] flex gap-2 flex-col items-end justify-center"
										>
											<p
												class="text-10-ext text-mint"
												v-for="(pack, index) in product.packages"
												:key="index"
											>
												{{ pack.amount.toLocaleString() }}
											</p>
										</div>
									</div>
									<div
										class="w-full h-[1px] bg-dark-charcoal"
									></div>
									<div class="w-max flex my-2">
										<div
											class="w-[65px] flex items-center justify-start"
										>
											<p class="text-10-ext text-gray-90">
												Итого
											</p>
										</div>
										<div
											class="w-[50px] flex items-center justify-end"
										>
											<p class="text-10-ext text-gray-90">
												{{ totalCount(product) }}
											</p>
										</div>
										<div
											class="w-[80px] flex items-center justify-end"
										>
											<p class="text-10-ext text-gray-90">
												{{ totalWeight(product) }} кг
											</p>
										</div>
										<div
											class="w-[80px] flex items-center justify-end"
										>
											<p class="text-10-ext text-mint">
												{{ totalSum(product) }}
											</p>
										</div>
									</div>
									<div
										class="w-full h-[1px] bg-dark-charcoal"
									></div>
									<div class="w-max flex mt-2">
										<div
											class="w-[65px] flex items-center justify-start"
										>
											<p class="text-10-ext text-mint">
												План
											</p>
										</div>
										<div
											class="w-[50px] flex items-center justify-end"
										></div>
										<div
											class="w-[80px] flex items-center justify-end"
										>
											<p class="text-10-ext text-mint">
												{{
													Number(product.plan)
														.toFixed(2)
														.toLocaleString()
												}}
												кг
											</p>
										</div>
										<div
											class="w-[80px] flex items-center justify-end"
										></div>
									</div>
								</div>
							</template>
						</div>
					</div>
				</div>
			</template>
			<div
				v-else
				class="w-full h-[150px] grid col-start-2 col-end-3"
			>
				<div
					class="salesRanking-loader w-full flex items-center justify-center overflow-y-auto h-full bg-dark-charcoal"
				>
					<div class="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.lds-ripple,
	.lds-ripple div {
		box-sizing: border-box;
		@apply text-primary;
	}

	.lds-ripple {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}

	.lds-ripple div {
		position: absolute;
		border: 4px solid currentColor;
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}

		4.9% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 0;
		}

		5% {
			top: 36px;
			left: 36px;
			width: 8px;
			height: 8px;
			opacity: 1;
		}

		100% {
			top: 0;
			left: 0;
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}
</style>
