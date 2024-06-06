const framerate = 30;
const screen = {
	"width":256,
	"height":192
};

//var titleScreen = new TitleScreen();
var startup = new SplashScreen();
var deathScreen = new DeathScreen;
var menuScreen = new Screen();
var ready = false;

function init() {
	initAtlas();
	loadImages();
	console.log("init() called for " + game.status);
	switch(game.status) {
		case "startup":
			startup.reset();
			break;
		case "title":

			menuScreen = new TitleScreen();
			break;
		case "levelSelect":
			menuScreen = new LevelSelectScreen();
			break;
		case "game":
			level = new Level(0,0);
			saveFile.erase();
			coins.init();
			enemies.init();
			//from here to the next comment, everything is temporary.
			//coins.addCoin(new Coin(200,100,1));
			//coins.addCoin(new Coin(24,150,1));
			//enemies.addEnemy(new JumpingKaidi(240,100));
			//enemies.addEnemy(new BigJumpingKaidi(240,150));
			//addAtlas("onion",0,0,16,32);
			//addAtlas("onion_green",32,16,16,32);
			UI.init();
			player = new Player();
			level.init();
			break;
		case "gameOver":
			deathScreen = new DeathScreen();
			break;
	}
}


function process() {
	switch(game.status) {
		case "startup":
			startup.process();
			break;
		case "title":
			menuScreen.process();
			
			break;
		case "levelSelect":
			menuScreen.process();
			break;
		case "game":
			player.process();
			coins.process();
			bushes.process();
			collisions.process();
			enemies.process();
			break;
		case "gameOver":
			deathScreen.process()
		
			break;
	}

}


function draw() {
	clearScreen();
	switch(game.status) {
		case "startup":
			startup.draw();
			break;
		case "title":
			menuScreen.draw();
			
			break;
		case "levelSelect":
			menuScreen.draw();
			break;
		case "game":
			level.drawTiles();
			bushes.draw();
	
			coins.draw();
			enemies.draw();
			
			player.draw();
			player.attack.draw();
			UI.draw();
			break;
		case "gameOver":
			deathScreen.draw();
			break;
	}
	
	

	
}

var mainloop = setInterval(function() {
	
	process();
	draw();
	
	if (ready) {
		clearInterval(mainloop);
	}
}, 1000 / framerate);