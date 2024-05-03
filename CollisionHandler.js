/*
CollisionHandler class is here to handle any interactions between game elements. Walls, enemies, treasure, etc.

*/

class CollisionHandler {
	
	playerCoin = function() {
		//console.log("");
		for (let i = 0; i < coins.coins.length; i++) {
			//console.log(player.isTouching(coins.coins[i]));
			if (player.isTouching(coins.coins[i])) {
				//console.log("coin found");
				coins.coins.splice(i,1);
				saveFile.carrots++;
				return;
			}
		}
	}
	
	playerEnemy = function() {
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
			if (sprite.isTouching(level.tiles[i]) && level.tiles[i].solid) {
				//console.log("hit wall");
				sprite.moveTo(sprite.x - sprite.xv,sprite.y - sprite.yv);
				sprite.reachedEdge();
				return;
			}
		}
	}
	
	process = function() {
		this.playerCoin();
		this.playerEnemy();
		this.wall(player);
	}
}


var collisions = new CollisionHandler();