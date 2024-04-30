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
			if (player.isTouching(enemies.enemies[i])) {
				//console.log("took damage from enemy");
				player.takeDamage(0.5);
				//coins.coins.splice(i,1);
				//saveFile.carrots++;
				return;
			}
		}
	}
	
	process = function() {
		this.playerCoin();
		this.playerEnemy();
	}
}


var collisions = new CollisionHandler();