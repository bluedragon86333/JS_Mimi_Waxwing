/*
 0 = empty
 1 = wall
 2 = path
 3 = coin
 5 = JumpingKaidi
 6 = BigJumpingKaidi
*/

var levelData = [
	[ //world 0
		[//level 0
			"1111110220111111",
			"1100000220000111",
			"1100000220000111",
			"1000000022000001",
			"1105111002200000",
			"1100111000222222",
			"1000000000022222",
			"1030303000060000",
			"1000000000000011",
			"1111111111111111",
			"red_castle"
		],
		[//level 1
			"1111111111111111",
			"1100000000000111",
			"1100333300000111",
			"1003000030000001",
			"0000010000000001",
			"0000011000000001",
			"0000011050000001",
			"0000011000050001",
			"1050011000000011",
			"1111111111111111",
			"red_castle"
		]
	]




];

var currentWorld = 0;
var currentLevelId = 0;
var currentLevel = levelData[currentWorld][currentLevel];

//May 2: rewrite this whole class (sorry future me)

class TileManager { //helper methods for Tile class.
	
	tilePosCoords = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,0],[3,0],[3,0],[3,0],[3,0],[3,0]];
	tileCode = [ "0011","1011","1001","0111","1111","1101","0110","1110","1100" ];
	tileCostume = "";
	lvlThemes = [];
	
	
	getCostumeName = function(row,col) {
		if (currentLevel[row][col] == 1) {
			return this.theme + "_19";
			let code = ""; //4 digit binary code to determine surrounding blocks
			code += (col == 0 || this.numsLikeWalls.includes(currentLevel[row][col - 1])); //left
			code += (row == 0 || this.numsLikeWalls.includes(currentLevel[row - 1][col])); //up
			code += (col == currentLevel[row].length - 1 || this.numsLikeWalls.includes(currentLevel[row][col + 1])); //right
			code += (col == currentLevel.length - 1 || this.numsLikeWalls.includes(currentLevel[row + 1][col])); //down
			
			
			this.x = this.theme[1] + this.tileCode.indexOf(code);
			if (this.tileCode.includes(code)) {
				
			}
			
			return + this.tileCode.indexOf(code);
		}
		
		return this.theme + "_24";
	}
	getTheme = function() {
		for (let i = 0; i < this.lvlThemes.length; i++) {
			if (this.lvlThemes[i][0] == currentLevel[10]) {
				return this.lvlThemes[i];
			}
		}
		return currentLevel[10];
	}
	addTileCostume = function () {
		
	}
}

var tileManager = new TileManager();


	class Tile extends Sprite{
		constructor(x,y,costumeName,solid) {
			super();
			this.moveTo(x,y);
			this.setSize(16,16);
			this.costumeName = costumeName;
			this.solid = solid;
		}
	}

class Level {



	constructor(world,level) { //worlds = spaces currently in use. A single dungeon, overworld map, cave system, etc. Levels = screens.
		currentWorld = world;
		currentLevelId = level;
		currentLevel = levelData[world][level];
		this.addTheme("red_castle",432,64);
		
		
		this.theme = tileManager.getTheme(); //temporary- fix later
		
		this.numsLikeWalls = "1"; //which types of objects are treated as walls in getCostumeName();

		
		
	}
	


	addTheme = function(name,tlx,tly) {
		tileManager.lvlThemes.push([name,tlx,tly]);
		for (let i = 0; i < 25; i++) {
			tileManager.addTileCostume("name_" + (i % 5) + (Math.floor(i / 5)),tlx + (i%5 * 16),tly + (Math.floor(i/5)));
		}
	}


	
	init = function() {
		
		console.log("level.init()");
		
		//resetting other objects
		coins.coins = [];
		enemies.enemies = [];
		
		//resetting internal stuff
		currentLevel = levelData[currentWorld][currentLevelId];
		this.x =0;
		this.y = 0;
		this.tiles = [];
			
		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 16; col++) {
				let cell = currentLevel[row][col]
				if (cell == 1) {
					this.tiles.push(new Tile(col * 16,row * 16 + game.window.tly,"",true));
					this.tiles[this.tiles.length - 1].addCostume(tileManager.getCostumeName(row,col),0,0,16,16);
				}
				if (cell == 3) {
					coins.addCoin(new Coin(col * 16,row * 16 + game.window.tly,1));
				}				
				if (cell == 5) {
					enemies.addEnemy(new JumpingKaidi(col * 16,row * 16 + game.window.tly));
				}
				if (cell == 6) {
					enemies.addEnemy(new BigJumpingKaidi(col * 16,row * 16 + game.window.tly));
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