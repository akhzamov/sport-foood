<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { getSalesPlan } from "~/modules/profile/components/Header/profileHeader.data";
	import { getMarketplacesData } from "~/modules/profile/components/Analysis/Modules/Rating/MarketplacesData";

	const profileStore = useProfileStore();
	const headerSelect = ref<HTMLElement | null>(null);
	const route = useRoute();
	const showSelectMenu = computed(
		() => profileStore.activeStoresSelect
	);

	const tabs = reactive([
		{
			id: 1,
			title: "Дашборд",
			icon: "IconPieDash",
			path: "/profile-dashboard",
		},
		{
			id: 2,
			title: "Отчеты",
			icon: "IconBarLine",
			path: "/profile-report",
		},
		{
			id: 3,
			title: "Статистика продаж",
			icon: "IconBarChart",
			path: "",
		},
		{ id: 4, title: "Логистика", icon: "IconRoute", path: "" },
		{ id: 5, title: "Реклама", icon: "IconTrendUp", path: "" },
	]);

	const handleClickOutsideSelect = (event: MouseEvent) => {
		if (
			showSelectMenu.value &&
			headerSelect.value &&
			!headerSelect.value.contains(event.target as Node)
		) {
			profileStore.activeStoresSelect = false;
		}
	};

	const handleGetStoreByID = (id: number) => {
		getSalesPlan();
		getMarketplacesData();
		profileStore.activeMoreInfo = false;
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutsideSelect);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutsideSelect);
	});
</script>

<template>
	<div
		class="w-full h-[338px] relative flex items-end justify-center z-[80]"
	>
		<div
			class="absolute top-0 left-0 w-full h-full bg-dark-charcoal-color z-[-1]"
		>
			<div
				class="block w-full h-[280px] bg-profile-header-bg-liner absolute"
			></div>
			<img
				src="~/assets/img/background.webp"
				alt="profile-header-bg"
				class="w-full h-[280px] object-cover object-center"
			/>
		</div>
		<div class="container-custom z-[20] px-8 h-[136px] flex gap-6">
			<div
				class="w-[120px] h-[120px] flex items-center justify-center overflow-hidden rounded-[50%] border-[3px] bg-white"
			>
				<IconUser
					class="w-[42px] h-[48px] text-dark-charcoal-color"
				/>
			</div>
			<div class="flex flex-col justify-between flex-grow">
				<div class="flex justify-between">
					<div>
						<span
							class="bg-gray-15-color rounded-[20px] px-3 py-1 text-16-med text-gray-90-color"
						>
							id: #317487
						</span>
						<p class="text-32-semi text-gray-90-color">
							Валерий Альбертович Жмышенко
						</p>
					</div>
					<div
						class="w-max h-max"
						ref="headerSelect"
					>
						<UiSelect
							:array="profileStore.stores"
							:showMenu="showSelectMenu"
							v-model="profileStore.selectedBranch"
							defaultSelectText=""
							main-text-color="text-gray-90-color"
							select-bg-color="bg-gray-15-color"
							@click:selectItem="handleGetStoreByID($event)"
							@update:showMenu="
								profileStore.activeStoresSelect = $event
							"
							class="z-[80]"
						>
							<template v-slot:icon>
								<IconBranch class="text-gray-90-color" />
							</template>
						</UiSelect>
					</div>
				</div>
				<div class="flex gap-8">
					<template
						v-for="tab in tabs"
						:key="tab.id"
					>
						<NuxtLink
							class="px-5 pt-5 rounded-lg cursor-pointer flex flex-col after:w-full after:h-[2px] after:rounded-t-[4px] after:bg-primary-color text-gray-75-color hover:text-primary-color"
							:class="
								route.fullPath == tab.path
									? 'after:block'
									: 'after:hidden'
							"
							:to="tab.path"
						>
							<div
								class="flex items-center justify-center pb-4 gap-2"
							>
								<IconPieDash
									class=""
									v-if="tab.icon == 'IconPieDash'"
								/>
								<IconBarChart
									class=""
									v-if="tab.icon == 'IconBarChart'"
								/>
								<IconBarLine
									class=""
									v-if="tab.icon == 'IconBarLine'"
								/>
								<IconRoute
									class=""
									v-if="tab.icon == 'IconRoute'"
								/>
								<IconTrendUp
									class=""
									v-if="tab.icon == 'IconTrendUp'"
								/>
								<span class="text-16-med">{{ tab.title }}</span>
							</div>
						</NuxtLink>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
