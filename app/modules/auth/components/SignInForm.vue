<script lang="ts" setup>
import { useMainStore } from "~/stores/main";
import { useForm, useField } from "vee-validate";
import { setAuthToken } from "~/utils/auth";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "~/api";

const config = useRuntimeConfig();
const schema = yup.object({
  login: yup
    .string()
    .required("Введите имя")
    .min(4, "Не должно быть меньше 4-и символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Не должно быть меньше 6-и символов"),
});
interface ISchemaForm {
  login: string;
  password: string;
}

const { $loginRep } = useNuxtApp();
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: login, errorMessage: loginError } = useField<string>("login");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");

const mainStore = useMainStore();
const router = useRouter();
const loginErrorText = ref("");
const passwordErrorText = ref("");
const showPassword = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    if (!loginError.value && !passwordError.value) {
      const res = await $loginRep.login({
        username: login.value,
        password: password.value,
      });
      if (res.token) {
        setAuthToken(res.token);
        router.push("/");
      }
    }
  } catch (error: any) {
    console.error(error.response.data.message);
    mainStore.errorMessage = error.response.data.message;
    mainStore.alertShow = true;
  }
});
</script>

<template>
  <Transition name="alert">
    <UiAlert
      v-if="mainStore.alertShow"
      type="error"
      :title="mainStore.errorMessage"
      text="Повторите попытку"
    />
  </Transition>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-center justify-center select-none">
      <img src="~/assets/img/logo.svg" alt="Logo" class="w-[70px] h-6 mb-6" />
      <h3 class="text-32-semi text-gray-90-color text-center mb-8">
        Авторизация
      </h3>
      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <div class="w-[360px] flex flex-col">
          <div
            class="w-full flex items-center bg-gray-15-color px-3 border-[1px] rounded-lg overflow-hidden"
            :class="loginError ? 'border-error-500' : 'border-transparent'"
          >
            <UiInputIcon
              type="text"
              placeholder="Введите логин"
              v-model="login"
            />
            <IconUser class="text-gray-90-color ml-3" />
          </div>
          <span v-if="loginError" class="text-14-ext text-error-500 mt-2">{{
            loginError
          }}</span>
        </div>
        <div class="w-[360px] flex flex-col">
          <div
            class="w-full flex items-center bg-gray-15-color px-3 border-[1px] rounded-lg overflow-hidden"
            :class="loginError ? 'border-error-500' : 'border-transparent'"
          >
            <UiInputIcon
              :type="showPassword ? 'text' : 'password'"
              placeholder="Введите логин"
              v-model="password"
            />
            <IconEye
              v-if="!showPassword"
              class="cursor-pointer text-gray-90-color ml-3"
              @click="showPassword = !showPassword"
            />
            <IconEyeOff
              v-if="showPassword"
              class="cursor-pointer text-gray-90-color ml-3"
              @click="showPassword = !showPassword"
            />
          </div>
          <span v-if="passwordError" class="text-14-ext text-error-500 mt-2">{{
            passwordError
          }}</span>
        </div>
        <div class="w-[360px]">
          <UiButton
            text="Войти"
            type="submit"
            bgColor="bg-primary-color"
            :border="false"
            hover="hover:opacity-[0.8]"
            :icon="false"
            textColor="text-dark-night-color"
            class="w-full"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
