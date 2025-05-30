<script lang="ts" setup>
import IconUsers01 from "~/components/icon/Users01.vue";
import IconSettings from "~/components/icon/Settings.vue";
import IconRoute from "~/components/icon/Route.vue";
import IconCurrencyDollarCircle from "~/components/icon/CurrencyDollarCircle.vue";
import IconInfoCircle from "~/components/icon/InfoCircle.vue";
import IconTrendUp from "~/components/icon/TrendUp.vue";

const route = useRoute();
const links = reactive([
  {
    id: 1,
    name: "Персонал",
    icon: markRaw(IconUsers01),
    children: [
      {
        id: 1,
        name: "Сотрудники",
        path: "/admin-employees",
      },
      {
        id: 2,
        name: "Торговые агенты",
        path: "/admin-sales-agents",
      },
      {
        id: 3,
        name: "Водители",
        path: "/admin-drivers",
      },
      {
        id: 4,
        name: "Роли",
        path: "/admin-roles",
      },
    ],
  },
  {
    id: 2,
    name: "Настройки",
    icon: markRaw(IconSettings),
    children: [
      {
        id: 1,
        name: "Города",
        path: "/setting-cities",
      },
      {
        id: 2,
        name: "Районы",
        path: "/setting-districts",
      },
      {
        id: 3,
        name: "Продукты",
        path: "/setting-products",
      },
      {
        id: 4,
        name: "Торговые площадки",
        path: "/setting-marketplaces",
      },
      {
        id: 5,
        name: "Магазины",
        path: "/setting-stores",
      },
      {
        id: 6,
        name: "Поставщики",
        path: "/setting-suppliers",
      },
    ],
  },
  {
    id: 3,
    name: "Логистика",
    icon: markRaw(IconRoute),
    children: [
      {
        id: 1,
        name: "Управление закупками",
        path: "/admin-procurement-management",
      },
    ],
  },
  {
    id: 4,
    name: "Заявки на оплату",
    icon: markRaw(IconCurrencyDollarCircle),
    path: "/payment-requests",
  },
  {
    id: 5,
    name: "Логи",
    icon: markRaw(IconInfoCircle),
    path: "/admin-history",
  },
  {
    id: 5,
    name: "Отчеты по продажам",
    icon: markRaw(IconTrendUp),
    path: "/admin-sales-reports",
  },
]);
const activeLink = ref<null | number>(null);
const handleActiveLink = (id: number) => {
  if (activeLink.value != id) {
    activeLink.value = id;
  } else {
    activeLink.value = null;
  }
};
</script>

<template>
  <div class="min-w-[240px] h-full bg-dark-gunmental border-r border-gray-15">
    <div
      class="w-full h-full flex flex-col items-start justify-start gap-4 py-3 px-2"
    >
      <template v-for="link in links" :key="link.id">
        <div
          v-if="link.children"
          @click="handleActiveLink(link.id)"
          class="w-full h-[30px] flex items-center justify-between cursor-pointer px-3"
        >
          <div class="flex items-center justify-start gap-2">
            <component
              :is="link.icon"
              :class="[link.id != activeLink ? 'text-gray-40' : 'text-primary']"
            />
            <p
              class="text-12-semi"
              :class="[link.id != activeLink ? 'text-gray-40' : 'text-primary']"
            >
              {{ link.name }}
            </p>
          </div>
          <IconChevronDown
            class="transition-all duration-200"
            :class="[
              link.id != activeLink
                ? 'text-gray-40 rotate-[180deg]'
                : 'text-primary',
            ]"
          />
        </div>
        <NuxtLink
          v-if="!link.children && link.path"
          :to="link.path"
          class="w-full h-[30px] flex items-center justify-start gap-2 cursor-pointer px-3 text-gray-40 hover:text-primary"
          :class="[route.path == link.path ? 'text-primary' : '']"
        >
          <component :is="link.icon" />
          <p class="text-12-semi">
            {{ link.name }}
          </p>
        </NuxtLink>
        <div
          v-if="link.id == activeLink"
          class="w-full h-max flex flex-col items-start justify-center px-3"
        >
          <p
            v-if="link.children && link.children.length <= 0"
            class="text-12-semi text-gray-40 pl-8"
          >
            Пусто
          </p>
          <NuxtLink
            v-for="child in link.children"
            :key="child.id"
            :to="child.path"
            class="w-full h-[30px] flex items-center justify-start text-12-semi pl-8 rounded-md hover:bg-gray-15"
            :class="[
              route.path == child.path ? 'text-primary' : 'text-gray-40',
            ]"
          >
            {{ child.name }}
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
