<script lang="ts" setup>
import { ref, watch } from "vue";
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistics/stores/adminLogistics";

// Pinia store
const adminLogisticsStore = useAdminLogisticsStore();

// Props
const props = withDefaults(
  defineProps<{
    showSelectMenu: boolean;
    selectedCity: number | null;
    cities: any;
  }>(),
  {
    showSelectMenu: false,
    selectedCity: null,
  }
);

// Emit
const emit = defineEmits(["update:selectedCity", "update:showSelectMenu"]);

// Local state to track selected city and showSelectMenu
const localSelectedCity = ref(props.selectedCity);
const localShowSelectMenu = ref(props.showSelectMenu);

// Watchers to sync local state with props
watch(() => props.selectedCity, (newValue) => {
  localSelectedCity.value = newValue;
});

watch(() => props.showSelectMenu, (newValue) => {
  localShowSelectMenu.value = newValue;
});

// Close modal function
const closeAddCityModal = () => {
  adminLogisticsStore.addCityModal = false;
  adminLogisticsStore.showSelectMenuAddCityModal = false;
  adminLogisticsStore.selectedCityAddCityModal = null;
};

// Update selected city function
const updateSelectedCity = () => {
  emit("update:selectedCity", localSelectedCity.value);
  adminLogisticsStore.addCityModal = false;
  adminLogisticsStore.showSelectMenuAddCityModal = false;
  adminLogisticsStore.selectedCityAddCityModal = null;
};

// Update show select menu function
const updateShowSelectMenu = (newValue: boolean) => {
  localShowSelectMenu.value = newValue;
  emit("update:showSelectMenu", newValue);
};
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40-color select-none"
    @click="closeAddCityModal()"
  >
    <div
      @click.stop
      class="relative w-[400px] h-max bg-dark-gunmental-color rounded-xl border-[1px] border-gray-15-color p-6 flex flex-col items-center justify-center"
    >
      <div class="w-full flex items-center justify-between">
        <h4 class="text-24-bold text-white mb-1 text-center">Выберите город</h4>
        <IconClose
          class="text-gray-75-color cursor-pointer"
          @click="closeAddCityModal()"
        />
      </div>
      <div class="w-full flex flex-col items-start justify-start mt-4">
        <label class="text-12-reg text-gray-90-color">Город</label>
        <div class="w-full flex items-center justify-start gap-2 mt-1">
          <UiSelect
            main-text-color="text-gray-90-color"
            select-bg-color="bg-gray-15-color"
            default-select-text="Выберите город"
            v-model:model-value="props.selectedCity"
            :show-menu="props.showSelectMenu"
            :array="props.cities"
            class="w-full"
            @update:model-value="localSelectedCity = $event"
            @update:show-menu="updateShowSelectMenu"
          />
          <button
            class="min-w-[40px] h-[40px] flex items-center justify-center bg-gray-15-color rounded-lg"
          >
            <IconSettings class="text-gray-90-color" />
          </button>
        </div>
      </div>
      <div class="w-full flex items-center justify-end gap-2 mt-4">
        <UiButton
          text="Добавить"
          bg-color="bg-primary-color"
          text-color="text-dark-night-color"
          hover="hover:opacity-90"
          :border="false"
          :icon="false"
          class="max-w-[100px]"
          @click="updateSelectedCity()"
        />
        <UiButton
          text="Отмена"
          bg-color="bg-gray-15-color"
          text-color="text-gray-90-color"
          border-color="border-gray-90-color"
          hover="hover:bg-gray-25-color"
          :border="true"
          :icon="false"
          class="max-w-[90px]"
          @click="closeAddCityModal()"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
