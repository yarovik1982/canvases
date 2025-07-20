//LV.js

import { Plotter } from "./plotter.js";


// ДЛИНА БАЛКИ
const zmax = 40;
// --- Инициализация всех canvas ---
const canvases = [
	{ id: "beam", plotter: null, ctx: null },
	{ id: "canvas-2", plotter: null, ctx: null },
	{ id: "canvas-3", plotter: null, ctx: null },
	{ id: "canvas-4", plotter: null, ctx: null },
];

for (let c of canvases) {
	c.el = document.getElementById(c.id);
	c.ctx = c.el.getContext("2d");
	c.plotter = new Plotter(c.ctx, 740, 310, 30, 200, 0, zmax, -8, 8);
	c.plotter.drawGrid(1, 1);
	c.plotter.drawAxes("X", "Y");
	c.plotter.drawTicks(1, 1);
	c.plotter.drawUnits(1, 1);
}

// --- ДЛЯ ПЕРВОГО КАНВАСА: ОПОРЫ И ШАРНИРЫ ---
let contextBeam = canvases[0].ctx;
let plotter = canvases[0].plotter;


// Координаты опор и шарниров (для кликов)
const supports = [
	{ type: "support", x: 2 },
	{ type: "support", x: 7 },
	{ type: "support", x: 9 },
	{ type: "support", x: 14 },
	{ type: "hinge", x: 5 },
	{ type: "hinge", x: 12 },
	{ type: "hinge", x: 16 },
	{ type: "fixed", x: 19 },
	{ type: "Zl", x: 0 },
	{ type: "ZR", x: 20 },
];

const clickedSupports = new Set(); // Для хранения кликнутых опор

// Функция для загрузки и отрисовки изображений
function drawImage(
	ctx,
	imgSrc,
	x,
	y,
	anchor = "top-center",
	width = 30,
	height = 30,
) {
	let img = new Image();
	img.onload = function () {
		let drawX, drawY;
		switch (anchor) {
			case "center":
				drawX = x - width / 2;
				drawY = y - height / 2;
				break;
			case "top-center":
			default:
				drawX = x - width / 2;
				drawY = y;
				break;
		}
		ctx.drawImage(img, drawX, drawY, width, height);
	};
	img.src = imgSrc;
}

// --- Отрисовка опор и шарниров ---
const opImg = "./images/support.svg";
const shImg = "./images/hinge.svg";
const opnImg = "./images/fixedSupport.svg";
const ZLImg = "./images/sealingLeft.svg";
const ZRImg = "./images/sealingRight.svg";

supports.forEach((sup) => {
	let x = plotter.x0 + sup.x / plotter.xScale;
	let y = plotter.y0;
	if (sup.type === "support") {
		drawImage(contextBeam, opImg, x, y, "top-center", 30, 30);
	} else if (sup.type === "hinge") {
		drawImage(contextBeam, shImg, x, y, "center", 30, 30);
	} else if (sup.type === "fixed") {
		drawImage(contextBeam, opnImg, x, y, "top-center", 30, 30);
	} else if (sup.type === "Zl") {
        drawImage(contextBeam, ZLImg, x, y, "center", 30, 30);
    } else if (sup.type === "ZR") {
        drawImage(contextBeam, ZRImg, x, y, "center", 30, 30);
    }
	sup._canvasX = x; // сохраняем для кликов
	sup._canvasY = y;
	// console.log("sup._canvasX: "+ sup._canvasX,"sup._canvasY: " + sup._canvasY)
});

