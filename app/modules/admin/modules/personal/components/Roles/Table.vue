<script lang="ts" setup>
const allChecked = ref(false);
const employees = reactive([
  {
    id: 1,
    checked: false,
    name: "Дмитрий Петров",
    status: "on_leave",
    phone: "+7 (495) 123-45-67",
    position: "Старший менеджер",
    role: "Пользователь",
  },
  {
    id: 2,
    checked: false,
    name: "Екатерина Новикова",
    status: "is_working",
    phone: "+7 (916) 234-56-78",
    position: "Менеджер",
    role: "Пользователь",
  },
  {
    id: 3,
    checked: false,
    name: "Андрей Федоров",
    status: "sick",
    phone: "+7 (925) 345-67-89",
    position: "Администратор",
    role: "Администрация",
  },
  {
    id: 4,
    checked: false,
    name: "Мария Смирнова",
    status: "on_leave",
    phone: "+7 (499) 456-78-90",
    position: "Логист",
    role: "Перемещение",
  },
  {
    id: 5,
    checked: false,
    name: "Анна Соколова",
    status: "absent",
    phone: "+7 (903) 567-89-01",
    position: "Маркетолог",
    role: "Просмотр",
  },
  {
    id: 6,
    checked: false,
    name: "Юлия Михайлова",
    status: "dismissed",
    phone: "+7 (812) 678-90-12",
    position: "Маркетолог",
    role: "Просмотр",
  },
]);
</script>

<template>
  <div class="w-full h-full">
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40-color border-b border-gray-40-color"
        >
          <th class="w-[22px] text-end">№</th>
          <th class="w-[36px] flex items-center justify-center">
            <UiCheckbox
              v-model="allChecked"
              @click="allChecked = !allChecked"
            />
          </th>
          <th
            class="min-w-[394px] flex-grow flex items-center justify-start gap-1"
          >
            <span>Имя</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[160px] flex items-center justify-start gap-1">
            <span>Статус</span>
            <IconSwitchVertical01 class="w-[20px] h-[20px] cursor-pointer" />
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Телефон</span>
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Должность</span>
          </th>
          <th class="w-[180px] flex items-center justify-start">
            <span>Роль</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="employee in employees" :key="employee.id">
          <tr
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15-color border-b border-gray-40-color"
          >
            <th
              class="w-[22px] flex items-center justify-end text-14-reg text-gray-75-color"
            >
              {{ employee.id }}
            </th>
            <th class="w-[36px] flex items-center justify-center">
              <UiCheckbox v-model:model-value="employee.checked" />
            </th>
            <th
              class="min-w-[394px] flex-grow flex items-center justify-start gap-1 text-14-reg text-gray-75-color"
            >
              {{ employee.name }}
            </th>
            <th class="w-[160px] flex items-center justify-start gap-1">
              <span
                v-if="employee.status == 'on_leave'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-yellow-500/15 text-yellow-500"
              >
                В отпуске
              </span>
              <span
                v-if="employee.status == 'is_working'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-green-500/15 text-green-500"
              >
                Работает
              </span>
              <span
                v-if="employee.status == 'sick'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-white/15 text-white"
              >
                Болен
              </span>
              <span
                v-if="employee.status == 'absent'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Отсутствует
              </span>
              <span
                v-if="employee.status == 'dismissed'"
                class="px-2 py-1 rounded-[20px] text-12-reg bg-red-500/15 text-red-500"
              >
                Уволен
              </span>
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-reg text-gray-75-color"
            >
              {{ employee.phone }}
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-med text-gray-75-color"
            >
              {{ employee.position }}
            </th>
            <th
              class="w-[180px] flex items-center justify-start text-14-med text-gray-75-color"
            >
              {{ employee.role }}
            </th>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
