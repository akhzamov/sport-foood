<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { reportData } from "~/modules/profile/components/Report/Modules/ReportGraph/graph.data";

	const profileStore = useProfileStore();
	const reportGraphSelect = ref<HTMLElement | null>(null);
	const reportStatusModal = ref<HTMLElement[]>([]);
	const reportStatusDistances = ref<number[]>([]);
	const selectedMonth = ref(0);
	const employeeID = ref(0);
	const employeeDay = ref("");
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

	const formatDate = (personKey: string) => {
		const date = new Date(personKey.split(".").reverse().join("-"));
		let weekday = date.toLocaleString("ru-RU", { weekday: "short" });
		weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
		let day = date.toLocaleString("ru-RU", { day: "numeric" });
		let month = date.toLocaleString("ru-RU", { month: "short" });
		let year = date.toLocaleString("ru-RU", { year: "numeric" });
		return `${weekday} ${day} ${month} ${year}`;
	};

	const checkLeftPosition = async () => {
		await nextTick();
		if (reportStatusModal.value) {
			reportStatusModal.value.forEach((modal, index) => {
				const modalRect = modal?.getBoundingClientRect();

				if (modalRect) {
					const windowWidth = window.innerWidth;
					const distanceToRightEdge = windowWidth - modalRect.right;

					// Сохраняем расстояние для каждого модального окна
					reportStatusDistances.value[index] = distanceToRightEdge;
				}
			});

			// Обнуление ref после работы с элементами
			reportStatusModal.value = [];
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
	<div class="w-full h-max relative">
		<!-- graph top -->
		<div
			class="flex items-center justify-between p-2 rounded-t-lg bg-dark-gunmental-color border-b border-gray-40-color"
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
					class="z-[100]"
				>
					<template v-slot:icon>
						<IconCalendar class="text-gray-90-color" />
					</template>
				</UiSelect>
			</div>
		</div>
		<!-- graph body -->
		<div class="w-full">
			<div class="w-full z-[40]">
				<table
					class="w-full text-sm text-left rtl:text-right text-gray-90-color table-fixed"
				>
					<thead class="text-xs">
						<!-- graph body top -->
						<tr class="w-full">
							<th
								scope="col"
								class="flex-grow h-[48px] px-6 py-3 bg-dark-charcoal-color text-gray-40-color text-center border-b border-r border-gray-15-color"
							>
								Имена и роли
							</th>
							<th
								v-for="(key, index) in Object.keys(reportData.days)"
								:key="index"
								scope="col"
								class="w-[30px] bg-dark-charcoal-color text-gray-40-color text-center border-b border-r border-gray-15-color px-[1px]"
							>
								<div
									class="w-[28px] h-full flex flex-col justify-between bg-dark-gunmental-color rounded-md py-1"
								>
									<span class="text-8-med text-gray-40-color">
										{{
											new Date(
												key.split(".").reverse().join("-")
											).toLocaleString("ru-RU", {
												month: "2-digit",
											})
										}}
									</span>
									<span class="text-10-med text-gray-90-color">
										{{
											new Date(
												key.split(".").reverse().join("-")
											).toLocaleString("ru-RU", {
												day: "numeric",
											})
										}}
									</span>
									<span class="text-8-med text-gray-40-color">
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
						<!-- graph body data -->
						<template
							v-for="(person, key) in reportData.employees"
							:key="key"
						>
							<tr class="w-full bg-dark-charcoal-color">
								<!-- graph body employee names -->
								<th
									scope="row"
									class="flex-grow h-[30px] border-b border-r border-l border-gray-15-color"
								>
									<div
										class="flex-grow h-[30px] flex items-center justify-between px-1 text-12-semi"
									>
										<div
											class="flex items-center justify-start gap-2"
										>
											<span
												class="text-12-semi text-gray-40-color mr-2"
											>
												{{ key }}
											</span>
											<img
												src="/img/person.jpeg"
												class="w-8 h-8 rounded-[50%] object-cover"
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
										<div
											class="flex items-center justify-self-end gap-2 bg-gray-15-color rounded-md p-[2px]"
										>
											<IconCalendarCheck02
												class="text-gray-40-color"
											/>
											<div
												class="flex items-center justify-center gap-1 rounded bg-dark-charcoal-color border border-gray-40-color p-[2px]"
											>
												<span class="text-10-reg text-gray-90-color">
													{{ person.totalWorkDays }}
												</span>
												<span class="text-8-reg text-gray-40-color"
													>/</span
												>
												<span class="text-8-reg text-gray-40-color">
													{{ Object.keys(person.days).length }}
												</span>
											</div>
										</div>
									</div>
								</th>
								<!-- graph body day statuses -->
								<template
									v-for="(
										attendance, personKey, index
									) in person.days"
								>
									<td
										class="relative w-[30px] h-[30px] border-b border-r border-gray-25-color cursor-pointer px-[1px]"
										@click="
											profileStore.reportGraphAddSettingModal = true
										"
										@mouseenter="
											{
												(employeeDay = personKey),
													(employeeID = key),
													checkLeftPosition();
											}
										"
										@mouseleave="
											{
												(employeeDay = ''),
													(employeeID = 0),
													(reportStatusDistances = []);
											}
										"
									>
										<div
											v-if="
												attendance.status != 'vocation' &&
												attendance.status != 'sick_leave' &&
												attendance.status != 'absent'
											"
											class="w-[28px] h-[28px] flex items-center justify-center text-gray-40-color rounded text-10-med"
											:class="{
												'bg-success-500-20':
													attendance.status == 'worked',
												'bg-dark-eerie-black-color':
													attendance.status == 'weekend',
												'border border-gray-90-color':
													employeeDay == personKey &&
													employeeID == key &&
													attendance.status != 'weekend',
											}"
										>
											<span v-if="attendance.status == 'weekend'">
												ВХ
											</span>
											<span v-if="attendance.status == 'worked'">
												ПР
											</span>
										</div>
										<div
											v-if="
												attendance.status != 'worked' &&
												attendance.status != 'weekend'
											"
											class="w-[28px] h-[28px] flex flex-col gap-[1px] items-center justify-center text-10-med"
										>
											<div
												class="w-full h-full flex flex-col gap-[2px]"
												v-if="attendance.status == 'vocation'"
											>
												<span
													v-if="attendance.replaced_id"
													class="w-full h-[13.5px] flex items-center justify-center bg-gray-40-color rounded-t-[4px] rounded-b-[2px] text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ОП
												</span>
												<span
													v-if="attendance.replaced_id"
													class="w-full h-[13.5px] flex items-center justify-center bg-yellow-500 rounded-t-[2px] rounded-b-[4px] text-gray-90-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ЗМ
												</span>
												<span
													v-if="!attendance.replaced_id"
													class="w-full h-full flex items-center justify-center bg-gray-40-color rounded text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ОП
												</span>
											</div>
											<div
												class="w-full h-full flex flex-col gap-[2px]"
												v-if="attendance.status == 'sick_leave'"
											>
												<span
													v-if="
														attendance.status == 'sick_leave' &&
														attendance.replaced_id
													"
													class="w-full h-[13.5px] flex items-center justify-center bg-gray-15-color rounded-t-[4px] rounded-b-[2px] text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													БЛ
												</span>
												<span
													v-if="
														attendance.status == 'sick_leave' &&
														attendance.replaced_id
													"
													class="w-full h-[13.5px] flex items-center justify-center bg-yellow-500 rounded-t-[2px] rounded-b-[4px] text-gray-90-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ЗМ
												</span>
												<span
													v-if="!attendance.replaced_id"
													class="w-full h-full flex items-center justify-center bg-gray-15-color rounded text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													БЛ
												</span>
											</div>
											<div
												class="w-full h-full flex flex-col gap-[2px]"
												v-if="attendance.status == 'absent'"
											>
												<span
													v-if="
														attendance.status == 'absent' &&
														attendance.replaced_id
													"
													class="w-full h-[13.5px] flex items-center justify-center bg-error-500-20 rounded-t-[4px] rounded-b-[2px] text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ОТ
												</span>
												<span
													v-if="
														attendance.status == 'absent' &&
														attendance.replaced_id
													"
													class="w-full h-[13.5px] flex items-center justify-center bg-yellow-500 rounded-t-[2px] rounded-b-[4px] text-gray-90-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ЗМ
												</span>
												<span
													v-if="!attendance.replaced_id"
													class="w-full h-full flex items-center justify-center bg-error-500-20 rounded text-gray-40-color"
													:class="{
														'border border-gray-90-color':
															employeeDay == personKey &&
															employeeID == key,
													}"
												>
													ОТ
												</span>
											</div>
										</div>
										<!-- graph body day statuses hover info -->
										<template
											v-if="
												employeeDay == personKey &&
												employeeID == key &&
												attendance.status != 'weekend'
											"
										>
											<div
												ref="reportStatusModal"
												class="absolute top-0 w-[280px] h-max translate-y-[20px] z-[30] bg-dark-gunmental-color p-3 rounded-lg border border-gray-15-color"
												:class="{
													'left-[100%] translate-x-[20px]':
														reportStatusDistances[0] &&
														reportStatusDistances[0] >= 40,
													'right-[100%] translate-x-[-20px]':
														reportStatusDistances[0] &&
														reportStatusDistances[0] <= 40,
												}"
											>
												<div class="flex items-start justify-between">
													<div
														class="flex items-center justify-start gap-2"
													>
														<img
															src="/img/person.jpeg"
															class="w-9 h-9 rounded-[50%] object-cover"
														/>
														<div
															class="flex flex-col items-start justify-center"
														>
															<span
																class="text-12-semi text-gray-90-color"
															>
																{{ person.name }}
																{{ person.lastName }}
															</span>
															<span
																class="text-12-ext text-gray-90-color"
															>
																{{ person.department }}
															</span>
														</div>
													</div>
													<span class="text-10-ext text-success-500">
														{{ formatDate(personKey) }}
													</span>
												</div>
												<div
													class="flex flex-col items-start justify-center mt-2"
												>
													<div
														class="flex items-center justify-center gap-2"
													>
														<div
															class="w-[20px] h-[20px] block rounded"
															:class="{
																'bg-success-500-20':
																	attendance.status == 'worked',
																'bg-error-500-20':
																	attendance.status == 'absent',
																'bg-gray-15-color':
																	attendance.status == 'sick_leave',
																'bg-gray-40-color':
																	attendance.status == 'vocation',
															}"
														></div>
														<span
															v-if="attendance.status == 'worked'"
															class="text-12-med text-gray-90-color"
															>На работе</span
														>
														<span
															v-if="attendance.status == 'absent'"
															class="text-12-med text-gray-90-color"
															>Отсутствует</span
														>
														<span
															v-if="attendance.status == 'sick_leave'"
															class="text-12-med text-gray-90-color"
															>Больничный</span
														>
														<span
															v-if="attendance.status == 'vocation'"
															class="text-12-med text-gray-90-color"
															>В Отпуске</span
														>
													</div>
													<div
														class="flex items-center justify-center gap-2 mt-2"
														v-if="attendance.replaced_id"
													>
														<div
															class="w-[20px] h-[20px] block bg-yellow-400 rounded"
														></div>
														<span
															class="text-12-med text-gray-90-color"
														>
															Заменяет
														</span>
														<IconShuffle01
															class="w-3 h-3 text-gray-75-color"
														/>
														<span
															class="text-12-med text-gray-40-color underline"
														>
															{{ attendance.replaced_name }}

															{{ attendance.replaced_lastName }}
														</span>
													</div>
												</div>
											</div>
										</template>
									</td>
								</template>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
