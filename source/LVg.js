let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Создание объекта класса:
let plotter = new Plotter(context, 740, 310, 30, 200, 0, 40, -8, 8);
// Вызов методов объекта:
plotter.drawGrid(1, 1);
plotter.drawAxes('X', 'Y');
plotter.drawTicks(1, 1);
plotter.drawUnits(1, 1);

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
plotter.drawGraph([x1, x2], [y1, y2]);
plotter.drawGraph([x2, x3], [y2, y3]);
plotter.drawGraph([x3, x4], [y3, y4]);
plotter.drawGraph([x4, x5], [y4, y5]);
plotter.drawGraph([x5, x6], [y5, y6]);
plotter.drawGraph([x6, x7], [y6, y7]);
plotter.drawGraph([x7, x8], [y7, y8]);


// КООРДИНАТЫ ПОДВИЖНЫХ ОПОР
var xop1 = 8
var xop2 = 13
var xop3 = 19
var xop4 = 27
var xop5 = 33
var xop6 = 36
// КООРДИНАТЫ ШАРНИРОВ
var xsh1 = 5 
var xsh2 = 10 
var xsh3 = 16
var xsh4 = 21
var xsh5 = 30
var xsh6 = 33

var ysh1 = -3.38
var ysh2 = 2.25
var ysh3 = -2.25
var ysh4 = 1.5
var ysh5 = -0.75
var ysh6 = 0.25

//ПОСТРОЕНИЕ ОПОР И ШАРНИРОВ 
//параметры опор
var dd = 0.25
var hh = 4 * dd

