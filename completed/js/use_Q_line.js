const zmax = 40
const data_Q_line = {
    coordsX:[0,      5, 7,    8,   8, 9,   12,  16,   zmax],
    coordsY:[-0.677, 1, 0, -0.5, 0.5, 0, -1.5, 1.5, -0.5],
}

export function draw_Q_line(ctx, plotter) {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    
    // Начинаем новый путь
    ctx.beginPath();
    
    // Переводим первую точку в координаты канваса
    let x = plotter.x0 + data_Q_line.coordsX[0] / plotter.xScale;
    let y = plotter.y0 - data_Q_line.coordsY[0] / plotter.yScale;
    ctx.moveTo(x, y);
    
    // Соединяем остальные точки
    for (let i = 1; i < data_Q_line.coordsX.length; i++) {
        x = plotter.x0 + data_Q_line.coordsX[i] / plotter.xScale;
        y = plotter.y0 - data_Q_line.coordsY[i] / plotter.yScale;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    ctx.restore();
}