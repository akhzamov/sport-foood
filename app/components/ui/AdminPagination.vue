<script setup lang="ts">
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
const localCurrentPage = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newValue) => {
    localCurrentPage.value = newValue;
  }
);

const displayPages = computed(() => {
  const pagesToDisplay: (number | string)[] = [];
  if (props.totalPages <= 6) {
    // Если страниц <= 6, отображаем все страницы
    for (let i = 1; i <= props.totalPages; i++) {
      pagesToDisplay.push(i);
    }
  } else {
    const firstPages = [1, 2];
    const lastPages = [props.totalPages - 1, props.totalPages];

    if (localCurrentPage.value <= 3) {
      // Если текущая страница близка к началу
      pagesToDisplay.push(
        ...firstPages,
        3,
        4, // Добавляем 4, если она близко
        "...",
        ...lastPages
      );
    } else if (localCurrentPage.value >= props.totalPages - 2) {
      // Если текущая страница близка к концу
      pagesToDisplay.push(
        ...firstPages,
        "...",
        props.totalPages - 3, // Добавляем 3 страницы к концу
        props.totalPages - 2,
        ...lastPages
      );
    } else {
      // Если текущая страница где-то в середине
      pagesToDisplay.push(
        1,
        "...",
        localCurrentPage.value - 1,
        localCurrentPage.value,
        localCurrentPage.value + 1,
        "...",
        props.totalPages
      );
    }
  }

  return pagesToDisplay;
});

const updateCurrentPage = (page: number | string) => {
  if (typeof page === "string") return;
  localCurrentPage.value = page;
  emit("update:modelValue", page);
};
const nextPage = () => {
  if (localCurrentPage.value < props.totalPages) {
    updateCurrentPage(localCurrentPage.value + 1);
  }
};
const prevPage = () => {
  if (localCurrentPage.value > 1) {
    updateCurrentPage(localCurrentPage.value - 1);
  }
};
</script>

<template>
  <div
    class="w-max flex items-center justify-center bg-dark-gunmental-color border border-gray-15-color rounded-md overflow-hidden"
  >
    <button
      @click="prevPage"
      v-if="currentPage != 1"
      class="w-[52px] h-[40px] flex items-center justify-center px-2 border-r-[1px] border-gray-15-color text-14-semi text-gray-40-color"
    >
      <IconChevronLeft />
    </button>
    <div class="flex items-center justify-center">
      <div
        v-for="page in displayPages"
        @click="updateCurrentPage(page)"
        class="w-[40px] h-[40px] flex items-center justify-center b-border-pagination text-14-semi"
        :class="[
          { 'border-r-[1px] border-gray-15-color': page != totalPages },
          {
            'bg-primary-color text-dark-eerie-black-color': currentPage == page,
          },
          {
            'text-gray-40-color': currentPage != page,
          },
        ]"
      >
        {{ page }}
      </div>
    </div>
    <button
      @click="nextPage"
      v-if="currentPage != totalPages"
      class="w-[52px] h-[40px] flex items-center justify-center border-l-[1px] border-gray-15-color text-14-semi text-gray-40-color"
    >
      <IconChevronRight />
    </button>
  </div>
</template>

<style>
.b-border-pagination {
}
</style>
