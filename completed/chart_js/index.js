import { usePlugins } from "./usePlugins.js";
const { drawLine } = usePlugins();

const zMax = 20

const ctx = document.getElementById("test");
new Chart(ctx, {
	type: "line",
	data: {
		// labels: Array.from({ length: zMax + 1 }, (_, i) => i), // [0, 1, 2, ..., 20]
		datasets: [
			{
				data: [], // Пустой массив - никаких данных
				backgroundColor: "transparent",
			},
		],
	},
	options: {
		responsive: true,
		scales: {
         // alignToPixels:true,
			x: {
             beginAtZero: true,
				type: "linear",
				min: 0, // Начало оси X
				max: zMax, // Конец оси X
				offset: true, // Добавляет отступ по краям
            // grace: "10%", // Отступ сверху/снизу (10% от диапазона)
				ticks: {
					stepSize: 1,
				},
				grid: {
					display: true,
					drawBorder: true,
				},
			},
			y: {
				min: -8, // Минимум оси Y
				max: 8, // Максимум оси Y
				ticks: {
					stepSize: 1,
				},
				grace: "1", // Отступ сверху/снизу (10% от диапазона)
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
			drawLine: {
				color: "red",
				lineWidth: 2,
				x1: 0, // Начало линии (X)
				y1: 0, // Начало линии (Y)
				x2: 20, // Конец линии (X)
				y2: 0, // Конец линии (Y)
			},
		},
		elements: {
			bar: {
				borderWidth: 0, // Убирает границы у столбцов
			},
		},
	},
	plugins: [drawLine],
});
