// todo undo 
// todo save - LocalStorage, Save and Load drawing. JSON.stringify and JSON.parse
var canvas = document.getElementById("main_canvas");
var context = canvas.getContext("2d");

var color_selector_obj = document.getElementById("color_selector");
var reset_button_obj = document.getElementById("reset");

var window_width = window.innerWidth;
var window_height = window.innerHeight;

var canvas_step = 30;
var canvas_width = Math.floor(window_width*0.8/canvas_step)*canvas_step;
var canvas_height = Math.floor(window_height*0.8/canvas_step)*canvas_step;

main()

function main() {
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    reset_canvas();
    canvas.addEventListener("click", change_color, false);
    reset_button_obj.addEventListener("click", reset_canvas, false);
}

function Cell(row, column) {
    this.row = row;
    this.column = column;
}

function change_color(pos) {
    var cell = getCursorPosition(pos);
    var color = color_selector_obj.value;
    context.beginPath();  
    context.rect(cell.column*canvas_step, cell.row*canvas_step, canvas_step, canvas_step);
    context.fillStyle = color;
    context.fill();
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
    var cell = new Cell(Math.floor(y/canvas_step), Math.floor(x/canvas_step));
    return cell;
};

function reset_canvas() {
    canvas.width = canvas.width;

    for (var x = 0; x < canvas_width; x += canvas_step) {
        context.moveTo(x, 0);
        context.lineTo(x, canvas_height);
    }
      
    for (var y = 0; y < canvas_height; y += canvas_step) {
        context.moveTo(0, y);
        context.lineTo(canvas_width, y);
    }
      
    context.strokeStyle = "Black";
    context.stroke();
};
