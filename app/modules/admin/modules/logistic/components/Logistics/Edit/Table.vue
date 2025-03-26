<script lang="ts" setup>
import { useAdminLogisticsStore } from "../../../stores/adminLogistics";
import type {
  IPointSchemaFormLogistic,
  IProductSchemaFormLogistic,
} from "../../../types/Logistics/schemaForm.type";
import { useAdminStore } from "~/modules/admin/stores/admin";

const props = withDefaults(
  defineProps<{
    points: IPointSchemaFormLogistic[];
  }>(),
  {}
);

const emit = defineEmits(["update:points"]);
const adminLogisticsStore = useAdminLogisticsStore();
const adminStore = useAdminStore();
const selectedCityForProduct = ref<number | null>(null);
const activeCityTab = ref<number | null>(null);

const addCityInTable = (cityId: number) => {
  const numericCityId = Number(cityId);

  // Проверяем, есть ли уже этот город в props.points
  const cityExists = props.points.some((point) => point.city_id === numericCityId);
  if (cityExists) return; // Если город уже добавлен, выходим из функции

  for (const area of Object.values(adminStore.citiesByArea ?? {})) {
    const city = area.cities[numericCityId];
    if (city) {
      props.points.push({
        id: city.id,
        name: city.name,
        city_id: city.id,
        point_products: [],
      });
      activeCityTab.value = cityId;
      break;
    }
  }

  emit("update:points", props.points);
};

const addProductInTable = (cityId: number, product: IProductSchemaFormLogistic) => {
  // Находим город в points
  const city = props.points.find((point) => point.id === cityId);

  if (!city) {
    console.warn(`Город с id ${cityId} не найден`);
    return;
  }

  const findProduct = adminStore.products?.find((item) => item.id == product.id);

  // Добавляем новый продукт
  city.point_products.push({
    id: product.id,
    name: findProduct?.name ?? "",
    packageId: product.packageId,
    packageName: product.packageName,
    quantity: product.quantity,
    kg_price: product.kg_price,
  });
  emit("update:points", props.points);
};

const deleteProductInTable = (cityId: number, productId: number) => {
  const product = props.points.find((item) => item.id === cityId);
  if (!product) return;

  const productIndex = product.point_products.findIndex((item) => item.id === productId);
  if (productIndex === -1) return;

  product.point_products.splice(productIndex, 1);
  emit("update:points", props.points);
};

const deleteCityInTable = () => {
  const cityIndex = props.points.findIndex((item) => item.city_id == activeCityTab.value);
  props.points.splice(cityIndex, 1);
  emit("update:points", props.points);
};

onMounted(() => {
  activeCityTab.value = props.points[0]?.id ?? 0;
});

onUnmounted(() => {
  activeCityTab.value = null;
});

watchEffect(() => {
  if (!activeCityTab.value) {
    activeCityTab.value = props.points[0]?.id ?? 0;
  }
});
</script>

