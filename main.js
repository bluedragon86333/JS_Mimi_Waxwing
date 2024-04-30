const framerate = 30;
const screen = {
	"width":256,
	"height":192
};
const canvas = document.getElementById('game-canvas'); 
var context = canvas.getContext('2d');
var titleScreen = new TitleScreen();

function init() {
	console.log("init() called for " + game.status);
	switch(game.status) {
		case "startup":
			initAtlas();
			loadImages();
			titleScreen = new TitleScreen();
			break;
		case "game":
			saveFile.erase();
			coins.addCoin(new Coin(200,100,1));
			coins.addCoin(new Coin(24,150,1));
			enemies.addEnemy(new JumpingKaidi(240,100));
			enemies.addEnemy(new BigJumpingKaidi(240,150));
			//addAtlas("onion",0,0,16,32);
			addAtlas("onion_green",32,16,16,32);
			UI.init();
			player = new Player();
			break;
		case "gameOver":
			deathScreen = new DeathScreen();
			break;
	}
}


function process() {
	switch(game.status) {
		case "startup":
			titleScreen.process();
			
			break;
		case "game":
			player.process();
			coins.process();
			collisions.process();
			enemies.process();
			break;
	}

}


function draw() {
	clearScreen();
	switch(game.status) {
		case "startup":
			titleScreen.draw();
			
			break;
		case "game":
			enemies.draw();
			drawImgFromAtlas("onion_green",0,50);
			drawImgFromAtlas("onion_green",mouseX,mouseY);
			player.draw();
			coins.draw();	
			UI.draw();
			break;
		case "gameOver":
			deathScreen.draw();
			break;
	}
	
	

	
}

var mainloop = setInterval(function() {
	
	draw();
	process();
	
	if (1 == 0) {
		clearInterval(mainloop);
	}
}, 1000 / framerate);