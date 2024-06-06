/*
LevelPortal.connections = [4]
left, up, right, down


*/

class LevelPortal extends Sprite {
	constructor(id,x,y,name,connections) {
		super();
		this.x = x - 4;
		this.y = y - 4;
		this.id = id;
		this.name = name;
		this.connections = connections;
		this.up = this.getUpConnect();
		this.down = this.getDownConnect();
		this.right = this.getRightConnect();
		this.left = this.getLeftConnect();
		this.setSize(8,8);
		
		this.addCostume("red_level",384,64,8,8);
		this.addCostume("blue_level",392,64,8,8);
		this.addCostume("black_level",400,64,8,8);
		this.setCurrentCostume("red_level");
	}
	
	getLeftConnect = function() {
		return this.connections[0] + this.connections[1];
	}
	getUpConnect = function() {
		return this.connections[2] + this.connections[3];
	}
	getRightConnect = function() {
		return this.connections[4] + this.connections[5];
	}
	getDownConnect = function() {
		return this.connections[6] + this.connections[7];
	}
}

class Cursor extends Sprite {
		constructor(type,x,y) {
			super();
			this.moveTo(x,y);
			this.addCostume("cursor",384,72,16,16);
			this.setCurrentCostume("cursor");
		}
	
}

class LevelSelectScreen extends Screen {
	constructor() {
		super();
		
		addAtlas("worldmap",272,448,96,64);
		this.levels = [];
		this.selected = null;
		this.selectedId = "A1";
		this.spaceReady = false;
		this.upReady = false;
		this.downReady = false;
		this.rightReady = false;
		this.leftReady = false;
		
		this.addLevel("A1",108,100,"SANDY BEACH",'00A20000');
		this.addLevel("A2",111,79,"LIGHT WOODS",'00A3A4A1');
		this.addLevel("A3",104,62,"DEEP WOODS",'0000A6A2');
		this.addLevel("A4",123,72,"SAND DUNES",'A200A500');
		this.addLevel("A5",139,75,"THE COVE",'A4A60000');
		this.addLevel("A6",138,58,"GRASSLANDS",'A30000A5');
		
		this.cursor = new Cursor(0,0);
		this.setSelected();
	}
	
	addLevel = function(id,x,y,name,connections) {
		this.levels.push(new LevelPortal(id,x,y,name,connections));
	}
	
	setSelected = function() {
		for (let i = 0; i < this.levels.length; i++) {
			if (this.levels[i].id == this.selectedId) {
				this.selected = this.levels[i];
				return;
			}
		}
	}
	
	process = function() {

		if (key.space && this.spaceReady) {
			game.status = "game";
			init();
		}
		
		if (key.up && this.upReady) {
			this.upReady = false;
			if (this.selected.getUpConnect() != "00") {
				this.selectedId = this.selected.up;
				this.setSelected();
			}
		}
		if (key.down && this.downReady) {
			this.downReady = false;
			if (this.selected.getDownConnect() != "00") {
				this.selectedId = this.selected.down;
				this.setSelected();
			}
		}
		if (key.right && this.rightReady) {
			this.rightReady = false;
			if (this.selected.getRightConnect() != "00") {
				this.selectedId = this.selected.right;
				this.setSelected();
			}
		}
		if (key.left && this.leftReady) {
			this.leftReady = false;
			if (this.selected.getLeftConnect() != "00") {
				this.selectedId = this.selected.left;
				this.setSelected();
			}
		}
		
		
		
		if (!key.space) {
			this.spaceReady = true;
		}
		if (!key.left) {
			this.leftReady = true;
		}
		if (!key.right) {
			this.rightReady = true;
		}
		if (!key.down) {
			this.downReady = true;
		}
		if (!key.up) {
			this.upReady = true;
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
		this.cursor.moveTo(this.selected.x - 4,this.selected.y - 4);
		this.cursor.draw();
		
		text.setFont("whiteText");
		text.print("SELECT",38,8,false);
		text.print("A LEVEL",38,16,false);
		text.print(this.selected.name,80,114,false);
		text.print("MADE BY THE FLEA",128,174,true);
		//text.print("0123456789",0,0);
	}
}