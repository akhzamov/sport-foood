<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useAdminLogisticsStore } from "../../../logistics/stores/adminLogistics";
import { getSalesAgentById } from "./salesAgents.data";

const adminStore = useAdminStore();
const toggle = ref(false);
const openPermission = ref(false);
const openPermissionID = ref("");
const openPermissionName = ref("");

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
const openAndClosePermission = (key: string, permissionName: string) => {
  if (openPermission.value) {
    openPermission.value = false;
    openPermissionID.value = "";
    openPermissionName.value = "";
  } else {
    openPermission.value = true;
    openPermissionID.value = key;
    openPermissionName.value = permissionName;
  }
};

onMounted(() => {
  getSalesAgentById(adminStore.openUser ? adminStore.openUser : 0)
});
</script>

<template>
  <div
    v-if="adminStore.salesAgent"
    class="sticky z-[20] w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Имя Фамилия </label>
        <UiInput
          :modelValue="adminStore.salesAgent?.name"
          @update:modelValue="
            (value) => {
              if (adminStore.salesAgent) {
                adminStore.salesAgent.name = value;
              }
            }
          "
          placeholder="Иван Васильевич"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <!-- <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Фамилия </label>
        <UiInput
          :modelValue="adminStore.employee?.contact"
          @update:modelValue="
            (value) => {
              if (adminStore.employee) {
                adminStore.employee.contact = value;
              }
            }
          "
          placeholder="Васильевич"
          type="text"
          class="text-gray-90-color"
        />
      </div> -->
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"> Телефон </label>
        <UiInput
          :modelValue="adminStore.salesAgent?.phone"
          @update:modelValue="
            (value) => {
              if (adminStore.salesAgent) {
                adminStore.salesAgent.phone = value;
              }
            }
          "
          placeholder="Телефон номер"
          type="text"
          class="text-gray-90-color"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Статус</label>
        <UiInput
          :modelValue="adminStore.salesAgent?.status"
          @update:modelValue="
            (value) => {
              if (adminStore.salesAgent) {
                adminStore.salesAgent.status = value;
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
    <div class="w-full flex flex-col items-start mt-3">
      <p class="text-14-reg text-gray-90-color mb-2">Остатки на руках</p>
      <div
        class="w-full flex flex-col items-start gap-1 border border-gray-15-color p-2 rounded-lg"
      >
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40-color">1</p>
          <div
            class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15-color"
          >
            <p class="text-14-reg text-gray-75-color">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40-color">2</p>
          <div
            class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15-color"
          >
            <p class="text-14-reg text-gray-75-color">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
        <div class="w-full flex items-center justify-start gap-1">
          <p class="text-14-reg text-gray-40-color">3</p>
          <div
            class="w-full h-[30px] flex items-center justify-between px-2 rounded-md bg-gray-15-color"
          >
            <p class="text-14-reg text-gray-75-color">Протеин</p>
            <p class="text-14-semi text-white">8 500,00 гр</p>
          </div>
        </div>
      </div>
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
    <div
      class="w-full h-[1px] block mt-3 border border-dashed border-gray-40-color"
    ></div>
    <div
      class="w-full flex flex-col rounded-md border border-gray-15-color bg-gray-15-color mt-3"
    >
      <div
        class="w-full h-[40px] flex items-center justify-between px-4 bg-white/5"
      >
        <p class="text-16-reg text-gray-40-color">Выдано со склада</p>
        <IconPlus class="text-gray-40-color hover:text-primary-color ml-4" />
      </div>
      <div class="w-full h-max flex flex-col p-2">
        <div class="w-full h-max flex flex-col px-2 py-1 bg-gray-15-color rounded">
          <div class="w-full min-h-[24px] h-[24px] flex items-center gap-1 pl-[5px]">
            <p class="flex-grow h-full text-left text-14-reg text-gray-90-color">
              ID 345871
            </p>
            <p class="w-[104px] h-full text-center text-14-ext text-gray-75-color">
              27.11.2024
            </p>
            <p class="w-[140px] h-full pr-[12px] text-end text-14-reg text-gray-90-color">
              430 000
            </p>
            <IconChevronDown class="text-gray-90-color" />
          </div>
          <div class="w-full flex flex-col gap-1">
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental-color"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75-color">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40-color">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75-color">3 980</p>
            </div>
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental-color"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75-color">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40-color">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75-color">3 980</p>
            </div>
            <div
              class="w-full h-[32px] flex items-center justify-between rounded-lg pl-2 pr-[40px] bg-dark-gunmental-color"
            >
              <p class="flex-grow text-start text-14-reg text-gray-75-color">Протеин</p>
              <p class="w-[140px] text-end text-14-reg text-gray-40-color">3 980 гр</p>
              <p class="w-[148px] text-end text-14-reg text-gray-75-color">3 980</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
