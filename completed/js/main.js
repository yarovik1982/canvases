import { Plotter } from "./plotter-new.js";
import { openModal, closeModal } from "./functions.js";

const canvases = [
	{ id: "beam", plotter: null },
	{ id: "canvas-2", plotter: null },
	{ id: "canvas-3", plotter: null },
	{ id: "canvas-4", plotter: null },
];
let supportsX = [];
let supportsLetters = [];
let selectedSupport = null; // выбранная опора
let clickLogicalX = null; // X координата клика
const supports = [
	{ name: "support", literal: "O", img: "./images/support.svg" },
	{ name: "hinge", literal: "S", img: "./images/hinge.svg" },
	{ name: "fixedSupport", literal: "OF", img: "./images/fixedSupport.svg" },
	{ name: "sealingLeft", literal: "ZL", img: "./images/sealingLeft.svg" },
	{ name: "sealingRight", literal: "ZR", img: "./images/sealingRight.svg" },
];
// модальное окно для выбора опор
const modalSupports = document.getElementById("modal-support");
const inpSupports = document.getElementById("inpSupports");
const btnsSupports = modalSupports.querySelectorAll(
	".modal-row button[data-literal]",
);
const btnCancel = document.getElementById("btn-cansel");
const btnSupportSave = document.getElementById("btn-support-save"); // кнопка "Сохранить"
const btnModalSupportsClose = modalSupports.querySelector(".modal__close");

let zmax = 20;
// модальное окно для ввода длины балки
const modalOffset = document.getElementById("modal-offset");
const inpZmax = modalOffset.querySelector("#inpZmax");
const btnOpen = document.getElementById("for-leng-beam");
const btnSave = modalOffset.querySelector("#btn-save-modal");
const btnClose = modalOffset.querySelector("#btn-close-modal");
const btnReset = modalOffset.querySelector("#btn-reset");

function initCanvases() {
	for (const c of canvases) {
		const el = document.getElementById(c.id);
		const ctx = el.getContext("2d");
		c.plotter = new Plotter(ctx, 740, 310, 30, 355, 0, zmax, -8, 8);
		c.plotter.drawGrid(1, 1);
		c.plotter.drawAxes("X", "Y");
		c.plotter.drawTicks(1, 1);
		c.plotter.drawUnits(1, 1);
	}
}
initCanvases();
// === Обработчики событий ===
btnOpen.addEventListener("click", () => openModal(modalOffset));
btnClose.addEventListener("click", () => closeModal(modalOffset));
modalOffset.addEventListener("click", (e) => {
	if (e.target === modalOffset) closeModal(modalOffset);
});

btnReset.addEventListener("click", () => {
	inpZmax.value = 20;
});

btnSave.addEventListener("click", () => {
	const value = parseFloat(inpZmax.value);
	if (value && value > 0) {
		zmax = value;
		for (const c of canvases) {
			c.plotter.redraw(zmax);
		}
		closeModal(modalOffset);
	}
});

// === Обработчик клика по канвасу "beam" ===
document.getElementById("beam").addEventListener("click", (event) => {
	const canvas = event.target;
	const rect = canvas.getBoundingClientRect();
	const canvasX = event.clientX - rect.left;
	const canvasY = event.clientY - rect.top;

	const plotter = canvases[0].plotter; // plotter для beam

	// Обратное преобразование: canvas → логические координаты
	const logicalX = plotter.xMin + (canvasX - plotter.x0) / (plotter.xScale ?? 1);
	const logicalY =
		(plotter.yMax - (canvasY - plotter.y0) / (plotter.yScale ?? 1)) / 15;

	// Проверка: попадание в балку (Y близко к 0)
	if (Math.abs(logicalY) <= 1.5 && logicalX >= 0 && logicalX <= plotter.xMax) {
		clickLogicalX = logicalX;
		inpSupports.value = logicalX.toFixed(2); // предзаполняем
		openModal(modalSupports);
	}
});

btnModalSupportsClose.addEventListener("click", () => {
	closeModal(modalSupports);
});

// === Выбор опоры ===
btnsSupports.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const current = e.currentTarget;

		btnsSupports.forEach((b) => b.classList.remove("selected"));
		current.classList.add("selected");
		selectedSupport = supports.find((s) => s.literal === current.dataset.literal);
	});
});

