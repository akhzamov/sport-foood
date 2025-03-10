<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { usePersonalStore } from "~/modules/admin/stores/personal";
import { useMainStore } from "~/stores/main";
import { getUsers } from "~/modules/admin/modules/personal/components/Employees/employees.data";

const { openNewTab } = useTabs();
const adminStore = useAdminStore();
const mainStore = useMainStore();
const personalStore = usePersonalStore();
const route = useRoute();

const debouncedGetCities = useDebounceFn(() => {
  getUsers();
}, 500);

watch(
  () => personalStore.searchEmployee,
  () => {
    debouncedGetCities();
    console.log("s");
  },
  { deep: true }
);
</script>

<template>
  <div
    class="w-full flex-grow h-[40px] bg-dark-gunmental px-2 p-2 flex items-center justify-between"
  >
    <div class="w-full h-full flex-grow flex items-center justify-start">
      <div
        class="w-auto h-full flex items-center justify-start border-r border-gray-15"
      >
        <div
          class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
        >
          <p class="text-16-400 text-gray-40">{{ route.name }}</p>
        </div>
        <IconPlus
          class="text-gray-40 hover:text-primary mx-4"
          @click="openNewTab('employees-add', 'Сотрудник')"
        />
        <!-- <IconTrash03 class="text-gray-40 hover:text-error-500 ml-4" /> -->
      </div>
      <div
        class="w-[240px] max-h-[32px] flex items-center justify-center pr-2 ml-4 bg-gray-15 border border-gray-90 rounded-lg text-gray-90"
      >
        <UiInputIcon
          v-model:model-value="personalStore.searchEmployee"
          placeholder="Введите имя"
          type="text"
          class="max-w-[240px] px-2"
        />
        <IconSearchMd />
      </div>
    </div>
    <div class="w-full h-full flex items-center justify-end">
      <div class="w-auto h-full flex items-center gap-3 pl-3">
        <!-- <UiRoundedSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="roles"
          :show-menu="selectRoleMenu"
          default-select-text="Все роли"
          v-model:model-value="selectedRole"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:show-menu="selectRoleMenu = $event"
          width="min-w-[160px]"
          :text-center="false"
          :disable="false"
          class="h-[32px] z-[100]"
          @click.stop
        />
        <UiRoundedSelect
          main-text-color="text-gray-90 text-"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="mainStore.stores ?? []"
          :show-menu="selectStoreMenu"
          default-select-text="Все магазины"
          v-model:model-value="selectedStore"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:show-menu="selectStoreMenu = $event"
          width="w-[160px]"
          :text-center="false"
          :disable="false"
          class="h-[32px] z-[100]"
          @click.stop
        />
        <UiRoundedSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="statuses"
          :show-menu="selectStatusMenu"
          default-select-text="Все статусы"
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
        /> -->
      </div>
    </div>
  </div>
</template>

<style scoped></style>
