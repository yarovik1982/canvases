// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

export class Plotter {
	// Параметры:
	//  ctx - контекст канваса
	//  width, height - ширина и высота рабочей области
	//  x0, y0 - начало координат
	//  xMin, xMax - минимум и максимум по оси X
	//  yMin, yMax - минимум и максимум по оси Y
	constructor(ctx, width, height, x0, y0, xMin, xMax, yMin, yMax) {
		// Свойства:
		this.ctx = ctx;
		this.x0 = x0;
		this.y0 = y0;
		this.xScale = (xMax - xMin) / width;
		this.yScale = (yMax - yMin) / height;
		this.xMin = xMin / this.xScale;
		this.xMax = xMax / this.xScale;
		this.yMin = yMin / this.yScale;
		this.yMax = yMax / this.yScale;
	}
	// Метод: Нарисовать сетку
	// Параметры:
	//  xCell - ширина клетки
	//  yCell - высота клетки
	//  color - цвет сетки (по умолчанию светло-серый)
	drawGrid(xCell, yCell, color = "lightgray") {
		this.ctx.save(); // сохранить состояние контекста по умолчанию
		this.ctx.translate(this.x0, this.y0); // перевести начало контекста
		this.ctx.scale(1, -1); // перевернуть контекст по вертикали

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		xCell /= this.xScale;
		yCell /= this.yScale;

		let x = this.xMin;
		do {
			this.ctx.moveTo(x, this.yMin);
			this.ctx.lineTo(x, this.yMax);
			x += xCell;
		} while (x <= this.xMax);

		let y = this.yMin;
		do {
			this.ctx.moveTo(this.xMin, y);
			this.ctx.lineTo(this.xMax, y);
			y += yCell;
		} while (y <= this.yMax);

		this.ctx.stroke();

		this.ctx.restore(); // восстановить состояние контекста по умолчанию
	}
	// Метод: Нарисовать оси
	// Параметры:
	//  xLabel - метка оси X
	//  yLabel - метка оси Y
	//  color  - цвет осей и меток
	//  font   - шрифт меток
	drawAxes(xLabel = "x", yLabel = "y", color = "black", font = "12px Arial") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1);

		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();
		this.ctx.moveTo(this.xMin, 0);
		this.ctx.lineTo(this.xMax, 0);
		this.ctx.moveTo(0, this.yMin);
		this.ctx.lineTo(0, this.yMax);
		this.ctx.stroke();

		this.ctx.scale(1, -1);

		this.ctx.fillStyle = color;
		this.ctx.font = font;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(xLabel, this.xMax + 10, -10);
		this.ctx.fillText(yLabel, 0, -this.yMax - 10);

		this.ctx.restore();
	}
	// Метод: Нарисовать насечки
	// Параметры:
	//  xCell - ширина клетки
	//  yCell - высота клетки
	//  color - цвет насечек
	drawTicks(xCell, yCell, color = "black") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1);

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		xCell /= this.xScale;
		yCell /= this.yScale;

		let x = this.xMin;
		do {
			this.ctx.moveTo(x, -4);
			this.ctx.lineTo(x, 4);
			x += xCell;
		} while (x <= this.xMax);

		let y = this.yMin;
		do {
			this.ctx.moveTo(-4, y);
			this.ctx.lineTo(4, y);
			y += yCell;
		} while (y <= this.yMax);

		this.ctx.stroke();

		this.ctx.restore();
	}
	// Метод: Нарисовать единицы
	// Параметры:
	//  xCell - ширина клетки
	//  yCell - высота клетки
	//  color - цвет единиц
	//  font  - шрифт единиц
	drawUnits(xCell, yCell, color = "black", font = "10px Arial") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);

		this.ctx.fillStyle = color;
		this.ctx.font = font;

		xCell /= this.xScale;
		yCell /= this.yScale;

		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";

		let x = this.xMin;
		do {
			this.ctx.fillText(x * this.xScale, x + 4, 4);
			x += xCell;
		} while (x <= this.xMax);

		let y = this.yMin;
		do {
			this.ctx.fillText(y * this.yScale, 4, -y + 4);
			y += yCell;
		} while (y <= this.yMax);

		this.ctx.restore();
	}
	// Метод: Нарисовать график
	// Параметры:
	//  xArray - массив X-координат
	//  yArray - массив Y-координат
	//  color  - цвет графика
	//  dots   - показать точки?
	//  line   - показать линию?
	drawGraph(xArray, yArray, color = "blue", dots = 0 * true, line = true) {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1);

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		let angle2PI = 2 * Math.PI;

		for (let i = 0; i < xArray.length; i++) {
			let x = xArray[i] / this.xScale;
			let y = yArray[i] / this.yScale;

			if (line && i != 0) {
				this.ctx.lineTo(x, y);
			} else {
				this.ctx.moveTo(x, y);
			}
			if (dots) {
				this.ctx.arc(x, y, 1, 0, angle2PI);
				this.ctx.moveTo(x, y);
			}
		}

		this.ctx.stroke();

		this.ctx.restore();
	}

	// Для пунктирной линии
	drawDashedLine(x1, y1, x2, y2, color = "red", pattern = [5, 3]) {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1); // Инвертируем ось Y

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 1;
		this.ctx.setLineDash(pattern);

		this.ctx.beginPath();
		this.ctx.moveTo(x1 / this.xScale, y1 / this.yScale);
		this.ctx.lineTo(x2 / this.xScale, y2 / this.yScale);
		this.ctx.stroke();

		this.ctx.restore();
	}
}
