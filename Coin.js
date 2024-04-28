class Coin extends Sprite {
	constructor(x,y,value) {
		super();
		this.moveTo(x,y);
		this.width = 8;
		this.height = 8;
		this.value = value;
		this.addAnimation("coin_spin",32,0,8,8,4,4);
		this.addCostume("default",32,8,8,8);
		this.animationActive = 0;
		
		this.setAnimation("coin_spin");
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
		for (let i = 0; i < this.coins.length; i++) {
			this.coins[i].tick();
		}
	}
	
	
	draw = function()
	{
		for (let i = 0; i < this.coins.length; i++) {
			this.coins[i].draw();
		}
	}
}