<script lang="ts" setup>
const router = useRouter();
const activeFilter = ref("platform");
const items = reactive([
  {
    id: "00123",
    name: "OOO Vortex",
    driver: "Смоляков Максим",
    started_date: new Date(),
    deliveries: [
      {
        name: "Пермь",
        status: "warning",
        end_date: null,
      },
      {
        name: "Сочи",
        status: "en_route",
        end_date: null,
      },
      {
        name: "Пермь",
        status: "en_route",
        end_date: null,
      },
      {
        name: "Пермь",
        status: "en_route",
        end_date: null,
      },
    ],
  },
  {
    id: "00124",
    name: "Power",
    driver: "Иванов Иван",
    started_date: new Date(),
    deliveries: [
      {
        name: "Казань",
        status: "finished",
        end_date: new Date(),
      },
      {
        name: "Челябинск",
        status: "en_route",
        end_date: null,
      },
      {
        name: "Самара",
        status: "en_route",
        end_date: null,
      },
    ],
  },
  {
    id: "00125",
    name: "Muscle",
    driver: "Уралов Александр",
    started_date: new Date(),
    deliveries: [
      {
        name: "Иркутск",
        status: "finished",
        end_date: new Date(),
      },
      {
        name: "Уфа",
        status: "en_route",
        end_date: null,
      },
    ],
  },
  {
    id: "00126",
    name: "Factory",
    driver: "Ягофаров Гафур",
    started_date: new Date(),
    deliveries: [
      {
        name: "Новосибирск",
        status: "finished",
        end_date: new Date(),
      },
      {
        name: "Челябинск",
        status: "finished",
        end_date: new Date(),
      },
      {
        name: "Омск",
        status: "en_route",
        end_date: null,
      },
    ],
  },
  {
    id: "00127",
    name: "Jamala",
    driver: "Тимуров Евгений",
    started_date: new Date(),
    deliveries: [
      {
        name: "Барнаул",
        status: "finished",
        end_date: new Date(),
      },
      {
        name: "Ярославль",
        status: "en_route",
        end_date: null,
      },
    ],
  },
]);

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
    <div class="flex flex-col w-full h-[360px] bg-white/5">
      <template v-for="item in items" :key="item.id">
        <div
          class="w-full h-[68px] p-1 flex items-center border-b border-gray-15-color"
        >
          <div
            class="w-[73px] h-full bg-gray-15-color rounded-[4px] flex flex-col items-start gap-1 p-2 mr-3"
          >
            <span class="text-10-ext text-gray-90-color">ID {{ item.id }}</span>
            <span class="text-10-semi text-gray-90-color">
              {{ item.name }}
            </span>
            <span class="text-8-reg text-gray-75-color">
              {{ item.driver.split(" ")[0] }}
              {{ item.driver.split(" ")[1]?.[0] }}.
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
                {{ formatDate(item.started_date) }}
              </span>
            </div>
          </div>
          <template v-for="(delivery, index) in item.deliveries">
            <div
              v-if="delivery.status == 'warning'"
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
                  v-if="item.deliveries.length != index + 1"
                  class="flex-grow block w-full h-[2px] bg-gray-40-color"
                ></div>
              </div>
              <div class="flex flex-col items-start gap-[2px]">
                <p class="text-10-reg text-gray-90-color truncate-text">
                  {{ delivery.name }}
                </p>
                <span class="text-8-ext text-gray-75-color">
                  Не полностью
                </span>
              </div>
            </div>
            <div
              v-if="delivery.status == 'finished'"
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
                  v-if="item.deliveries.length != index + 1"
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
                  {{ delivery.name }}
                </p>
                <span class="text-8-ext text-gray-75-color">
                  {{
                    delivery.end_date
                      ? formatDate(delivery.end_date)
                      : "завершен"
                  }}
                </span>
              </div>
            </div>
            <div
              v-if="delivery.status == 'en_route'"
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
                  v-if="item.deliveries.length != index + 1"
                  class="flex-grow block w-full h-[2px] bg-gray-40-color"
                ></div>
              </div>
              <div class="flex flex-col items-start gap-[2px]">
                <p class="text-10-reg text-gray-90-color truncate-text">
                  {{ delivery.name }}
                </p>
                <span class="text-8-ext text-gray-75-color"> В пути </span>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
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
