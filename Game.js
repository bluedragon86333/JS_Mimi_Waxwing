class GeneralData { //stuff that isn't related to playing the game, but about the game in general
	tileSize = 16; //in px
	window = {
		"height":160,
		"width":256,
		"tly":32,
		"bottom":192
	};
	over = false;
	status = "startup";
	
}


class SaveFile { //contains all variables important for the game
	carrots = 0;
	
}


var game = new GeneralData();
var saveFile = new SaveFile();

