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
			<canvas
				id="chartFor30Days"
				v-if="profileStore.activeDayFilter == 30"
			/>
			<canvas
				id="chartFor14Days"
				v-if="profileStore.activeDayFilter == 14"
			/>
			<canvas
				id="chartFor7Days"
				v-if="profileStore.activeDayFilter == 7"
			/>
			<canvas
				id="chartFor1Days"
				v-if="profileStore.activeDayFilter == 0"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { onMounted, ref } from "vue";
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
	import type { ISalesPlanDays } from "~/modules/profile/types/salesPlan.type";
	import type { ChartOptions, ChartConfiguration } from "chart.js";

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
	const monthAnnotation = computed(
		() => profileStore.monthAnnotation
	);
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
	const calculateDeviation = (
		currentValue: number | null | undefined,
		norm: string | number
	) => {
		// Вычисляем разницу
		const difference = Number(currentValue) - Number(norm);
		const percentageDeviation = (difference / Number(norm)) * 100;
		return `${Math.abs(percentageDeviation).toFixed(1)}%`;
	};
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("ru-RU").format(price);
	};
	const maxDataValue = Math.floor(
		Math.max(
			...Object.keys(chartDataArr.value).map(
				(date) => chartDataArr.value?.[date]?.totalWeight || 0
			)
		)
	);

	Chart.register({
		id: "customTooltip",
		afterDraw(chart) {
			const activeElement = chart.tooltip?.getActiveElements()[0];
			if (activeElement) {
				const { ctx } = chart;

				const activePoint: any =
					chart.tooltip?.getActiveElements()[0];
				const dataPoint = activePoint.index;
				const datasetIndex = activePoint.datasetIndex;

				const xPoint = chart
					.getDatasetMeta(datasetIndex)
					.data[dataPoint]?.tooltipPosition(dataPoint).x;
				const yPoint = chart
					.getDatasetMeta(datasetIndex)
					.data[dataPoint]?.tooltipPosition(dataPoint).y;

				if (
					typeof xPoint === "number" &&
					typeof yPoint === "number"
				) {
					ctx.save();

					const padding = 18;
					const borderRadius = 8;
					const bgColor = "#2B2F33";
					const textColorWhite40 = "rgba(255, 255, 255, 0.40)";
					const textColorWhite90 = "rgba(255, 255, 255, 0.90)";
					const lineHeight = 20;
					const separatorHeight = 1;
					const separatorPaddingBottom = 12;
					const spaceBetween = 5;
					const pointWidth = 8;
					const tooltipMargin = 10;
					const fixedTextWidth = 60; // Минимальная и максимальная ширина текста

					const daySalesKey = Object.keys(
						profileStore.salesPlan ? profileStore.salesPlan.days : {}
					)[dataPoint] as string | undefined;

					if (daySalesKey && profileStore.salesPlan) {
						const sale = profileStore.salesPlan.days[daySalesKey];
						if (sale) {
							const itemsText = sale.products.map((item) => ({
								productText: item.product,
								quantityText: `${formatPrice(item.weight)} кг`, // Добавляем "кг"
								priceText: formatPrice(item.price),
							}));

							// Ширина тултипа рассчитывается на основе фиксированной ширины текста
							const tooltipWidth =
								padding * 2 +
								fixedTextWidth * 3 + // ширина для продукта, количества и цены
								pointWidth +
								spaceBetween * 4; // пробелы между элементами

							const textLines = itemsText.length + 1; // +1 для "Всего"
							const tooltipHeight =
								padding * 2 +
								textLines * lineHeight +
								separatorHeight +
								separatorPaddingBottom;
							const chartHeight = chart.height;
							const tooltipYBase = yPoint - tooltipHeight - padding;

							const tooltipX =
								chart.width - tooltipWidth - tooltipMargin;
							let tooltipY;

							if (tooltipYBase < 100) {
								tooltipY = Math.max(tooltipYBase, 0) + 100;
							} else if (
								tooltipYBase >
								chartHeight - tooltipHeight - 100
							) {
								tooltipY =
									Math.max(tooltipYBase, 0) -
									(tooltipYBase -
										(chartHeight - tooltipHeight - 100));
							} else {
								tooltipY = Math.max(tooltipYBase, 0);
							}

							tooltipY = Math.min(
								tooltipY,
								chartHeight - tooltipHeight - 100
							);

							ctx.fillStyle = bgColor;
							ctx.beginPath();
							ctx.moveTo(tooltipX, tooltipY);
							ctx.arcTo(
								tooltipX + tooltipWidth,
								tooltipY,
								tooltipX + tooltipWidth,
								tooltipY + tooltipHeight,
								borderRadius
							);
							ctx.arcTo(
								tooltipX + tooltipWidth,
								tooltipY + tooltipHeight,
								tooltipX,
								tooltipY + tooltipHeight,
								borderRadius
							);
							ctx.arcTo(
								tooltipX,
								tooltipY + tooltipHeight,
								tooltipX,
								tooltipY,
								borderRadius
							);
							ctx.arcTo(
								tooltipX,
								tooltipY,
								tooltipX + tooltipWidth,
								tooltipY,
								borderRadius
							);
							ctx.closePath();
							ctx.fill();

							ctx.strokeStyle = bgColor;
							ctx.beginPath();
							ctx.moveTo(xPoint, yPoint);
							ctx.stroke();

							ctx.textBaseline = "top";
							ctx.font = "12px Roboto Flex";

							const getEllipsisText = (
								text: any,
								maxWidth: number
							) => {
								let width = ctx.measureText(text).width;
								if (width <= maxWidth) return text;
								while (width > maxWidth) {
									text = text.slice(0, -1);
									width = ctx.measureText(`${text}...`).width;
								}
								return `${text}...`;
							};

							ctx.fillStyle = textColorWhite40;
							ctx.textAlign = "left";
							ctx.fillText(
								getEllipsisText("Всего", fixedTextWidth),
								tooltipX + padding,
								tooltipY + padding
							);

							// Отрисовка общего количества и цены
							const totalCountX =
								tooltipX +
								padding +
								pointWidth +
								spaceBetween +
								fixedTextWidth * 2; // добавлено 80 пикселей
							ctx.fillStyle = textColorWhite90;
							ctx.textAlign = "right";
							ctx.fillText(
								getEllipsisText(
									formatPrice(sale.totalWeight).toString() + " кг",
									fixedTextWidth
								), // добавлено "кг"
								totalCountX,
								tooltipY + padding
							);

							// Отрисовка цены
							ctx.fillStyle = "#1ABC9C";
							ctx.textAlign = "right";
							ctx.fillText(
								getEllipsisText(
									formatPrice(sale.totalPrice),
									fixedTextWidth
								),
								totalCountX + fixedTextWidth + spaceBetween,
								tooltipY + padding
							);

							// Отрисовка разделителя
							ctx.fillStyle = textColorWhite90;
							ctx.fillRect(
								tooltipX + padding,
								tooltipY + padding + lineHeight,
								tooltipWidth - padding * 2,
								separatorHeight
							);

							// Начальная позиция для отрисовки товаров
							let yOffset =
								tooltipY +
								padding +
								lineHeight +
								separatorHeight +
								separatorPaddingBottom;

							itemsText.forEach((item) => {
								if (
									yOffset + lineHeight <=
									tooltipY + tooltipHeight - padding
								) {
									ctx.fillStyle = textColorWhite40;
									ctx.textAlign = "left";
									ctx.fillText(
										getEllipsisText(item.productText, fixedTextWidth),
										tooltipX + padding,
										yOffset
									);

									ctx.fillStyle = textColorWhite90;
									ctx.textAlign = "right";
									const quantityX =
										tooltipX +
										padding +
										pointWidth +
										spaceBetween +
										fixedTextWidth * 2; // добавлено 80 пикселей
									ctx.fillText(
										getEllipsisText(
											item.quantityText,
											fixedTextWidth
										), // добавлено "кг"
										quantityX,
										yOffset
									);

									ctx.fillStyle = "#1ABC9C";
									const priceX =
										quantityX + fixedTextWidth + spaceBetween; // позиция цены основана на позиции количества
									ctx.fillText(
										getEllipsisText(item.priceText, fixedTextWidth),
										priceX,
										yOffset
									);

									yOffset += lineHeight;
								}
							});

							ctx.restore();
						}
					}
				}
			}
		},
	});

	Chart.register({
		id: "lineLabel",
		afterDatasetsDraw(chart, args, options) {
			const { ctx } = chart;
			const xScale = chart.scales.x;
			const yScale = chart.scales.y;

			// Проверка наличия xScale и yScale
			if (!xScale || !yScale) {
				return; // Если шкалы не определены, завершить выполнение функции
			}

			// Координаты линии
			const xLineValue = monthAnnotation.value.toFixed(0);
			const xPosition = xScale.getPixelForValue(Number(xLineValue));

			// Текстовое значение
			const text = `${xLineValue}`;

			// Настройка шрифта и цвета текста
			ctx.font = "600 14px Roboto Flex";
			ctx.fillStyle = "#04ea6f";
			ctx.textAlign = "center";

			// Отрисовка текста над линией
			ctx.fillText(text, xPosition, yScale.top - 35);
		},
	});

	Chart.register({
		id: "customDataLabel",
		afterDatasetsDraw(chart, args, options) {
			const { ctx } = chart;
			const datasets = chart.data.datasets;

			const letterSpacing = 6 + 1; // Расстояние между буквами
			const spaceBetween = 5; // Промежуток между значением и отклонением

			datasets.forEach((dataset, datasetIndex) => {
				const meta = chart.getDatasetMeta(datasetIndex);
				const dataPoints = meta.data;

				dataPoints.forEach((point, index) => {
					// Получаем координаты точки
					const x = Array.isArray(point.x) ? point.x[0] : point.x;
					const y = Array.isArray(point.y) ? point.y[0] : point.y;

					// Обработка значения данных
					let value: number | undefined;
					if (Array.isArray(dataset.data[index])) {
						// Если данные являются массивом
						value = dataset.data[index][0]; // Пример: берем первый элемент массива
					} else if (
						dataset.data[index] !== null &&
						dataset.data[index] !== undefined
					) {
						// Если данные не null и не undefined
						value = dataset.data[index] as number;
					} else {
						// Если данные null или undefined
						value = undefined;
					}

					// Отрисовка значения или слова "Пусто"
					if (value !== undefined && value != 0) {
						console.log(value);
						const deviation = calculateDeviation(
							value,
							monthAnnotation.value
						);

						ctx.font = "400 12px Roboto Flex";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";

						// Получаем значение для текста
						const text = `${value} кг`;

						// Измеряем ширину текста
						const valueWidth = ctx.measureText(text).width;

						// Отрисовка основного значения
						ctx.fillStyle = "#fff"; // Белый цвет
						let textOffsetX = x + 10; // Начальная позиция X
						for (const char of text) {
							ctx.fillText(char, textOffsetX, y);
							textOffsetX += ctx.measureText(char).width; // Измеряем ширину текущего символа
						}

						// Отрисовка отклонения
						const deviationText = `(${deviation})`;
						const deviationColor =
							value < monthAnnotation.value ? "#F04438" : "#04EA6F"; // Красный если меньше нормы, зеленый если больше нормы

						// Расчет позиции X для отклонения с учетом промежутка и ширины основного значения
						const deviationOffsetX = x + valueWidth + spaceBetween;
						ctx.fillStyle = deviationColor;
						ctx.font = "200 10px Roboto Flex";
						ctx.fillText(
							deviationText,
							deviationOffsetX + 30,
							y - 0.5
						);
					} else {
						// Если данные null, отрисовываем "Пусто"
						ctx.font = "400 10px Roboto Flex";
						ctx.textAlign = "center";
						ctx.textBaseline = "middle";
						const text = "Данные отсутствуют";

						ctx.fillStyle = "#F04438"; // Белый цвет
						ctx.fillText(text, x + 60, y);
					}
				});
			});
		},
	});

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
					const fullDate = Object.keys(chartDataArr.value).find(
						(date) => {
							const [year, month, day] = date.split("-");
							const formattedLabel = `${day}.${month}`;
							return formattedLabel === originalLabel;
						}
					);

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
			return typeof value?.totalWeight === "number"
				? value.totalWeight
				: 0;
		});

		return { labels, data };
	}

	function createChart(
		canvasId: string,
		labels: string[],
		data: number[]
	) {
		const canvas = document.getElementById(
			canvasId
		) as HTMLCanvasElement;

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
			chart.value = null;

			if (chartWrapper.value) {
				chartWrapper.value.innerHTML = "";
			}
			await initializeChart();
		},
		{ immediate: true }
	);

	onMounted(() => {
		initializeChart();
	});

	onUnmounted(() => {
		chart.value = null;

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
