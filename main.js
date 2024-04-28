const framerate = 25;
const screen = {
	"width":256,
	"height":192
};
const canvas = document.getElementById('game-canvas'); 
var context = canvas.getContext('2d');

var player = new Player();
var coins = new CoinCollection();



function init() {
	initAtlas();
	
	player.init();
	loadImages();
	coins.addCoin(new Coin(200,100,1));
	coins.addCoin(new Coin(24,150,1));
	//addAtlas("onion",0,0,16,32);
	addAtlas("onion_green",32,16,16,32);
}


function process() {
	player.process();
	coins.process();
}


function draw() {
	
	drawImgFromAtlas("onion_green",0,50);
	drawImgFromAtlas("onion_green",mouseX,mouseY);
	player.draw();
	coins.draw();	
	
	drawUI();
	
}

var mainloop = setInterval(function() {
	context.clearRect(0, 0, 256,192);
	draw();
	process();
	
	if (1 == 0) {
		clearInterval(mainloop);
	}
}, framerate);