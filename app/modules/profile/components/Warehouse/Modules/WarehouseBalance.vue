<script lang="ts" setup>
	import { warehouseBalance } from "~/modules/profile/components/Warehouse/Modules/warehouseBalance.data";
	import type { IWarehouseBalanceCitiesProducts } from "~/modules/profile/types/warehouseBalance.type";

	const getFilledWidth = (
		product: IWarehouseBalanceCitiesProducts
	) => {
		const weight = product.weight; // Предполагаем, что weight - это текущее значение
		const minWeight = product.minWeight;
		const maxWeight = product.maxWeight;

		if (weight < minWeight) {
			return (weight / minWeight) * 15; // Заполнение до минимума
		} else if (weight >= minWeight && weight < maxWeight) {
			return (weight / maxWeight) * 50;
		} else {
			return (weight / maxWeight) * 80; // Полное заполнение
		}
	};
	const getWeightColor = (
		product: IWarehouseBalanceCitiesProducts
	) => {
		const weight = product.weight;
		const minWeight = product.minWeight;
		const maxWeight = product.maxWeight;

		if (weight < minWeight) {
			return "bg-error-500"; // Красный цвет
		} else if (weight >= minWeight && weight < maxWeight) {
			return "bg-secondary-color"; // Зеленый цвет
		} else {
			return "bg-primary-color"; // Желтый цвет
		}
	};
	const getLeftPosition = (
		product: IWarehouseBalanceCitiesProducts
	) => {
		const { minWeight, maxWeight, weight } = product;

		if (weight < minWeight) {
			// Если вес меньше минимума, позиция будет перед линией минимума
			return 0; // Начинается с нуля
		} else if (weight >= minWeight && weight <= maxWeight) {
			// Если вес между минимумом и максимумом
			return 15; // Позиция, где начинается линия минимума
		} else {
			// Если вес больше максимума, позиция будет там, где заканчивается линия минимума
			return 15; // Позиция, где начинается линия минимума
		}
	};
</script>

<template>
	<div class="flex flex-col items-start w-full h-full">
		<div
			class="w-full h-[38px] bg-gray-15-color flex items-center justify-between px-3 rounded-t-lg"
		>
			<p class="text-14-semi text-white">Остатки по складам</p>
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
								<p class="text-12-semi text-white">Города</p>
							</th>
							<th
								scope="col"
								class="w-[84px] h-[36px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
								v-for="(item, key) in warehouseBalance.products"
								:key="item.id"
							>
								<p class="text-8-reg text-white">{{ key }}</p>
							</th>
						</tr>
					</thead>
					<tbody class="bg-gray-15-color rounded-b-lg flex flex-col">
						<template
							v-for="(city, key, index) in warehouseBalance.cities"
							:key="index"
						>
							<tr
								class="w-full h-7 flex"
								:class="[
									{ 'bg-gray-15-color': index % 2 == 1 },
									{
										'rounded-b-lg':
											index ===
											Object.keys(warehouseBalance.cities).length - 1,
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
									class="w-[84px] h-full flex items-center justify-center border-r border-gray-15-color"
									v-for="(product, productKey) in city.products"
								>
									<div
										class="relative w-[70px] h-[15px] rounded-lg block bg-gray-40-color"
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
														getFilledWidth(product) >= 100,
												},
												getWeightColor(product),
											]"
											:style="{
												width: getFilledWidth(product) + '%',
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
</template>

<style scoped></style>
