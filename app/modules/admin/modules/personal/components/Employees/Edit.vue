<script lang="ts" setup>
import { useAdminLogisticsStore } from "../../../logistics/stores/adminLogistics";

const adminLogisticsStore = useAdminLogisticsStore();
const name = ref("");
const surname = ref("");
const phone = ref("");
const status = ref<number | null>(null);
const statusMenu = ref(false);
const statuses = reactive([
  { id: 1, name: "Все" },
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);
const position = ref<number | null>(null);
const positionMenu = ref(false);
const positions = reactive([
  { id: 1, name: "Все" },
  { id: 2, name: "Администратор" },
  { id: 3, name: "Старший менеджер" },
  { id: 4, name: "Менеджер" },
  { id: 5, name: "Логист" },
  { id: 6, name: "Маркетолог" },
]);
const role = ref<number | null>(null);
const roleMenu = ref(false);
const roles = reactive([
  { id: 1, name: "Все" },
  { id: 2, name: "Администратор" },
  { id: 3, name: "Перемещение" },
  { id: 4, name: "Пользователь" },
  { id: 5, name: "Просмотр" },
]);
</script>

<template>
  <div
    class="w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Имя </label>
        <UiInput
          v-model:model-value="name"
          placeholder="Дмитрий"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Фамилия </label>
        <UiInput
          v-model:model-value="surname"
          placeholder="Петров"
          type="text"
          class="text-gray-90-color"
        />
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Телефон </label>
        <UiInput
          v-model:model-value="phone"
          placeholder="+7 495 123-45-67"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Статус</label>
        <div class="flex gap-1">
          <UiSelect
            v-model:model-value="status"
            default-select-text="Выбор статуса"
            :show-menu="statusMenu"
            :array="statuses"
            select-bg-color="bg-gray-15-color"
            main-text-color="text-gray-90-color"
            class="flex-grow z-[50]"
            @update:show-menu="statusMenu = $event"
            :icon="false"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Должность</label>
        <div class="flex gap-1">
          <UiSelect
            v-model:model-value="position"
            default-select-text="Выбор должности"
            :show-menu="positionMenu"
            :array="positions"
            select-bg-color="bg-gray-15-color"
            main-text-color="text-gray-90-color"
            class="flex-grow"
            @update:show-menu="positionMenu = $event"
            :icon="false"
          />
        </div>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Роль</label>
        <div class="flex gap-1">
          <UiSelect
            v-model:model-value="role"
            default-select-text="Выбор роли"
            :show-menu="roleMenu"
            :array="roles"
            select-bg-color="bg-gray-15-color"
            main-text-color="text-gray-90-color"
            class="flex-grow"
            @update:show-menu="roleMenu = $event"
            :icon="false"
          />
        </div>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40-color"
    ></div>
    <div class="flex items-start justify-between flex-col gap-3 mt-3">
      <p class="text-12-reg text-gray-90-color">Доступы</p>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
      >
        <div class="w-full h-8 flex items-center justify-between">
          <p class="text-16-reg text-gray-75-color">Главная страница</p>
          <IconChevronDown class="text-gray-90-color" />
        </div>
        <div
          class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color"
        >
          <p class="text-16-reg text-gray-75-color">План продаж</p>
          <div class="w-max h-full flex items-center gap-2">
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEdit05 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconPlus class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconTrash03 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEye class="text-gray-90-color w-5 h-5" />
            </div>
          </div>
        </div>
        <div
          class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color"
        >
          <p class="text-16-reg text-gray-75-color">Рейтинг площадок</p>
          <div class="w-max h-full flex items-center gap-2">
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEdit05 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconPlus class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconTrash03 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEye class="text-gray-90-color w-5 h-5" />
            </div>
          </div>
        </div>
        <div
          class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color"
        >
          <p class="text-16-reg text-gray-75-color">Остатки и резерв</p>
          <div class="w-max h-full flex items-center gap-2">
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEdit05 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconPlus class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconTrash03 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEye class="text-gray-90-color w-5 h-5" />
            </div>
          </div>
        </div>
        <div
          class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color"
        >
          <p class="text-16-reg text-gray-75-color">Рейтинг площадок</p>
          <div class="w-max h-full flex items-center gap-2">
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEdit05 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconPlus class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconTrash03 class="text-gray-90-color w-5 h-5" />
            </div>
            <div
              class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 cursor-pointer"
            >
              <IconEye class="text-gray-90-color w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
      >
        <div class="w-full h-8 flex items-center justify-between">
          <p class="text-16-reg text-gray-75-color">Отчеты</p>
          <IconChevronDown class="text-gray-90-color" />
        </div>
      </div>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
      >
        <div class="w-full h-8 flex items-center justify-between">
          <p class="text-16-reg text-gray-75-color">Логистика</p>
          <IconChevronDown class="text-gray-90-color" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