// === Сохранение опоры ===
btnSupportSave.addEventListener("click", () => {
	if (!selectedSupport || clickLogicalX === null) return;

	const correctedX = parseFloat(inpSupports.value);
	if (isNaN(correctedX)) return;

	// Сохраняем новую опору
	supportsX.push(correctedX);
	supportsLetters.push(selectedSupport.literal);

	// Сортируем оба массива вместе
	const combined = supportsX
		.map((x, index) => [x, supportsLetters[index]])
		.sort((a, b) => a[0] - b[0]);

	supportsX = combined.map((pair) => pair[0]);
	supportsLetters = combined.map((pair) => pair[1]);

	console.log("supportsX: ", supportsX);
	console.log("supportsLetters: ", supportsLetters);

	// Рисуем иконку на beam
	const beam = document.getElementById("beam");
	const beamCtx = beam?.getContext("2d");

	if (!beamCtx) {
		console.error("Контекст beam не доступен для рисования иконки");
		return;
	}

	const plotter = canvases[0].plotter;
	const img = new Image();
	img.src = selectedSupport.img;
	const literal = selectedSupport.literal;

	img.onload = () => {
		const { x } = plotter.toScreen(correctedX, 0);
		const y = plotter.y0;


		if (literal === "S" || literal === "ZL" || literal === "ZR") {
			beamCtx.drawImage(img, x - 15, y - 170, 30, 30);
		} else {
			beamCtx.drawImage(img, x - 15, y - 155, 30, 30);
		}
	};

	// Рисуем вертикальную линию на всех канвасах
	for (const c of canvases) {
		c.plotter.drawVerticalLine(correctedX, 8, correctedX, -8, "teal");
	}

	// Закрываем модальное окно
	closeModal(modalSupports);

	// Сброс
	selectedSupport = null;
	clickLogicalX = null;
	inpSupports.value = "";
});

// === Сохранение опоры ===
// btnSupportSave.addEventListener("click", () => {
// 	if (!selectedSupport || !clickLogicalX) return;

// 	const correctedX = parseFloat(inpSupports.value);
// 	if (isNaN(correctedX)) return;

// 	// Сохраняем и сортируем
// 	supportsX.push(correctedX);
// 	supportsLetters.push(selectedSupport.literal);

// 	const combined = supportsX
// 		.map((x, index) => [x, supportsLetters[index]])
// 		.sort((a, b) => a[0] - b[0]);

// 	supportsX = combined.map((pair) => pair[0]);
// 	supportsLetters = combined.map((pair) => pair[1]);

// 	console.log("supportsX: ", supportsX);
// 	console.log("supportsLetters: ", supportsLetters);

// 	// Получаем plotter и контекст
// 	const plotter = canvases[0].plotter;
// 	const { x: screenX } = plotter.toScreen(correctedX, 0);

// 	// 🔴 Убедимся, что ctx существует
// 	const ctx = canvases[0].ctx;
// 	if (!ctx) {
// 		console.error("Ошибка: контекст канваса не доступен");
// 		return;
// 	}

// 	// Загружаем изображение
// 	const img = new Image();
// 	img.src = selectedSupport.img;

// 	img.onload = () => {
// 		// Повторно получаем координаты (на случай изменений)
// 		const { x: safeScreenX } = plotter.toScreen(correctedX, 0);
// 		ctx.drawImage(img, safeScreenX - 15, plotter.y0 - 15, 30, 30);
// 	};

// 	img.onerror = () => {
// 		console.error("Не удалось загрузить изображение:", selectedSupport.img);
// 	};

// 	for (const c of canvases) {
// 	// Рисуем вертикальную линию на всех канвасах
// 		if (c.plotter && typeof c.plotter.drawVerticalLine === "function") {
// 			c.plotter.drawVerticalLine(correctedX, 8, correctedX, -8, "teal");
// 		}
// 	}

// 	// Закрываем модальное окно
// 	closeModal(modalSupports);

// 	// Сброс
// 	selectedSupport = null;
// 	clickLogicalX = null;
// 	inpSupports.value = "";
// });
