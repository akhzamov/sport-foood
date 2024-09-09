<script lang="ts" setup>
import { useMainStore } from '~/stores/main';

const mainStore = useMainStore()
const props = defineProps({
    type: {
        type: String,
        default: 'success',
    },
    title: {
        type: String,
        default: 'Успешно',
    },
    text: {
        type: String,
        default: 'Вы успешно авторизовались!',
    }
})
</script>

<template>
    <div class="alert-modal fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40-color select-none"
        @click="mainStore.alertShow = false">
        <div @click.stop
            class="relative w-[400px] h-max bg-dark-gunmental-color rounded-xl border-[1px] border-gray-15-color p-6 flex flex-col items-center justify-center">
            <IconClose class="text-gray-75-color absolute top-[10px] right-[10px] cursor-pointer"
                @click="mainStore.alertShow = false" />
            <div class="w-12 h-12 rounded-[50%] bg-warning-500-20 flex items-center justify-center mb-4"
                v-if="type == 'warning'">
                <IconInfo class="text-warning-500 w-[25px] h-[25px]" />
            </div>
            <div class="w-12 h-12 rounded-[50%] bg-success-500-20 flex items-center justify-center mb-4"
                v-if="type == 'success'">
                <IconCheck class="text-success-500 w-[25px] h-[25px]" />
            </div>
            <div class="w-12 h-12 rounded-[50%] bg-error-500-20 flex items-center justify-center mb-4"
                v-if="type == 'error'">
                <IconClose class="text-error-500 w-[25px] h-[25px]" />
            </div>
            <h4 class="text-24-bold text-white mb-1">{{ props.title }}</h4>
            <p class="text-14-med text-gray-75-color">{{ props.text }}</p>
        </div>
    </div>
</template>

<style></style>