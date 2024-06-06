/*
LevelPortal.connections = [4]
left, up, right, down


*/

class LevelPortal extends Sprite {
	constructor(id,x,y,name,connections) {
		super();
		this.x = x;
		this.y = y;
		this.id = id;
		this.name = name;
		this.connections = connections;
		this.up = this.getUpConnect();
		this.down = this.getDownConnect();
		this.right = this.getRightConnect();
		this.left = this.getLeftConnect();
		
		this.addCostume("red_level",400,48,16,16);
		this.addCostume("blue_level",416,48,16,16);
		this.addCostume("black_level",432,48,16,16);
		this.setCurrentCostume("red_level");
	}
	
	getLeftConnect = function() {
		return (this.connections[0] == '1');
	}
	getUpConnect = function() {
		return (this.connections[1] == '1');
	}
	getRightConnect = function() {
		return (this.connections[2] == '1');
	}
	getDownConnect = function() {
		return (this.connections[3] == '1');
	}
}

class Cursor extends Sprite {
		constructor(type,x,y) {
			super();
			this.moveTo(x,y);
			this.addCostume("cursor",384,48,16,16);
			this.setCurrentCostume("cursor");
		}
	
}

class LevelSelectScreen extends Screen {
	constructor() {
		super();
		
		addAtlas("worldmap",272,448,96,64);
		this.levels = [];
		this.selected = 0;
		this.spaceReady = false;
		
		this.addLevel("level_0",102,96,"SANDY BEACH",'0100');
		
		this.cursor = new Cursor(0,0);
		
	}
	
	addLevel = function(id,x,y,name,connections) {
		this.levels.push(new LevelPortal(id,x,y,name,connections));
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
		drawImgFromAtlas("worldmap",game.window.width / 2 - 48, game.window.height / 2 - 32);

		for (let i = 0; i < game.window.height + game.window.tly; i += 32) {
			drawImgFromAtlas("border",8,i);
			drawImgFromAtlas("border",game.window.width - 32,i);
		}
		for (let i = 0; i < this.levels.length; i ++) {
			this.levels[i].draw();
		}
		
		this.cursor.draw();
		
		text.setFont("whiteText");
		text.print("SELECT",38,8,false);
		text.print("A LEVEL",38,16,false);
		text.print(this.levels[this.selected].name,80,114,false);
		text.print("MADE BY THE FLEA",128,174,true);
		//text.print("0123456789",0,0);
	}
}