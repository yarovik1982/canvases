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

	/**
	 * Рисует насечки по оси X без смещения (строго по координатам)
	 * @param {number} xCell - шаг между насечками (в единицах данных)
	 * @param {string} color - цвет насечек
	 */
	drawXTicks(xCell, color = "black") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1);

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		xCell /= this.xScale;

		let x = this.xMin;
		do {
			this.ctx.moveTo(x, -4); // Без смещения
			this.ctx.lineTo(x, 4); // Без смещения
			x += xCell;
		} while (x <= this.xMax);

		this.ctx.stroke();
		this.ctx.restore();
	}

	drawXTicksArray(xArray, color = "black") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1); // Инверсия Y-оси

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		for (let i = 0; i < xArray.length; i++) {
			const x = xArray[i] / this.xScale;

			this.ctx.moveTo(x, -4); // Верх насечки
			this.ctx.lineTo(x, 4); // Низ насечки
		}

		this.ctx.stroke();
		this.ctx.restore();
	}

	/**
	 * Рисует насечки только по оси Y
	 * @param {number} yCell - шаг между насечками (в единицах данных)
	 * @param {string} color - цвет насечек
	 */
	drawYTicks(yCell, color = "black") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);
		this.ctx.scale(1, -1);

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;

		this.ctx.beginPath();

		yCell /= this.yScale;

		let y = this.yMin;
		do {
			this.ctx.moveTo(-4, y);
			this.ctx.lineTo(4, y);
			y += yCell;
		} while (y <= this.yMax);

		this.ctx.stroke();
		this.ctx.restore();
	}

	// Метод: Нарисовать единицы только по оси Y
	// Параметры:
	//  xCell - ширина клетки по оси X (не используется, можно убрать или оставить для вычислений)
	//  yCell - высота клетки по оси Y
	//  color - цвет текста
	//  font  - шрифт текста
	drawUnitsY(yCell, color = "black", font = "10px Arial") {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);

		this.ctx.fillStyle = color;
		this.ctx.font = font;

		yCell /= this.yScale;

		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";

		let y = this.yMin;
		do {
			this.ctx.fillText(y * this.yScale, 4, -y + 4);
			y += yCell;
		} while (y <= this.yMax);

		this.ctx.restore();
	}

	/*
    Рисует подписи значений на оси X согласно переданному массиву
   @param {Array} xValues - массив значений для отметки на оси X (например, [0, 5, 7, 8, 20])
   * @param {string} color - цвет текста
   * @param {string} font - шрифт текста
   * @param {number} yOffset - смещение подписи относительно оси (в пикселях)
   */
	drawXAxisValues(xValues, color = "black", font = "10px Arial", yOffset = 15) {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);

		this.ctx.fillStyle = color;
		this.ctx.font = font;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "top";

		// Рисуем подписи для каждого значения
		xValues.forEach((value) => {
			const x = value / this.xScale; // Переводим в координаты канваса
			this.ctx.fillText(value.toString(), x, yOffset);

			// Дополнительно рисуем маленькую отметку на оси
			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, 5);
			this.ctx.stroke();
		});

		this.ctx.restore();
	}

	/**
	 * Рисует подписи единиц по оси X со смещением вправо
	 * @param {number} xCell - шаг между подписями (в единицах данных)
	 * @param {string} color - цвет текста
	 * @param {string} font - шрифт текста
	 * @param {number} xOffset - смещение вправо в пикселях (по умолчанию 2px)
	 */
	drawUnitsX(xCell, color = "black", font = "10px Arial", xOffset = 2) {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);

		this.ctx.fillStyle = color;
		this.ctx.font = font;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "top";

		// Переводим xCell из единиц данных в пиксели
		xCell /= this.xScale;

		// Рисуем подписи вдоль оси X со смещением
		let x = this.xMin;
		do {
			const label = x * this.xScale;
			this.ctx.fillText(label, x + xOffset, 4); // Добавлено xOffset к координате X
			x += xCell;
		} while (x <= this.xMax);

		this.ctx.restore();
	}

	// Метод: Нарисовать график
	// Параметры:
	//  xArray - массив X-координат
	//  yArray - массив Y-координат
	//  color  - цвет графика
	//  dots   - показать точки?
	//  line   - показать линию?
	drawGraph(xArray, yArray, color = "blue", dots = false, line = true) {
		this.ctx.save();
		this.ctx.translate(this.x0, this.y0);

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = color;
		this.ctx.fillStyle = color;
		this.ctx.font = "10px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";

		// 🧭 Начинаем рисовать график
		this.ctx.beginPath();
		for (let i = 0; i < xArray.length; i++) {
			let x = xArray[i] / this.xScale;
			let y = -yArray[i] / this.yScale;

			if (line && i !== 0) {
				this.ctx.lineTo(x, y);
			} else {
				this.ctx.moveTo(x, y);
			}
		}
		this.ctx.stroke(); // ✨ ВАЖНО: рисуем линию графика

		// 🔵 Рисуем точки и значения Y
		for (let i = 0; i < xArray.length; i++) {
			let x = xArray[i] / this.xScale;
			let y = -yArray[i] / this.yScale;

			if (dots) {
				this.ctx.beginPath();
				this.ctx.arc(x, y, 2, 0, 2 * Math.PI);
				this.ctx.fill();
			}

			// Отображаем значение Y над точкой
			this.ctx.fillText(yArray[i].toString(), x, y - 10);

			// 📏 Насечка на оси X
			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, 5);
			this.ctx.stroke();

			// Подпись значения X под осью
			this.ctx.fillText(xArray[i].toString(), x, 15);
		}

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

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}
}
