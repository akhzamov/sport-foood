<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getUserById, editUserById } from "./employees.data";
import { useProfileStore } from "~/modules/profile/stores/profile";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const schema = yup.object({
  username: yup
    .string()
    .required("Введите Имя Фамилия")
    .min(6, "Не должно быть меньше 6-и символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Не должно быть меньше 6-и символов"),
  contact: yup
    .string()
    .required("Введите контактные данные")
    .min(6, "Не должно быть меньше 6-и символов"),
  selectedStore: yup.number().nullable().required("Выберите магазины"),
  selectedRole: yup.number().nullable().required("Выберите роль"),
  selectedStatus: yup.number().nullable().required("Выберите статус"),
});
interface ISchemaForm {
  username: string;
  password: string;
  contact: string;
  selectedStore: number[];
  selectedRole: number;
  selectedStatus: number;
}
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: username, errorMessage: usernameError } =
  useField<string>("username");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: contact, errorMessage: contactError } =
  useField<string>("contact");
const { value: selectedStore, errorMessage: selectedStoreError } =
  useField<number[]>("selectedStore");
const { value: selectedRole, errorMessage: selectedRoleError } =
  useField<number>("selectedRole");
const { value: selectedStatus, errorMessage: selectedStatusError } =
  useField<number>("selectedStatus");

