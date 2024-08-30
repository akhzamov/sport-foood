<script lang="ts" setup>
const props = defineProps({
    text: {
        type: String,
        default: 'Click'
    },
    bgColor: {
        type: String,
        default: 'bg-primary-color'
    },
    textColor: {
        type: String,
        default: 'text-dark-night-color'
    }
})
</script>

<template>
    <button class="w-full h-[40px] rounded-lg" :class="props.bgColor, props.textColor">{{ text }}</button>
</template>

<style scoped></style>