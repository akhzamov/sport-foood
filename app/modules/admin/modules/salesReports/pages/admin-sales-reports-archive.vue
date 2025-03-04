<script lang="ts" setup>
import { getPayments } from "../../payment/components/Requests/requests.data";

useSeoMeta({
  title: "Sport Food | Sales Reports Archive",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Архив отчетов по продажам",
});

onMounted(async () => {
  await getPayments();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SalesReportsTable />
  </div>
</template>

<style scoped></style>
