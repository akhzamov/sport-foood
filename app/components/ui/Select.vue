<script lang="ts" setup>
	import { useProfileStore } from "~/modules/profile/stores/profile";
	import type { IStore } from "~/modules/profile/types/stores.type";

	const profileStore = useProfileStore();
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
			type: Array as PropType<IStore[] | null>,
			default: () => null,
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
			type: Number as PropType<number | null>,
		},
	});

	const emit = defineEmits(["update:modelValue", "update:showMenu"]);
	const selectedItemId = ref(props.modelValue);

	const activeMenu = (): any => {
		emit("update:showMenu", true);
	};

	const selectItem = (id: number) => {
		selectedItemId.value = id;
		emit("update:modelValue", id);
		emit("update:showMenu", false);
	};
</script>

<template>
	<div class="w-[214px]">
		<div
			class="relative w-full rounded-lg flex items-center justify-between px-4 py-[10px] select-none cursor-pointer"
			:class="props.selectBgColor"
			@click="activeMenu"
		>
			<IconBranch :class="props.mainTextColor" />
			<span
				class="text-16-med"
				:class="props.mainTextColor"
				v-if="!selectedItemId"
			>
				Не выбрано
			</span>
			<template
				v-for="item in props.array"
				:key="item.id"
			>
				<span
					class="text-16-med"
					:class="props.mainTextColor"
					v-if="selectedItemId == item.id"
				>
					{{ item.name }}
				</span>
			</template>
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
