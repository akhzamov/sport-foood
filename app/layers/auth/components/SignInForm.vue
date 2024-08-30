<script lang="ts" setup>
import { baseUrl } from '~/api';
import axios from 'axios'
import { useMainStore } from '~/stores/main';

const mainStore = useMainStore()
const router = useRouter()
const login = ref('')
const loginError = ref(false)
const loginErrorText = ref('')
const password = ref('')
const passwordError = ref(false)
const passwordErrorText = ref('')

const authCookie = useCookie('auth')

const checkLogin = () => {
    if (login.value.length <= 3) {
        loginErrorText.value = 'Логин должен содержать не менее 4-х символов'
        loginError.value = true
    } else {
        loginError.value = false
    }
}
const checkPassword = () => {
    if (password.value.length <= 5) {
        passwordError.value = true
        passwordErrorText.value = 'Пароль должен содержать не менее 6-х символов'
    } else {
        passwordError.value = false
    }
}

const signIn = async () => {
    try {
        checkLogin()
        checkPassword()
        if (!loginError.value && !passwordError.value) {
            const res = await axios.post(`${baseUrl}/login`, {
                username: login.value,
                password: password.value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.token) {
                authCookie.value = res.data.token
                router.push('/profile')
            }
        }
    } catch (error) {
        console.error(error);
    }
}

watch(login, (newValue) => {
    checkLogin()
});
watch(password, (newValue) => {
    checkPassword()
});
</script>

<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <img src="~/assets/img/logo.svg" alt="Logo" class="w-[70px] h-6 mb-6">
            <h3 class="text-32-semi text-gray-90-color text-center mb-8">Авторизация</h3>
            <form class="flex flex-col gap-4" @submit.prevent>
                <div class="w-[360px]">
                    <UiInput type="text" placeholder="Введите логин" v-model="login" inputType="login"
                        :errorText="loginErrorText" :errorShow="loginError" />
                </div>
                <div class="w-[360px]">
                    <UiInput type="password" placeholder="Введите пароль" v-model="password" inputType="password"
                        :errorText="passwordErrorText" :errorShow="passwordError" />
                </div>
                <div class="w-[360px] ">
                    <UiButton text="Войти" bgColor="bg-primary-color" textColor="text-dark-night-color"
                        @click="signIn()" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>