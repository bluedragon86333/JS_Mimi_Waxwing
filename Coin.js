class Coin extends Sprite {
	constructor(x,y,value) {
		super();
		this.moveTo(x,y);
		this.width = 8;
		this.height = 8;
		this.value = value;
		this.addAnimation("coin_spin",16,0,8,8,4);
		this.addCostume("default",16,8,8,8);
		//this.animationActive = 0;
		
		this.setCurrentCostume("default");
	}
	
	
	
	
}

class CoinCollection {
	constructor()
	{
		this.coins = [];
	}
	
	addCoin = function(coinObj)
	{
		this.coins.push(coinObj);
	}
	
	clear = function()
	{
		this.coins = [];
	}
	
	
	process = function()
	{
		
	}
	
	
	draw = function()
	{
		for (let i = 0; i < this.coins.length; i++) {
			this.coins[i].draw();
		}
	}
}