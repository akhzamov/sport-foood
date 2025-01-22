<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { getUserById, editUserById, createUser } from "./employees.data";
import { useProfileStore } from "~/modules/profile/stores/profile";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const schema = yup.object({
  username: yup
    .string()
    .required("Введите Имя Фамилия")
    .min(4, "Не должно быть меньше 4-и символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Не должно быть меньше 6-и символов"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Подтвердите пароль"),
  contact: yup
    .string()
    .required("Введите контактные данные")
    .min(6, "Не должно быть меньше 6-и символов"),
  selectedStores: yup
    .array()
    .required("Выберите магазины")
    .min(1, "Выберите хотя бы один магазин"),
  selectedPermissions: yup
    .array()
    .required("Выберите доступ")
    .min(1, "Выберите хотя бы один доступ"),
  selectedRole: yup.string().required("Выберите роль"),
});
interface ISchemaForm {
  username: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  selectedStores: number[];
  selectedPermissions: string[];
  selectedRole: string;
}
const initialValues: ISchemaForm = {
  username: "",
  password: "",
  passwordConfirm: "",
  contact: "",
  selectedStores: [],
  selectedPermissions: [],
  selectedRole: "",
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: username, errorMessage: usernameError } =
  useField<string>("username");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: passwordConfirm, errorMessage: passwordConfirmError } =
  useField<string>("passwordConfirm");
const { value: contact, errorMessage: contactError } =
  useField<string>("contact");
const { value: selectedStores, errorMessage: selectedStoresError } =
  useField<number[]>("selectedStores");
const { value: selectedPermissions, errorMessage: selectedPermissionsError } =
  useField<string[]>("selectedPermissions");
const { value: selectedRole, errorMessage: selectedRoleError } =
  useField<string>("selectedRole");

const adminStore = useAdminStore();
const profileStore = useProfileStore();
const personalStore = usePersonalStore();
const openPermissionGroup = reactive<string[]>([]);
const openPermissionSubGroup = reactive<string[]>([]);
const rolesMenuShow = ref(false);
const storesMenuShow = ref(false);
const roles = reactive([
  {
    id: 1,
    name: "Оператор",
    value: "OPERATOR",
  },
]);

const togglePermission = (permissionName: string) => {
  if (!selectedPermissions.value.includes(permissionName)) {
    selectedPermissions.value.push(permissionName);
  } else {
    const index = selectedPermissions.value.indexOf(permissionName);
    selectedPermissions.value.splice(index, 1);
  }

  console.log(selectedPermissions.value);
};
const openAndClosePermissionGroup = (group: string) => {
  openPermissionSubGroup.length = 0;
  if (group.length > 0) {
    if (!openPermissionGroup.includes(group)) {
      openPermissionGroup.push(group);
    } else {
      let i = openPermissionGroup.indexOf(group);
      openPermissionGroup.splice(i, 1);
    }
  }
};
const openAndClosePermission = (subGroup: string) => {
  if (subGroup.length > 0) {
    if (!openPermissionSubGroup.includes(subGroup)) {
      openPermissionSubGroup.push(subGroup);
    } else {
      let i = openPermissionSubGroup.indexOf(subGroup);
      openPermissionSubGroup.splice(i, 1);
    }
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const data = {
      username: values.username,
      contact: values.contact,
      password: values.password,
      password_confirmation: values.passwordConfirm,
      stores: values.selectedStores,
      permissions: values.selectedPermissions,
      role: values.selectedRole,
    };
    createUser(data);
  } catch (error) {
    console.error("Ошибка при изменении пользователя: ", error);
  }
});

onUnmounted(() => {
  profileStore.stores?.forEach((item) => {
    item.checked = false;
  });
  if (personalStore.permissions) {
    for (const key in personalStore.permissions) {
      const group = personalStore.permissions[key];
      for (const subKey in group) {
        const permissionsArray = group[subKey];
        if (Array.isArray(permissionsArray)) {
          permissionsArray.forEach((permission) => {
            permission.checked = false;
          });
        }
      }
    }
  }
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
        <label class="text-12-reg text-gray-90-color mb-1"> Контакт </label>
        <UiInput
          v-model:model-value="contact"
          placeholder="+ _ ( _ _ _ ) _ _ _ - _ _ - _ _ | info@gmail.com"
          type="text"
          class="text-gray-90-color"
        />
        <span v-if="contactError" class="text-14-ext text-error-500 mt-[2px]">
          {{ contactError }}
        </span>
      </div>
    </div>
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
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
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Повторите пароль
        </label>
        <UiInput
          v-model:model-value="passwordConfirm"
          placeholder="******"
          type="password"
          class="text-gray-90-color"
        />
        <span
          v-if="passwordConfirmError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ passwordConfirmError }}
        </span>
      </div>
    </div>
    <div class="w-full h-max flex items-start justify-between gap-[2%] mt-3">
      <div class="w-[49%] h-full flex flex-col">
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
          value-key="value"
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
      <div class="w-[49%] h-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Магазин</label>
        <UiMultipleSelect
          main-text-color="text-gray-90-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="profileStore.stores ?? []"
          :show-menu="storesMenuShow"
          default-select-text="Выбрать магазины"
          v-model:model-value="selectedStores"
          value-key="id"
          label-key="name"
          @update:show-menu="storesMenuShow = $event"
          :text-center="false"
          :disable="false"
          class="w-full z-[70]"
        />
        <span
          v-if="selectedStoresError"
          class="text-14-ext text-error-500 mt-[2px]"
        >
          {{ selectedStoresError }}
        </span>
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40-color"
    ></div>
    <div class="flex items-start justify-between flex-col gap-3 mt-3">
      <p class="text-12-reg text-gray-90-color">Доступы</p>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
        v-for="(permissionGroup, key) in personalStore.permissions"
        :key="key"
      >
        <div
          class="w-full flex-grow h-8 flex items-center justify-between"
          @click="openAndClosePermissionGroup(key.toString())"
        >
          <p class="text-16-reg text-gray-75-color">{{ key }}</p>
          <IconChevronDown
            class="text-gray-75-color"
            :class="[
              openPermissionGroup.includes(key.toString()) ? 'rotate-180' : '',
            ]"
          />
        </div>
        <template v-for="(permission, permissionKey) in permissionGroup">
          <div
            @click="openAndClosePermission(permissionKey)"
            class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color cursor-pointer select-none"
            v-if="openPermissionGroup.includes(key.toString())"
          >
            <p class="text-16-reg text-gray-75-color">
              {{ permissionKey }}
            </p>
            <IconChevronDown
              class="text-gray-75-color"
              :class="[
                openPermissionSubGroup.includes(permissionKey)
                  ? 'rotate-180'
                  : '',
              ]"
            />
          </div>
          <template v-for="(permissionValue, permissionValueKey) in permission">
            <div
              v-if="openPermissionSubGroup.includes(permissionKey)"
              class="w-full h-max flex flex-col items-center justify-between gap-3 p-2 rounded-lg bg-dark-onix-color cursor-pointer"
            >
              <div class="w-full flex items-center justify-between">
                <p class="text-16-reg text-gray-75-color">
                  {{ permissionValue.display_name }}
                </p>
                <UiToggle
                  v-model:model-value="permissionValue.checked"
                  @update:model-value="togglePermission(permissionValue.name)"
                />
              </div>
            </div>
          </template>
        </template>
      </div>
      <span
        v-if="selectedPermissionsError"
        class="text-14-ext text-error-500 mt-[2px]"
      >
        {{ selectedPermissionsError }}
      </span>
    </div>
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
