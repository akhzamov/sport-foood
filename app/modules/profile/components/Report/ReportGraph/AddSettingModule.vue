<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import { reportData } from "./graph.data";

	const profileStore = useProfileStore();
	const datepicker = ref<any>(null);
	const checkToday = ref(false);
	const checkPeriod = ref(false);
	const date = ref();
	const selectedStatus = ref("worked");
	const statuses = reactive([
		{
			id: "worked-1",
			label: "Присутствует",
			value: "worked",
			name: "status",
			bg: "bg-green-400/25",
		},
		{
			id: "absent-1",
			label: "Отсутствует",
			value: "absent",
			name: "status",
			bg: "bg-red-500/25",
		},
		{
			id: "sick_leave-1",
			label: "Больничный",
			value: "sick_leave",
			name: "status",
			bg: "bg-gray-15-color",
		},
		{
			id: "vocation-1",
			label: "Отпуск",
			value: "vocation",
			name: "status",
			bg: "bg-gray-40-color",
		},
	]);
	const userReplace = ref(false);
	const selectedUserID = ref(0);

	const handleCheckToday = () => {
		checkPeriod.value = false;
		checkToday.value = !checkToday.value;
	};

	const handleCheckPeriod = () => {
		checkToday.value = false;
		checkPeriod.value = !checkPeriod.value;

		if (checkPeriod.value) {
			datepicker.value?.openMenu();
		} else {
			datepicker.value?.clearValue();
		}
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		let weekday = date.toLocaleString("ru-RU", { weekday: "short" });
		weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);
		let day = date.toLocaleString("ru-RU", { day: "numeric" });
		let month = date.toLocaleString("ru-RU", { month: "short" });
		let year = date.toLocaleString("ru-RU", { year: "numeric" });
		return `${weekday} ${day} ${month} ${year}`;
	};

	const closeModal = () => {
		profileStore.reportGraphAddSettingModal = false;
	};

	watch(
		() => userReplace.value,
		() => {
			if (!userReplace.value) {
				selectedUserID.value = 0;
			}
		}
	);
</script>

<template>
	<div
		class="fixed z-[300] top-0 lef-0 w-full h-screen bg-gray-15-color backdrop-blur-[10px] flex items-center justify-center overflow-y-auto"
		@click="closeModal"
	>
		<div
			class="w-[440px] h-max bg-dark-gunmental-color border border-gray-15-color rounded-lg p-3"
			@click.stop
		>
			<!-- User Info -->
			<div class="flex items-start justify-between">
				<div class="flex items-center justify-start gap-2">
					<img
						src="/img/person.jpeg"
						class="w-12 h-12 rounded-[50%] object-cover"
					/>
					<div class="flex flex-col items-start justify-center">
						<span class="text-14-semi text-gray-90-color">
							Валерий Альбертович
						</span>
						<span class="text-14-reg text-gray-90-color">
							Администратор
						</span>
					</div>
				</div>
				<IconClose
					class="text-gray-90-color cursor-pointer"
					@click="closeModal"
				/>
			</div>
			<!-- Check Day or Period -->
			<div class="flex flex-col gap-1 mt-3">
				<div
					@click="handleCheckToday"
					class="w-full h-[34px] rounded-lg flex items-center justify-start gap-2 px-2 cursor-pointer"
					:class="{
						'bg-gray-15-color': !checkToday,
						'bg-gray-40-color': checkToday,
					}"
				>
					<UiCheckbox
						v-model="checkToday"
						@click="handleCheckToday"
					/>
					<p class="text-14-reg text-gray-90-color">
						Сегодня <span>{{ formatDate(new Date().toDateString()) }}</span>
					</p>
				</div>
				<div
					@click="handleCheckPeriod"
					class="w-full h-[34px] rounded-lg flex items-center justify-start gap-2 px-2 cursor-pointer"
					:class="{
						'bg-gray-15-color': !checkPeriod,
						'bg-gray-40-color': checkPeriod,
					}"
				>
					<UiCheckbox
						v-model="checkPeriod"
						@click="handleCheckPeriod"
					/>
					<p class="text-14-reg text-gray-90-color">
						{{
							date
								? `${formatDate(date[0])} - ${formatDate(date[1])}`
								: "Выбрать период"
						}}
					</p>
				</div>
				<DatePicker
					v-model="date"
					ref="datepicker"
					cancelText="Отмена"
					selectText="Сохранить"
					locale="ru"
					:dark="true"
					range
				/>
			</div>
			<!-- Radio User Status -->
			<div class="flex items-center justify-between mt-3">
				<template
					v-for="status in statuses"
					:key="status.id"
				>
					<label
						:for="status.id"
						class="flex flex-col gap-1 items-start justify-start w-[100px] h-max rounded-lg p-1 border-2 border-gray-15-color"
					>
						<UiRadio
							:id="status.id"
							:name="status.name"
							:value="status.value"
							v-model="selectedStatus"
						/>
						<p class="text-12-reg text-gray-90-color">
							{{ status.label }}
						</p>
						<div
							class="block w-full h-4 rounded-[4px]"
							:class="[status.bg]"
						></div>
					</label>
				</template>
			</div>
			<!-- User Replaced -->
			<div
				class="flex items-center justify-start mt-3 gap-3"
				v-if="selectedStatus != 'worked'"
			>
				<UiCheckbox v-model="userReplace" />
				<UiUserSelect
					:users="reportData.employees"
					:showMenu="
						userReplace
							? profileStore.reportGraphAddSettingSelectUser
							: false
					"
					defaultSelectText=""
					v-model="selectedUserID"
					selectBgColor="bg-gray-15-color"
					:mainTextColor="
						userReplace ? 'text-gray-90-color' : 'text-gray-15-color'
					"
					:class="
						userReplace ? 'cursor-pointer' : 'cursor-not-allowed'
					"
					@update:showMenu="
						profileStore.reportGraphAddSettingSelectUser = $event
					"
				>
					<template v-slot:icon>
						<IconShuffle01
							:class="
								userReplace
									? 'text-gray-90-color'
									: 'text-gray-15-color'
							"
						/>
					</template>
				</UiUserSelect>
			</div>
			<!-- Action Buttons -->
			<div class="flex items-center justify-end gap-2 mt-5">
				<UiButton
					text="Сохранить"
					bgColor="bg-primary-color"
					textColor="text-dark-night-color"
					:border="false"
					hover="hover:opacity-[0.8]"
					:icon="false"
					class="w-[110px]"
					@click="closeModal"
				/>
				<UiButton
					text="Отменить"
					bgColor="bg-gray-15-color"
					textColor="text-gray-90-color"
					:border="true"
					borderColor="border-gray-90-color"
					hover="hover:bg-gray-40-color"
					:icon="false"
					class="w-[90px]"
					@click="closeModal"
				/>
			</div>
		</div>
	</div>
</template>

<style></style>
