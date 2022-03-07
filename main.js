var canvas = document.getElementById("main_canvas");
var context = canvas.getContext("2d");

var color_selector_obj = document.getElementById("color_selector");

var window_width = window.innerWidth;
var window_height = window.innerHeight;

var canvas_width = window_width * 0.8;
var canvas_height = window_height * 0.8
var canvas_step = window_width * 0.04;

canvas.width = canvas_width;
canvas.height = canvas_height;

for (var x = 1; x < canvas_width; x += canvas_step) {
  context.moveTo(x, 0);
  context.lineTo(x, canvas_height);
}

for (var y = 1; y < canvas_height; y += canvas_step) {
  context.moveTo(0, y);
  context.lineTo(canvas_width, y);
}

context.strokeStyle = "#000";
context.stroke();

canvas.addEventListener("click", change_color, false);

function Cell(row, column) {
    this.row = row;
    this.column = column;
    this.color;
}

function change_color(pos) {
    var cell = getCursorPosition(pos);
    console.log(color_selector_obj);
};

function getCursorPosition(pos) {
    var x;
    var y;

    if (pos.pageX != undefined && pos.pageY != undefined) {
	x = pos.pageX;
	y = pos.pageY;
    }
    else {
	x = pos.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = pos.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    var cell = new Cell(Math.floor(y/(window_height * 0.04)), Math.floor(x/(window_width * 0.04)));
    return cell;
};