const adminStore = useAdminStore();
const profileStore = useProfileStore();
const mainStore = useMainStore();
const personalStore = usePersonalStore();
const toggle = ref(false);
const openPermission = ref(false);
const openPermissionName = ref("");
const openPermissionSubGroup = ref("");
const openStoresList = ref(false);
let checkedStore = reactive<number[]>([]);
let checkedPermissions = reactive<string[]>([]);
const storesMenuShow = ref(false);
const rolesMenuShow = ref(false);
const statusMenuShow = ref(false);
const roles = reactive([
  {
    id: 1,
    name: "Администратор",
  },
  {
    id: 2,
    name: "Главный оператор +",
  },
  {
    id: 3,
    name: "Главный оператор",
  },
  {
    id: 4,
    name: "Оператор",
  },
]);
const statuses = reactive([
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);

const togglePermission = (permissionName: string, isChecked: boolean) => {
  if (personalStore.employee) {
    // Если чекбокс установлен (isChecked = true), добавляем право
    if (isChecked) {
      if (!personalStore.employee.permissions.includes(permissionName)) {
        personalStore.employee.permissions.push(permissionName);
        checkedPermissions.push(permissionName);
      }
    }
    // Если чекбокс снят (isChecked = false), удаляем право
    else {
      personalStore.employee.permissions =
        personalStore.employee.permissions.filter(
          (perm) => perm !== permissionName
        );
      const index = checkedPermissions.indexOf(permissionName);
      if (index !== -1) {
        checkedPermissions.slice(index, 1);
      }
    }
  }
};
const activePermissions = () => {
  const userPermissions = personalStore.employee?.permissions || []; // Права текущего пользователя
  checkedPermissions.length = 0;

  if (!userPermissions.length || !personalStore.permissions) {
    console.warn("Нет данных для проверки прав");
    return;
  }

  for (const key in personalStore.permissions) {
    const group = personalStore.permissions[key];

    for (const subKey in group) {
      const permissionsArray = group[subKey];

      // Проверяем, существует ли массив, перед тем как вызывать forEach
      if (Array.isArray(permissionsArray)) {
        permissionsArray.forEach((permission) => {
          // Устанавливаем checked = true, если права совпадают
          permission.checked = userPermissions.includes(permission.name);
          if (permission.checked) {
            checkedPermissions.push(permission.name);
          }
        });
      }
    }
  }
};
const updateCheckedStores = () => {
  checkedStore.length = 0;
  if (!personalStore.employee || !profileStore.stores) {
    console.warn("Не хватает данных для обработки");
    return;
  }
  // Пройдемся по магазинам из профиля и сверим с магазинами сотрудника
  profileStore.stores.forEach((store) => {
    store.checked = false;
    const isEmployeeStore = personalStore.employee?.stores.some(
      (employeeStore) => employeeStore.id === store.id
    );

    if (isEmployeeStore) {
      store.checked = true;
      checkedStore.push(store.id);
    }
  });
};
const toggleStoreChecked = (storeId: number) => {
  const store = profileStore.stores?.find((s) => s.id === storeId);

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
const openAndClosePermission = (
  key: string | number,
  permissionName: string
) => {
  const isCurrentlyOpen =
    openPermission.value &&
    openPermissionName.value === key.toString() &&
    openPermissionSubGroup.value === permissionName;

  if (isCurrentlyOpen) {
    // Закрываем окно
    openPermissionName.value = "";
    openPermissionSubGroup.value = "";
    openPermission.value = false;
  } else {
    // Открываем окно с новыми значениями
    openPermissionName.value = key.toString();
    openPermissionSubGroup.value = permissionName;
    openPermission.value = true;
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    if (!usernameError.value && !contactError.value && adminStore.openUser) {
      const data = {
        username: values.username,
        contact: values.contact,
        stores: checkedStore,
        permissions: checkedPermissions,
      };
      editUserById(adminStore.openUser, data);
    }
  } catch (error) {
    console.error("Ошибка при изменении пользователя: ", error);
  }
});

watch(
  () => personalStore.employee,
  () => {
    if (personalStore.employee) {
      activePermissions();
      checkedStore.length = 0;
      updateCheckedStores();
    }
  },
  { deep: true }
);

onUnmounted(() => {
  profileStore.stores?.forEach((item) => {
    item.checked = false;
  });
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="sticky z-[20] w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Имя пользователя
        </label>
        <UiInput
          v-model:model-value="username"
          placeholder="malik"
          type="text"
          class="text-gray-90-color"
        />
        <span v-if="usernameError" class="text-14-ext text-error-500 mt-[2px]">
          {{ usernameError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Пароль </label>
        <UiInput
          v-model:model-value="password"
          placeholder="******"
          type="password"
          class="text-gray-90-color"
        />
        <span v-if="passwordError" class="text-14-ext text-error-500 mt-[2px]">
          {{ passwordError }}
        </span>
      </div>
    </div>
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Контакт </label>
        <UiInput
          :modelValue="contact"
          placeholder="+ _ ( _ _ _ ) _ _ _ - _ _ - _ _ | info@gmail.com"
          type="text"
          class="text-gray-90-color"
        />
        <span v-if="contactError" class="text-14-ext text-error-500 mt-[2px]">
          {{ contactError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Магазин</label>
        <UiMultipleSelect
          main-text-color="text-gray-90-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="profileStore.stores ?? []"
          :show-menu="storesMenuShow"
          default-select-text="Выбрать магазины"
          v-model:model-value="selectedStore"
          value-key="id"
          label-key="name"
          @update:show-menu="storesMenuShow = $event"
          :text-center="false"
          :disable="false"
          class="w-full z-[70]"
        />
        <span
          v-if="selectedStoreError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedStoreError }}
        </span>
      </div>
    </div>
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Роль </label>
        <UiSelect
          main-text-color="text-gray-90-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="roles"
          :show-menu="rolesMenuShow"
          default-select-text="Выбрать роль"
          v-model:model-value="selectedRole"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:model-value="selectedRole = $event"
          @update:show-menu="rolesMenuShow = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[60]"
        />
        <span
          v-if="selectedRoleError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedRoleError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Статус</label>
        <UiSelect
          main-text-color="text-gray-90-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="statuses"
          :show-menu="statusMenuShow"
          default-select-text="Выбрать роль"
          v-model:model-value="selectedStatus"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:model-value="selectedStatus = $event"
          @update:show-menu="statusMenuShow = $event"
          width="w-full"
          :text-center="false"
          :disable="false"
          class="h-[40px] z-[60]"
        />
        <span
          v-if="selectedStatusError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedStatusError }}
        </span>
      </div>
    </div>
    <!-- <div class="w-full flex flex-col mt-3">
      <p class="text-12-reg text-gray-90-color">Магазины</p>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color mt-2"
      >
        <div class="w-full h-8 flex items-center justify-between">
          <p class="text-16-reg text-gray-75-color">Выбор магазина</p>
        </div>
        <div
          class="w-full h-max flex flex-col px-2 rounded-lg bg-dark-gunmental-color select-none"
        >
          <div
            class="w-full h-8 flex items-center justify-between cursor-pointer"
            @click="openStoresList = !openStoresList"
          >
            <p class="text-16-reg text-gray-75-color">Открыть список</p>
            <IconChevronDown class="text-gray-75-color" />
          </div>
          <div
            class="w-full h-max flex flex-col gap-1 mt-4 pb-1"
            v-if="openStoresList"
          >
            <template v-for="store in profileStore.stores">
              <div
                class="w-full h-8 flex items-center justify-between px-2 rounded cursor-pointer hover:bg-dark-onix-color"
                @click="toggleStoreChecked(store.id)"
              >
                <span class="text-14-med text-gray-75-color">
                  {{ store.name }}
                </span>
                <UiCheckbox
                  v-model:model-value="store.checked"
                  @click="toggleStoreChecked(store.id)"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40-color"
    ></div>
    <div class="flex items-start justify-between flex-col gap-3 mt-3">
      <p class="text-12-reg text-gray-90-color">Доступы</p>
      <template v-for="(permissionGroup, key) in personalStore.permissions">
        <div
          class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
        >
          <div class="w-full h-8 flex items-center justify-between">
            <p class="text-16-reg text-gray-75-color">{{ key }}</p>
          </div>
          <template v-for="(permission, permissionKey) in permissionGroup">
            <div
              @click="openAndClosePermission(key, permissionKey)"
              class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color cursor-pointer select-none"
            >
              <p class="text-16-reg text-gray-75-color">
                {{ permissionKey }}
              </p>
              <IconChevronDown class="text-gray-75-color" />
            </div>
            <template
              v-for="(permissionValue, permissionValueKey) in permission"
            >
              <div
                v-if="
                  openPermissionSubGroup == permissionKey &&
                  openPermissionName == key &&
                  openPermission
                "
                class="w-full h-max flex flex-col items-center justify-between gap-3 p-2 rounded-lg bg-dark-onix-color cursor-pointer"
              >
                <div class="w-full flex items-center justify-between">
                  <p class="text-16-reg text-gray-75-color">
                    {{ permissionValue.display_name }}
                  </p>
                  <UiToggle
                    v-model:model-value="permissionValue.checked"
                    @update:model-value="
                      togglePermission(
                        permissionValue.name,
                        permissionValue.checked
                      )
                    "
                  />
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
    </div> -->
    <div class="flex items-center justify-between gap-2 mt-3">
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
        bgColor="bg-primary-color"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night-color"
        text="Сохранить"
        class="max-w-[110px]"
        @click="onSubmit"
      />
    </div>
  </form>
</template>

<style scoped></style>
