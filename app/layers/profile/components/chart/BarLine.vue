<template>
    <div class="w-[390px] rounded-lg overflow-hidden">
        <h4 class="px-5 h-[40px] flex items-center bg-dark-gunmental-color text-14-bold text-gray-90-color">
            План продаж
        </h4>
        <div class="chart-wrapper flex overflow-y-auto h-[360px] bg-dark-charcoal-color ">
            <canvas id="sales-chart" v-if="profileStore.activeDayFilter == 1"></canvas>
            <canvas id="sales-chart-2" v-if="profileStore.activeDayFilter == 2"></canvas>
            <canvas id="sales-chart-3" v-if="profileStore.activeDayFilter == 3"></canvas>
            <canvas id="sales-chart-4" v-if="profileStore.activeDayFilter == 4"></canvas>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import type { ChartOptions, TooltipItem } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import datalabels from 'chartjs-plugin-datalabels';
import { useProfileStore } from '~/layers/profile/stores/profile';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, annotationPlugin, datalabels);

const profileStore = useProfileStore()
const activeDayFilter = computed(() => profileStore.activeDayFilter)

const chart = ref<any>(null);

const lineHeight = 20;
const borderWidth = 2;
const verticalPadding = 7;

const calcHeight = computed(() => {
    let numLines = profileStore.daySales.length;
    return profileStore.daySales.length < 14 ? (lineHeight + borderWidth) * 14 + verticalPadding : (lineHeight + borderWidth) * numLines + verticalPadding;
});

