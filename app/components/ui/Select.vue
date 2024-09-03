<script lang="ts" setup>
import { useProfileStore } from '~/layers/profile/stores/profile';
import type { IStore } from '~/layers/profile/types/stores.type';
import { getSalesPlan } from '~/layers/profile/components/Header/profileHeader.data'


const profileStore = useProfileStore()
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
        type: Array as PropType<IStore[] | null>,
        default: () => null,
    },
    modelValue: {
        type: Number as PropType<number | null>,
        default: null,
    }
})

const emit = defineEmits(['update:modelValue']);
const selectedBranch = computed(() => profileStore.selectedBranch)
const menuActive = ref(false)

watch(selectedBranch, (newValue) => {
    emit('update:modelValue', newValue);
});

onMounted(() => {
    if (!selectedBranch.value) {
        profileStore.selectedBranch = props.array ? props.array[0]?.id || null : null;
    }
});
</script>

<template>
    <div class="w-[214px]">
        <div class="relative w-full rounded-lg flex items-center justify-between px-4 py-[10px] select-none cursor-pointer"
            :class="props.selectBgColor" @click="menuActive = !menuActive">
            <IconBranch :class="props.mainTextColor" />
            <span class="text-16-med" :class="props.mainTextColor" v-if="!selectedBranch">
                Не выбрано
            </span>
            <template v-for="item in props.array" :key="item.id">
                <span class="text-16-med" :class="props.mainTextColor" v-if="selectedBranch == item.id">
                    {{ item.name }}
                </span>
            </template>
            <IconChevronUp :class="props.mainTextColor" v-if="!menuActive" />
            <IconChevronDown :class="props.mainTextColor" v-else />
            <div class="absolute bg-dark-eerie-black-color top-[105%] left-0 w-full rounded-lg px-3 py-3 flex-col gap-[10px]"
                :class="{ 'flex': menuActive, 'hidden': !menuActive }">
                <div class="flex items-center gap-2 cursor-pointer select-item" v-for="item in props.array"
                    :key="item.id" @click="profileStore.selectedBranch = item.id, getSalesPlan()">
                    <IconBranch class="text-gray-90-color" />
                    <span class="text-16-med text-gray-90-color">{{ item.name }}</span>
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