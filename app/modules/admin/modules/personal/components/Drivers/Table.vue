<script lang="ts" setup>
import { usePersonalStore } from "~/modules/admin/stores/personal";

const personalStore = usePersonalStore();
const route = useRoute();
const search = ref("");
const { openNewTab, openEditTab } = useTabs();
</script>

<template>
  <div class="w-full h-full">
    <div
      class="w-full flex-grow h-[40px] bg-dark-gunmental px-2 p-2 flex items-center justify-between"
    >
      <div class="w-full h-full flex-grow flex items-center justify-start">
        <div class="w-auto h-full flex items-center justify-start">
          <div
            class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
          >
            <p class="text-16-400 text-gray-40">{{ route.name }}</p>
          </div>
          <IconPlus
            class="text-gray-40 hover:text-primary ml-4"
            @click="openNewTab('drivers-add', 'Водитель')"
          />
          <!-- <IconTrash03 class="text-gray-40 hover:text-error-500 ml-4" /> -->
        </div>
      </div>
      <div class="w-full h-full flex items-center justify-end">
        <div
          class="w-[240px] max-h-[32px] flex items-center justify-center pr-2 bg-gray-15 border border-gray-90 rounded-lg text-gray-90"
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
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[32px] text-center">№</th>
          <th
            class="min-w-[394px] flex-grow flex items-center justify-start gap-1"
          >
            <span>Имя</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[160px] flex items-center justify-start gap-1">
            <span>Статус</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Телефон</span>
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Город</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="driver in personalStore.drivers" :key="driver.id">
          <tr
            @click="
              openEditTab(driver.id, `drivers-edit-${driver.id}`, 'Водитель')
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[32px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ driver.id }}
            </th>
            <th
              class="min-w-[394px] flex-grow flex items-center justify-start gap-1 text-14-reg text-gray-75"
            >
              {{ driver.name }}
            </th>
            <th class="w-[160px] flex items-center justify-start gap-1">
              <!-- <span
                v-if="employee.status == 'on_leave'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-yellow-500/15 text-yellow-500"
              >
                В отпуске
              </span> -->
              <span
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                {{ driver.status }}
              </span>
              <!-- <span
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
              </span> -->
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75"
            >
              {{ driver.contact }}
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75"
            >
              {{ driver.city.name }}
            </th>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
