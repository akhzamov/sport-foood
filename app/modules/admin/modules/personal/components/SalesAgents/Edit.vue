<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const schema = yup.object({
  username: yup.string().required("Введите Имя Фамилия").min(6, "Не должно быть меньше 6-и символов"),
  contact: yup.string().required("Введите контактные данные").min(6, "Не должно быть меньше 6-и символов"),
});
interface ISchemaForm {
  username: string;
  contact: string;
}
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: username, errorMessage: usernameError } = useField<string>("username");
const { value: contact, errorMessage: contactError } = useField<string>("contact");

const adminStore = useAdminStore();
const mainStore = useMainStore();
const personalStore = usePersonalStore();
const openStoresList = ref(false);
let checkedStore = reactive<number[]>([]);
const { closeTab } = useTabs();
const { editSalesAgentById, getSalesAgentById } = usePersonalSalesAgentsResponse();

const updateCheckedStores = () => {
  checkedStore.length = 0;
  if (!personalStore.salesAgent || !mainStore.stores) {
    console.warn("Не хватает данных для обработки");
    return;
  }
  // Пройдемся по магазинам из профиля и сверим с магазинами сотрудника
  mainStore.stores.forEach((store) => {
    store.checked = false;
    const isEmployeeStore = personalStore.salesAgent?.stores.some(
      (employeeStore) => employeeStore.id === store.id
    );

    if (isEmployeeStore) {
      store.checked = true;
      checkedStore.push(store.id);
    }
  });
};
const toggleStoreChecked = (storeId: number) => {
  const store = mainStore.stores?.find((s) => s.id === storeId);

  if (!store) {
    console.warn(`Магазин с ID ${storeId} не найден`);
    return;
  }

  store.checked = !store.checked; // Переключаем состояние checked

  if (store.checked) {
    // Если включили checked, добавляем в массив
    if (!checkedStore.includes(storeId)) {
      checkedStore.push(storeId);
    }
  } else {
    // Если отключили checked, удаляем из массива
    const index = checkedStore.indexOf(storeId);
    if (index !== -1) {
      checkedStore.splice(index, 1);
    }
  }
};
const onSubmit = handleSubmit(async (values) => {
  try {
    if (!usernameError.value && !contactError.value && adminStore.openUser) {
      const data = {
        name: values.username,
        contact: values.contact,
        stores: checkedStore,
      };
      editSalesAgentById(adminStore.openUser, data);
    }
  } catch (error) {}
});

watch(
  () => personalStore.salesAgent,
  () => {
    if (personalStore.salesAgent) {
      checkedStore.length = 0;
      updateCheckedStores();
    }
  },
  { deep: true }
);
onMounted(async () => {
  await getSalesAgentById(adminStore.openUser ? adminStore.openUser : 0);
  if (personalStore.salesAgent) {
    username.value = personalStore.salesAgent.name;
    contact.value = personalStore.salesAgent.contact ?? "";
  }
});
</script>

<template>
  <form
    v-if="personalStore.salesAgent && !mainStore.isLoading"
    @submit.prevent="onSubmit"
    class="sticky z-[20] w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Имя Фамилия </label>
        <UiInput
          v-model:model-value="username"
          placeholder="Иван Васильевич"
          type="text"
          class="text-gray-90"
        />
        <span v-if="usernameError" class="text-14-ext text-error-500 mt-[2px]">
          {{ usernameError }}
        </span>
      </div>
    </div>
    <div class="flex items-start justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Контакт </label>
        <UiInput v-model:model-value="contact" placeholder="Телефон номер" type="text" class="text-gray-90" />
        <span v-if="contactError" class="text-14-ext text-error-500 mt-[2px]">
          {{ contactError }}
        </span>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Статус</label>
        <UiInput
          v-model:model-value="personalStore.salesAgent.status"
          placeholder="Администратор"
          type="text"
          class="text-gray-90"
          disabled
        />
      </div>
    </div>
    <div class="w-full flex flex-col items-start mt-3">
      <p class="text-14-reg text-gray-90 mb-2">Остатки на руках</p>
      <div class="w-full flex flex-col items-start gap-1 border border-gray-15 p-2 rounded-lg">
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40">1</p>
          <div class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15">
            <p class="text-14-reg text-gray-75">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40">2</p>
          <div class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15">
            <p class="text-14-reg text-gray-75">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40">3</p>
          <div class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15">
            <p class="text-14-reg text-gray-75">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col mt-3">
      <p class="text-12-reg text-gray-90">Магазины</p>
      <div class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15 mt-2">
        <div class="w-full h-8 flex items-center justify-between">
          <p class="text-16-reg text-gray-75">Выбор магазина</p>
        </div>
        <div class="w-full h-max flex flex-col px-2 rounded-lg bg-dark-gunmental select-none">
          <div
            class="w-full h-8 flex items-center justify-between cursor-pointer"
            @click="openStoresList = !openStoresList"
          >
            <p class="text-16-reg text-gray-75">Открыть список</p>
            <IconChevronDown class="text-gray-75" />
          </div>
          <div class="w-full h-max flex flex-col gap-1 mt-4 pb-1" v-if="openStoresList">
            <template v-for="store in mainStore.stores">
              <div
                class="w-full h-8 flex items-center justify-between px-2 rounded cursor-pointer hover:bg-dark-onix"
                @click="toggleStoreChecked(store.id)"
              >
                <span class="text-14-med text-gray-75">
                  {{ store.name }}
                </span>
                <UiCheckbox v-model:model-value="store.checked" @click="toggleStoreChecked(store.id)" />
              </div>
            </template>
          </div>
        </div>
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
        @click="closeTab(`sales-agents-edit-${adminStore.openUser}`)"
      >
      </UiButton>
      <div class="flex items-center justify-center gap-4">
        <UiButton
          bgColor="bg-transparent"
          :border="false"
          :icon="true"
          hover="opacity-[0.9]"
          textColor="text-error-500"
          text="Удалить"
          class="max-w-[120px] px-0"
        >
          <template v-slot:icon>
            <IconTrash03 class="text-error-500 w-[24px] h-[24px]" />
          </template>
        </UiButton>
        <UiButton
          bgColor="bg-primary"
          :border="false"
          :icon="false"
          hover="opacity-[0.9]"
          textColor="text-dark-night"
          text="Сохранить"
          class="max-w-[110px]"
        />
      </div>
    </div>
    <div class="w-full h-[1px] block mt-3 border border-dashed border-gray-40"></div>
    <div class="w-full flex flex-col rounded-md border border-gray-15 bg-gray-15 mt-3">
      <div class="w-full h-[40px] flex items-center justify-between px-4 bg-white/5">
        <p class="text-16-reg text-gray-40">Выдано со склада</p>
        <IconPlus class="text-gray-40 hover:text-primary ml-4" />
      </div>
      <div class="w-full h-max flex flex-col p-2">
        <div class="w-full h-max flex flex-col px-2 py-1 bg-gray-15 rounded">
          <div class="w-full min-h-[24px] h-[24px] flex items-center gap-1 pl-[5px]">
            <p class="flex-grow h-full text-left text-14-reg text-gray-90">ID 345871</p>
            <p class="w-[104px] h-full text-center text-14-ext text-gray-75">27.11.2024</p>
            <p class="w-[140px] h-full pr-[12px] text-end text-14-reg text-gray-90">430 000</p>
            <IconChevronDown class="text-gray-90" />
          </div>
          <div class="w-full flex flex-col gap-1">
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75">3 980</p>
            </div>
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75">3 980</p>
            </div>
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75">3 980</p>
            </div>
          </div>
        </div>
      </div>
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
