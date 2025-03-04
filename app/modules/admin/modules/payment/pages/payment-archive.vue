<script lang="ts" setup>
import { getPayments } from "~/modules/admin/modules/payment/components/Requests/requests.data";
import {
  getPriorities,
  getStatuses,
  getTypes,
} from "../components/Requests/requests.data";

useSeoMeta({
  title: "Sport Food | Payment Archive",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Архив оплат",
});

onMounted(async () => {
  await getTypes();
  await getStatuses();
  await getPriorities();
  await getPayments();
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <RequestsTable />
  </div>
</template>

<style scoped></style>
