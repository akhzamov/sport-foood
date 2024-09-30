<script lang="ts" setup>
	const datepicker = ref<any>(null);
	const checkToday = ref(false);
	const checkPeriod = ref(false);
	const date = ref();

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
</script>

<template>
	<div
		class="fixed z-[300] top-0 lef-0 w-full h-screen bg-gray-15-color backdrop-blur-[10px] flex items-center justify-center"
	>
		<div
			class="w-[440px] h-max bg-dark-gunmental-color border border-gray-15-color rounded-lg p-3"
		>
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
				<IconClose class="text-gray-90-color cursor-pointer" />
			</div>
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
						Сегодня <span>Сб 07 сен. 2024</span>
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
		</div>
	</div>
</template>

<style></style>
