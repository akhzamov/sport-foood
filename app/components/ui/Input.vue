<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    inputType: {
        type: String,
        default: 'login'
    },
    placeholder: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    errorText: {
        type: String,
        default: 'Введите корректный пароль'
    },
    errorShow: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
        default: '',
    },
})

const showPassword = ref(false)
const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="flex flex-col gap-1">
        <label v-if="props.label.length > 0" class="text-14-semi text-gray-75-color">{{ props.label }}</label>
        <div class="w-full h-[40px] flex items-center bg-gray-15-color rounded-lg border-[1px] overflow-hidden px-3 py-[11px]"
            :class="{ 'border-gray-15-color': !props.errorShow, 'border-error-color': props.errorShow }">
            <input v-if="props.type != 'password'" :type="props.type" :placeholder="props.placeholder"
                :value="props.modelValue" @input="onInput" autocomplete="false"
                class="w-full h-[40px] bg-transparent text-16-ext text-gray-40-color outline-none border-none placeholder:text-gray-40-color">
            <input v-if="props.type == 'password'" :type="showPassword ? 'text' : 'password'"
                :placeholder="props.placeholder" :value="props.modelValue" @input="onInput" autocomplete="false"
                class="w-full h-[40px] bg-transparent text-16-ext text-gray-40-color outline-none border-none placeholder:text-gray-40-color">
            <span>
                <IconEye class="cursor-pointer" v-if="props.inputType == 'password' && !showPassword"
                    @click="showPassword = true"
                    :class="{ 'text-gray-90-color': !props.errorShow, 'text-error-color': props.errorShow }" />
                <IconEyeOff class="cursor-pointer" v-if="props.inputType == 'password' && showPassword"
                    @click="showPassword = false"
                    :class="{ 'text-gray-90-color': !props.errorShow, 'text-error-color': props.errorShow }" />
                <IconUser v-if="props.inputType == 'login'"
                    :class="{ 'text-gray-90-color': !props.errorShow, 'text-error-color': props.errorShow }" />
            </span>
        </div>
        <span class="text-14-semi text-error-color" v-if="props.errorShow">{{ props.errorText }}</span>
    </div>
</template>

<style scoped></style>