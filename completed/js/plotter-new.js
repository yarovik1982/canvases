export class Plotter {
	constructor(ctx, canvasWidth, canvasHeight, x0, y0, xMin, xMax, yMin, yMax) {
		this.ctx = ctx;
		this.x0 = x0;
		this.y0 = y0;
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;

		// Пикселей на единицу
		this.xScale = canvasWidth / (xMax - xMin);
		this.yScale = canvasHeight / (yMax - yMin); // Важно: масштаб по Y
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	toScreen(logicalX, logicalY) {
		const screenX = this.x0 + (logicalX - this.xMin) * this.xScale;
		// Y растёт вниз, но логические значения растут вверх → инвертируем
		const screenY = this.y0 - (logicalY - this.yMin) * this.yScale;
		return { x: screenX, y: screenY };
	}

	drawGrid(xCell, yCell, color = "lightgray") {
		this.ctx.save();
		this.ctx.lineWidth = 0.5;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();

		let x = this.xMin;
		while (x <= this.xMax) {
			const { x: sx } = this.toScreen(x, 0);
			const { y: top } = this.toScreen(x, this.yMax);
			const { y: bottom } = this.toScreen(x, this.yMin);
			this.ctx.moveTo(sx, bottom);
			this.ctx.lineTo(sx, top);
			x += xCell;
		}

		let y = this.yMin;
		while (y <= this.yMax) {
			const { y: sy } = this.toScreen(0, y);
			const { x: left } = this.toScreen(this.xMin, y);
			const { x: right } = this.toScreen(this.xMax, y);
			this.ctx.moveTo(left, sy);
			this.ctx.lineTo(right, sy);
			y += yCell;
		}

		this.ctx.stroke();
		this.ctx.restore();
	}

	drawAxes(xLabel = "X", yLabel = "Y", color = "black") {
		this.ctx.save();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();

		// Ось X: от xMin до xMax, по Y=0
		const { x: xStart, y: yZero } = this.toScreen(this.xMin, 0);
		const { x: xEnd } = this.toScreen(this.xMax, 0);
		this.ctx.moveTo(xStart, yZero);
		this.ctx.lineTo(xEnd, yZero);

		// Ось Y: от yMin до yMax, по X=0
		const { x: xZero, y: yStart } = this.toScreen(0, this.yMin);
		const { y: yEnd } = this.toScreen(0, this.yMax);
		this.ctx.moveTo(xZero, yStart);
		this.ctx.lineTo(xZero, yEnd);

		this.ctx.stroke();

		// Подписи осей
		this.ctx.fillStyle = color;
		this.ctx.font = "12px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.fillText(xLabel, (xStart + xEnd) - 15, yZero);

		this.ctx.textBaseline = "bottom";
		this.ctx.fillText(yLabel, xZero,  yEnd);

		this.ctx.restore();
	}

	drawTicks(xCell, yCell, color = "black") {
		this.ctx.save();
		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();

		// Насечки по X
		let x = this.xMin;
		while (x <= this.xMax) {
			const { x: sx, y: yZero } = this.toScreen(x, 0);
			this.ctx.moveTo(sx, yZero - 5);
			this.ctx.lineTo(sx, yZero + 5);
			x += xCell;
		}

		// Насечки по Y
		let y = this.yMin;
		while (y <= this.yMax) {
			if (y === 0) {
				y += yCell;
				continue;
			}
			const { x: xZero, y: sy } = this.toScreen(0, y);
			this.ctx.moveTo(xZero - 5, sy);
			this.ctx.lineTo(xZero + 5, sy);
			y += yCell;
		}
		this.ctx.stroke();
		this.ctx.restore();
	}

	drawUnits(xCell, yCell, color = "black") {
		this.ctx.save();
		this.ctx.fillStyle = color;
		this.ctx.font = "10px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "top";

		// Подписи по X
		let x = this.xMin;
		while (x <= this.xMax) {
			const { x: sx, y: yZero } = this.toScreen(x, 0);
			this.ctx.fillText(x, sx+5, yZero + 5);
			x += xCell;
		}

		// Подписи по Y
		this.ctx.textAlign = "right";
		this.ctx.textBaseline = "middle";
		let y = this.yMin;
		while (y <= this.yMax) {
			if (y === 0) {
				y += yCell;
				continue;
			}
			const { x: xZero, y: sy } = this.toScreen(0, y);
			this.ctx.fillText(y, xZero - 8, sy);
			y += yCell;
		}

		this.ctx.restore();
	}

	redraw(xMax) {
		this.xMax = xMax;
		this.xScale = 740 / (xMax - this.xMin);
		this.clear();
		this.drawGrid(1, 1);
		this.drawAxes("X", "Y");
		this.drawTicks(1, 1);
		this.drawUnits(1, 1);
	}

	 drawVerticalLine(x1, y1, x2, y2, color = "teal") {
    this.ctx.save();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = color;
    const { x: sx1, y: sy1 } = this.toScreen(x1, y1);
    const { x: sx2, y: sy2 } = this.toScreen(x2, y2);
    this.ctx.beginPath();
    this.ctx.moveTo(sx1, sy1);
    this.ctx.lineTo(sx2, sy2);
    this.ctx.stroke();
    this.ctx.restore();
  }

   drawDashedLine(x1, y1, x2, y2, color = "red", pattern = [5, 3]) {
    this.ctx.save();
    this.ctx.setLineDash(pattern);
    this.ctx.strokeStyle = color;
    const { x: sx1, y: sy1 } = this.toScreen(x1, y1);
    const { x: sx2, y: sy2 } = this.toScreen(x2, y2);
    this.ctx.beginPath();
    this.ctx.moveTo(sx1, sy1);
    this.ctx.lineTo(sx2, sy2);
    this.ctx.stroke();
    this.ctx.restore();
  }
}
