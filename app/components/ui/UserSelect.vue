<script lang="ts" setup>
	import type { reportDataEmployees } from "~/modules/profile/components/Report/Modules/ReportGraph/graph.data";

	const props = defineProps({
		mainTextColor: {
			type: String,
			default: "text-gray-90-color",
		},
		selectBgColor: {
			type: String,
			default: "bg-gray-90-color",
		},
		users: {
			type: Array as PropType<Record<
				number,
				reportDataEmployees
			> | null>,
			default: () => [],
		},
		showMenu: {
			type: Boolean,
			required: true,
		},
		defaultSelectText: {
			type: String,
			default: "",
			required: true,
		},
		modelValue: {
			type: Number,
			required: true,
		},
	});

	const emit = defineEmits([
		"update:modelValue",
		"update:showMenu",
		"click:selectItem",
	]);
	const selectedItemId = ref(props.modelValue);
	const selectedItemName = ref(props.defaultSelectText);

	const activeMenu = (): any => {
		if (props.showMenu) {
			emit("update:showMenu", false);
		} else {
			emit("update:showMenu", true);
		}
	};

	const selectItem = (id: number) => {
		if (props.users) {
			const selectedItem = props.users[id];
			if (selectedItem) {
				selectedItemId.value = id;
				selectedItemName.value = `${selectedItem.name} ${selectedItem.lastName}`;
				emit("update:modelValue", id);
				emit("click:selectItem", id);
			}
		}
	};

	const setDefaultItem = () => {
		if (props.modelValue == 0) {
			selectedItemName.value = "Выбрать замену";
		}
	};

	// Проверяем и устанавливаем текст по умолчанию
	const checkDefaultText = () => {
		if (props.defaultSelectText) {
			selectedItemName.value = props.defaultSelectText;
		} else {
			setDefaultItem();
		}
	};

	watchEffect(() => {
		if (props.users) {
			checkDefaultText();
		}
	});
</script>

<template>
	<div class="w-max relative">
		<div
			class=" w-full rounded-lg flex items-center justify-between gap-1 px-4 py-[10px] select-none"
			:class="props.selectBgColor"
			@click="activeMenu"
		>
			<slot name="icon" />
			<span
				class="text-16-med"
				:class="props.mainTextColor"
			>
				{{ selectedItemName }}
			</span>
			<IconChevronUp
				:class="props.mainTextColor"
				v-if="!showMenu"
			/>
			<IconChevronDown
				:class="props.mainTextColor"
				v-else
			/>
			<div
				class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col"
				v-if="showMenu"
			>
				<div
					v-for="(person, key) in props.users"
					:key="key"
					@click="selectItem(key)"
					class="h-8 flex items-center gap-2 cursor-pointer select-item border-b border-gray-15-color px-1"
				>
					<span class="text-12-semi text-gray-90-color mr-1">{{
						key
					}}</span>
					<div class="flex items-center justify-start gap-2">
						<img
							src="/img/person.jpeg"
							alt=""
							class="w-6 h-6 rounded-[50%] object-cover"
						/>
						<div class="flex flex-col items-start justify-center">
							<p class="text-10-semi text-gray-90-color">
								{{ person.name }} {{ person.lastName }}
							</p>
							<p class="text-10-ext text-gray-90-color">
								{{ person.department }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.select-item:hover {
		@apply bg-gray-15-color rounded;
	}
</style>
