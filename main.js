const framerate = 25;

const canvas = document.getElementById('game-canvas'); 
var context = canvas.getContext('2d');


var player = new Player();




function init() {
	initAtlas();
	
	player.init();
	loadImages();
	
	addAtlas("onion",0,0,16,32);
	addAtlas("onion_green",32,16,16,32);
}


function process() {
	player.process();
}


function draw() {
	
	drawImgFromAtlas("onion_green",0,0);
	drawImgFromAtlas("onion",mouseX,mouseY);
	player.draw();
}

var mainloop = setInterval(function() {
	context.clearRect(0, 0, 256,192);
	draw();
	process();
	
	if (1 == 0) {
		clearInterval(mainloop);
	}
}, framerate);