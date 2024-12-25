<script lang="ts" setup>
import {
  getPriorities,
  getStatuses,
  getTypes,
} from "../components/Requests/requests.data";

useSeoMeta({
  title: "Sport Food | Payment Requests",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Заявки на оплату",
});

onMounted(async () => {
  await getTypes();
  await getStatuses();
  await getPriorities();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <RequestsTable />
  </div>
</template>

<style scoped></style>
