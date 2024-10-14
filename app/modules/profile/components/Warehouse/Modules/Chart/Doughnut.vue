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

	Chart.register(
		DoughnutController,
		ArcElement,
		CategoryScale,
		Tooltip,
		Legend,
		annotationPlugin,
		datalabels
	);

	const warehouseStore = useWarehouseStore();
	const chartDataArr = computed(() =>
		warehouseStore.tradingFloorData
			? warehouseStore.tradingFloorData.marketplaces
			: {}
	);
	const chartWrapperD: Ref<HTMLDivElement | null> = ref(null);
	let chart = ref<any>(null);

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
		const dataEntries = Object.entries(chartDataArr.value);

		if (dataEntries.length === 0) {
			console.warn("Нет данных для создания графика.");
			return null;
		}

		const labels = Object.keys(chartDataArr.value);
		const data = dataEntries.map(([_, value]) => {
			return typeof value?.totalWeight === "number"
				? value.totalWeight
				: 0;
		});

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
						label: "totalWeight",
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
		const canvasId = "chartWarehouseDoughnut";
		const preparedData = prepareData();
		if (!preparedData) return;

		const existingCanvas = document.getElementById(canvasId);
		if (existingCanvas) {
			existingCanvas.remove();
		}

		const newCanvas = document.createElement("canvas");
		newCanvas.id = canvasId;
		newCanvas.height = 270;

		if (chartWrapperD.value) {
			chartWrapperD.value.innerHTML = "";
			chartWrapperD.value.appendChild(newCanvas);
		}

		createChart(newCanvas, preparedData.labels, preparedData.data);
	}

	watch(
		() => warehouseStore.tradingFloorData,
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
	<div
		class="h-[270px]"
		ref="chartWrapperD"
	>
		<!-- Canvas создается динамически в JavaScript -->
	</div>
</template>
