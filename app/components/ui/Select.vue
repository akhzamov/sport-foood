<script lang="ts" setup>
	import type { IUiSelect } from "~/types/select.type";

	const props = defineProps({
		mainTextColor: {
			type: String,
			default: "text-gray-90-color",
		},
		selectBgColor: {
			type: String,
			default: "bg-gray-90-color",
		},
		array: {
			type: Array as PropType<IUiSelect[] | null>,
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
		if (props.array) {
			const selectedItem = props.array.find((item) => item.id === id);
			if (selectedItem) {
				selectedItemId.value = id;
				selectedItemName.value = selectedItem.name;
				emit("update:modelValue", id);
				emit("click:selectItem", id);
			}
		}
	};

	const setDefaultItem = () => {
		if (Array.isArray(props.array) && props.array.length > 0) {
			const firstItem = props.array[0];
			if (firstItem) {
				selectedItemId.value = firstItem.id;
				selectedItemName.value = firstItem.name;
				emit("update:modelValue", firstItem.id);
			}
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
		if (props.array && props.array.length > 0) {
			checkDefaultText();
		}
	});
</script>

<template>
	<div class="w-[214px] relative">
		<div
			class="w-full rounded-lg flex items-center justify-between px-4 py-[10px] select-none cursor-pointer"
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
				class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex flex-col gap-[10px]"
				v-if="showMenu"
			>
				<div
					class="flex items-center gap-2 cursor-pointer select-item"
					v-for="item in props.array"
					:key="item.id"
					@click="selectItem(item.id)"
				>
					<IconBranch class="text-gray-90-color" />
					<span class="text-16-med text-gray-90-color">
						{{ item.name }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.select-item:hover svg {
		@apply text-primary-color;
	}

	.select-item:hover span {
		@apply text-primary-color;
	}
</style>
