<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { useMainStore } from "~/stores/main";
import { getSalesAgents } from "~/modules/admin/modules/personal/components/SalesAgents/salesAgents.data";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const route = useRoute();
const mainStore = useMainStore();
const adminStore = useAdminStore();
const profileStore = useProfileStore();
const personalStore = usePersonalStore();
const selectedStatus = ref<number | null>(null);
const selectStatusMenu = ref(false);
const selectStoreMenu = ref(false);
const search = ref("");
const statuses = reactive([
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);
const closeMenu = () => {
  selectStatusMenu.value = false;
  selectStoreMenu.value = false;
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
      name: "Торговый Агент",
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
      name: "Торговый гент",
    });
  }
};
const selectBranch = (value: number) => {
  profileStore.selectedBranch = value;
  getSalesAgents();
};
</script>

<template>
  <div class="w-full h-full flex-grow" @click="closeMenu()">
    <div
      class="w-full flex-grow h-[40px] bg-dark-gunmental px-2 p-2 flex items-center justify-between"
    >
      <div class="w-full h-full flex-grow flex items-center justify-start">
        <div
          class="w-auto h-full flex items-center justify-start border-r border-gray-15 mr-3"
        >
          <div
            class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
          >
            <p class="text-16-400 text-gray-40">{{ route.name }}</p>
          </div>
          <IconPlus
            class="text-gray-40 hover:text-primary ml-4"
            @click="openNewTab('admin-salesAgents-add')"
          />
          <!-- <IconTrash03 class="text-gray-40 hover:text-error-500 ml-4" /> -->
        </div>
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
      <div class="w-full h-full flex items-center justify-end">
        <div class="w-auto h-full flex items-center gap-3 pl-3">
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
          />
          <UiRoundedSelect
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="mainStore.stores ?? []"
            :show-menu="selectStoreMenu"
            default-select-text="Все магазины"
            v-model:model-value="selectedStatus"
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
        </div>
      </div>
    </div>
    <table class="w-full h-max">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[60px] text-start pl-2">ID</th>
          <th
            class="min-w-[394px] flex-grow flex items-center justify-start gap-1 ml-1"
          >
            <span>Имя</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[160px] flex items-center justify-start gap-1">
            <span>Статус</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Контакт</span>
          </th>
          <th class="w-[270px] flex items-center justify-start">
            <span>Магазины</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="personalStore.salesAgents">
        <template
          v-for="(agent, index) in personalStore.salesAgents"
          :key="agent.id"
        >
          <tr
            @click="openEditTab(agent.id, `admin-salesAgents-edit-${agent.id}`)"
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[60px] flex items-center justify-start pl-2 text-14-reg text-gray-75"
            >
              {{ agent.id }}
            </th>
            <th
              class="min-w-[394px] flex-grow flex items-center justify-start ml-1 gap-1 text-14-reg text-gray-75"
            >
              {{ agent.name }}
            </th>
            <th class="w-[160px] flex items-center justify-start gap-1">
              <span
                v-if="agent.status == 'on_leave'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-yellow-500/15 text-yellow-500"
              >
                В отпуске
              </span>
              <span
                v-if="agent.status == 'is_working'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                Работает
              </span>
              <span
                v-if="agent.status == 'sick'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-white/15 text-white"
              >
                Болен
              </span>
              <span
                v-if="agent.status == 'absent'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Отсутствует
              </span>
              <span
                v-if="agent.status == 'dismissed'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Уволен
              </span>
              <span
                v-if="agent.status == 'Работает'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                Работает
              </span>
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75"
            >
              {{ agent.contact ? agent.contact : "Пусто" }}
            </th>
            <th class="w-[270px] text-14-reg text-gray-75">
              <div
                class="w-full flex items-center justify-start"
                v-if="agent.stores"
              >
                <span class="mr-2" v-for="store in agent.stores.slice(0, 2)">
                  {{ store.name }}
                </span>
                <span v-if="agent.stores.length > 2">
                  (+{{ agent.stores.slice(1, -1).length }})
                </span>
              </div>
              <div class="w-full flex items-center justify-start">
                <span>Нет магазинов</span>
              </div>
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
