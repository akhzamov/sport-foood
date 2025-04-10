<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useProfileStore } from "~/modules/profile/stores/profile";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useMainStore } from "~/stores/main";
import { usePersonalStore } from "~/modules/admin/stores/personal";

const schema = yup.object({
  username: yup.string().required("Введите имя пользователя").min(4, "Не должно быть меньше 4-и символов"),
  contact: yup.string().min(6, "Не должно быть меньше 6-и символов"),
  selectedStores: yup.array().required("Выберите магазины").min(1, "Выберите хотя бы один магазин"),
  selectedPermissions: yup.array().required("Выберите доступ").min(1, "Выберите хотя бы один доступ"),
  selectedRole: yup.string().required("Выберите роль"),
  selectedStatus: yup.number().nullable().required("Выберите статус"),
});
interface ISchemaForm {
  username: string;
  contact: string;
  selectedStores: number[];
  selectedPermissions: string[];
  selectedRole: string;
  selectedStatus: number | null;
}
const initialValues: ISchemaForm = {
  username: "",
  contact: "",
  selectedStores: [],
  selectedPermissions: [],
  selectedRole: "",
  selectedStatus: null,
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: username, errorMessage: usernameError } = useField<string>("username");
const { value: contact, errorMessage: contactError } = useField<string>("contact");
const { value: selectedStores, errorMessage: selectedStoresError } = useField<number[]>("selectedStores");
const { value: selectedPermissions, errorMessage: selectedPermissionsError } =
  useField<string[]>("selectedPermissions");
const { value: selectedRole, errorMessage: selectedRoleError } = useField<string>("selectedRole");
const { value: selectedStatus, errorMessage: selectedStatusError } = useField<number | null>(
  "selectedStatus"
);

const adminStore = useAdminStore();
const profileStore = useProfileStore();
const mainStore = useMainStore();
const personalStore = usePersonalStore();
const openPermissionGroup = reactive<string[]>([]);
const openPermissionSubGroup = reactive<string[]>([]);
const openStoresList = ref(false);
const rolesMenuShow = ref(false);
const statusMenuShow = ref(false);
const { closeTab } = useTabs();
const roles = reactive([
  {
    id: 1,
    name: "Оператор",
    value: "OPERATOR",
  },
]);
const statuses = reactive([
  { id: 2, name: "В отпуске" },
  { id: 3, name: "Работает" },
  { id: 4, name: "Болен" },
  { id: 5, name: "Отсутствует" },
  { id: 6, name: "Уволен" },
]);
const { getUserById, editUserById } = usePersonalEmployeesResponse();

