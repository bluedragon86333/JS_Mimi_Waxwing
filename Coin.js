class Coin extends Sprite {
	constructor(x,y,value) {
		super();
		this.moveTo(x,y);
		this.setSize(16,16);
		this.value = value;
		this.addAnimation("coin_spin",80,0,16,16,4,3);
		this.addCostume("default",80,0,16,16);
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