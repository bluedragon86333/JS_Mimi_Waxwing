const framerate = 30;
const screen = {
	"width":256,
	"height":192
};
const canvas = document.getElementById('game-canvas'); 
var context = canvas.getContext('2d');
var titleScreen = new TitleScreen();


		function DownloadCanvasAsImage(){
			let downloadLink = document.createElement('a');
			downloadLink.setAttribute('download', 'CanvasAsImage.png');
			let canvas = document.getElementById('game-canvas');
			let dataURL = canvas.toDataURL('image/png');
			let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
			downloadLink.setAttribute('href', url);
			downloadLink.click();
		}
		
function init() {
	console.log("init() called for " + game.status);
	switch(game.status) {
		case "startup":
			initAtlas();
			loadImages();
			titleScreen = new TitleScreen();
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
			titleScreen.process();
			
			break;
		case "game":
			player.process();
			coins.process();
			bushes.process();
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
	
	if (1 == 0) {
		clearInterval(mainloop);
	}
}, 1000 / framerate);