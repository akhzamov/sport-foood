<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useAdminLogisticsStore } from "../../../logistics/stores/adminLogistics";
import { getUserById, editUserById } from "./employees.data";

const adminStore = useAdminStore();
const removePermission = (permissionName: string) => {
  if (adminStore.employee) {
    const updatedPermissions = adminStore.employee.permissions.filter(
      (perm) => perm !== permissionName
    );
    adminStore.employee.permissions = [];
    adminStore.employee.permissions.push(...updatedPermissions);
  }
};

const addPermission = (permissionName: string) => {
  if (adminStore.employee) {
    if (!adminStore.employee.permissions.includes(permissionName)) {
      adminStore.employee.permissions.push(permissionName);
    }
  }
};

onMounted(() => {
  getUserById(adminStore.openUser ? adminStore.openUser : 0);
});
</script>

<template>
  <div
    v-if="adminStore.employee"
    class="sticky z-[20] w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Имя пользователя</label
        >
        <UiInput
          :modelValue="adminStore.employee?.username"
          @update:modelValue="
            (value) => {
              if (adminStore.employee) {
                adminStore.employee.username = value;
              }
            }
          "
          placeholder="SkyHunter"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Контакт </label>
        <UiInput
          :modelValue="adminStore.employee?.contact"
          @update:modelValue="
            (value) => {
              if (adminStore.employee) {
                adminStore.employee.contact = value;
              }
            }
          "
          placeholder="Телефон или почта"
          type="text"
          class="text-gray-90-color"
        />
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Должность </label>
        <UiInput
          :modelValue="adminStore.employee?.role"
          @update:modelValue="
            (value) => {
              if (adminStore.employee) {
                adminStore.employee.role = value;
              }
            }
          "
          placeholder="Администратор"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Статус</label>
        <UiInput
          :modelValue="adminStore.employee?.status"
          @update:modelValue="
            (value) => {
              if (adminStore.employee) {
                adminStore.employee.status = value;
              }
            }
          "
          placeholder="Администратор"
          type="text"
          class="text-gray-90-color"
          disabled
        />
      </div>
    </div>
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40-color"
    ></div>
    <div class="flex items-start justify-between flex-col gap-3 mt-3">
      <p class="text-12-reg text-gray-90-color">Доступы</p>
      <template v-for="(permissionGroup, key) in adminStore.permissions?.data">
        <div
          class="w-full h-max flex flex-col gap-1 px-2 py-1 rounded-[4px] bg-gray-15-color"
        >
          <div class="w-full h-8 flex items-center justify-between">
            <p class="text-16-reg text-gray-75-color">{{ key }}</p>
            <IconChevronDown class="text-gray-90-color" />
          </div>
          <template v-for="permission in permissionGroup">
            <div
              class="w-full h-8 flex items-center justify-between px-2 rounded-lg bg-dark-gunmental-color"
            >
              <p class="text-16-reg text-gray-75-color">
                {{ permission.display_name }}
              </p>
              <div class="h-full flex items-center gap-2 cursor-pointer">
                <!-- <div
                  class="w-7 h-7 flex items-center justify-center rounded-[4px] bg-white/5"
                >
                  <IconEdit05 class="text-gray-90-color w-5 h-5" />
                </div> -->
                <div
                  @click="addPermission(permission.name)"
                  class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 text-gray-90-color hover:text-success-500"
                >
                  <IconPlus class="w-5 h-5" />
                </div>
                <div
                  @click="removePermission(permission.name)"
                  class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5 text-gray-90-color hover:text-error-500"
                >
                  <IconTrash03 class="w-5 h-5" />
                </div>
                <div
                  class="w-6 h-6 flex items-center justify-center rounded-[4px] bg-white/5"
                >
                  <IconCheck
                    :class="{
                      'text-error-500':
                        !adminStore.employee?.permissions.includes(
                          permission.name
                        ),
                      'text-malachite':
                        adminStore.employee?.permissions.includes(
                          permission.name
                        ),
                    }"
                    class="w-5 h-5"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
    <div class="flex items-center justify-end gap-2 mt-3">
      <UiButton
        bgColor="bg-primary-color"
        :border="false"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-dark-night-color"
        text="Сохранить"
        class="max-w-[110px]"
        @click="editUserById(adminStore.employee?.id)"
      />
      <UiButton
        bgColor="bg-gray-15-color"
        :border="true"
        borderColor="border-gray-90-color"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-gray-90-color"
        text="Отменить"
        class="max-w-[88px]"
      />
    </div>
  </div>
</template>

<style scoped></style>