// --- Обработка кликов по canvas beam ---
canvases[0].el.addEventListener("click", function (e) {
    const rect = canvases[0].el.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    let found = supports.find((sup) => {
        let dx = clickX - sup._canvasX;
        let dy = clickY - sup._canvasY;
        let w = sup.type === "support" ? 30 : 30;
        let h = 30;
        let anchorY = sup.type === "hinge" ? -h / 2 : 0;
        return dx >= -w/2 && dx <= w/2 && dy >= anchorY && dy <= anchorY + h;
    });

    if (found) {
        clickedSupports.add(found.x); // Добавляем координату X опоры
        
        // Рисуем вертикальные линии на остальных канвасах
        for (let i = 1; i < canvases.length; i++) {
            const c = canvases[i];
            const plotter = c.plotter;
            let x = plotter.x0 + found.x / plotter.xScale;
            let y8 = plotter.y0 - 8 / plotter.yScale;
            let y_8 = plotter.y0 - -8 / plotter.yScale;
            let yTop = Math.min(y8, y_8);
            let yBottom = Math.max(y8, y_8);
            
            c.ctx.save();
            c.ctx.strokeStyle = "#000";
            c.ctx.lineWidth = 1;
            c.ctx.beginPath();
            c.ctx.moveTo(x, yTop);
            c.ctx.lineTo(x, yBottom);
            c.ctx.stroke();
            c.ctx.restore();
        }

        // Проверяем, все ли опоры кликнуты (например, только опоры типа "support")
        const allSupports = supports.filter(s => s.type === "support").map(s => s.x);
        const allClicked = allSupports.every(x => clickedSupports.has(x));
        
        if (allClicked) {
            // Если все опоры кликнуты - рисуем Линии влияния
            
                canvases[1].plotter.drawGraph(q0,q1)
                canvases[2].plotter.drawGraph(m0,m1)
                canvases[3].plotter.drawGraph(r0,r1)
                setTimeout(() => {
                    console.log("Drawing dashed line at x=7");
                    canvases[1].plotter.drawDashedLine(8, 8, 8, -8, 'red', [5, 2])
                    canvases[2].plotter.drawDashedLine(8, 8, 8, -8, 'red', [5, 2])
                    canvases[3].plotter.drawDashedLine(8, 8, 8, -8, 'red', [5, 2])
                },1500)
            
        }
    }
});


var x1 = 0 
var x2 = 5 
var x3 = 10
var x4 = 16
var x5 = 21
var x6 = 30
var x7 = 33
var x8 = 36

var y1 = 0 
var y2 = -3.38 
var y3 = 2.25
var y4 = -2.25 
var y5 = 1.5
var y6 = -0.75
var y7 = 0.25
var y8 = 0
//ПОСТРОЕНИЕ ЛИНИИ ВЛИЯНИЯ
// plotter.drawGraph([x1, x2], [y1, y2]);
// plotter.drawGraph([x2, x3], [y2, y3]);
// plotter.drawGraph([x3, x4], [y3, y4]);
// plotter.drawGraph([x4, x5], [y4, y5]);
// plotter.drawGraph([x5, x6], [y5, y6]);
// plotter.drawGraph([x6, x7], [y6, y7]);
// plotter.drawGraph([x7, x8], [y7, y8]);

//@------------------------------------------------------------
// // ЛИНИИ ВЛИЯНИЯ ПОПЕРЕЧНОЙ СИЛЫ

let q0 = [0,      5, 7,    8,   8, 9,   12,  16,   zmax];
let q1 = [-0.677, 1, 0, -0.5, 0.5, 0, -1.5, 1.5, -0.5];

// // ЛИНИИ ВЛИЯНИЯ ИЗГИБАЮЩЕГО МОМЕНТА

let m0 = [0,      5, 7, 8,   9,   12,  16,   zmax];
let m1 = [0.677, -1, 0, 0.5, 0, -1.5, 1.5, -0.5];

// // ЛИНИИ ВЛИЯНИЯ РЕАКЦИЙ ОПОР

let r0 = [0, 9,  12,   16,    zmax];
let r1 = [0, 1, 2.5, -2.5, 0.833];

// //ПОСТРОЕНИЕ ЛИНИИ ВЛИЯНИЯ
// canvases[1].drawGraph([x1, x2], [y1, y2]);
// canvases[1].drawGraph([x2, x3], [y2, y3]);
// canvases[1].drawGraph([x3, x4], [y3, y4]);
// canvases[1].drawGraph([x4, x5], [y4, y5]);
// canvases[1].drawGraph([x5, x6], [y5, y6]);
// canvases[1].drawGraph([x6, x7], [y6, y7]);
// canvases[1].drawGraph([x7, x8], [y7, y8]);
