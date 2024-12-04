<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const router = useRouter();
const profileStore = useProfileStore();
const activeItemId = ref<number | null>(null);
const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
const imgPath = "/img/ozon.png";
</script>

<template>
  <div class="flex flex-col w-full h-[360px] bg-dark-charcoal-color">
    <div class="w-full h-[30px] flex items-center bg-white/5">
      <div
        class="min-w-[132px] flex-grow h-full flex items-center justify-center border-r border-gray-15-color"
      >
        <p class="text-10-reg text-gray-40-color">Торговые агенты</p>
      </div>
      <div
        class="w-[100px] h-full flex flex-col items-center justify-center border-r border-gray-15-color"
      >
        <p class="text-10-ext text-center text-gray-40-color">На руках</p>
        <div
          class="w-full h-[14px] flex items-center border-t border-gray-15-color"
        >
          <div
            class="w-[100%] flex items-center justify-end px-1"
          >
            <p class="text-10-ext text-gray-40-color">Вес</p>
          </div>
        </div>
      </div>
      <div class="w-[150px] h-full flex flex-col items-center justify-center">
        <p class="text-10-ext text-center text-gray-40-color">На витрине</p>
        <div
          class="w-full h-[14px] flex items-center border-t border-gray-15-color"
        >
          <div
            class="w-[50%] flex items-center justify-end px-1 border-r border-gray-15-color"
          >
            <p class="text-10-ext text-gray-40-color">Вес</p>
          </div>
          <div class="w-[50%] flex items-center justify-end px-1">
            <p class="text-10-ext text-gray-40-color">Сумма</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="profileStore.indexAgentsLeft"
      class="w-full h-full flex flex-col mb-2 overflow-y-auto"
    >
      <template v-for="(agent, key, index) in profileStore.indexAgentsLeft">
        <div
          :class="[index % 2 == 0 ? 'bg-dark-gunmental-color' : '']"
          class="w-full min-h-[20px] flex items-center"
        >
          <div
            class="min-w-[132px] h-full flex-grow flex items-center justify-start border-r border-gray-15-color"
          >
            <span class="w-[35px] text-center text-12-semi text-gray-40-color">
              {{ agent.id }}
            </span>
            <p class="w-full ml-1 text-10-semi text-gray-75-color">
              {{ agent.name }}
            </p>
          </div>
          <div
            class="max-w-[100px] w-full h-full flex items-center justify-end border-r border-gray-15-color"
          >
            <div
              class="w-full h-full flex items-center justify-end px-1 border-r border-gray-15-color"
            >
              <span
                class="text-10-ext"
                :class="[
                  agent.hand_weight <= 1
                    ? 'text-error-500'
                    : 'text-success-500',
                ]"
              >
                {{ agent.hand_weight.toFixed(1) }} гр
              </span>
            </div>
          </div>
          <div
            class="max-w-[150px] w-full h-full flex items-center justify-end"
          >
            <div
              class="w-[50%] h-full flex items-center justify-end px-1 border-r border-gray-15-color"
            >
              <span
                class="text-10-ext"
                :class="[
                  agent.has_warning ? 'text-error-500' : 'text-success-500',
                ]"
              >
                {{ agent.store_weight.toFixed(1) }}
              </span>
            </div>
            <div class="w-[50%] h-full flex items-center justify-end px-1">
              <span class="text-10-reg text-gray-75-color">
                {{ agent.store_amount.toFixed(1) }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-else
      class="w-full h-full flex flex-col items-center justify-center mb-2 overflow-y-auto"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <UiButton
      bg-color="bg-gray-15-color"
      :border="true"
      border-color="bg-gray-15-color"
      hover=""
      :icon="true"
      text="Подробно"
      text-color="text-white"
      @click="handleRouterWarehouse"
    >
      <template v-slot:icon-r>
        <IconArrowUpRight class="text-white" />
      </template>
    </UiButton>
  </div>
</template>

<style scoped></style>
