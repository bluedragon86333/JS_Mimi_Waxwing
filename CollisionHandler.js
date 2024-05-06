/*
CollisionHandler class is here to handle any interactions between game elements. Walls, enemies, treasure, etc.

*/

class CollisionHandler {
	
	playerCoin = function() {
		//console.log("");
		for (let i = 0; i < coins.objs.length; i++) {
			//console.log(player.isTouching(coins.coins[i]));
			if (player.isTouching(coins.objs[i])) {
				//console.log("coin found");
				coins.objs.splice(i,1);
				saveFile.carrots++;
				return;
			}
		}
	}
	
	enemy = function() {
		for (let i = 0; i < enemies.enemies.length; i++) {
			//sneaking in the wall code here
			
			this.wall(enemies.enemies[i]);
			
			if (player.isTouching(enemies.enemies[i])) {
				//console.log("took damage from enemy");
				player.takeDamage(0.5);
				//coins.coins.splice(i,1);
				//saveFile.carrots++;
				return;
			}
		}
	}
	
	wall = function(sprite) {
		
		for (let i = 0; i < level.tiles.length; i++) {
			if (sprite == player) {
				let touchingGrass = sprite.isTouching(level.tiles[i]) && level.tiles[i].currentCostume.name.includes("grass_tile");
				if (touchingGrass) {
					//player.costumePrefix = "grass_";
				} else {
					player.costumePrefix = "";
				}
				//sprite.moveByVel();
				let touching = sprite.isTouching(level.tiles[i]) && level.tiles[i].solid;
				//
				if (touching) {
					sprite.reverseByVel();
					
					sprite.x += sprite.xv;
					if (sprite.isTouching(level.tiles[i]) && level.tiles[i].solid) {
						sprite.x -= sprite.xv;
					}
					sprite.y += sprite.yv;
					if (sprite.isTouching(level.tiles[i]) && level.tiles[i].solid) {
						sprite.y -= sprite.yv;
					}
				}
			}
			if (sprite.isTouching(level.tiles[i]) && level.tiles[i].solid) {
				//console.log("hit wall");
				sprite.moveTo(sprite.x - sprite.xv,sprite.y - sprite.yv);
				sprite.reachedEdge();
				return;
			}
		}
	}
	
	playerEdge = function() {
		let side = player.touchingEdge();
		if (side != false) {
			if (currentLevelId != 0 && side == "left") {
				player.x = game.window.width - player.width;
				currentLevelId--;
				level.init();
			}
			if (currentLevelId < levelData[currentWorld].length - 1 && side == "right") {
				player.x = 0;
				currentLevelId++;
				level.init();
			}
		}
	}
	
	process = function() {
		this.playerCoin();
		this.enemy();
		this.wall(player);
		this.playerEdge();
	}
}


var collisions = new CollisionHandler();