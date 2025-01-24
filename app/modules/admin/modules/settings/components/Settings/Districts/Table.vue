<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useMainStore } from "~/stores/main";
import { districts } from "~/modules/admin/modules/settings/components/Settings/Districts/districts.data";

const adminStore = useAdminStore();
const mainStore = useMainStore();
const route = useRoute();
const search = ref("");
const selectCityMenu = ref(false);
const selectedCity = ref("");
const cities = reactive({
  1: {
    id: 1,
    name: "Московская область",
  },
  2: {
    id: 2,
    name: "Ленинградская область",
  },
  3: {
    id: 3,
    name: "Владимирская область",
  },
  4: {
    id: 4,
    name: "Кировская область",
  },
  6: {
    id: 5,
    name: "Иркутская область",
  },
});

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
      name: "Район",
    });
  }
};
const openEditTab = (id: number, textId: string) => {
  const exists = adminStore.activeOpenTabs.some((item) => item.id === textId);
  adminStore.openUser = id;

  if (exists) {
    adminStore.activeOpenTab = textId;
  } else {
    adminStore.activeOpenTabs.push({
      id: textId,
      title: `#${id}`,
      name: "Район",
    });
  }
};
</script>

<template>
  <div class="w-full h-full">
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
            @click="openNewTab('admin-setting-district-add')"
          />
          <!-- <IconTrash03 class="text-gray-40-color hover:text-error-500 ml-4" /> -->
        </div>
      </div>
      <div class="w-full flex-grow h-full flex items-center justify-end gap-5">
        <div class="w-auto h-full flex items-center gap-3 pl-3">
          <UiRoundedSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="cities"
            :show-menu="selectCityMenu"
            default-select-text="Все города"
            v-model:model-value="selectedCity"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="selectCityMenu = $event"
            width="min-w-[240px]"
            :text-center="false"
            :disable="false"
            class="h-[32px] z-[100]"
            @click.stop
          />
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
    </div>
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40-color border-b border-gray-40-color"
        >
          <th class="w-[36px] text-center">№</th>
          <th class="w-[365px] flex items-center justify-start gap-1">
            <span>Район</span>
          </th>
          <th class="w-[365px] flex items-center justify-start gap-1">
            <span>Город</span>
          </th>
          <th class="w-[365px] flex items-center justify-start gap-1">
            <span>Область</span>
          </th>
          <th class="min-w-[335px] flex-grow flex items-center justify-start">
            <span>Страна</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <div v-for="district in districts" :key="district.id">
          <tr
            @click="
              openEditTab(
                district.id,
                `admin-setting-district-edit-${district.id}`
              )
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15-color border-b border-gray-40-color"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75-color"
            >
              {{ district.id }}
            </th>
            <th
              class="w-[365px] flex items-center justify-start gap-1 text-14-reg text-gray-75-color"
            >
              {{ district.district }}
            </th>
            <th
              class="w-[365px] flex items-center justify-start gap-1 text-14-reg text-gray-75-color"
            >
              {{ district.city }}
            </th>
            <th
              class="w-[365px] flex items-center justify-start gap-1 text-14-reg text-gray-75-color"
            >
              {{ district.region }}
            </th>
            <th
              class="min-w-[335px] flex-grow flex items-center justify-start text-14-reg text-gray-75-color"
            >
              {{ district.country }}
            </th>
          </tr>
        </div>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
