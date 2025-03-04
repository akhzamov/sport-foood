<script lang="ts" setup>
	const props = defineProps({
		name: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		modelValue: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
	});

	const emit = defineEmits(["update:modelValue"]);

	const isChecked = computed(() => props.modelValue === props.value);

	const toggleRadio = () => {
		emit("update:modelValue", props.value);
	};
</script>

<template>
	<div
		class="relative w-5 h-5 z-10 cursor-pointer"
		@click="toggleRadio"
	>
		<input
			:checked="isChecked"
			:name="props.name"
			:id="props.id"
			:value="props.value"
			type="radio"
			class="w-5 h-5 absolute top-0 left-0 opacity-0 z-20 cursor-pointer"
		/>
		<div
			class="w-5 h-5 rounded-[50%] flex items-center justify-center border border-gray-75 bg-gray-15 p-[2.45px] overflow-hidden"
		>
			<div
				class="block w-full h-full rounded-[50%]"
				:class="{
					'bg-primary ': isChecked,
					'bg-transparent': !isChecked,
				}"
			></div>
		</div>
	</div>
</template>

<style scoped></style>
