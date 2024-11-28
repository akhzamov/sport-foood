<script lang="ts" setup></script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <h4
      class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color"
    >
      Загрузка
    </h4>
    <div
      class="chart-loader flex items-center justify-center overflow-y-auto h-[360px] bg-dark-charcoal-color"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