// ШАРНИРЫ ПОСТРОЕНИЕ
let XSH = [xsh1, xsh2, xsh3, xsh4, xsh5, xsh6];
console.log(XSH); // вывод в консоль массива
let YSH = [ysh1, ysh2, ysh3, ysh4, ysh5, ysh6];
console.log(YSH); // вывод в консоль массива
for(var i = 0; i < XSH.length; ++ i) {
	var xsh = XSH[i]; // координата x положения фигуры
for(var j = 0; j < YSH.length; ++ j) 
var ysh = YSH[i]; // координата x положения фигуры
plotter.drawGraph([xsh + 0.0 * dd, xsh + 0.0 * dd], [0 * dd + ysh, 1 * dd + ysh]); // точка 00
plotter.drawGraph([xsh + 0.0 * dd, xsh + 0.5 * dd], [1 * dd + ysh, 1 * dd + ysh]); // точка 8
plotter.drawGraph([xsh + 0.5 * dd, xsh + 1.0 * dd], [1 * dd + ysh, 0 * dd + ysh]); // точка 9
plotter.drawGraph([xsh + 1.0 * dd, xsh + 0.5 * dd], [0 * dd + ysh, -1 * dd + ysh]); // точка 10
plotter.drawGraph([xsh + 0.5 * dd, xsh + 0.0 * dd], [-1 * dd + ysh, -1 * dd + ysh]); // точка 11
plotter.drawGraph([xsh + 0.0 * dd, xsh + -0.5 * dd], [-1 * dd + ysh, -1 * dd + ysh]); // точка 12
plotter.drawGraph([xsh + -0.5 * dd, xsh + -1.0 * dd], [-1 * dd + ysh, 0 * dd + ysh]); // точка 13
plotter.drawGraph([xsh + -1.0 * dd, xsh + -0.5 * dd], [0 * dd + ysh, 1 * dd + ysh]); // точка 14
plotter.drawGraph([xsh + -0.5 * dd, xsh + 0.0 * dd], [1 * dd + ysh, 1 * dd + ysh]); // точка 15
plotter.drawGraph([xsh + 0.0 * dd, xsh + 0.0 * dd], [1 * dd + ysh, 0 * dd + ysh]); // точка 8
plotter.drawGraph([xsh + 0.0 * dd, xsh + 0.0 * dd], [0 * dd + ysh, 0 * dd + ysh]); // точка 00
}
// ПОДВИЖНЫЕ ОПОРЫ ПОСТРОЕНИЕ
//let op = [xop1, xop2, xop3, xop4, xop5, xop6];
let op = [8, 13, 19, 27, 32, 36];
console.log(op); // вывод в консоль массива
for(var i = 0; i < op.length; ++ i) {
	var xop = op[i]; // координата x положения фигуры
	console.log(xop); // вывод в консоль первого элемента массива
	var yop = 0
plotter.drawGraph([xop + 0.0 * dd, xop + 0.0 * dd], [0 * dd + yop, 1 * dd + yop]); // точка 0
plotter.drawGraph([xop + 0.0 * dd, xop+ 0.5 * dd], [1 * dd + yop, 1 * dd + yop]); // точка 1
plotter.drawGraph([xop + 0.5 * dd, xop + 1.0 * dd], [1 * dd + yop, 0 * dd + yop]); // точка 2
plotter.drawGraph([xop + 1.0 * dd, xop + 0.5 * dd], [0 * dd + yop, -1 * dd + yop]); // точка 3
plotter.drawGraph([xop + 0.5 * dd, xop + 0.0 * dd], [-1 * dd + yop, -1 * dd + yop]); // точка 4
plotter.drawGraph([xop + 0.0 * dd, xop + -0.5 * dd], [-1 * dd + yop, -1 * dd + yop]); // точка 5
plotter.drawGraph([xop + -0.5 * dd, xop + -1.0 * dd], [-1 * dd + yop, 0 * dd + yop]); // точка 6
plotter.drawGraph([xop + -1.0 * dd, xop + -0.5 * dd], [0 * dd + yop, 1 * dd + yop]); // точка 7
plotter.drawGraph([xop + -0.5 * dd, xop + 0.0 * dd], [1 * dd + yop, 1 * dd + yop]); // точка 0
plotter.drawGraph([xop + 0.0 * dd, xop + 0.0 * dd], [1 * dd + yop, 0 * dd + yop]); // точка 7
plotter.drawGraph([xop + -0.5 * dd, xop + -1.0 * dd], [-1 * dd + yop, 0 * dd + yop]); // точка 6
plotter.drawGraph([xop + 0.0 * dd, xop + -0.5 * dd], [-1 * dd + yop, -1 * dd + yop]); // точка 5
plotter.drawGraph([xop + 0.5 * dd, xop + 0.0 * dd], [-1 * dd + yop, -1 * dd + yop]); // точка 4

plotter.drawGraph([xop + 0.0 * dd, xop + 0.0 * dd], [-1 * dd + yop, -1 * dd + yop - hh]); // точка 4
plotter.drawGraph([xop + 0.0 * dd, xop + 0.0 * dd], [0 * dd + yop - hh, 1 * dd + yop - hh]); // точка 8
plotter.drawGraph([xop + 0.0 * dd, xop+ 0.5 * dd], [1 * dd + yop - hh, 1 * dd + yop - hh]); // точка 9
plotter.drawGraph([xop + 0.5 * dd, xop + 1.0 * dd], [1 * dd + yop - hh, 0 * dd + yop - hh]); // точка 10
plotter.drawGraph([xop + 1.0 * dd, xop + 0.5 * dd], [0 * dd + yop - hh, -1 * dd + yop - hh]); // точка 11
plotter.drawGraph([xop + 0.5 * dd, xop + 0.0 * dd], [-1 * dd + yop - hh, -1 * dd + yop - hh]); // точка 12
plotter.drawGraph([xop + 0.0 * dd, xop + -0.5 * dd], [-1 * dd + yop - hh, -1 * dd + yop - hh]); // точка 13
plotter.drawGraph([xop + -0.5 * dd, xop + -1.0 * dd], [-1 * dd + yop - hh, 0 * dd + yop - hh]); // точка 14
plotter.drawGraph([xop + -1.0 * dd, xop + -0.5 * dd], [0 * dd + yop - hh, 1 * dd + yop - hh]); // точка 15
plotter.drawGraph([xop + -0.5 * dd, xop + -0.0 * dd], [1 * dd + yop - hh, 1 * dd + yop - hh]); // точка 8
plotter.drawGraph([xop + -0.0 * dd, xop + -0.0 * dd], [1 * dd + yop - hh, -1 * dd + yop - hh]);
plotter.drawGraph([xop + -0.0 * dd, xop + -0.5 * dd], [-1 * dd + yop - hh, -1 * dd + yop - hh]);

plotter.drawGraph([xop + -0.5 * dd, xop + -1.5 * dd], [-1 * dd + yop - hh, -2 * dd + yop - hh]); //13-16
plotter.drawGraph([xop + -1.5 * dd, xop + 1.5 * dd], [-2 * dd + yop - hh, -2 * dd + yop - hh]); //16-17
plotter.drawGraph([xop + 1.5 * dd, xop + 0.5 * dd], [-2 * dd + yop - hh, -1 * dd + yop - hh]); //17-11
plotter.drawGraph([xop + 0.5 * dd, xop + 1.5 * dd], [-1 * dd + yop - hh, -2 * dd + yop - hh]); //11-17
plotter.drawGraph([xop + 1.5 * dd, xop + 1.0 * dd], [-2 * dd + yop - hh, -3 * dd + yop - hh]); //17-18
plotter.drawGraph([xop + 1.0 * dd, xop + 1.5 * dd], [-3 * dd + yop - hh, -2 * dd + yop - hh]); //18-17
plotter.drawGraph([xop + 1.5 * dd, xop + 0.75 * dd], [-2 * dd + yop - hh, -2 * dd + yop - hh]); //17-19
plotter.drawGraph([xop + 0.75 * dd, xop + 0.25 * dd], [-2 * dd + yop - hh, -3 * dd + yop - hh]); //19-20
plotter.drawGraph([xop + 0.25 * dd, xop + 0.75 * dd], [-3 * dd + yop - hh, -2 * dd + yop - hh]); //20-19
plotter.drawGraph([xop + 0.75 * dd, xop + 0.0 * dd], [-2 * dd + yop - hh, -2 * dd + yop - hh]); //20-21
plotter.drawGraph([xop + 0.0 * dd, xop + -0.5 * dd], [-2 * dd + yop - hh, -3 * dd + yop - hh]); //21-22
plotter.drawGraph([xop + -0.5 * dd, xop + -0.0 * dd], [-3 * dd + yop - hh, -2 * dd + yop - hh]); //22-21
plotter.drawGraph([xop + 0.0 * dd, xop + -0.75 * dd], [-2 * dd + yop - hh, -2 * dd + yop - hh]); //21-23
plotter.drawGraph([xop + -0.75 * dd, xop + -1.25 * dd], [-2 * dd + yop - hh, -3 * dd + yop - hh]); //23-24
plotter.drawGraph([xop + -1.25 * dd, xop + -0.75 * dd], [-3 * dd + yop - hh, -2 * dd + yop - hh]); //24-23
plotter.drawGraph([xop + -0.75 * dd, xop + -1.5 * dd], [-2 * dd + yop - hh, -2 * dd + yop - hh]); //23-25
plotter.drawGraph([xop + -1.5 * dd, xop + -2.0 * dd], [-2 * dd + yop - hh, -3 * dd + yop - hh]); //25-26

// НЕПОДВИЖНАЯ ОПОРА ПОСТРОЕНИЕ

var xopn = 0
var yopn = 0

plotter.drawGraph([xopn + 0.0 * dd, xopn + 0.0 * dd], [-1 * dd + yopn, -1 * dd + yopn]); // точка 4
plotter.drawGraph([xopn + 0.0 * dd, xopn + 0.0 * dd], [0 * dd + yopn, 1 * dd + yopn]); // точка 8
plotter.drawGraph([xopn + 0.0 * dd, xopn+ 0.5 * dd], [1 * dd + yopn, 1 * dd + yopn]); // точка 9
plotter.drawGraph([xopn + 0.5 * dd, xopn + 1.0 * dd], [1 * dd + yopn, 0 * dd + yopn]); // точка 10
plotter.drawGraph([xopn + 1.0 * dd, xopn + 0.5 * dd], [0 * dd + yopn, -1 * dd + yopn]); // точка 11
plotter.drawGraph([xopn + 0.5 * dd, xopn + 0.0 * dd], [-1 * dd + yopn, -1 * dd + yopn]); // точка 12
plotter.drawGraph([xopn + 0.0 * dd, xopn + -0.5 * dd], [-1 * dd + yopn, -1 * dd + yopn]); // точка 13
plotter.drawGraph([xopn + -0.5 * dd, xopn + -1.0 * dd], [-1 * dd + yopn, 0 * dd + yopn]); // точка 14
plotter.drawGraph([xopn + -1.0 * dd, xopn + -0.5 * dd], [0 * dd + yopn, 1 * dd + yopn]); // точка 15
plotter.drawGraph([xopn + -0.5 * dd, xopn + -0.0 * dd], [1 * dd + yopn, 1 * dd + yopn]); // точка 8
plotter.drawGraph([xopn + -0.0 * dd, xopn + -0.0 * dd], [1 * dd + yopn, -1 * dd + yopn]);
plotter.drawGraph([xopn + -0.0 * dd, xopn + -0.5 * dd], [-1 * dd + yopn, -1 * dd + yopn]);

plotter.drawGraph([xopn + -0.5 * dd, xopn + -1.5 * dd], [-1 * dd + yopn, -2 * dd + yopn]); //13-16
plotter.drawGraph([xopn + -1.5 * dd, xopn + 1.5 * dd], [-2 * dd + yopn, -2 * dd + yopn]); //16-17
plotter.drawGraph([xopn + 1.5 * dd, xopn + 0.5 * dd], [-2 * dd + yopn, -1 * dd + yopn]); //17-11
plotter.drawGraph([xopn + 0.5 * dd, xopn + 1.5 * dd], [-1 * dd + yopn, -2 * dd + yopn]); //11-17
plotter.drawGraph([xopn + 1.5 * dd, xopn + 1.0 * dd], [-2 * dd + yopn, -3 * dd + yopn]); //17-18
plotter.drawGraph([xopn + 1.0 * dd, xopn + 1.5 * dd], [-3 * dd + yopn, -2 * dd + yopn]); //18-17
plotter.drawGraph([xopn + 1.5 * dd, xopn + 0.75 * dd], [-2 * dd + yopn, -2 * dd + yopn]); //17-19
plotter.drawGraph([xopn + 0.75 * dd, xopn + 0.25 * dd], [-2 * dd + yopn, -3 * dd + yopn]); //19-20
plotter.drawGraph([xopn + 0.25 * dd, xopn + 0.75 * dd], [-3 * dd + yopn, -2 * dd + yopn]); //20-19
plotter.drawGraph([xopn + 0.75 * dd, xopn + 0.0 * dd], [-2 * dd + yopn, -2 * dd + yopn]); //20-21
plotter.drawGraph([xopn + 0.0 * dd, xopn + -0.5 * dd], [-2 * dd + yopn, -3 * dd + yopn]); //21-22
plotter.drawGraph([xopn + -0.5 * dd, xopn + -0.0 * dd], [-3 * dd + yopn, -2 * dd + yopn]); //22-21
plotter.drawGraph([xopn + 0.0 * dd, xopn + -0.75 * dd], [-2 * dd + yopn, -2 * dd + yopn]); //21-23
plotter.drawGraph([xopn + -0.75 * dd, xopn + -1.25 * dd], [-2 * dd + yopn, -3 * dd + yopn]); //23-24
plotter.drawGraph([xopn + -1.25 * dd, xopn + -0.75 * dd], [-3 * dd + yopn, -2 * dd + yopn]); //24-23
plotter.drawGraph([xopn + -0.75 * dd, xopn + -1.5 * dd], [-2 * dd + yopn, -2 * dd + yopn]); //23-25
plotter.drawGraph([xopn + -1.5 * dd, xopn + -2.0 * dd], [-2 * dd + yopn, -3 * dd + yopn]); //25-26
}


 /*ИХОДНЫЕ ДАННЫЕ
//кООРДИНАТЫ ПОДВИЖНЫХ ОПОР
var xop1 = 8 
var xop2 = 13 
var xop3 = 19
var xop4 = 27
var xop5 = 33
var xop6 = 36 

var yop = 0
// КООРДИНАТЫ ШАРНИРОВ
var xsh1 = 5 
var xsh2 = 10 
var xsh3 = 16
var xsh4 = 30
var xsh5 = 34
//Coeffe

let op = [xop1, xop2, xop3, xop4, xop5, xop6];
console.log("Массив координат x подвижных опор" +  ":" );
console.log(op); // вывод в консоль массива
let sh = [xsh1, xsh2, xsh3, xsh4, xsh5];
console.log("Массив координат x шарниров" +  ":" );
console.log(sh); // вывод в консоль массива
console.log("Координата х точки подъёма" +  ":" );

var tp = 21 // координата x точки подъёма	
console.log(tp); // вывод в консоль массива
var hp = ( tp - xop3) * (xop4 - tp) / (xop4 - xop3) // координата y точки подъёма
console.log("Координата y точки подъёма" +  ":" );
console.log(hp); // вывод в консоль массива
console.log("Индекс последнего элемента op" +  ":" ); 
 var nop = op.length;
console.log(nop);

console.log("Левая часть массива op меньшей tp" +  ":" );
let opl = op.filter(function(elem) {
	if (elem <= tp) {return true;} else {return false;}});
console.log(opl);
console.log("Индекс последнег элемента левой части op меньшей tp" +  ":" );
 var nl = opl.length;
console.log(nl);
console.log("Координата у первого шарнира слева от tp " +  ":" );
var yshl = (hp / (tp - op[nl - 1])) * (sh[nl - 1] - op[nl - 1]);
console.log(yshl);

console.log("Массив координат y шарниров слева от tp " +  ":" );
let yshLL = [];
for (let i = 1; i <= nl; i++) {
//yshLL.push((yshl / (sh[i - 1] - op[i - 2])) * (sh[i - 2] - op[i - 2]));
yshLL.push((yshl / (sh[i - 1] - op[i - 2])) * (sh[i - 2] - op[i - 2]));
yshLL.push((yshl / (sh[i - 1] - op[i - 2])) * (sh[i - 2] - op[i - 2]));
}
let yshL = [...yshLL, ...[yshl]];
console.log(yshL); // выведет массив

console.log("Координата у первого шарнира справа от tp " +  ":" );
var yshp = (-hp / (op[nl - 0] - tp)) * (sh[nl - 0] - op[nl - 0]);
console.log(yshp);
let yshPP = [];
for (let i = nl; i <= nop; i++) {
yshPP.push((-yshp / (op[i + 1] - sh[i - 0])) * (sh[i + 1] - op[i + 1]));
}
let yshP = [...[yshp], ...yshPP];
console.log(yshP); // выведет массив

console.log("Массив координат y шарниров  " +  ":" );

var YSHH = [...[0], ...yshL, ...[hp], ...yshP, ...[0]];
console.log(YSH); // выведет массив

let YSH = YSHH.filter(function(elem) {
	if (elem != `NaN`) {return true;} else {return false;}});
console.log(YSH);






var filtered = YSH.filter(function (el) {
  return el != NaN;
});
console.log(filtered);



console.log(op[nl - 1]);
console.log(sh[nl - 1]);*/
