import type { Plugin } from "chart.js";
import { useProfileStore } from "~/modules/profile/stores/profile";

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
export const customTooltip: Plugin = {
	id: "customTooltip",
	afterDraw(chart) {
		const activeElement = chart.tooltip?.getActiveElements()[0];
		const profileStore = useProfileStore();
		if (activeElement) {
			const { ctx } = chart;

			const activePoint: any = chart.tooltip?.getActiveElements()[0];
			const dataPoint = activePoint.index;
			const datasetIndex = activePoint.datasetIndex;

			const xPoint = chart
				.getDatasetMeta(datasetIndex)
				.data[dataPoint]?.tooltipPosition(dataPoint).x;
			const yPoint = chart
				.getDatasetMeta(datasetIndex)
				.data[dataPoint]?.tooltipPosition(dataPoint).y;

			if (typeof xPoint === "number" && typeof yPoint === "number") {
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
								(tooltipYBase - (chartHeight - tooltipHeight - 100));
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

						const getEllipsisText = (text: any, maxWidth: number) => {
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
									getEllipsisText(item.quantityText, fixedTextWidth), // добавлено "кг"
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
};
export const lineLabel: Plugin = {
	id: "lineLabel",
	afterDatasetsDraw(chart, args, options) {
		const { ctx } = chart;
		const xScale = chart.scales.x;
		const yScale = chart.scales.y;
		const profileStore = useProfileStore();

		// Проверка наличия xScale и yScale
		if (!xScale || !yScale) {
			return; // Если шкалы не определены, завершить выполнение функции
		}

		// Координаты линии
		const xLineValue = profileStore.monthAnnotation.toFixed(0);
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
};
export const customDataLabel: Plugin = {
	id: "customDataLabel",
	afterDatasetsDraw(chart, args, options) {
		const { ctx } = chart;
		const datasets = chart.data.datasets;
		const profileStore = useProfileStore();

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
					const deviation = calculateDeviation(
						value,
						profileStore.monthAnnotation
					);

					ctx.font = "400 12px Roboto Flex";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";

					// Получаем значение для текста
					const text = `${value.toFixed(0)} кг`;

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
						value < profileStore.monthAnnotation
							? "#F04438"
							: "#04EA6F"; // Красный если меньше нормы, зеленый если больше нормы

					// Расчет позиции X для отклонения с учетом промежутка и ширины основного значения
					const deviationOffsetX = x + valueWidth + spaceBetween;
					ctx.fillStyle = deviationColor;
					ctx.font = "200 10px Roboto Flex";
					ctx.fillText(deviationText, deviationOffsetX + 30, y - 0.5);
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
};
