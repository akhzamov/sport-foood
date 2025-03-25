<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useAdminStore } from "~/modules/admin/stores/admin";
import type {
  IPointSchemaFormLogistic,
  ISchemaFormLogistic,
} from "../../../types/Logistics/schemaForm.type";

const schema = yup.object({
  supplierId: yup.number().nullable().required("Выберите поставщика"),
  driverId: yup.number().nullable().required("Выберите водителя"),
  getDate: yup.date().nullable().required("Выберите дату выезда"),
  amount: yup.number().nullable().required("Введите сумму закупки (Рубли)"),
  driverAmount: yup
    .number()
    .nullable()
    .required("Введите сумму поездки (Рубли)"),
  additional: yup.string(),
  points: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required("Выберите город"),
        name: yup.string().required(),
        city_id: yup.number().required(),
        point_products: yup
          .array()
          .nullable()
          .min(1, "Добавьте хотя бы один товар"),
      })
    )
    .nullable()
    .min(1, "Добавьте хотя бы один город"),
});
const initialValues: ISchemaFormLogistic = {
  supplierId: null,
  driverId: null,
  getDate: null,
  amount: null,
  driverAmount: null,
  additional: "",
  points: [],
};
const { handleSubmit, resetForm } = useForm<ISchemaFormLogistic>({
  validationSchema: schema,
  initialValues,
});
const { value: supplierId, errorMessage: supplierIdError } = useField<
  number | null
>("supplierId");
const { value: driverId, errorMessage: driverIdError } = useField<
  number | null
>("driverId");
const { value: getDate, errorMessage: getDateError } = useField<Date | null>(
  "getDate"
);
const { value: amount, errorMessage: amountError } = useField<number | null>(
  "amount"
);
const { value: driverAmount, errorMessage: driverAmountError } = useField<
  number | null
>("driverAmount");

const { value: additional, errorMessage: additionalError } =
  useField<string>("additional");
const { value: points, errorMessage: pointsError } =
  useField<IPointSchemaFormLogistic[]>("points");

const adminStore = useAdminStore();
const supplierMenu = ref(false);
const currierMenu = ref(false);
const formattedDate = ref("");
const datepicker = ref<any>(null);
const checkPeriod = ref(false);
const photos = ref<Record<number, File> | null>(null);
const { closeTab } = useTabs();
const { createShipment, getShipments } = useCrudLogisticResponse();

const handleCheckPeriod = () => {
  checkPeriod.value = !checkPeriod.value;
  if (checkPeriod.value) {
    datepicker.value?.openMenu();
  } else {
    datepicker.value?.clearValue();
  }
};
const formatDate = (dateString: Date) => {
  const nDate = new Date(dateString);
  let day = nDate.getDate() > 9 ? nDate.getDate() : `0${nDate.getDate()}`;
  let month = nDate.getMonth() > 9 ? nDate.getMonth() : `0${nDate.getMonth()}`;
  let year = nDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const body: ISchemaFormLogistic = {
      supplierId: values.supplierId,
      driverId: values.driverId,
      getDate: values.getDate,
      amount: values.amount,
      driverAmount: values.driverAmount,
      additional: values.additional,
      points: values.points,
    };
    if (photos.value) {
      await createShipment(body, photos.value);
    } else {
      await createShipment(body);
    }
    photos.value = null;
    formattedDate.value = "";
    resetForm();
    await getShipments();
  } catch (error) {
    console.error("Ошибка при создании закупа", error);
  }
});

watch(
  () => getDate.value,
  () => {
    if (getDate.value) {
      formattedDate.value = formatDate(getDate.value);
    }
  }
);
</script>

<template>
  <div class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3">
    <div class="flex items-start justify-between gap-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Поставщик</label>
        <div class="flex gap-1">
          <UiSelect
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="adminStore.suppliers ?? []"
            :show-menu="supplierMenu"
            default-select-text="Выбор поставщика"
            v-model:model-value="supplierId"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="supplierMenu = $event"
            width="w-full"
            :text-center="false"
            :disable="false"
            class="h-[40px] flex-grow"
          />
        </div>
        <span
          v-if="supplierIdError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ supplierIdError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Водитель</label>
        <div class="flex gap-1">
          <UiSelect
            main-text-color="text-gray-90"
            select-bg-color="bg-gray-15"
            disable-text-color="text-gray-40"
            disable-bg-color="bg-gray-15"
            :array="adminStore.drivers ?? []"
            :show-menu="currierMenu"
            default-select-text="Выбор водителя"
            v-model:model-value="driverId"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="currierMenu = $event"
            width="w-full"
            :text-center="false"
            :disable="false"
            class="h-[40px] flex-grow"
          />
        </div>
        <span v-if="driverIdError" class="text-14-ext text-error-500 mt-[2px]">
          {{ driverIdError }}
        </span>
      </div>
    </div>
    <div class="w-[50%] flex flex-col items-start justify-start mt-3 pr-[7px]">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Дата выезда</label>
        <div
          class="h-[40px] flex items-center justify-end bg-gray-15 rounded-md px-4"
        >
          <UiInputIcon
            v-model:model-value="formattedDate"
            placeholder="дд-мм-гггг"
            type="string"
            @mousedown="handleCheckPeriod"
            class="w-full text-gray-90 text-14-reg flex-grow"
          />
          <IconCalendar class="text-gray-90" />
        </div>
        <DatePicker
          v-model="getDate"
          ref="datepicker"
          cancelText="Отмена"
          selectText="Сохранить"
          locale="ru"
          :dark="true"
        />
      </div>
      <span v-if="getDateError" class="text-14-ext text-error-500 mt-[2px]">
        {{ getDateError }}
      </span>
    </div>
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Сумма закупки </label>
        <UiInput
          v-model:model-value="amount"
          placeholder="Сумма в рублях"
          type="number"
        />
        <span v-if="amountError" class="text-14-ext text-error-500 mt-[2px]">
          {{ amountError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Стоимость поездки </label>
        <UiInput
          v-model:model-value="driverAmount"
          placeholder="Сумма в рублях"
          type="number"
        />
        <span
          v-if="driverAmountError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ driverAmountError }}
        </span>
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Примечание</label>
        <UiTextarea
          v-model:model-value="additional"
          placeholder="Текст"
          class="w-full h-[70px]"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Прикрепить фото</label>
        <UiSelectPhoto v-model:model-value="photos" :length="4" />
      </div>
    </div>
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
        @click="closeTab('logistics-add')"
      >
      </UiButton>
      <UiButton
        bgColor="bg-primary"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night"
        text="Создать"
        class="w-[93px]"
        type="submit"
        @click="onSubmit"
      />
    </div>
    <div
      class="w-full h-[1px] border-b border-dashed border-gray-15 my-3"
    ></div>
    <div class="flex flex-col">
      <LogisticsAddTable :points="points" @update:points="points = $event" />
      <span v-if="pointsError" class="text-14-ext text-error-500 mt-[2px]">
        {{ pointsError }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
