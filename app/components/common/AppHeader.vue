<script lang="ts" setup></script>

<template>
  <nav class="flex flex-col">
    <div class="bg-dark-night-color py-3">
      <div class="container-custom w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/">
            <img src="@/assets/img/logo.svg" alt="">
          </NuxtLink>
          <ul class="flex items-center gap-4">
            <li>
              <NuxtLink to="/" class="text-14-semi text-gray-40-color">Главная</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-14-semi text-gray-40-color">О нас</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex item-center justify-center w-6 h-6 cursor-pointer">
            <IconBell class="text-gray-75-color w-full h-full" />
          </div>
          <div class="flex item-center justify-center w-6 h-6 cursor-pointer">
            <IconSupport class="text-gray-75-color w-full h-full" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-dark-gunmental-color  py-3">
      <div class="container-custom w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <ul class="flex items-center gap-4">
            <li>
              <NuxtLink to="/users"
                class="changed px-4 py-2 rounded-lg transition duration-100 flex items-center gap-2">
                <IconUsersCheck class="text-gray-75-color" />
                <span class="text-14-semi text-gray-75-color">Пользователи</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/settings"
                class="changed px-4 py-2 rounded-lg transition duration-100 flex items-center gap-2">
                <IconSettings class="text-gray-75-color" />
                <span class="text-14-semi text-gray-75-color">Настройки</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-8">
          <ul class="flex items-center gap-4">
            <li>
              <NuxtLink to="/profile"
                class="changed px-4 py-2 rounded-lg transition duration-100 flex items-center gap-2">
                <IconUserSquare class="text-gray-75-color" />
                <span class="text-14-semi text-gray-75-color">Мой профиль</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active.changed {
  @apply bg-primary-color;
}

.router-link-active.changed svg {
  @apply text-dark-night-color;
}

.router-link-active.changed span {
  @apply text-dark-night-color;
}
</style>