<script lang="ts" setup>
import { removeAuthToken } from "~/utils/auth";

const router = useRouter();
const logOut = () => {
  removeAuthToken();
};
const handleRoutPush = (link: string) => {
  router.push(link);
};
</script>

<template>
  <nav class="flex flex-col">
    <div class="bg-dark-night py-3">
      <div class="container-custom w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/">
            <img src="@/assets/img/logo.svg" alt="" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75 hover:text-primary"
            >
              <IconBell class="w-full h-full" />
            </div>
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75 hover:text-primary"
            >
              <IconSupport class="w-full h-full" />
            </div>
          </div>
          <div class="flex items-center gap-4 w-max">
            <UiButton
              text="Мой профиль"
              bg-color="bg-primary"
              text-color="text-dark-night"
              hover="opacity-[0.8]"
              :icon="true"
              :border="false"
              class="w-max"
            >
              <template v-slot:icon>
                <IconUserSquare class="text-dark-night" />
              </template>
            </UiButton>
            <UiButton
              text="Админ панель"
              bg-color="bg-gray-15"
              text-color="text-gray-90"
              border-color="border-gray-90"
              hover="opacity-[0.8]"
              :icon="true"
              :border="true"
              class="w-max"
              @click="handleRoutPush('/admin-new-tab')"
            >
              <template v-slot:icon>
                <IconSliders02 class="text-gray-90" />
              </template>
            </UiButton>
          </div>
          <div class="flex items-center w-max">
            <NuxtLink
              to="/sign-in"
              @click="logOut()"
              class="w-max flex items-center gap-2 cursor-pointer"
            >
              <IconLogOut class="text-error-500" />
              <span class="text-16-reg text-error-500">Выйти</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
