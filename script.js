window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 40);
    };
})();

// image and canvas vars
var imgToDraw = null,
    t_canvas = null,
    t_ctx = null,
    img_data = null,
    img_pixdata = null,
    img_width = null,
    img_height = null;

var width = 400,
	height = 400;
// select the canvas and get
// its 2d context
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

var fr = 0;


var sprite_data = {
	sprites: {
		back_leg: {
			default_part: 1,
			sprite_size: [17,20],
		}
	}
}

var cur_sprite = {
	pony: {} 
}

// create a new image from the spritesheet

function draw() {
	// Nabbed from http://jsfiddle.net/loktar/63QZz/ https://stackoverflow.com/questions/23468218/draw-10-000-objects-on-canvas-javascript
	
	fr += 1;
	console.log(fr)
	
	var canvasData = ctx.createImageData(width, height),
		cData = canvasData.data;
	
	rootx = width/2
	rooty = height/2
	
	for (p in cur_sprite["pony"]) {
		spr = cur_sprite["pony"][p];
		offset = (fr % spr["t_fr"]) * spr["dim"][0];
		for (var w = offset; w < offset + spr["dim"][0]; w++) {
			for (var h = 0; h < spr["dim"][1]; h++) {
				var iData = (h * spr["dim"][0] + w) * 4;
				var pData = ((rootx + spr["pos"][0]) + (rooty + spr["pos"][1]) * width) * 4;
				
				cData[pData] = img_pixdata[iData];
				cData[pData + 1] = img_pixdata[iData + 1];
				cData[pData + 2] = img_pixdata[iData + 2];
				if(cData[pData + 3] < 100) {
					cData[pData + 3] = img_pixdata[iData + 3];
				}
			}
		}
	}
	ctx.putImageData(canvasData, 0, 0);
    window.requestAnimFrame(draw);
}

function pony_add_spr(part, stl) {
	var col = new Image();
	col.src = "assets/" + part + "/" + stl + "/col.png";

	col.onload = function() {
		var tex = new Image();
		tex.src = "assets/" + part + "/" + stl + "/tex.png";

		tex.onload = function() {
			cur_sprite["pony"][part] = {
				style: stl,
				pos: [0,0],
				dim: [17,20],
				t_fr: col.width / 17,
				colors: [
					[150, 26, 37, 255],
					[113, 9, 41, 255],
					[70, 12, 36, 255],
					[48, 14, 33, 255],
					[68, 98, 68, 255],
					[50, 80, 55, 255],
					[37, 61, 50, 255],
					[24, 40, 44, 255]
				],
				img: col,
				tex: this
			}
			
			t_canvas = document.createElement("canvas"),
			t_ctx = t_canvas.getContext("2d");
			t_ctx.width = col.width;
			t_ctx.height = col.height;
			t_ctx.drawImage(col, 0, 0);
			
			img_data = t_ctx.getImageData(0,0,col.width,col.height);
			console.log(img_data)
			img_pixdata = img_data.data;
			
			draw()
		}
	}
}

function spr_update(part) {
	cur_sprite["pony"][part]["fr"] += 1;
	
	if (cur_sprite["pony"][part]["fr"]*cur_sprite["pony"][part]["dim"][0] === cur_sprite["pony"][part]["img"].width) {
		cur_sprite["pony"][part]["fr"] = 0;
	}
	
	spr = cur_sprite["pony"][part]
	
	const imageData = ctx.getImageData(0,0)
    ctx.drawImage(
        spr["img"],
        spr["dim"][0] * spr["fr"],
        0,
        spr["dim"][0],
        spr["dim"][1],
        (canvas.width / 2) - (spr["dim"][0] * 2),
        (canvas.height / 2) - (spr["dim"][1] * 2),
        spr["dim"][0] * 4,
        spr["dim"][1] * 4
    );
	
}

pony_add_spr("back_leg", 1);
