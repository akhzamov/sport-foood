<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Profile"
})
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <ProfileHeader />
  <ProfileTabs />
</template>

<style scoped></style>