/*
 0 = empty
 1 = wall
 2 = 
 3 = coin
 4 = 
 5 = JumpingKaidi
 6 = BigJumpingKaidi
 7 = bush
 8 = 
*/

var levelData = [
	[ //world 0
		[//level 0
			"1111111111111111",
			"1111030111404071",
			"1000000311000071",
			"1040040000000001",
			"1000000004000001",
			"1000000040400001",
			"1030400004000007",
			"1030000000040007",
			"1030114000000001",
			"1111111111111111",
			"lost_woods"
		],
		[//level 1
			"1111111111111111",
			"1100333224040111",
			"1104000220004111",
			"1130400025000071",
			"1100040000000000",
			"1105004000000000",
			"0000000000001111",
			"0030303000001111",
			"1000000404040404",
			"4040404040404040",
			"lost_woods"
		],
		[//level 2
			"1111111111111111",
			"1100000000000111",
			"1100333300000111",
			"1003000030000001",
			"0000010000000001",
			"0000011000000001",
			"1400011050000001",
			"4000011000050001",
			"4035011000000011",
			"1111111111111111",
			"lost_woods"
		]
	]




];

var currentWorld = 0;
var currentLevelId = 0;
var currentLevel = levelData[currentWorld][currentLevelId];
//May 2: rewrite this whole class (sorry future me)

class TileManager { //helper methods for Tile class.
	constructor() {
		this.tilePosCoords = [[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2],[3,0],[3,1],[3,2],[4,4],[4,3],[3,0]];
		this.tileCode =     [ "0011","1011","1001","0111","1111","1101","0110","1110","1100","0001","0101","0100","1000","0010"];
		this.tileCostume = "";
		this.lvlThemes = [];
		
		currentLevel = levelData[currentWorld][currentLevelId];
		
		this.addTheme("red_castle",432,64);
		this.addTheme("lost_woods",432,144);
		this.theme = this.getTheme();
		this.numsLikeWalls = "1"; //which types of objects are treated as walls in getCostumeName();
	}
	
	getCostume = function(row,col) {
		
		if (currentLevel[row][col] == 1) {
			//return new Costume(this.theme[0] + "_17",this.theme[1],this.theme[2],16,16);
			let code = ""; //4 digit binary code to determine surrounding blocks
			code += 0 + (col == 0 || this.numsLikeWalls.includes(currentLevel[row][col - 1])); //left
			code += 0 + (row == 0 || this.numsLikeWalls.includes(currentLevel[row - 1][col])); //up
			code += 0 + (col == currentLevel[row].length - 1 || this.numsLikeWalls.includes(currentLevel[row][col + 1])); //right
			code += 0 + (row == currentLevel.length - 2 || this.numsLikeWalls.includes(currentLevel[row + 1][col])); //down
			
			if (row == 9 && col == 13) {
				console.log(code);
			}
			this.x = this.theme[1] + 16;
			this.y = this.theme[2] + 16;
			if (this.tileCode.includes(code)) {
				this.x = this.theme[1] + this.tilePosCoords[this.tileCode.indexOf(code)][0] * 16;
				this.y = this.theme[2] + this.tilePosCoords[this.tileCode.indexOf(code)][1] * 16;
			}
			//let currentTilePos = this.tilePosCoords[this.tileCode.indexOf(code)];
			
			if (code == "1111") {
				let cornerCode = "";
				if ((row > 0) && (col > 0 && col < currentLevel[row].length) && !this.numsLikeWalls.includes(currentLevel[row - 1][col - 1])) { //top left corner open
					this.x = this.theme[1] + 16;
					this.y = this.theme[2] + 64;
				}
				else if ((row != currentLevel.length - 2) && (col > 0) && !this.numsLikeWalls.includes(currentLevel[row + 1][col - 1])) { //bottom left corner open
					this.x = this.theme[1] + 16;
					this.y = this.theme[2] + 48;
				}
				else if ((row != currentLevel.length - 2) && (col < currentLevel[row].length - 1) && !this.numsLikeWalls.includes(currentLevel[row + 1][col + 1])) { //bottom right corner open
					this.x = this.theme[1];
					this.y = this.theme[2] + 48;
				}
				else if ((row > 0) && (col < currentLevel[row].length - 1) && !this.numsLikeWalls.includes(currentLevel[row - 1][col + 1])) { //top right corner open
					this.x = this.theme[1];
					this.y = this.theme[2] + 64;
				}
			}
			
			return new Costume(this.theme[0] + "_" + this.tileCode.indexOf(code),this.x,this.y,16,16);
		}
		
		return new Costume(this.theme[0] + "_22",this.theme[1] + 32,this.theme[2] + 64,16,16);
	}
	