<template>
  <TransitionGroup name="alert">
    <LogisticsAddCity
      v-if="adminLogisticsStore.addCityModal"
      :show-select-menu="adminLogisticsStore.showSelectMenuAddCityModal"
      :selected-city="adminLogisticsStore.selectedCityAddCityModal"
      :cities="adminStore.citiesByArea"
      @update:selected-city="addCityInTable($event)"
      @update:show-select-menu="adminLogisticsStore.showSelectMenuAddCityModal = $event"
    />
    <LogisticsAddProduct
      v-if="adminLogisticsStore.addProductModal"
      :show-select-menu="adminLogisticsStore.showSelectMenuProductModal"
      :show-select-package="adminLogisticsStore.showSelectMenuWeightModal"
      :selected-product="null"
      :products="adminStore.products"
      @update:selected-product="addProductInTable(selectedCityForProduct ?? 0, $event)"
      @update:show-select-menu="adminLogisticsStore.showSelectMenuProductModal = $event"
      @update:show-select-weight-menu="adminLogisticsStore.showSelectMenuWeightModal = $event"
    />
  </TransitionGroup>
  <div class="w-full h-max border border-gray-15 rounded-md">
    <div class="w-full h-[40px] flex items-center justify-between px-4">
      <p class="text-16-reg text-gray-40">Город доставки</p>
      <div class="w-max h-full flex items-center justify-center gap-2">
        <div
          class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40 hover:text-primary"
        >
          <IconPlus @click="adminLogisticsStore.addCityModal = true" />
        </div>
        <!-- <div
          class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40 hover:text-primary"
        >
          <IconEdit05 />
        </div> -->
        <div
          class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40 hover:text-error-500"
          @click="deleteCityInTable()"
        >
          <IconTrash03 />
        </div>
      </div>
    </div>
    <!-- Table -->
    <div
      class="w-full h-max flex flex-col justify-start items-center bg-gray-15 p-2 rounded-b-md"
      v-if="points.length > 0"
    >
      <!-- Table Tabs -->
      <div class="w-full h-[30px] flex items-center justify-start gap-2">
        <template v-for="(city, index) in points">
          <div
            @click="activeCityTab = city.id"
            :class="[activeCityTab == city.id ? 'bg-gray-25' : 'bg-gray-15']"
            class="w-max h-full flex items-center justify-center cursor-pointer px-3 rounded-tl-lg rounded-tr-lg"
          >
            <p class="text-14-reg text-gray-90">
              {{ city.name.split(",")[0] }}
            </p>
          </div>
        </template>
        <div
          v-if="points.length <= 0"
          class="w-max h-full flex items-center justify-center bg-gray-25 cursor-pointer px-3 rounded-tl-lg rounded-tr-lg"
        >
          <p class="text-14-reg text-gray-90">Пусто</p>
        </div>
      </div>
      <template v-for="(city, index) in points">
        <div class="w-full h-max flex flex-col" v-if="city.id == activeCityTab">
          <!-- Table top -->
          <div
            class="w-full h-[40px] flex items-center rounded-tr-lg bg-gray-25 px-2"
            :class="
              adminStore.activeOpenTab == `logistics-edit-view-${adminStore.openUser ?? 0}`
                ? 'justify-end'
                : 'justify-between'
            "
          >
            <div
              v-if="adminStore.activeOpenTab !== `logistics-edit-view-${adminStore.openUser ?? 0}`"
              class="w-max h-max flex items-center justify-center cursor-pointer gap-2 text-gray-40 hover:text-primary"
              @click="
                adminLogisticsStore.addProductModal = true;
                selectedCityForProduct = city.id;
              "
            >
              <div class="w-[32px] h-[32px] flex items-center justify-center">
                <IconPlus />
              </div>
              <span class="text-14-bold">Добавить товар</span>
            </div>
            <div class="flex items-center justify-center gap-2">
              <UiButton
                bgColor="bg-gray-15"
                :border="true"
                :icon="false"
                hover="opacity-[0.9]"
                textColor="text-gray-90"
                border-color="border-gray-90"
                text="Доставлен не полностью"
                class="w-max h-[30px]"
                type="button"
                @click=""
              />
              <UiButton
                bgColor="bg-primary"
                :border="false"
                :icon="false"
                hover="opacity-[0.9]"
                textColor="text-dark-night"
                text="Доставлен"
                class="w-max h-[30px]"
                type="submit"
                @click=""
              />
            </div>
          </div>
          <!-- Table data -->
          <table class="w-full h-max bg-gray-15 rounded-b-lg">
            <thead class="w-full h-max">
              <tr class="w-full h-8 flex bg-gray-40 border-b border-gray-15">
                <th class="w-[12px] h-full flex items-center justify-start px-3">
                  <span class="text-12-med text-gray-75">№</span>
                </th>
                <th class="w-[212px] flex-grow h-full flex items-center justify-start px-3">
                  <span class="text-12-med text-gray-75">Товар</span>
                </th>
                <th class="w-[160px] h-full flex items-center justify-start px-3">
                  <span class="text-12-med text-gray-75">Фасовка</span>
                </th>
                <th class="w-[124px] h-full flex items-center justify-start px-3">
                  <span class="text-12-med text-gray-75">Количество</span>
                </th>
                <th class="w-[120px] h-full flex items-center justify-end px-3">
                  <span class="text-12-med text-gray-75">Цена за кг</span>
                </th>
                <th class="w-[40px] h-full flex items-center justify-center"></th>
              </tr>
            </thead>
            <tbody class="w-full h-max rounded-b-lg">
              <template v-for="(item, index) in city.point_products" :key="item.id">
                <tr class="w-full h-8 flex border-b border-gray-15">
                  <th class="w-[12px] h-full flex items-center justify-start px-3">
                    <span class="text-12-med text-gray-75">
                      {{ index + 1 }}
                    </span>
                  </th>
                  <th class="w-[212px] flex-grow h-full flex items-center justify-start px-3">
                    <span class="text-12-med text-gray-75">
                      {{ item.name }}
                    </span>
                  </th>
                  <th class="w-[160px] h-full flex items-center justify-start px-3">
                    <span class="text-12-med text-gray-75">
                      {{ item.packageName }}
                    </span>
                  </th>
                  <th class="w-[124px] h-full flex items-center justify-start px-3">
                    <span class="text-12-med text-gray-75"> {{ item.quantity }} шт </span>
                  </th>
                  <th class="w-[120px] h-full flex items-center justify-end px-3">
                    <span class="text-12-med text-gray-75"> {{ item.kg_price }} руб </span>
                  </th>
                  <th
                    class="w-[40px] h-full flex items-center justify-center cursor-pointer"
                    @click="deleteProductInTable(city.id ?? 0, item.id ?? 0)"
                  >
                    <div
                      class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40 hover:text-error-500"
                    >
                      <IconTrash03 />
                    </div>
                  </th>
                </tr>
              </template>
              <tr class="flex items-center justify-center mt-5" v-if="city.point_products.length == 0">
                <th class="text-12-med text-gray-75">У вас пока нет товаров в списке</th>
              </tr>
              <tr class="flex items-center justify-center mt-2 mb-3" v-if="city.point_products.length == 0">
                <th
                  class="text-14-semi text-gray-40 cursor-pointer"
                  @click="
                    adminLogisticsStore.addProductModal = true;
                    selectedCityForProduct = city.id;
                  "
                >
                  Добавить товар
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
    <div class="w-full h-max flex flex-col justify-start items-center bg-gray-15 py-10 rounded-b-md" v-else>
      <div class="flex items-center justify-center">
        <span class="text-14-bold text-gray-75"> Добавьте город для продолжения </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
