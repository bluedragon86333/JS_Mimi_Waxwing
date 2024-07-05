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
			
			if (player.attack.active && player.attack.isTouching(enemies.objs[i])) {
				enemies.objs[i].takeDamage(1);
			}
		}
	}
	
	wall_primitive = function(sprite,obj) {
		if (sprite == player) {
			//console.log("v");
			let touchingGrass = sprite.isTouching(obj) && obj.currentCostume.name.includes("grass_tile");
			let touching = sprite.isTouching(obj) && obj.solid;
			//
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
				return sprite;
			}
		}
		if (sprite.isTouching(obj) && obj.solid) {
			//console.log("hit wall");
			sprite.moveTo(sprite.x - sprite.xv,sprite.y - sprite.yv);
			sprite.reachedEdge();
			//return;
		}
		return sprite;	
	}
	
	wall = function(sprite) {
		for (let i = 0; i < trees.objs.length; i++) {
			sprite = this.wall_primitive(sprite,trees.objs[i]);
		}
		
		for (let i = 0; i < barriers.objs.length; i++) {
			sprite = this.wall_primitive(sprite,barriers.objs[i]);
		}
		
		for (let i = 0; i < bushes.objs.length; i++) {
			sprite = this.wall_primitive(sprite,bushes.objs[i]);
			if (player.attack.isTouching(bushes.objs[i])) {
			//console.log("bush is dying");
			bushes.objs[i].takeDamage(1);
			bushes.collectedItems.push(currentWorld + "_" + currentLevelId + "_" + bushes.objs[i].toString());
			//bushes.objs.splice(i,1);
			}
		}
		
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
				//player.setHitbox(0,0,this.width,this.height);
				currentLevelId--;
				level.init();
			}
			if (currentLevelId < levelData[currentWorld].length - 1 && side == "right") {
				player.x = 0;
				player.attack.active = false;
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