	addTheme = function(name,tlx,tly) {
		this.lvlThemes.push([name,tlx,tly]);
		for (let i = 0; i < 25; i++) {
			this.addTileCostume("name_" + (i % 5) + (Math.floor(i / 5)),tlx + (i%5 * 16),tly + (Math.floor(i/5)));
		}
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
		this.setHitbox(0,4,16,16);
		this.costumeName = costumeName;
		this.solid = solid;
	}
}

class Level {



	constructor(world,level) { //worlds = spaces currently in use. A single dungeon, overworld map, cave system, etc. Levels = screens.
		currentWorld = world;
		currentLevelId = level;
		//currentLevel = levelData[world][level];
		
		this.spawnPoints = [];
		
	}
	
	addSpawnPoint = function(world,level,row,col) {
		this.spawnPoints.push([world,level,row,col]);
	}
	
	
	
	init = function() {
		
		console.log("level.init()");
		
		//resetting other objects
		coins.clear();
		enemies.clear();
		bushes.clear();
		
		//resetting internal stuff
		currentLevel = levelData[currentWorld][currentLevelId];
		this.x =0;
		this.y = 0;
		this.tiles = [];
			
		for (let row = 0; row < 10; row++) {
			for (let col = 0; col < 16; col++) {
				let cell = currentLevel[row][col]
				
				this.tiles.push(new Tile(col * 16,row * 16 + game.window.tly,"",true));
				if (cell != 1) {
					this.tiles[this.tiles.length - 1].solid = false;
				}
				
				
				this.tiles[this.tiles.length - 1].addCostume(tileManager.getCostume(row,col));
				this.tiles[this.tiles.length - 1].setCurrentCostume();
				
				if (cell == 2) {
					
				}
				if (cell == 3) {
					let temp = new Coin(col * 16,row * 16 + game.window.tly,1)
					if (!coins.collectedItems.includes(currentWorld + "_" + currentLevelId + "_" + temp.toString())) {
						coins.add(temp);
					}
				}				
				if (cell == 4) {
					this.tiles[this.tiles.length - 1].solid = true;
					this.tiles[this.tiles.length - 1].setSize(32,32);
					this.tiles[this.tiles.length - 1].setHitbox(2,5,28,25);
					
					this.tiles[this.tiles.length - 1].addCostume("tree",432,224,32,32);
					this.tiles[this.tiles.length - 1].addCostume("tree_clear_bg",464,224,32,32);
					this.tiles[this.tiles.length - 1].setCurrentCostume("tree");
				}
				
				if (cell == 5) {
					enemies.add(new JumpingKaidi(col * 16,row * 16 + game.window.tly));
				}
				if (cell == 6) {
					enemies.add(new BigJumpingKaidi(col * 16,row * 16 + game.window.tly));
				}
				if (cell == 7) {
					bushes.add(new Bush(col * 16,row * 16 + game.window.tly));
					//this.tiles[this.tiles.length - 1].addCostume("grass_tile",496,224,16,16);
					//this.tiles[this.tiles.length - 1].setCurrentCostume("grass_tile");
				}
			}
		}
	}
	
	drawTiles = function() {
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i].draw();
		}
		for (let i = 0; i < this.tiles.length; i++) {
			if (this.tiles[i].currentCostume.name.includes("tree")) {
				this.tiles[i].setCurrentCostume("tree_clear_bg");
				this.tiles[i].draw();
				this.tiles[i].setCurrentCostume("tree");
				
			}
			
		}
	}
}

var level = new Level(0,0);