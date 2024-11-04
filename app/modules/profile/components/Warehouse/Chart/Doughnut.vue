<script lang="ts" setup>
import {
  Chart,
  DoughnutController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import datalabels from "chartjs-plugin-datalabels";
import type { ChartOptions, ChartConfiguration } from "chart.js";
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";
import type { TMarketplaceLeftRoundMarketplace } from "~/modules/profile/types/Warehouse/marketplaceLeft.type";

Chart.register(
  DoughnutController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  annotationPlugin,
  datalabels
);

const props = withDefaults(
  defineProps<{
    data: Record<string, TMarketplaceLeftRoundMarketplace>;
    id: number;
  }>(),
  {}
);

const warehouseStore = useWarehouseStore();
const chartDataArr = computed(() => props.data);
const chartWrapperD: Ref<HTMLDivElement | null> = ref(null);
let chart = ref<any>(null);
const isEmptyData = ref(false);

const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
      labels: {
        color: "#FFFFFFBF", // Цвет текста меток
        font: {
          size: 12,
        },
        padding: 10,
        boxWidth: 15,
        boxHeight: 15,
      },
    },
    title: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  cutout: "65%",
};

function prepareData() {
  const dataEntries = Object.entries(props.data);

  if (dataEntries.length === 0) {
    console.warn("Нет данных для создания графика.");
    return null;
  }

  const labels = dataEntries.map(([_, value]) => {
    return value?.marketplace_name;
  });
  const data = dataEntries.map(([_, value]) => {
    return typeof value?.left_weight === "number" ? value.left_weight : 0;
  });

  isEmptyData.value = data.reduce((sum, weight) => sum + weight) === 0;
  console.log(data);
  console.log(isEmptyData.value);

  return { labels, data };
}

function destroyChart() {
  if (chart.value) {
    chart.value.destroy();
    chart.value = null;
  }
}

function createChart(
  canvas: HTMLCanvasElement,
  labels: string[],
  data: number[]
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context.");
    return;
  }

  const config: ChartConfiguration<"doughnut", number[], string> = {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Общий остаток",
          data: data,
          backgroundColor: [
            "#6320EE",
            "#F04438",
            "#32D583",
            "#FE9000",
            "#5ADBFF",
          ],
          borderWidth: 0,
        },
      ],
    },
    options: chartOptions,
  };

  destroyChart();

  try {
    chart.value = new Chart(ctx, config);
  } catch (error) {
    console.error("Error creating chart:", error);
  }
}

async function initializeChart() {
  const canvasId = `chartWarehouseDoughnut-${props.id}`;
  const preparedData = prepareData();
  if (!preparedData) return;

  const existingCanvas = document.getElementById(canvasId);
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const newCanvas = document.createElement("canvas");
  newCanvas.id = canvasId;
  newCanvas.height = 270;

  if (!isEmptyData.value) {
    if (chartWrapperD.value) {
      chartWrapperD.value.innerHTML = "";
      chartWrapperD.value.appendChild(newCanvas);
    }
    createChart(newCanvas, preparedData.labels, preparedData.data);
  }
}

watch(
  () => warehouseStore.marketplaceLeft,
  async () => {
    await initializeChart();
  },
  { immediate: true }
);

onMounted(() => {
  initializeChart();
});

onUnmounted(() => {
  destroyChart();
});
</script>

<template>
  <div class="min-w-[240] min-h-[270px]" ref="chartWrapperD">
    <div v-if="isEmptyData" class="w-[240px] h-full flex items-center justify-center text-white">
			<p class="text-20-semi">Нет данных для отображения</p>
		</div>
    <!-- Canvas создается динамически в JavaScript -->
  </div>
</template>
