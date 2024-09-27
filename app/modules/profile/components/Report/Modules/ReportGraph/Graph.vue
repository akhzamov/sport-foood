<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { reportData } from "~/modules/profile/components/Report/Modules/ReportGraph/graph.data";

	const profileStore = useProfileStore();
	const reportGraphSelect = ref<HTMLElement | null>(null);
	const selectedMonth = ref(0);
	const showSelectMenu = computed(
		() => profileStore.reportGraphStoreSelect
	);
	const months = reactive([
		{ id: 1, name: "Январь 2024" },
		{ id: 2, name: "Февраль 2024" },
		{ id: 3, name: "Март 2024" },
		{ id: 4, name: "Апрель 2024" },
		{ id: 5, name: "Май 2024" },
		{ id: 6, name: "Июнь 2024" },
		{ id: 7, name: "Июль 2024" },
		{ id: 8, name: "Август 2024" },
		{ id: 9, name: "Сентябрь 2024" },
		{ id: 10, name: "Октябрь 2024" },
		{ id: 11, name: "Ноябрь 2024" },
		{ id: 12, name: "Декабрь 2024" },
	]);

	const handleClickOutsideSelect = (event: MouseEvent) => {
		if (
			showSelectMenu.value &&
			reportGraphSelect.value &&
			!reportGraphSelect.value.contains(event.target as Node)
		) {
			profileStore.reportGraphStoreSelect = false;
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
	<div class="w-full h-max">
		<!-- graph top -->
		<div
			class="flex items-center justify-between p-2 rounded-t-lg bg-dark-gunmental-color"
		>
			<h4 class="text-16-semi text-gray-90-color">
				Отчет по посещаемости за месяц
			</h4>
			<div ref="reportGraphSelect">
				<UiSelect
					:array="months"
					:show-menu="showSelectMenu"
					v-model="selectedMonth"
					default-select-text=""
					select-bg-color="bg-gray-15-color"
					main-text-color="text-gray-90-color"
					@update:showMenu="
						profileStore.reportGraphStoreSelect = $event
					"
				>
					<template v-slot:icon>
						<IconCalendar class="text-gray-90-color" />
					</template>
				</UiSelect>
			</div>
		</div>
		<!-- graph body -->
		<div class="w-full">
			<div class="relative w-full">
				<table
					class="w-full text-sm text-left rtl:text-right text-gray-90-color table-fixed"
				>
					<thead class="text-xs">
						<tr class="w-full">
							<th
								scope="col"
								class="w-[224px] h-[48px] px-6 py-3 bg-dark-gunmental-color text-gray-40-color text-center"
							>
								Имена и роли
							</th>
							<th
								v-for="(key, index) in Object.keys(reportData.days)"
								:key="index"
								scope="col"
								class="w-[32px] bg-dark-gunmental-color text-gray-40-color text-center"
							>
								<div class="w-[32px] flex flex-col justify-between">
									<span>
										{{
											new Date(
												key.split(".").reverse().join("-")
											).toLocaleString("ru-RU", {
												month: "short",
											})
										}}
									</span>
									<span>
										{{
											new Date(
												key.split(".").reverse().join("-")
											).toLocaleString("ru-RU", {
												day: "numeric",
											})
										}}
									</span>
									<span>
										{{
											new Date(
												key.split(".").reverse().join("-")
											).toLocaleString("ru-RU", {
												weekday: "short",
											})
										}}
									</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						<template
							v-for="(person, key) in reportData.employees"
							:key="index"
						>
							<tr class="">
								<th
									scope="row"
									style="width: 224px; height: 48px"
								>
									<div
										class="w-full h-full flex items-center justify-start gap-2 text-12-semi"
									>
										<span
											class="text-12-semi text-gray-40-color mr-2"
										>
											{{ key }}
										</span>
										<img
											src="/img/person.jpeg"
											class="w-9 h-9 rounded-[50%]"
										/>
										<div
											class="flex flex-col items-start justify-center"
										>
											<span class="text-12-semi text-gray-90-color">
												{{ person.name }}
												{{ person.lastName }}
											</span>
											<span class="text-12-reg text-gray-90-color">
												{{ person.department }}
											</span>
										</div>
									</div>
								</th>
								<template> </template>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
