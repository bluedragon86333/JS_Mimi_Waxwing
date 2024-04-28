class Coin extends Sprite {
	constructor(x,y,value) {
		super();
		this.x = x;
		this.y = y;
		this.value = value;
		this.addAnimation("coin_spin",16,0,8,8,4);
	}
	
	
	
	
}