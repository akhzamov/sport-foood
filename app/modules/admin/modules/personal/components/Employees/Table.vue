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
const statuses = reactive([
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);
const positions = reactive([
  { id: 2, name: "Администратор" },
  { id: 3, name: "Старший менеджер" },
  { id: 4, name: "Менеджер" },
  { id: 5, name: "Логист" },
  { id: 6, name: "Маркетолог" },
]);
const roles = reactive([
  { id: 2, name: "Пользователь" },
  { id: 3, name: "Администратор" },
  { id: 4, name: "Перемещение" },
  { id: 5, name: "Просмотр" },
]);
const closeMenu = () => {
  selectStatusMenu.value = false;
  selectPositionMenu.value = false;
  selectRoleMenu.value = false;
};
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
</script>

<template>
  <div class="w-full h-full" @click="closeMenu()">
    <div
      class="w-full flex-grow h-[40px] bg-dark-gunmental-color px-2 p-2 flex items-center justify-between"
    >
      <div class="w-full h-full flex-grow flex items-center justify-start">
        <div class="w-auto h-full flex items-center justify-start">
          <div
            class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15-color"
          >
            <p class="text-16-400 text-gray-40-color">{{ route.name }}</p>
          </div>
          <IconPlus
            class="text-gray-40-color hover:text-primary-color ml-4"
            @click="openNewTab('admin-employees-add')"
          />
          <!-- <IconTrash03 class="text-gray-40-color hover:text-error-500 ml-4" /> -->
        </div>
        <div
          class="w-auto h-full flex items-center gap-3 border-l border-gray-15-color ml-3 pl-3"
        >
          <UiRoundedSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="statuses"
            :show-menu="selectStatusMenu"
            default-select-text="Статус"
            v-model:model-value="selectedStatus"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="selectStatusMenu = $event"
            width="w-[160px]"
            :text-center="false"
            :disable="false"
            class="h-[32px] z-[100]"
            @click.stop
          />
          <UiRoundedSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="positions"
            :show-menu="selectPositionMenu"
            default-select-text="Должность"
            v-model:model-value="selectedPosition"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="selectPositionMenu = $event"
            width="w-[160px]"
            :text-center="false"
            :disable="false"
            class="h-[32px] z-[100]"
            @click.stop
          />
          <UiRoundedSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="roles"
            :show-menu="selectRoleMenu"
            default-select-text="Роль"
            v-model:model-value="selectedRole"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="selectRoleMenu = $event"
            width="w-[160px]"
            :text-center="false"
            :disable="false"
            class="h-[32px] z-[100]"
            @click.stop
          />
        </div>
      </div>
      <div class="w-full h-full flex items-center justify-end">
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
    </div>
    <table class="w-full h-max">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40-color border-b border-gray-40-color"
        >
          <th class="w-[60px] text-start pl-2">№</th>
          <th
            class="min-w-[394px] flex-grow flex items-center justify-start gap-1 ml-1"
          >
            <span>Имя</span>
            <IconSwitchVertical01
              class="w-[20px] h-[20px] cursor-pointer"
              @click="personalStore.nameFilter()"
            />
          </th>
          <th class="w-[220px] flex items-center justify-start">
            <span>Должность</span>
          </th>
          <th class="w-[160px] flex items-center justify-start gap-1">
            <span>Статус</span>
            <IconSwitchVertical01
              class="w-[20px] h-[20px] cursor-pointer"
              @click="personalStore.statusFilter()"
            />
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Магазины</span>
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Контакт</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="personalStore.employees">
        <template
          v-for="(employee, index) in personalStore.employeesFiltered"
          :key="employee.id"
        >
          <tr
            @click="
              openEditTab(employee.id, `admin-employees-edit-${employee.id}`)
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15-color border-b border-gray-40-color"
          >
            <th
              class="w-[60px] flex items-center justify-start pl-2 text-14-reg text-gray-75-color"
            >
              {{ employee.id }}
            </th>
            <th
              class="min-w-[394px] flex-grow flex items-center justify-start ml-1 gap-1 text-14-reg text-gray-75-color"
            >
              {{ employee.username }}
            </th>
            <th
              class="w-[220px] flex items-center justify-start text-14-med text-gray-75-color"
            >
              {{ employee.role }}
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
              {{ employee.stores.length }} шт
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75-color"
            >
              {{ employee.contact ? employee.contact : "Пусто" }}
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
