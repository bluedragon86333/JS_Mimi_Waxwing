class SplashScreen {
	
	
}

class TitleScreen {
	constructor() {
		addAtlas("title_logo",432,0,80,48);
		this.spaceReady = false;
	}
	
	process = function() {

		if (key.space && this.spaceReady) {
			game.status = "game";
			init();
		}
		if (!key.space) {
			this.spaceReady = true;
		}
	}
	
	draw = function() {
		drawer.fillScreen("black");
		drawImgFromAtlas("title_logo",88,32);
		//drawImgFromAtlas("font_whiteText_A",0,0);
		
		text.setFont("whiteText");
		text.print("SPACE TO PLAY",128,84,true);
		text.print("MADE BY THE FLEA",128,174,true);
		//text.print("0123456789",0,0);
	}
}


class DeathScreen {
	constructor() {
		this.tic = 0;
	}
	
	process = function() {
		if (key.space) {
			game.status = "startup";
			init();
		}
	}
	
	draw = function() {
		this.process();
		
		drawer.fillScreen("black");
		text.print("Game Over",128,140,true,"whiteText");
		text.print("SPACE TO RESTART",128,150,true,"whiteText");
	}
}

var deathScreen = new DeathScreen;