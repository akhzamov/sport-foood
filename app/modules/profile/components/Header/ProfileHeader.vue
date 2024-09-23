<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";

	const profileStore = useProfileStore();
	const stores = computed(() => profileStore.stores);
	const headerSelect = ref<HTMLElement | null>(null);
	const showSelectMenu = computed(
		() => profileStore.activeStoresSelect
	);

	const tabs = reactive([
		{ id: 1, title: "Дашборд", icon: "IconPieDash", active: true },
		{
			id: 2,
			title: "Статистика продаж",
			icon: "IconBarChart",
			active: false,
		},
		{ id: 3, title: "Отчеты", icon: "IconBarLine", active: false },
		{ id: 4, title: "Логистика", icon: "IconRoute", active: false },
		{ id: 5, title: "Реклама", icon: "IconTrendUp", active: false },
	]);

	const activeTab = (id: number) => {
		tabs.forEach((item) => {
			item.active = false;
			if (item.id == id) {
				item.active = true;
				profileStore.activeTab = id;
			}
		});
	};

	const handleClickOutsideSelect = (event: MouseEvent) => {
		if (
			showSelectMenu.value &&
			headerSelect.value &&
			!headerSelect.value.contains(event.target as Node)
		) {
			profileStore.activeStoresSelect = false;
		}
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
		class="w-full h-[338px] relative flex items-end justify-center"
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
							:mainTextColor="'text-gray-90-color'"
							:textColor="'text-dark-night-color'"
							:textHoverColor="'text-white'"
							:selectBgColor="'bg-gray-15-color'"
							:menuBgColor="'bg-primary-color'"
							:array="stores"
							v-model="profileStore.selectedBranch"
							:showMenu="showSelectMenu"
							@update:showMenu="
								profileStore.activeStoresSelect = $event
							"
						/>
					</div>
				</div>
				<div class="flex gap-8">
					<div
						class="px-5 pt-5 rounded-lg cursor-pointer flex flex-col after:w-full after:h-[2px] after:rounded-t-[4px] after:bg-primary-color text-gray-75-color hover:text-primary-color"
						v-for="tab in tabs"
						:key="tab.id"
						:class="tab.active ? 'after:block' : 'after:hidden'"
						@click="activeTab(tab.id)"
					>
						<div class="flex items-center justify-center pb-4 gap-2">
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
