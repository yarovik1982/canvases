let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Создание объекта класса:
let plotter = new Plotter(context, 740, 310, 30, 200, 0, 40, -8, 8);
// Вызов методов объекта:
plotter.drawGrid(1, 1);
plotter.drawAxes('X', 'Y');
plotter.drawTicks(1, 1);
plotter.drawUnits(1, 1);

// ДЛИНА БАЛКИ
var zmax = 20

//СЕЧЕНИЯ БАЛКИ
var zc = 8 //вертикальная пунктирная чёрная линия 
var zop = 9 //вертикальный жирный красный отрезок 

//ПОСТРОЕНИЕ ОПОР И ШАРНИРОВ 
//параметры опор и шарниров
var dd = 0.25
var hh = 4 * dd

// ПОДВИЖНЫЕ ОПОРЫ ПОСТРОЕНИЕ

let op = [2, 7, 9, 14];
console.log(op); // вывод в консоль массива
for(var i = 0; i < op.length; ++ i) 
	var xop = op[i]; // координата x положения фигуры
	console.log(xop); // вывод в консоль первого элемента массива
	var yop = 0

// ШАРНИРЫ ПОСТРОЕНИЕ
let XSH = [5, 12, 16];
console.log(XSH); // вывод в консоль массива
for(var i = 0; i < XSH.length; ++ i) 
	var xsh = XSH[i]; // координата x положения фигуры

// НЕПОДВИЖНАЯ ОПОРА ПОСТРОЕНИЕ
var xopn = 19

// ЛИНИИ ВЛИЯНИЯ ПОПЕРЕЧНОЙ СИЛЫ 

let q0 = [0,      5, 7,    8,   8, 9,   12,  16,   zmax];
let q1 = [-0.677, 1, 0, -0.5, 0.5, 0, -1.5, 1.5, -0.5];

// ЛИНИИ ВЛИЯНИЯ ИЗГИБАЮЩЕГО МОМЕНТА

let m0 = [0,      5, 7, 8,   9,   12,  16,   zmax];
let m1 = [0.677, -1, 0, 0.5, 0, -1.5, 1.5, -0.5];

// ЛИНИИ ВЛИЯНИЯ РЕАКЦИЙ ОПОР

let r0 = [0, 9,  12,   16,    zmax];
let r1 = [0, 1, 2.5, -2.5, 0.833];

//ПОСТРОЕНИЕ ЛИНИИ ВЛИЯНИЯ
plotter.drawGraph([x1, x2], [y1, y2]);
plotter.drawGraph([x2, x3], [y2, y3]);
plotter.drawGraph([x3, x4], [y3, y4]);
plotter.drawGraph([x4, x5], [y4, y5]);
plotter.drawGraph([x5, x6], [y5, y6]);
plotter.drawGraph([x6, x7], [y6, y7]);
plotter.drawGraph([x7, x8], [y7, y8]);



