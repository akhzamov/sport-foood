<script lang="ts" setup>
	import { useWarehouseStore } from "~/modules/profile/stores/warehouse";
	import type {
		ITradingFloorMarketplace,
		ITradingFloorProductMarketplace,
	} from "~/modules/profile/types/tradingFloorBalance.type";

	const warehouseStore = useWarehouseStore();

	const getFilledWidth = (
		marketplace: ITradingFloorProductMarketplace
	) => {
		const weight = marketplace.weight; // Предполагаем, что weight - это текущее значение
		const minWeight = marketplace.minWeight;
		const maxWeight = marketplace.maxWeight;

		if (weight < minWeight) {
			return (weight / minWeight) * 15; // Заполнение до минимума
		} else if (weight >= minWeight && weight < maxWeight) {
			const range = maxWeight - minWeight;
			const adjustedWeight = weight - minWeight; // Вычитаем minWeight, чтобы отсчет начался от 0
			return 15 + (adjustedWeight / range) * 70;
		} else {
			const overMaxWeight = weight - maxWeight;
			const maxRange = maxWeight * 0.2; // Диапазон, при котором заполнение идет от 85% до 100%
			return 85 + Math.min((overMaxWeight / maxRange) * 15, 15); // Максимум 100%
		}
	};
	const getWeightColor = (
		marketplace: ITradingFloorProductMarketplace
	) => {
		const weight = marketplace.weight;
		const minWeight = marketplace.minWeight;
		const maxWeight = marketplace.maxWeight;

		if (weight < minWeight) {
			return "bg-error-500"; // Красный цвет
		} else if (weight >= minWeight && weight < maxWeight) {
			return "bg-secondary-color"; // Зеленый цвет
		} else {
			return "bg-primary-color"; // Желтый цвет
		}
	};
</script>

<template>
	<div
		class="flex flex-col items-start w-full h-full border border-gray-40-color bg-gray-15-color rounded-lg mt-7"
	>
		<div
			class="w-full h-[38px] flex items-center justify-between px-3"
		>
			<p class="text-14-semi text-white">
				Остатки по торговым площадкам
			</p>
		</div>
		<div class="w-full mt-5 flex items-end p-3">
			<div class="w-[240px] h-max z-[40]">
				<WarehouseChartDoughnut />
			</div>
			<div
				class="flex-grow flex flex-col items-start w-full h-max border border-gray-40-color rounded-lg"
			>
				<div
					class="w-full h-[38px] bg-gray-15-color flex items-center justify-between px-3 rounded-t-lg"
				>
					<p class="text-14-semi text-white">Московская область</p>
				</div>
				<div class="w-full">
					<div class="w-full z-[40]">
						<table class="w-full text-sm table-fixed">
							<thead class="flex">
								<tr class="w-full flex">
									<th
										scope="col"
										class="flex-grow h-[36px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-x border-gray-15-color"
									>
										<p class="text-12-semi text-white">Товары</p>
									</th>
									<th
										scope="col"
										class="w-[120px] h-[36px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
										v-for="(item, key) in warehouseStore
											.tradingFloorData?.marketplaces"
										:key="item.id"
									>
										<div
											class="w-full flex items-center justify-start gap-1"
										>
											<img
												src="/img/ozon.png"
												class="w-[24px] h-[24px] object-cover rounded-[50%]"
												alt=""
											/>
											<div
												class="flex flex-col items-start justify-center"
											>
												<p class="text-10-semi text-gray-90-color">
													{{ key }}
												</p>
												<p class="text-10-ext text-gray-75-color">
													{{ item.type }}
												</p>
											</div>
										</div>
									</th>
								</tr>
							</thead>
							<tbody
								class="bg-gray-15-color rounded-b-lg flex flex-col"
							>
								<template
									v-for="(product, key, index) in warehouseStore
										.tradingFloorData?.products"
									:key="index"
								>
									<tr
										class="w-full h-6 flex"
										:class="[
											{ 'bg-gray-15-color': index % 2 == 1 },
											{
												'rounded-b-lg':
													index ===
													Object.keys(
														warehouseStore.tradingFloorData?.products
															? warehouseStore.tradingFloorData
																	?.products
															: 0
													).length -
														1,
											},
										]"
									>
										<th
											scope="row"
											class="flex-grow h-full flex items-center justify-start pl-2 border-r border-gray-15-color"
										>
											<p class="text-10-reg text-white">{{ key }}</p>
										</th>
										<th
											scope="row"
											class="w-[120px] h-full flex items-center justify-center border-r border-gray-15-color"
											v-for="(
												marketplace, marketplaceKey
											) in product.marketplaces"
										>
											<div
												class="relative w-[110px] h-[15px] rounded-lg block bg-gray-40-color"
											>
												<!-- Минимум -->
												<div
													class="w-[4px] h-[17px] absolute z-[10] top-[50%] left-[15%] bg-error-500 translate-y-[-50%] rounded-[2px]"
												></div>
												<!-- Максимум -->
												<div
													class="w-[4px] h-[17px] absolute z-[10] top-[50%] right-[15%] bg-malachite translate-y-[-50%] rounded-[2px]"
												></div>
												<!-- Заполненная полоса для веса -->
												<div
													class="absolute left-0 top-0 h-full rounded-l-lg"
													:class="[
														{
															'rounded-r-lg':
																getFilledWidth(marketplace) >= 90,
														},
														getWeightColor(marketplace),
													]"
													:style="{
														width: getFilledWidth(marketplace) + '%',
													}"
												></div>
											</div>
										</th>
									</tr>
								</template>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
