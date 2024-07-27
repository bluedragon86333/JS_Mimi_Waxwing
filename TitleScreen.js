class Screen {
	constructor() {
		
	}
	
	reset = function() {
		
	}
	
	process = function() {
		
	}
	
	draw = function() {
		
	}
}

class LoadingScreen extends Screen {
	constructor() {
		super();
		this.timer = 0;
		this.duration = 15; //in frames
	}
	
	reset = function() {
		this.timer = 0;
	}


	process = function() {
		if (this.timer == this.duration) {
			game.status = "title";
			init();
		} else {
			this.timer++;
		}
	}
	
	draw = function() {
		drawer.fillScreen("black");
		text.setFont("whiteText");
	}
}

class SplashScreen extends LoadingScreen {
	constructor() {
		super();
		addAtlas("flea_logo",296,88,64,64);
		addAtlas("dragon_logo",368,96,16,16);
		//this.timer = 0;
		//this.duration = 15; //in frames
	}
	
	draw = function() {
		drawer.fillScreen("black");
		drawImgFromAtlas("dragon_logo",122,90);
	}
}



class PauseScreen extends Screen {
	constructor() {
		super();

		this.enterReady = false;
	}
	
	process = function() {
		
		if (key.enter && this.enterReady) {
			this.enterReady = false;
			
			if (game.status == "game") {
				game.status = "pause";
				//init();
			} else {
				game.status = "game";
			}
			console.log("game status now " + game.status);
		}
		if (!key.enter) {
			this.enterReady = true;
		}
	}
	
	draw = function() {
		drawer.fillScreen("#ffffff60");
		
		text.setFont("whiteText");
		text.print("PAUSED",8,176,false);
	}
}

class TitleScreen extends Screen{
	constructor() {
		super();
		addAtlas("title_logo",360,0,152,48);
		addAtlas("mimi_woods",288,0,72,88);
		addAtlas("border",360,48,24,32);
		this.spaceReady = false;
	}
	
	process = function() {

		if (key.space && this.spaceReady) {
			game.status = "levelSelect";
			init();
		}
		if (!key.space) {
			this.spaceReady = true;
		}
	}
	
	draw = function() {
		drawer.fillScreen("black");
		drawImgFromAtlas("title_logo",game.window.width / 2 - 76,16);
		//drawImgFromAtlas("title_logo",16,16);
		drawImgFromAtlas("mimi_woods",129,76);
		//drawImgFromAtlas("font_whiteText_A",0,0);
		for (let i = 0; i < game.window.height + game.window.tly; i += 32) {
			drawImgFromAtlas("border",8,i);
			drawImgFromAtlas("border",game.window.width - 32,i);
		}
		
		text.setFont("whiteText");
		text.print("SPACE",90,84,true);
		text.print("TO PLAY",90,92,true);
		text.print("MADE BY THE FLEA",128,174,true);
		//text.print("0123456789",0,0);
	}
}


class DeathScreen extends Screen {
	constructor() {
		super();
		this.tic = 0;
	}
	
	process = function() {
		if (key.space) {
			game.status = "startup";
			init();
		}
	}
	
	draw = function() {
		//this.process();
		
		drawer.fillScreen("black");
		text.print("Game Over",128,140,true,"whiteText");
		text.print("SPACE TO RESTART",128,150,true,"whiteText");
	}
}

