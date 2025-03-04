<script lang="ts" setup>
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";
import { getMarketplaceLeft } from "../TradingFloor/tradingFloorBalance.data";
import { getSalesAgentLeft } from "../SalesAgents/salesAgentsBalance.data";

const warehouseStore = useWarehouseStore();
const allChecked = ref(false);

const handleCitiesMenuOpen = (region: {
  name: string;
  checked: boolean;
  menuOpen: boolean;
  cities: any;
}) => {
  region.menuOpen = !region.menuOpen;
};

const handleAllRegionChecked = () => {
  if (warehouseStore.areas) {
    Object.values(warehouseStore.areas).forEach((region) => {
      if (region.checked) {
        region.menuOpen = true;
        Object.values(region.cities).forEach((city) => {
          city.checked = true;
        });
      } else {
        Object.values(region.cities).forEach((city) => {
          city.checked = false;
        });
      }
    });
  }
};

const handleClickAllChecked = () => {
  if (warehouseStore.areas) {
    Object.values(warehouseStore.areas).forEach((region) => {
      if (region.checked) {
        region.checked = false;
        setTimeout(() => {
          region.menuOpen = false;
        }, 1000);
      } else {
        region.checked = true;
        region.menuOpen = true;
      }

      Object.values(region.cities).forEach((city) => {
        if (city.checked) {
          city.checked = false;
        } else {
          city.checked = true;
        }

        if (region.checked && city.checked) {
          allChecked.value = true;
        } else {
          allChecked.value = false;
        }
      });
    });
  }
};

watchEffect(() => {
  if (warehouseStore.areas) {
    const updatedCities: number[] = [];

    Object.values(warehouseStore.areas).forEach((region) => {
      let checkedLength = 0;
      Object.entries(region.cities).forEach(([cityKey, city]) => {
        if (city.checked) {
          checkedLength += 1;
          updatedCities.push(city.id);
        }
      });

      region.checked = checkedLength === Object.values(region.cities).length;
    });

    if (
      JSON.stringify(warehouseStore.selectedCities) !==
      JSON.stringify(updatedCities)
    ) {
      warehouseStore.selectedCities = updatedCities;
    }
  }
});
</script>

<template>
  <div
    class="w-full min-w-[260px] max-w-[260px] h-[100%] bg-gray-15 border-r border-gray-15 rounded-bl-lg"
  >
    <div
      class="w-full h-[36px] flex items-center justify-between text-white border-b border-gray-15 px-2 gap-2"
    >
      <div class="w-max h-full flex items-center justify-start gap-2">
        <IconFilterFunnel01 />
        <p class="text-12-semi">Фильтры</p>
      </div>
      <div
        @click="getMarketplaceLeft(); getSalesAgentLeft()"
        class="w-max h-full flex items-center justify-start gap-1 cursor-pointer text-primary"
      >
        <p class="text-12-semi">Применить</p>
        <IconCheck />
      </div>
    </div>
    <div class="flex items-center justify-between px-2 mt-3">
      <p class="text-12-reg text-white">Города</p>
      <p class="text-14-semi cursor-pointer" @click="handleClickAllChecked()">
        <span class="text-green-500/45" v-if="!allChecked">Выбрать все</span>
        <span class="text-gray-40" v-else>Отменить все</span>
      </p>
    </div>
    <div class="flex flex-col gap-3 px-2 mt-3 mb-3">
      <div
        class=""
        v-for="(area, areaKey) in warehouseStore.areas"
        :key="areaKey"
      >
        <div
          class="flex items-center justify-between text-white cursor-pointer mb-3"
          @click="handleCitiesMenuOpen(area)"
        >
          <div class="flex items-center justify-start gap-2">
            <UiCheckbox
              v-model="area.checked"
              @click.stop="handleAllRegionChecked()"
            />
            <p class="text-14-med">{{ area.name }}</p>
          </div>
          <IconChevronUp />
        </div>
        <TransitionGroup name="city">
          <template v-for="(city, cityKey) in area.cities" :key="cityKey">
            <div class="pl-6 mb-1" v-if="area.menuOpen">
              <div
                class="flex items-center justify-start gap-2 text-white cursor-pointer"
              >
                <UiCheckbox v-model="city.checked" />
                <p class="text-12-med">{{ city.name }}</p>
              </div>
            </div>
          </template>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-enter-active,
.city-leave-active {
  transition: opacity 0.5s linear;
}

.city-enter-from,
.city-leave-to {
  opacity: 0;
}
</style>
