<script lang="ts" setup>

const props = defineProps({
    mainTextColor: {
        type: String,
        default: 'text-gray-90-color'
    },
    selectBgColor: {
        type: String,
        default: 'bg-gray-90-color'
    },
    array: {
        type: Array,
        default: [],
        required: true
    },
    modelValue: {
        type: String,
        default: '',
    }
})

const emit = defineEmits(['update:modelValue']);
const selectedBranch = ref('');
const menuActive = ref(false)

watch(selectedBranch, (newValue) => {
    emit('update:modelValue', newValue);
});

onMounted(() => {
    if (selectedBranch.value === '') {
        selectedBranch.value = props.array[0]?.value || '';
    }
});
</script>

<template>
    <div class="w-[214px]">
        <div class="relative w-full rounded-lg flex items-center justify-between px-4 py-[10px] select-none cursor-pointer"
            :class="props.selectBgColor" @click="menuActive = !menuActive">
            <IconBranch :class="props.mainTextColor" />
            <template v-for="branch in props.array" :key="branch.id">
                <span class="text-16-med" :class="props.mainTextColor" v-if="selectedBranch == branch.id">
                    {{ branch.label }}
                </span>
            </template>
            <IconChevronUp :class="props.mainTextColor" v-if="!menuActive" />
            <IconChevronDown :class="props.mainTextColor" v-else />
            <div class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex-col gap-[10px]"
                :class="{ 'flex': menuActive, 'hidden': !menuActive }">
                <div class="flex items-center gap-2 cursor-pointer select-item" v-for="branch in props.array"
                    :key="branch.id" @click="selectedBranch = branch.value">
                    <IconBranch class="text-gray-90-color" />
                    <span class="text-16-med text-gray-90-color">{{ branch.label }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.select-item:hover svg {
    @apply text-primary-color
}

.select-item:hover span {
    @apply text-primary-color
}
</style>