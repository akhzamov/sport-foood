<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { usePaymentStore } from "~/modules/admin/stores/payment";
import { useMainStore } from "~/stores/main";
import { useAdminStore } from "~/modules/admin/stores/admin";

const schema = yup.object({
  type: yup.string().required("Выберите тип заявки").nullable(),
  amount: yup.number().required("Введите сумму"),
  selectedCity: yup.number().required("Выберите город").nullable(),
  selectedStore: yup.number().required("Выберите магазин").nullable(),
  priority: yup.string().required("Выберите приоритет").nullable(),
  status: yup.string().required("Выберите статус").nullable(),
  recipient: yup.string().required("Введите получателя"),
});
interface ISchemaForm {
  type: string;
  amount: number;
  selectedCity: number;
  selectedStore: number;
  priority: string;
  status: string;
  recipient: string;
}
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: type, errorMessage: typeError } = useField<string>("type");
const { value: amount, errorMessage: amountError } = useField<number>("amount");
const { value: selectedCity, errorMessage: selectedCityError } =
  useField<number>("selectedCity");
const { value: selectedStore, errorMessage: selectedStoreError } =
  useField<number>("selectedStore");
const { value: priority, errorMessage: priorityError } =
  useField<string>("priority");
const { value: status, errorMessage: statusError } =
  useField<string>("status");
const { value: recipient, errorMessage: recipientError } =
  useField<string>("recipient");

const paymentStore = usePaymentStore();
const adminStore = useAdminStore();
const mainStore = useMainStore();
const cityMenuShow = ref(false);
const typeMenuShow = ref(false);
const storeMenuShow = ref(false);
const priorityMenuStore = ref(false);
const statusMenuStore = ref(false);
const accumulating = ref(false);
const datepicker = ref<any>(null);
const date = ref<Date>();
const { closeTab } = useTabs();

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

const onSubmit = handleSubmit(async (values) => {});
</script>

<template>
  <form
    v-if="
      adminStore.citiesByArea &&
      mainStore.stores &&
      paymentStore.types &&
      paymentStore.priorities &&
      paymentStore.statuses
    "
    @submit.prevent="onSubmit"
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Тип заявки </label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="paymentStore.types"
          :show-menu="typeMenuShow"
          default-select-text="Выбрать"
          v-model:model-value="type"
          :icon="false"
          value-key="key"
          label-key="value"
          @update:show-menu="typeMenuShow = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[80]"
        />
        <span v-if="typeError" class="text-14-ext text-error-500 mt-[2px]">
          {{ typeError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Сумма </label>
        <UiInput
          v-model:model-value="amount"
          placeholder="0.00"
          type="number"
          class="text-gray-90"
        />
        <span v-if="amountError" class="text-14-ext text-error-500 mt-[2px]">
          {{ amountError }}
        </span>
      </div>
    </div>
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Город</label>
        <div class="flex gap-1">
          <UiSelectCategories
            v-model:model-value="selectedCity"
            :show-menu="cityMenuShow"
            :array="adminStore.citiesByArea"
            :icon="false"
            :is-object="true"
            default-select-text="Выбрать город"
            select-bg-color="bg-gray-15"
            main-text-color="text-gray-90"
            value-key="id"
            label-key="name"
            inner-item-key="cities"
            class="flex-grow z-[70] h-[40px]"
            @update:show-menu="cityMenuShow = $event"
          />
        </div>
        <span
          v-if="selectedCityError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedCityError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Магазин </label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="mainStore.stores"
          :show-menu="storeMenuShow"
          default-select-text="Выбрать"
          v-model:model-value="selectedStore"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:show-menu="storeMenuShow = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[70]"
        />
        <span
          v-if="selectedStoreError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedStoreError }}
        </span>
      </div>
    </div>
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Приоритет</label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="paymentStore.priorities"
          :show-menu="priorityMenuStore"
          default-select-text="Выбрать"
          v-model:model-value="priority"
          :icon="false"
          value-key="key"
          label-key="value"
          @update:show-menu="priorityMenuStore = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[60]"
        />
        <span v-if="priorityError" class="text-14-ext text-error-500 mt-[2px]">
          {{ priorityError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Получатель </label>
        <UiInput
          v-model:model-value="recipient"
          placeholder="ООО Аксель"
          type="text"
          class="text-gray-90"
        />
        <span v-if="recipientError" class="text-14-ext text-error-500 mt-[2px]">
          {{ recipientError }}
        </span>
      </div>
    </div>
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-max flex justify-between items-center">
        <div class="w-[50%] h-full flex items-center gap-1">
          <p class="text-16-reg text-gray-75">Накопительный</p>
          <UiToggle v-model:model-value="accumulating" />
        </div>
        <div class="w-[50%] flex flex-col items-start justify-center">
          <p class="text-12-reg text-gray-75 mb-1">Ожидаемая дата оплаты</p>
          <div class="w-full h-full flex flex-col">
            <div
              class="w-full h-[38px] flex items-center justify-start gap-2 rounded-md py-1 px-4 cursor-pointer bg-gray-15 text-gray-90"
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
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Статус</label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
          :array="paymentStore.statuses"
          :show-menu="statusMenuStore"
          default-select-text="Выбрать"
          v-model:model-value="status"
          :icon="false"
          value-key="key"
          label-key="value"
          @update:show-menu="statusMenuStore = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[50]"
        />
        <span v-if="statusError" class="text-14-ext text-error-500 mt-[2px]">
          {{ statusError }}
        </span>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40"
    ></div>
    <div class="flex items-center justify-between gap-2 mt-3">
      <UiButton
        bgColor="bg-gray-15"
        :border="true"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-gray-90"
        border-color="border-gray-90"
        text="Отмена"
        class="w-[93px]"
        type="button"
        @click="closeTab('payment-requests-add')"
      >
      </UiButton>
      <UiButton
        bgColor="bg-primary"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night"
        text="Сохранить"
        class="w-[93px]"
        type="submit"
        @click="onSubmit"
      />
    </div>
  </form>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
