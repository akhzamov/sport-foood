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
    <div class="bg-dark-night-color py-3">
      <div class="px-5 w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/">
            <img src="@/assets/img/logo.svg" alt="" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75-color hover:text-primary-color"
            >
              <IconBell class="w-full h-full" />
            </div>
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75-color hover:text-primary-color"
            >
              <IconSupport class="w-full h-full" />
            </div>
          </div>
          <div class="flex items-center gap-4 w-max">
            <UiButton
              text="Мой профиль"
              bg-color="bg-primary-color"
              text-color="text-dark-night-color"
              hover="hover:opacity-[0.8]"
              :icon="true"
              :border="false"
              class="w-max"
            >
              <template v-slot:icon>
                <IconUserSquare class="text-dark-night-color" />
              </template>
            </UiButton>
            <UiButton
              text="Витрина магазина"
              bg-color="bg-gray-15-color"
              text-color="text-gray-90-color"
              border-color="border-gray-90-color"
              hover="hover:opacity-[0.8]"
              :icon="true"
              :border="true"
              class="w-max"
              @click="handleRoutPush('/profile-dashboard')"
            >
              <template v-slot:icon>
                <IconBranch class="text-gray-90-color" />
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
