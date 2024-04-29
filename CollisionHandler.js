class CollisionHandler {
	
	playerCoin = function() {
		//console.log("");
		for (let i = 0; i < coins.coins.length; i++) {
			//console.log(player.isTouching(coins.coins[i]));
			if (player.isTouching(coins.coins[i])) {
				console.log("coin found");
				coins.coins.splice(i,1);
				saveFile.carrots++;
				return;
			}
		}
	}
	
	process = function() {
		this.playerCoin();
	}
}


var collisions = new CollisionHandler();