Chart.register({
    id: 'customTooltip',
    afterDraw(chart, args, options) {
        const activeElement = chart.tooltip?.getActiveElements()[0];

        if (activeElement) {
            const { ctx } = chart;

            ctx.save();
            const activePoint: any = chart.tooltip?.getActiveElements()[0];
            const dataPoint = activePoint.index;
            const datasetIndex = activePoint.datasetIndex;
            const xPoint = chart.getDatasetMeta(datasetIndex).data[dataPoint]?.tooltipPosition(dataPoint).x;
            const yPoint = chart.getDatasetMeta(datasetIndex).data[dataPoint]?.tooltipPosition(dataPoint).y;

            if (typeof xPoint === 'number' && typeof yPoint === 'number') {
                // Параметры для диалогового окна
                const padding = 18;
                const borderRadius = 8;
                const bgColor = '#2B2F33';
                const textColorWhite40 = 'rgba(255, 255, 255, 0.40)';
                const textColorWhite90 = 'rgba(255, 255, 255, 0.90)';
                const tooltipWidth = 200; // Ширина контейнера
                const lineHeight = 20;
                const separatorHeight = 1;
                const separatorPaddingBottom = 12;

                // Получаем данные
                const daySales = profileStore.daySales;
                const sale = daySales[activePoint.index];
                const itemsText = sale ? sale.products.map(item => `${item.product} ${item.quantity}`).join('\n') : '';

                // Определяем высоту в зависимости от количества строк
                const textLines = itemsText.split('\n').length + 1; // +1 для общего количества
                const tooltipHeight = padding * 2 + (textLines * lineHeight); // padding сверху и снизу + высота текста

                // Позиция тултипа фиксирована на 200 пикселей слева от диаграммы
                const tooltipX = xPoint - 180;
                const tooltipY = Math.max(yPoint - tooltipHeight - padding, 0); // Убедитесь, что тултип не выходит за верх границы диаграммы

                // Рисуем фон для диалогового окна
                ctx.fillStyle = bgColor;
                ctx.beginPath();
                ctx.moveTo(tooltipX, tooltipY);
                ctx.arcTo(tooltipX + tooltipWidth, tooltipY, tooltipX + tooltipWidth, tooltipY + tooltipHeight, borderRadius);
                ctx.arcTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight, tooltipX, tooltipY + tooltipHeight, borderRadius);
                ctx.arcTo(tooltipX, tooltipY + tooltipHeight, tooltipX, tooltipY, borderRadius);
                ctx.arcTo(tooltipX, tooltipY, tooltipX + tooltipWidth, tooltipY, borderRadius);
                ctx.closePath();
                ctx.fill();

                // Рисуем линию указателя
                ctx.strokeStyle = '#2B2F33';
                ctx.beginPath();
                ctx.moveTo(xPoint, yPoint);
                ctx.lineTo(tooltipX + tooltipWidth, yPoint);
                ctx.stroke();

                // Отрисовка текста
                ctx.textBaseline = 'top';
                ctx.font = '200 12px Roboto Flex';

                if (sale) {
                    /// Отрисовка текста "Все"
                    ctx.fillStyle = textColorWhite40;
                    ctx.textAlign = 'left';
                    ctx.font = '200 12px Roboto Flex';
                    ctx.fillText('Все', tooltipX + padding, tooltipY + padding);

                    // Отрисовка точки между "Все" и "Общее количество"
                    ctx.fillStyle = textColorWhite90;
                    ctx.font = '400 14px Roboto Flex';
                    ctx.fillText('.', tooltipX + padding + ctx.measureText('Все').width + 2, tooltipY + padding - 4);

                    // Отрисовка общего количества
                    ctx.fillStyle = textColorWhite90;
                    ctx.font = '300 12px Roboto Flex';
                    ctx.fillText(sale.total.toString(), tooltipX + padding + ctx.measureText('Все').width + 13, tooltipY + padding);

                    // Рисуем разделитель
                    ctx.fillStyle = textColorWhite90;
                    ctx.fillRect(tooltipX + padding, tooltipY + padding + lineHeight, tooltipWidth - padding * 2, separatorHeight);

                    // Отрисовка продуктов
                    const lines = itemsText.split('\n');
                    let yOffset = tooltipY + padding + lineHeight + separatorHeight + separatorPaddingBottom; // Начальная позиция для текста

                    lines.forEach(line => {
                        if (yOffset + lineHeight <= tooltipY + tooltipHeight - padding) {
                            const [product, quantity] = line.split(' ');

                            // Отрисовка названия продукта
                            ctx.fillStyle = textColorWhite40;
                            ctx.font = '200 12px Roboto Flex';
                            ctx.fillText(product ?? '', tooltipX + padding, yOffset);

                            // Отрисовка точки между названием и количеством
                            ctx.fillStyle = textColorWhite90;
                            ctx.font = '400 14px Roboto Flex';
                            ctx.fillText('.', tooltipX + padding + ctx.measureText(product ?? '').width - 2, yOffset - 3.5);

                            // Отрисовка количества
                            ctx.font = '300 12px Roboto Flex';
                            ctx.fillText(quantity ?? '', tooltipX + padding + ctx.measureText(product ?? '').width + 13, yOffset);

                            yOffset += lineHeight; // Интервал между строками
                        }
                    });
                }

                ctx.restore(); // Восстановление состояния контекста
            }
        }
    },
});


Chart.register({
    id: 'lineLabel',
    afterDatasetsDraw(chart, args, options) {
        const { ctx } = chart;
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;

        // Проверка наличия xScale и yScale
        if (!xScale || !yScale) {
            return; // Если шкалы не определены, завершить выполнение функции
        }

        // Координаты линии
        const xLineValue = 155;
        const xPosition = xScale.getPixelForValue(xLineValue);

        // Текстовое значение
        const text = `${xLineValue}`;

        // Настройка шрифта и цвета текста
        ctx.font = '600 14px Roboto Flex';
        ctx.fillStyle = '#04ea6f';
        ctx.textAlign = 'center';

        // Отрисовка текста над линией
        ctx.fillText(text, xPosition, yScale.top - 20);
    }
});