const togglePermission = (permissionName: string, isChecked: boolean) => {
  if (personalStore.employee) {
    // Если чекбокс установлен (isChecked = true), добавляем право
    if (isChecked) {
      if (!personalStore.employee.permissions.includes(permissionName)) {
        personalStore.employee.permissions.push(permissionName);
        selectedPermissions.value.push(permissionName);
      }
    }
    // Если чекбокс снят (isChecked = false), удаляем право
    else {
      personalStore.employee.permissions = personalStore.employee.permissions.filter(
        (perm) => perm !== permissionName
      );
      const index = selectedPermissions.value.indexOf(permissionName);
      if (index !== -1) {
        selectedPermissions.value.slice(index, 1);
      }
    }
  }
};
const activePermissions = () => {
  const userPermissions = personalStore.employee?.permissions || []; // Права текущего пользователя
  selectedPermissions.value.length = 0;

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
            selectedPermissions.value.push(permission.name);
          }
        });
      }
    }
  }
};
const updateCheckedStores = () => {
  selectedStores.value.length = 0;
  if (!personalStore.employee || !mainStore.stores) {
    console.warn("Не хватает данных для обработки");
    return;
  }
  // Пройдемся по магазинам из профиля и сверим с магазинами сотрудника
  mainStore.stores.forEach((store) => {
    store.checked = false;
    const isEmployeeStore = personalStore.employee?.stores.some(
      (employeeStore) => employeeStore.id === store.id
    );

    if (isEmployeeStore) {
      store.checked = true;
      selectedStores.value.push(store.id);
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
    if (!selectedStores.value.includes(storeId)) {
      selectedStores.value.push(storeId);
    }
  } else {
    // Если отключили checked, удаляем из массива
    const index = selectedStores.value.indexOf(storeId);
    if (index !== -1) {
      selectedStores.value.splice(index, 1);
    }
  }
};
const openAndClosePermissionGroup = (group: string) => {
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
    if (adminStore.openUser) {
      const data = {
        username: values.username,
        contact: values.contact,
        stores: values.selectedStores,
        permissions: values.selectedPermissions,
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
      updateCheckedStores();
    }
  },
  { deep: true }
);

onMounted(async () => {
  await getUserById(adminStore.openUser ? adminStore.openUser : 0);
  if (personalStore.employee) {
    username.value = personalStore.employee.username;
    contact.value = personalStore.employee.contact ?? "";
  }
});

onUnmounted(() => {
  mainStore.stores?.forEach((item) => {
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
    v-if="personalStore.employee && !mainStore.isLoading"
    @submit.prevent="onSubmit"
    class="sticky z-[20] w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-max flex items-start justify-between gap-[2%] mt-3">
      <div class="w-[49%] h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Имя пользователя </label>
        <UiInput v-model:model-value="username" placeholder="" type="text" class="text-gray-90" />
        <span v-if="usernameError" class="text-14-ext text-error-500 mt-[2px]">
          {{ usernameError }}
        </span>
      </div>
      <div class="w-[49%] h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Контакт </label>
        <UiInput :modelValue="contact" placeholder="" type="text" class="text-gray-90" />
      </div>
    </div>
    <div class="w-full h-max flex items-start justify-between gap-[2%] mt-3"></div>
    <div class="w-full h-max flex items-start justify-between gap-3 mt-3">
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1"> Роль </label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
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
        <span v-if="selectedRoleError" class="text-14-ext text-error-500 mt-[2px]">
          {{ selectedRoleError }}
        </span>
      </div>
      <div class="w-full h-full flex flex-col">
        <label class="text-12-reg text-gray-90 mb-1">Статус</label>
        <UiSelect
          main-text-color="text-gray-90"
          select-bg-color="bg-gray-15"
          disable-text-color="text-gray-40"
          disable-bg-color="bg-gray-15"
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
        <span v-if="selectedStatusError" class="text-14-ext text-error-500 mt-[2px]">
          {{ selectedStatusError }}
        </span>
      </div>
    </div>
    <div class="w-full h-[1px] block mt-3 border border-dashed border-gray-40"></div>
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
      <span v-if="selectedStoresError" class="text-14-ext text-error-500 mt-[2px]">
        {{ selectedStoresError }}
      </span>
    </div>
    <div class="flex items-start justify-between flex-col gap-3 mt-3">
      <p class="text-12-reg text-gray-90">Доступы</p>
      <div
        class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15"
        v-for="(permissionGroup, key) in personalStore.permissions"
        :key="key"
      >
        <div
          class="w-full flex-grow h-8 flex items-center justify-between"
          @click="openAndClosePermissionGroup(key.toString())"
        >
          <p class="text-16-reg text-gray-75">{{ key }}</p>
          <IconChevronDown
            class="text-gray-75"
            :class="[openPermissionGroup.includes(key.toString()) ? 'rotate-180' : '']"
          />
        </div>
        <template v-for="(permission, permissionKey) in permissionGroup">
          <div
            @click="openAndClosePermission(permissionKey)"
            class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental cursor-pointer select-none"
            v-if="openPermissionGroup.includes(key.toString())"
          >
            <p class="text-16-reg text-gray-75">
              {{ permissionKey }}
            </p>
            <IconChevronDown
              class="text-gray-75"
              :class="[openPermissionSubGroup.includes(permissionKey) ? 'rotate-180' : '']"
            />
          </div>
          <template v-for="(permissionValue, permissionValueKey) in permission">
            <div
              v-if="openPermissionSubGroup.includes(permissionKey)"
              class="w-full h-max flex flex-col items-center justify-between gap-3 p-2 rounded-lg bg-dark-onix cursor-pointer"
            >
              <div class="w-full flex items-center justify-between">
                <p class="text-16-reg text-gray-75">
                  {{ permissionValue.display_name }}
                </p>
                <UiToggle
                  v-model:model-value="permissionValue.checked"
                  @update:model-value="togglePermission(permissionValue.name, permissionValue.checked)"
                />
              </div>
            </div>
          </template>
        </template>
      </div>
      <span v-if="selectedPermissionsError" class="text-14-ext text-error-500 mt-[2px]">
        {{ selectedPermissionsError }}
      </span>
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
        @click="closeTab(`employees-edit-${adminStore.openUser}`)"
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
          @click="onSubmit"
        />
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
