<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const router = useRouter();
const profileStore = useProfileStore();

const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
const formatDate = (value: string | Date): string => {
  const date = new Date(value);
  const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};
</script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden bg-dark-charcoal-color">
    <div
      class="h-[40px] flex items-center justify-between bg-dark-gunmental-color pl-5 pr-1"
    >
      <h4 class="text-14-bold text-gray-90-color">Закупки</h4>
    </div>
    <div
      class="w-full h-[360px] flex flex-col bg-white/5 overflow-x-auto"
      v-if="profileStore.purchases"
    >
      <template v-for="purchase in profileStore.purchases" :key="purchase.id">
        <div
          class="w-full h-[68px] p-1 flex items-center border-b border-gray-15-color"
        >
          <div
            class="w-[93px] h-full bg-gray-15-color rounded-[4px] flex flex-col items-start gap-1 p-2 mr-3"
          >
            <span class="text-10-ext text-gray-90-color"
              >ID {{ purchase.id }}</span
            >
            <span class="text-10-semi text-gray-90-color">
              {{ purchase.supplier_name }}
            </span>
            <span class="text-8-reg text-gray-75-color">
              {{ purchase.driver_name.split(" ")[0] }}
              {{ purchase.driver_name.split(" ")[1]?.[0] }}.
            </span>
          </div>
          <div
            class="w-[60px] h-full flex flex-col items-start justify-center gap-2"
          >
            <div class="w-full flex items-center justify-start">
              <div
                class="relative z-[20] min-w-[20px] w-[20px] min-h-[20px] h-[20px] bg-primary-color rounded-[50%] flex items-center justify-center"
              >
                <div
                  class="absolute z-[20] min-w-[26px] w-[26px] min-h-[26px] h-[26px] flex items-center justify-center rounded-[50%] border-[1px] border-primary-color animation-border-one"
                ></div>
                <div
                  class="absolute z-[20] min-w-[32px] w-[32px] min-h-[32px] h-[32px] flex items-center justify-center rounded-[50%] border-[1px] border-primary-color animation-border-two"
                ></div>
                <IconCheck
                  class="w-[15px] h-[15px] text-dark-gunmental-color"
                />
              </div>
              <div
                class="relative flex-grow block w-full h-[2px] bg-yellow-500/70"
              >
                <div
                  class="absolute top-[0] left-0 z-[0] translate-y-[-30%] w-full overflow-hidden"
                >
                  <div
                    class="w-full h-[6px] flex items-center gap-1 animate-move"
                  >
                    <div
                      v-for="i in 20"
                      :key="i"
                      class="min-w-[6px] w-[6px] h-full inline-block rounded-[50%] bg-white"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-start gap-[2px]">
              <p class="text-10-reg text-gray-90-color">Старт</p>
              <span class="text-8-ext text-gray-75-color">
                {{ purchase.start_date }}
              </span>
            </div>
          </div>
          <template v-for="(city, index) in purchase.cities">
            <div
              v-if="city.status == 'Не полностью'"
              class="w-[60px] h-full flex flex-col items-start justify-center gap-2"
            >
              <div class="w-full flex items-center justify-start">
                <div
                  class="relative min-w-[20px] max-w-[20px] w-full min-h-[20px] max-h-[20px] h-full bg-error-500 rounded-[50%] flex items-center justify-center"
                >
                  <div
                    class="absolute min-w-[26px] w-[26px] min-h-[26px] h-[26px] flex items-center justify-center rounded-[50%] border-[1px] border-error-500 animation-border-one"
                  ></div>
                  <div
                    class="absolute min-w-[32px] w-[32px] min-h-[32px] h-[32px] flex items-center justify-center rounded-[50%] border-[1px] border-error-500 animation-border-two"
                  ></div>
                  <IconAlertTriangle
                    class="w-[15px] h-[15px] text-dark-gunmental-color"
                  />
                </div>
                <div
                  v-if="
                    Object.keys(purchase.cities).length.toString() != index + 1
                  "
                  class="flex-grow block w-full h-[2px] bg-gray-40-color"
                ></div>
              </div>
              <div class="flex flex-col items-start gap-[2px]">
                <p class="text-10-reg text-gray-90-color truncate-text">
                  {{ city.name }}
                </p>
                <span class="text-8-ext text-gray-75-color">
                  Не полностью
                </span>
              </div>
            </div>
            <div
              v-if="city.status == 'Доставлен'"
              class="w-[60px] h-full flex flex-col items-start justify-center gap-2"
            >
              <div class="w-full flex items-center justify-start">
                <div
                  class="relative min-w-[20px] max-w-[20px] w-full min-h-[20px] max-h-[20px] h-full bg-success-500 rounded-[50%] flex items-center justify-center"
                >
                  <div
                    class="absolute min-w-[26px] w-[26px] min-h-[26px] h-[26px] flex items-center justify-center rounded-[50%] border-[1px] border-success-500 animation-border-one"
                  ></div>
                  <div
                    class="absolute min-w-[32px] w-[32px] min-h-[32px] h-[32px] flex items-center justify-center rounded-[50%] border-[1px] border-success-500 animation-border-two"
                  ></div>
                  <IconCheck
                    class="w-[15px] h-[15px] text-dark-gunmental-color"
                  />
                </div>
                <div
                  v-if="
                    Object.keys(purchase.cities).length.toString() != index + 1
                  "
                  class="relative flex-grow block w-full h-[2px] bg-yellow-500/70"
                >
                  <div
                    class="absolute top-[0] left-0 z-[0] translate-y-[-30%] w-full overflow-hidden"
                  >
                    <div
                      class="w-full h-[6px] flex items-center gap-1 animate-move"
                    >
                      <div
                        v-for="i in 20"
                        :key="i"
                        class="min-w-[6px] w-[6px] h-full inline-block rounded-[50%] bg-white"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-start gap-[2px]">
                <p class="text-10-reg text-gray-90-color truncate-text">
                  {{ city.name }}
                </p>
                <span class="text-8-ext text-gray-75-color">
                  {{ city.arrived_at ? city.arrived_at : "завершен" }}
                </span>
              </div>
            </div>
            <div
              v-if="city.status == 'В пути'"
              class="w-[60px] h-full flex flex-col items-start justify-center gap-2"
            >
              <div class="w-full flex items-center justify-start">
                <div
                  class="min-w-[20px] max-w-[20px] w-full min-h-[20px] max-h-[20px] h-full bg-gray-40-color rounded-[50%] flex items-center justify-center"
                >
                  <span class="text-10-reg text-gray-90-color">
                    {{ index + 2 }}
                  </span>
                </div>
                <div
                  v-if="
                    Object.keys(purchase.cities).length.toString() != index + 1
                  "
                  class="flex-grow block w-full h-[2px] bg-gray-40-color"
                ></div>
              </div>
              <div class="flex flex-col items-start gap-[2px]">
                <p class="text-10-reg text-gray-90-color truncate-text">
                  {{ city.name }}
                </p>
                <span class="text-8-ext text-gray-75-color"> В пути </span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
    <!-- <div
      v-else
      class="w-full h-full flex flex-col items-center justify-center mb-2 overflow-y-auto"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div> -->
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
.truncate-text {
  display: block;
  width: 57px; /* ограничиваем ширину */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* добавляем троеточие */
}

.animation-border-one {
  animation: animate-border-one 1s linear infinite;
}

.animation-border-two {
  animation: animate-border-two 1s linear infinite;
}

.animate-move {
  display: flex;
  width: 200%; /* Удваиваем ширину для создания бесконечного эффекта */
  animation: move-right 2s linear infinite;
}

@keyframes animate-border-one {
  0%,
  25% {
    opacity: 0;
    width: 24px;
    height: 24px;
  }
  50%,
  75% {
    opacity: 1;
    width: 26px;
    height: 26px;
  }
  100% {
    opacity: 0;
    width: 24px;
    height: 24px;
  }
}

@keyframes animate-border-two {
  0%,
  50% {
    opacity: 0;
    width: 30px;
    height: 30px;
  }
  75% {
    opacity: 1;
    width: 32px;
    height: 32px;
  }
  100% {
    opacity: 0;
    width: 30px;
    height: 30px;
  }
}

@keyframes move-right {
  0% {
    transform: translateX(-50%); /* Начинаем слева */
  }
  100% {
    transform: translateX(0); /* Движемся вправо */
  }
}
</style>