Chart.register({
    id: 'customDataLabel',
    afterDatasetsDraw(chart, args, options) {
        const { ctx } = chart;
        const datasets = chart.data.datasets;

        // Параметры для текста
        const letterSpacing = 5 + 1; // Расстояние между буквами

        datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            const dataPoints = meta.data;

            dataPoints.forEach((point, index) => {
                const x = point.x;
                const y = point.y;

                // Получаем значение для текста
                const text = `${dataset.data[index]}`;

                // Настройка текста
                ctx.font = '300 12px Roboto Flex';
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Отрисовка текста с учетом letterSpacing
                let textOffsetX = x + 14; // Начальная позиция X
                for (const char of text) {
                    ctx.fillText(char, textOffsetX, y);
                    textOffsetX += letterSpacing; // Ширина символа + letterSpacing
                }
            });
        });
    }
});

const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
        tooltip: {
            enabled: false
        },
        datalabels: {
            display: false
        },
        annotation: {
            annotations: {
                line1: {
                    type: 'line',
                    xMin: 155,
                    xMax: 155,
                    borderColor: '#04ea6f',
                    borderWidth: 2,
                    borderDash: [5, 5],
                }
            }
        },
        legend: {
            display: false
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
                color: '#FFFFFFBF',
                align: 'center',
                display: true,
                padding: 4

            },
            position: 'top',
            ticks: {
                color: '#FFFFFFBF',
                font: {
                    size: 10,
                    weight: 200,
                },
            },
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 255, 255, 0.15)'
            },
            border: {
                display: false,
            },
            ticks: {
                stepSize: 120, // Интервал между метками
            },
            min: 0,
            max: function () {
                // Определите максимальное значение данных + 100
                const maxDataValue = Math.max(...profileStore.daySales.map(sale => sale.total));
                return maxDataValue + 120;
            }
        },
        y: {
            title: {
                text: "Август",
                font: {
                    size: 12,
                    weight: 200,
                },
                color: '#FFFFFFBF',
                align: 'center',
                display: true,
                padding: 5

            },
            ticks: {
                color: '#FFFFFFBF',
                font: {
                    size: 10,
                    weight: 200,
                }
            },
            beginAtZero: true,
            grid: {
                display: false
            },
        }
    },
    elements: {
        bar: {
            borderWidth: 2,
            borderSkipped: false,
            borderRadius: 4,
        }
    }
};

function createChart() {
    const canvasId = activeDayFilter.value == 1 ? 'sales-chart' : activeDayFilter.value == 2 ? 'sales-chart-2' : activeDayFilter.value == 3 ? 'sales-chart-3' : 'sales-chart-4';

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
        console.error(`Canvas element with ID ${canvasId} not found.`);
        return;
    }

    canvas.height = calcHeight.value;

    chart.value = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: Array.from({ length: profileStore.daySales.length }, (_, index) => index + 1),
            datasets: [
                {
                    label: 'Всего',
                    data: profileStore.daySales.map(sale => sale.total),
                    backgroundColor: '#1abc9c',
                    hoverBackgroundColor: '#1abc9c',
                    hoverBorderColor: "#fff",
                    borderWidth: 2,
                    borderColor: 'transparent',
                    barThickness: 17,
                    maxBarThickness: 195,
                }
            ]
        },
        options: chartOptions
    });
}

function destroyAndRecreateChart() {
    if (chart.value) {
        chart.value.destroy();
        chart.value = null;
    }
    createChart();
}

onMounted(() => {
    profileStore.filterData()
    createChart();

});

watch(activeDayFilter, async () => {
    await profileStore.filterData();
    destroyAndRecreateChart();
});
</script>

<style scoped>
.chart-wrapper {
    scrollbar-width: thin;
    scrollbar-color: #6B7280 #2b2f33;
}

.chart-wrapper::-webkit-scrollbar {
    width: 8px;
}

.chart-wrapper::-webkit-scrollbar-track {
    background-color: #2b2f33;
    border-radius: 8px !important;
}

.chart-wrapper::-webkit-scrollbar-thumb {
    background-color: #6B7280;
    border-radius: 8px !important;
    border: 2px solid #2b2f33;
}

#sales-chart,
#sales-chart-2,
#sales-chart-3,
#sales-chart-4 {
    width: 100% !important;
}
</style>
