<script lang="ts" setup>
	const citiesOpen = ref(false);
	const allChecked = ref(false);
	const regions = reactive([
		{
			id: 1,
			name: "Московская область",
			checked: false,
			menuOpen: false,
			cities: [
				{
					id: 1,
					regionId: 1,
					checked: false,
					name: "Химки",
				},
				{
					id: 2,
					regionId: 1,
					checked: false,
					name: "Подольск",
				},
				{
					id: 3,
					regionId: 1,
					checked: false,
					name: "Мытищи",
				},
				{
					id: 4,
					regionId: 1,
					checked: false,
					name: "Балашиха",
				},
				{
					id: 5,
					regionId: 1,
					checked: false,
					name: "Красногорск",
				},
			],
		},
		{
			id: 2,
			name: "Ленинградская область",
			checked: false,
			menuOpen: false,
			cities: [
				{
					id: 1,
					regionId: 2,
					checked: false,
					name: "Гатчина",
				},
				{
					id: 2,
					regionId: 2,
					checked: false,
					name: "Выборг",
				},
				{
					id: 3,
					regionId: 2,
					checked: false,
					name: "Кингисепп",
				},
				{
					id: 4,
					regionId: 2,
					checked: false,
					name: "Сосновый Бор",
				},
				{
					id: 5,
					regionId: 2,
					checked: false,
					name: "Тихвин",
				},
			],
		},
		{
			id: 3,
			name: "Свердловская область",
			checked: false,
			menuOpen: false,
			cities: [
				{
					id: 1,
					regionId: 3,
					checked: false,
					name: "Екатеринбург",
				},
				{
					id: 2,
					regionId: 3,
					checked: false,
					name: "Первоуральск",
				},
				{
					id: 3,
					regionId: 3,
					checked: false,
					name: "Нижний Тагил",
				},
				{
					id: 4,
					regionId: 3,
					checked: false,
					name: "Ревда",
				},
				{
					id: 5,
					regionId: 3,
					checked: false,
					name: "Заречный",
				},
			],
		},
		{
			id: 4,
			name: "Ростовская область",
			checked: false,
			menuOpen: false,
			cities: [
				{
					id: 1,
					regionId: 4,
					checked: false,
					name: "Ростов-на-Дону",
				},
				{
					id: 2,
					regionId: 4,
					checked: false,
					name: "Зверево",
				},
				{
					id: 3,
					regionId: 4,
					checked: false,
					name: "Гуково",
				},
				{
					id: 4,
					regionId: 4,
					checked: false,
					name: "Аксай",
				},
				{
					id: 5,
					regionId: 4,
					checked: false,
					name: "Сальск",
				},
			],
		},
	]);

	const handleCitiesMenuOpen = (region: {
		id: number;
		name: string;
		checked: boolean;
		menuOpen: boolean;
		cities: any;
	}) => {
		region.menuOpen = !region.menuOpen;
	};

	const handleAllRegionChecked = () => {
		regions.forEach((region) => {
			if (region.checked) {
				region.menuOpen = true;
				region.cities.forEach((city) => {
					city.checked = true;
				});
			} else {
				region.cities.forEach((city) => {
					city.checked = false;
				});
			}
		});
	};

	const handleClickAllChecked = () => {
		regions.forEach((region) => {
			if (region.checked) {
				region.checked = false;
				setTimeout(() => {
					region.menuOpen = false;
				}, 1000);
			} else {
				region.checked = true;
				region.menuOpen = true;
			}

			region.cities.forEach((city) => {
				if (city.checked) {
					city.checked = false;
				} else {
					city.checked = true;
				}

				if (region.checked && city.checked) {
					allChecked.value = true;
				} else {
					allChecked.value = false;
				}
			});
		});
	};

	watchEffect(() => {
		regions.forEach((region) => {
			let checkedLength = 0;
			region.cities.forEach((city) => {
				if (city.checked) {
					checkedLength += 1;
				}
			});
			if (checkedLength == region.cities.length) {
				region.checked = true;
			} else {
				region.checked = false;
			}
		});
	});
</script>

<template>
	<div
		class="w-full min-w-[260px] h-[100%] bg-gray-15-color border-r border-gray-15-color rounded-bl-lg"
	>
		<div
			class="w-full h-[36px] flex items-center justify-start text-white border-b border-gray-15-color px-2 gap-2"
		>
			<IconFilterFunnel01 />
			<p class="text-12-semi">Фильтры</p>
		</div>
		<div class="flex items-center justify-between px-2 mt-3">
			<p class="text-12-reg text-white">Города</p>
			<p
				class="text-14-semi cursor-pointer"
				@click="handleClickAllChecked()"
			>
				<span
					class="text-green-500/45"
					v-if="!allChecked"
					>Выбрать все</span
				>
				<span
					class="text-gray-40-color"
					v-else
					>Отменить все</span
				>
			</p>
		</div>
		<div class="flex flex-col gap-3 px-2 mt-3 mb-3">
			<div
				class=""
				v-for="region in regions"
				:key="region.id"
			>
				<div
					class="flex items-center justify-between text-white cursor-pointer mb-3"
					@click="handleCitiesMenuOpen(region)"
				>
					<div class="flex items-center justify-start gap-2">
						<UiCheckbox
							v-model="region.checked"
							@click.stop="handleAllRegionChecked()"
						/>
						<p class="text-14-med">{{ region.name }}</p>
					</div>
					<IconChevronUp />
				</div>
				<TransitionGroup name="city">
					<template
						v-for="city in region.cities"
						:key="city.id"
					>
						<div
							class="pl-6 mb-1"
							v-if="region.menuOpen"
						>
							<div
								class="flex items-center justify-start gap-2 text-white cursor-pointer"
							>
								<UiCheckbox v-model="city.checked" />
								<p class="text-12-med">{{ city.name }}</p>
							</div>
						</div>
					</template>
				</TransitionGroup>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.city-enter-active,
	.city-leave-active {
		transition: opacity 0.5s linear;
	}

	.city-enter-from,
	.city-leave-to {
		opacity: 0;
	}
</style>
