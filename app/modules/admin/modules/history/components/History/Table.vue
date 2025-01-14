<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useMainStore } from "~/stores/main";

const route = useRoute();
const mainStore = useMainStore();
const adminStore = useAdminStore();
const personalStore = usePersonalStore();
const selectedStatus = ref<number | null>(null);
const selectedPosition = ref<number | null>(null);
const selectedRole = ref<number | null>(null);
const selectStatusMenu = ref(false);
const selectPositionMenu = ref(false);
const selectRoleMenu = ref(false);
const search = ref("");
const datepicker = ref<any>(null);
const date = ref<Date>();
const statuses = reactive([
  { id: 1, name: "Все" },
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);
const positions = reactive([
  { id: 1, name: "Все" },
  { id: 2, name: "Администратор" },
  { id: 3, name: "Старший менеджер" },
  { id: 4, name: "Менеджер" },
  { id: 5, name: "Логист" },
  { id: 6, name: "Маркетолог" },
]);
const openNewTab = (id: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === id);

  if (exists) {
    mainStore.alertShow = true;
    mainStore.alertShowType = "error";
    mainStore.alertShowTitle = "Ошибка";
    mainStore.alertShowText =
      "Нельзя открыть несколько одинаковых окон! Закройте или сохраните предыдущее окно";
  } else {
    adminStore.activeOpenTabs.push({
      id,
      title: "Новый",
      name: "Сотрудник",
    });
  }
};
const openEditTab = (title: number, id: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === id);
  adminStore.openUser = title;

  if (exists) {
    adminStore.activeOpenTab = id;
  } else {
    adminStore.activeOpenTabs.push({
      id,
      title: `#${title}`,
      name: "Сотрудник",
    });
  }
};
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function selectDate(value: boolean) {
  if (value) {
    datepicker.value?.openMenu();
  } else {
    datepicker.value?.clearValue();
  }
}
</script>

<template>
  <div class="w-full h-full" @click="">
    <div
      class="w-full flex-grow h-[40px] bg-dark-gunmental-color px-2 p-2 flex items-center justify-between"
    >
      <div
        class="w-full h-full flex-grow flex items-center justify-start gap-3"
      >
        <div
          class="w-max h-full flex items-center justify-start border-r border-gray-15-color"
        >
          <div class="w-max h-full flex items-center justify-start px-3 py-1">
            <p class="text-16-400 text-gray-40-color">{{ route.name }}</p>
          </div>
        </div>
        <div
          class="w-[240px] max-h-[32px] flex items-center justify-center pr-2 bg-gray-15-color border border-gray-90-color rounded-lg text-gray-90-color"
        >
          <UiInputIcon
            v-model:model-value="search"
            placeholder="Поиск..."
            type="text"
            class="max-w-[240px] px-2"
          />
          <IconSearchMd />
        </div>
      </div>
      <div
        class="w-full h-full flex items-center justify-end gap-3 border-gray-15-color ml-3 pl-3"
      >
        <UiSelect
          main-text-color="text-gray-90-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="positions"
          :show-menu="selectRoleMenu"
          default-select-text="Категория"
          v-model:model-value="selectedRole"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:model-value="selectedRole = $event"
          @update:show-menu="selectRoleMenu = $event"
          width="w-[160px]"
          :text-center="false"
          :disable="false"
          class="h-[36px]"
        />
        <div class="w-[180px] h-[36px] flex flex-col">
          <div
            class="w-full h-full flex items-center justify-start gap-2 rounded-md py-1 px-4 cursor-pointer bg-gray-15-color text-gray-90-color"
            @click="selectDate(true)"
          >
            <IconCalendar />
            <span class="text-14-reg text-left">{{
              date ? `${formatDate(date)}` : "Выбрать период"
            }}</span>
          </div>
          <DatePicker
            v-model="date"
            ref="datepicker"
            cancelText="Отмена"
            selectText="Сохранить"
            locale="ru"
            :dark="true"
          />
        </div>
      </div>
    </div>
    <table class="w-full h-max">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40-color border-b border-gray-40-color"
        >
          <th class="w-[48px] text-start pl-2">ID</th>
          <th class="w-[140px] flex items-center justify-start gap-1 ml-1">
            <span>Дата выезда</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[160px] flex items-center justify-start gap-1">
            <span>Пользователь</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Действие</span>
          </th>
          <th class="min-w-[330px] flex-grow flex items-center justify-start">
            <span>Описание</span>
          </th>
          <th class="min-w-[330px] flex items-center justify-start">
            <span>Дополнительные данные</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="personalStore.employees">
        <template
          v-for="(employee, index) in personalStore.employees"
          :key="employee.id"
        >
          <tr
            @click="
              openEditTab(employee.id, `admin-employees-edit-${employee.id}`)
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15-color border-b border-gray-40-color"
          >
            <th
              class="w-[48px] flex items-center justify-start pl-2 text-14-reg text-gray-75-color"
            >
              {{ employee.id }}
            </th>
            <th
              class="w-[140px] flex items-center justify-start ml-1 gap-1 text-14-reg text-gray-75-color"
            >
              {{ employee.username }}
            </th>
            <th class="w-[160px] flex items-center justify-start gap-1">
              <span
                v-if="employee.status == 'on_leave'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-yellow-500/15 text-yellow-500"
              >
                В отпуске
              </span>
              <span
                v-if="employee.status == 'is_working'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                Работает
              </span>
              <span
                v-if="employee.status == 'sick'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-white/15 text-white"
              >
                Болен
              </span>
              <span
                v-if="employee.status == 'absent'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Отсутствует
              </span>
              <span
                v-if="employee.status == 'dismissed'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Уволен
              </span>
              <span
                v-if="employee.status == 'Активный'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                Активный
              </span>
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75-color"
            >
              {{ employee.contact ? employee.contact : "Пусто" }}
            </th>
            <th
              class="min-w-[330px] flex-grow flex items-center justify-start text-14-reg text-gray-75-color"
            >
              {{ employee.stores.length }} шт
            </th>
            <th
              class="min-w-[330px] flex items-center justify-start text-14-med text-gray-75-color"
            >
              {{ employee.role }}
            </th>
          </tr>
        </template>
      </tbody>
      <div v-else class="w-full h-[600px] flex items-center justify-center">
        <div class="loader"></div>
      </div>
    </table>
  </div>
</template>

<style scoped></style>
