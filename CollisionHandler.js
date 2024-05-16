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
				coins.collectedItems.push(currentWorld + "_" + currentLevelId + "_" + coins.objs[i].toString());
				coins.objs.splice(i,1);
				saveFile.carrots++;
				return;
			}
		}
	}
	
	enemy = function() {
		for (let i = 0; i < enemies.objs.length; i++) {
			//sneaking in the wall code here
			
			this.wall(enemies.objs[i]);
			
			if (player.isTouching(enemies.objs[i]) && !enemies.objs[i].currentCostume.name.includes("death")) {
				//console.log("took damage from enemy");
				player.takeDamage(0.5);
				//coins.coins.splice(i,1);
				//saveFile.carrots++;
				//return;
			}
			
			if (player.attack.isTouching(enemies.objs[i])) {
				enemies.objs[i].takeDamage(1);
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
		
		
		for (let i = 0; i < bushes.objs.length; i++) { //BUSH DATA
			if (sprite == player && !bushes.objs[i].currentCostume.name.includes("death")) {
				let obj = bushes.objs[i];
				let touching = sprite.isTouching(obj) && obj.solid;
				//player collision
				if (touching) {
					sprite.reverseByVel();
					
					sprite.x += sprite.xv;
					if (sprite.isTouching(obj) && obj.solid) {
						sprite.x -= sprite.xv;
					}
					sprite.y += sprite.yv;
					if (sprite.isTouching(obj) && obj.solid) {
						sprite.y -= sprite.yv;
					}
				}
			}
			if (sprite.isTouching(bushes.objs[i]) && bushes.objs[i].solid) { //if enemy or something else collides here
				//console.log("hit wall");
				sprite.moveTo(sprite.x - sprite.xv,sprite.y - sprite.yv);
				sprite.reachedEdge();
				return;
			}
			if (player.attack.isTouching(bushes.objs[i])) {
				bushes.objs[i].takeDamage(1);
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