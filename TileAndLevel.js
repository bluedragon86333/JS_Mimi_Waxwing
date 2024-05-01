/*
 0 = empty
 1 = wall
 2 = path
*/

var levelData = [
	[ //world 1
		[//level 1
			"1111110220111111",
			"1100000220000111",
			"1100000220000111",
			"1000000022000001",
			"1100111002200000",
			"1100111000222222",
			"1000000000022222",
			"1000000000000000",
			"1000000000000011",
			"1111111111111111",
			"red_castle"
		],
		[//level 1
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			""
		]
	]




];


	class Tile extends Sprite{
		constructor(x,y,costumeName,solid) {
			super();
			this.moveTo(x,y);
			this.setSize(16,16);
			this.costumeName = costumeName;
			this.solid = solid;
			this.setCurrentCostume();
		}
	}

class Level {
	
	tilePosCoords = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,0],[3,0],[3,0],[3,0],[3,0],[3,0]];
	tileCode = [ "0011","1011","1001","0111","1111","1101","0110","1110","1100" ];
	tileCostume = "";


	constructor(world,level) { //worlds = spaces currently in use. A single dungeon, overworld map, cave system, etc. Levels = screens.
		this.currentLevel = levelData[world][level];
		this.theme = this.getTheme(); //temporary- fix later
		this.tiles = [];
		this.numsLikeWalls = "1"; //which types of objects are treated as walls in getCostumeName();
		
		
		var lvlThemes = [];
	}
	
	getTheme = function() {
		return this.currentLevel[10];
	}
	addTileCostume = function () {
		
	}

	addTheme = function(name,tlx,tly) {
		this.lvlThemes.push([name,tlx,tly]);
		for (let i = 0; i < 25; i++) {
			addTileCostume("name_" + (i % 5) + (Math.floor(i / 5)),tlx + (i%5 * 16),tly + (Math.floor(i/5)));
		}
	}

	getCostumeName = function(row,col) {
		if (this.currentLevel[row][col] == 1) {
			return this.theme + "_19"
			let code = ""; //4 digit binary code to determine surrounding blocks
			code += (col == 0 || this.numsLikeWalls.includes(this.currentLevel[row][col - 1])); //left
			code += (row == 0 || this.numsLikeWalls.includes(this.currentLevel[row - 1][col])); //up
			code += (col == this.currentLevel[row].length - 1 || this.numsLikeWalls.includes(this.currentLevel[row][col + 1])); //right
			code += (col == this.currentLevel.length - 1 || this.numsLikeWalls.includes(this.currentLevel[row + 1][col])); //down
				
			if (this.tileCode.includes(code)) {
				
			}
			
			return + this.tileCode.indexOf(code );
		}
		
		return this.theme + "_24";
	}
	
	init = function() {
		console.log("level.init()");
		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 16; col++) {
				if (this.currentLevel[row][col] == 1) {
					this.tiles.push(new Tile(row * 16 + game.window.tly,col * 16,));
					this.tiles[this.tiles.length - 1].addCostume(this.getCostumeName(row,col));
				}
			}
		}
	}
	
	drawTiles = function() {
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i].draw();
		}
	}
}

var level = new Level(0,0);