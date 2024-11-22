<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <h4
      class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color"
    >
      План продаж
    </h4>
    <div
      ref="chartWrapper"
      class="chart-wrapper w-full flex overflow-y-auto h-[360px] bg-dark-charcoal-color"
    >
      <canvas id="chartFor30Days" v-if="profileStore.activeDayFilter == 30" />
      <canvas id="chartFor14Days" v-if="profileStore.activeDayFilter == 14" />
      <canvas id="chartFor7Days" v-if="profileStore.activeDayFilter == 7" />
      <canvas id="chartFor1Days" v-if="profileStore.activeDayFilter == 0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import datalabels from "chartjs-plugin-datalabels";
import { useProfileStore } from "~/modules/profile/stores/profile";
import { getSalesPlanDay } from "./BarLineData";
import type { ChartOptions, ChartConfiguration } from "chart.js";
import {
  customTooltip,
  lineLabel,
  customDataLabel,
} from "~/modules/profile/components/Dashboard/Chart/chartRegister";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  annotationPlugin,
  datalabels
);

const profileStore = useProfileStore();
const monthAnnotation = computed(() => profileStore.monthAnnotation);
// let monthAnnotation = ref(5950 / 30);
let chartDataArr = computed(() =>
  profileStore.salesPlan ? profileStore.salesPlan.days : {}
);
const chartWrapper: Ref<HTMLDivElement | null> = ref(null);
let chart = ref<any>(null);
const calcHeight = computed(() => {
  let numLines = profileStore.salesPlan?.days
    ? Object.keys(profileStore.salesPlan.days).length
    : 0;

  switch (numLines) {
    case 30:
      return 30 * 32; // 1012px
    case 14:
      return 14 * 32; // 468px
    case 7:
      return 360; // 230px
    case 1:
      return 360; // 26px
    default:
      return 360; // на случай, если данных нет
  }
});
const maxDataValue = Math.floor(
  Math.max(
    ...Object.keys(chartDataArr.value).map(
      (date) => chartDataArr.value?.[date]?.totalWeight || 0
    )
  )
);

const chartOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: false,
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          xMin: monthAnnotation.value,
          xMax: monthAnnotation.value,
          borderColor: "#04ea6f",
          borderWidth: 2,
          borderDash: [5, 5],
          click: (event) => {
            console.log("Линия аннотации кликнута", event);
          },
        },
      },
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        text: "Количество",
        font: {
          size: 12,
          weight: 200,
        },
        color: "#FFFFFFBF",
        align: "start",
        display: true,
        padding: 4,
      },
      position: "top",
      ticks: {
        stepSize: 30,
        color: "#FFFFFFBF",
        font: {
          size: 10,
          weight: 200,
        },
        callback: function (value) {
          return Number(value).toFixed(0); // Обрезаем дробную часть
        },
      },
      beginAtZero: true,
      grid: {
        color: "rgba(255, 255, 255, 0.15)",
      },
      border: {
        display: false,
      },
      min: 0,
      max: maxDataValue > 0 ? maxDataValue * 1.5 : 100,
    },
    y: {
      min: 0,
      title: {
        text: "",
        display: true,
        padding: 2,
      },
      ticks: {
        color: "#FFFFFFBF",
        font: {
          size: 10,
          weight: 200,
        },
      },
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 0,
      borderWidth: 1,
    },
  },
  onClick: (chartEvent, activeElements, chart) => {
    const event = chartEvent.native as Event; // Приведение типа ChartEvent к стандартному Event

    const points = chart.getElementsAtEventForMode(
      event, // используем преобразованное событие
      "nearest", // режим
      { intersect: true }, // параметры
      false // не используем конечную позицию
    );

    if (points && points.length > 0) {
      const firstPoint = points[0];

      if (firstPoint) {
        const index = firstPoint.index;

        // Получаем оригинальный лейбл
        const originalLabel = chart.data.labels?.[index] as string;
        // Находим полную дату
        const fullDate = Object.keys(chartDataArr.value).find((date) => {
          const [year, month, day] = date.split("-");
          const formattedLabel = `${day}.${month}`;
          return formattedLabel === originalLabel;
        });

        const fullDateRu = Object.keys(chartDataArr.value)
          .map((date) => {
            const [year, month, day] = date.split("-");
            const formattedLabel = `${day}.${month}`;

            if (formattedLabel === originalLabel) {
              return `${day}-${month}-${year}`;
            }

            return null;
          })
          .filter(Boolean)[0];

        if (fullDate && fullDateRu) {
          profileStore.selectedDate = fullDate;
          profileStore.selectedDateRU = fullDateRu;
          getSalesPlanDay();
          profileStore.activeMoreInfo = true;
        } else {
          console.warn("Дата не найдена.");
        }
      }
    } else {
      console.warn("Нет активных точек на графике.");
    }
  },
};

