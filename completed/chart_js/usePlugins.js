export const usePlugins = () => {
  const drawLine = {
    id: 'drawLine',
    afterDraw(chart, args, options) {
      if (!options) return;
      const { ctx, scales } = chart;
      const { x1, y1, x2, y2, color = 'black', lineWidth = 1 } = options;

      // Получаем шкалы осей (по умолчанию 'x' и 'y')
      const xScale = scales['x'] || scales[Object.keys(scales)[0]]; // Если ось не 'x', берём первую
      const yScale = scales['y'] || scales[Object.keys(scales)[1]]; // Если ось не 'y', берём вторую

      // Преобразуем значения данных в пиксельные координаты
      const pixelX1 = xScale.getPixelForValue(x1);
      const pixelY1 = yScale.getPixelForValue(y1);
      const pixelX2 = xScale.getPixelForValue(x2);
      const pixelY2 = yScale.getPixelForValue(y2);

      // Рисуем линию
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(pixelX1, pixelY1);
      ctx.lineTo(pixelX2, pixelY2);
      ctx.stroke();
      ctx.restore();
    }
  };

  return {
    drawLine
  };
};