<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Home"
})
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <h4 class="text-32-bold text-center py-8 text-mint">"Главная" страница в режиме разработке</h4>
  <div class="w-full mx-auto flex items-center justify-center gap-5">
    <p class="text-24-bold text-mint">Активные страницы:</p>
    <NuxtLink to="/profile"
      class="flex items-center gap-2 text-16-semi text-dark-night px-4 py-2 bg-success-500 rounded-md">
      <IconUserSquare class="" />
      <span>Мой Профиль</span>
    </NuxtLink>
  </div>
</template>

<style scoped></style>