function prepareData() {
  const dataEntries = Object.entries(chartDataArr.value);

  if (dataEntries.length === 0) {
    console.warn("Нет данных для создания графика.");
    return null;
  }

  const labels = Object.keys(chartDataArr.value).map((date) => {
    const [year, month, day] = date.split("-").slice(0, 3);
    return `${day}.${month}`;
  });

  const data = dataEntries.map(([_, value]) => {
    return typeof value?.totalWeight === "number" ? value.totalWeight : 0;
  });

  return { labels, data };
}

function createChart(canvasId: string, labels: string[], data: number[]) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    console.error(`Canvas with id ${canvasId} not found.`);
    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("Failed to get canvas context.");
    return;
  }

  canvas.style.width = "100%";
  canvas.style.height = `${calcHeight.value}px`;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const config: ChartConfiguration<"bar", number[], string> = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: "#1abc9c",
          hoverBackgroundColor: "#1abc9c",
          hoverBorderColor: "#fff",
          borderColor: "#1abc9c",
          barThickness: 22,
          maxBarThickness: 22,
        },
      ],
    },
    options: chartOptions,
  };

  if (chart.value != null || chartWrapper.value) {
    chart.value = new Chart(ctx, config).destroy();
    chart.value = null;
  }

  chart.value = new Chart(ctx, config);
}

async function initializeChart() {
  const activeFilter = profileStore.activeDayFilter;

  let canvasId = "";
  switch (activeFilter) {
    case 30:
      canvasId = "chartFor30Days";
      break;
    case 14:
      canvasId = "chartFor14Days";
      break;
    case 7:
      canvasId = "chartFor7Days";
      break;
    case 0:
      canvasId = "chartFor1Days";
      break;
    default:
      console.warn("Invalid day filter");
      return;
  }

  const preparedData = prepareData();
  if (!preparedData) return;

  // Убедитесь, что старый canvas удален
  const existingCanvas = document.getElementById(canvasId);
  if (existingCanvas) {
    existingCanvas.remove();
  }

  // Создаем новый canvas и устанавливаем его размер
  const newCanvas = document.createElement("canvas");
  newCanvas.id = canvasId;
  newCanvas.style.width = "100%";
  newCanvas.style.height = `${calcHeight.value}px`;

  if (chartWrapper.value) {
    chartWrapper.value.innerHTML = "";
    chartWrapper.value.appendChild(newCanvas);
  }

  createChart(canvasId, preparedData.labels, preparedData.data);
}

watch(
  () => profileStore.activeDayFilter,
  async () => {
    Chart.unregister(customTooltip, lineLabel, customDataLabel);
    chart.value?.destroy();
    chart.value = null;

    if (chartWrapper.value) {
      chartWrapper.value.innerHTML = "";
    }
    await initializeChart();
  },
  { immediate: true }
);

onMounted(() => {
  Chart.register(customTooltip, lineLabel, customDataLabel);
  initializeChart();
});

onBeforeUnmount(() => {
  Chart.unregister(customTooltip, lineLabel, customDataLabel);
  if (chartWrapper.value) {
    chartWrapper.value.innerHTML = "";
  }
});
</script>

<style scoped>
.chart-wrapper {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 #2b2f33;
}

.chart-wrapper::-webkit-scrollbar {
  width: 8px;
}

.chart-wrapper::-webkit-scrollbar-track {
  background-color: #2b2f33;
  border-radius: 8px !important;
}

.chart-wrapper::-webkit-scrollbar-thumb {
  background-color: #6b7280;
  border-radius: 8px !important;
  border: 2px solid #2b2f33;
}

#sales-chart {
  width: 100% !important;
}

.lds-ripple,
.lds-ripple div {
  box-sizing: border-box;
  @apply text-primary-color;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid currentColor;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 1;
  }

  100% {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
}
</style>
