<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const router = useRouter();
const profileStore = useProfileStore();
const activeFilter = ref("platform");
const activeItemId = ref<number | null>(null);
const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
</script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <div
      class="h-[40px] flex items-center justify-between bg-dark-gunmental pl-5 pr-1"
    >
      <h4 class="text-14-bold text-gray-90">Остатки</h4>
      <div
        class="w-max h-max flex items-center p-[2px] rounded-md bg-dark-onix"
      >
        <div
          @click="activeFilter = 'platform'"
          :class="[
            activeFilter == 'platform'
              ? 'bg-primary text-dark-eerie-black'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconIcon34 />
          <p class="text-8-reg">Площадки</p>
        </div>
        <div
          @click="activeFilter = 'agents'"
          :class="[
            activeFilter == 'agents'
              ? 'bg-primary text-dark-eerie-black'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconUserCheck02 />
          <p class="text-8-reg">Агенты</p>
        </div>
        <div
          @click="activeFilter = 'warehouse'"
          :class="[
            activeFilter == 'warehouse'
              ? 'bg-primary text-dark-eerie-black'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconBuilding07 />
          <p class="text-8-reg">Склад</p>
        </div>
      </div>
    </div>
    <DashboardBalancePlatforms v-if="activeFilter == 'platform'" />
    <DashboardBalanceAgents v-if="activeFilter == 'agents'" />
    <DashboardBalanceWarehouse v-if="activeFilter == 'warehouse'" />
  </div>
</template>

<style scoped>
.item-gradient {
  background: linear-gradient(
    270deg,
    rgba(50, 213, 131, 0.3) 0%,
    rgba(12, 86, 71, 0) 181.58%
  );
}
</style>
