<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const adminStore = useAdminStore();
const personalStore = usePersonalStore();

const openEditTab = (title: number, id: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === id);

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
  <div class="w-full h-full">
    <EmployeesTableTop />
    <table class="w-full h-max">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
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
            <span>Роль</span>
          </th>
          <th class="w-[270px] flex items-center justify-start">
            <span>Магазины</span>
          </th>
          <th class="w-[180px] flex items-center justify-start gap-1">
            <span>Статус</span>
            <IconSwitchVertical01
              class="w-[20px] h-[20px] cursor-pointer"
              @click="personalStore.statusFilter()"
            />
          </th>
        </tr>
      </thead>
      <tbody v-if="personalStore.employees">
        <template
          v-for="(employee, index) in personalStore.employeesFiltered"
          :key="employee.id"
        >
          <tr
            @click="openEditTab(employee.id, `employees-edit-${employee.id}`)"
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[60px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ employee.id }}
            </th>
            <th
              class="min-w-[394px] flex-grow flex items-center justify-start ml-1 gap-1 text-14-reg text-gray-75"
            >
              {{ employee.username }}
            </th>
            <th
              class="w-[220px] flex items-center justify-start text-14-med text-gray-75"
            >
              {{ employee.role }}
            </th>

            <th
              class="w-[270px] flex items-center justify-start text-14-reg text-gray-75"
            >
              <span class="mr-2" v-for="store in employee.stores.slice(0, 2)">
                {{ store.name }}
              </span>
              <span v-if="employee.stores.length > 2">
                (+{{ employee.stores.slice(1, -1).length }})
              </span>
            </th>
            <th class="w-[180px] flex items-center justify-start gap-1">
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
