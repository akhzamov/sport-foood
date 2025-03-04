<script lang="ts" setup>
import { removeAuthToken } from "~/utils/auth";

const router = useRouter();
let timeTimeout: NodeJS.Timeout;
const logOut = () => {
  removeAuthToken();
};
const handleRoutPush = (link: string) => {
  router.push(link);
};
const currentTime = ref(
  new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  })
);

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const now = new Date();
  const delay = 1000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  timeTimeout = setTimeout(updateTime, delay);
};

onMounted(() => {
  updateTime();
});

onBeforeMount(() => {
  clearTimeout(timeTimeout);
});
</script>

<template>
  <nav class="flex flex-col">
    <div class="bg-dark-night py-3">
      <div class="px-5 w-full flex items-center justify-between">
        <div class="flex items-center gap-8">
          <NuxtLink to="/">
            <img src="@/assets/img/logo.svg" alt="" />
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 mr-2">
            <div class="flex items-center text-gray-40 gap-1">
              <IconCalendar class="w-[15px] h-[15px]" />
              <p class="text-12-reg">
                Сегодня:
                <span class="text-12-ext">
                  {{
                    new Date().toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                </span>
              </p>
            </div>
            <div class="flex items-center text-gray-40 gap-1">
              <IconClock class="w-[15px] h-[15px]" />
              <p class="text-12-reg">
                {{ currentTime }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75 hover:text-primary"
            >
              <IconBell class="w-full h-full" />
            </div>
            <div
              class="flex item-center justify-center w-6 h-6 cursor-pointer text-gray-75 hover:text-primary"
            >
              <IconSupport class="w-full h-full" />
            </div>
          </div>
          <div class="flex items-center gap-4 w-max">
            <UiButton
              text="Мой профиль"
              bg-color="bg-primary"
              text-color="text-dark-night"
              hover="opacity-[0.8]"
              :icon="true"
              :border="false"
              class="w-max px-4"
            >
              <template v-slot:icon>
                <IconUserSquare class="text-dark-night" />
              </template>
            </UiButton>
            <UiButton
              text="Витрина магазина"
              bg-color="bg-gray-15"
              text-color="text-gray-90"
              border-color="border-gray-90"
              hover="opacity-[0.8]"
              :icon="true"
              :border="true"
              class="w-max px-4"
              @click="handleRoutPush('/profile-dashboard')"
            >
              <template v-slot:icon>
                <IconBranch class="text-gray-90" />
              </template>
            </UiButton>
          </div>
          <div class="flex items-center w-max">
            <NuxtLink
              to="/sign-in"
              @click="logOut()"
              class="w-max flex items-center gap-2 cursor-pointer"
            >
              <IconLogOut class="text-error-500" />
              <span class="text-16-reg text-error-500">Выйти</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
