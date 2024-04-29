class TitleScreen {
	constructor() {
		addAtlas("title_logo",432,0,80,48);
	}
	
	process = function() {
		if (key.space) {
			game.status = "game";
			init();
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

