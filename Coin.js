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
	
	
	
	process = function() {
		this.tick();
	}
}

class LargeCoin extends Coin {
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
	
	
	
	process = function() {
		this.tick();
	}
}



class Bush extends MovingSprite {
	constructor(x,y,theme) {
		super();
		
		this.moveTo(x,y);
		this.solid = true;
		this.setHP(1,1);
		
		this.addAnimation("enemy_death",0,496,16,16,10,2);
		this.addAnimation("lost_woods_bush_idle",432,256,16,17,4,6);
		this.addAnimation("blue_woods_bush_idle",352,256,16,17,4,6);
		this.setAnimation(theme + "_bush_idle");
	}
	
	process = function() {
		this.tick();
	}
	
	die = function() {
		this.setHitbox(0,0,0,0);
		this.solid = false;
		//console.log("died in Enemy.js");
		if (this.currentCostume.name.includes("death")) {
			if (this.currentFrame >= 10 && this.frameTics >= 1) {
				this.visible = false;
			}
		} else {
			this.setAnimation("enemy_death");
		}
	}
}

var barrierData = [];

function addBarrierCondition (world,level,condition) {
	barrierData.push([world,level,condition]);
}
/*
	KILL_ALL_ENEMIES
	GET_ALL_COINS
	
*/
addBarrierCondition(1,0,"GET_ALL_COINS");
addBarrierCondition(1,1,"KILL_ALL_ENEMIES");

function getBarrierCondition (world,level) {
	for (let i = 0; i < barrierData.length; i++) {
		if (barrierData[i][0] == world && barrierData[i][1] == level) {
			return barrierData[i][2];
		}
	}
	return "flatten";
}

class Barrier extends Sprite {
	constructor(x,y,world,level) {
		super();
		this.moveTo(x + 4,y);
		this.solid = true;
		this.setSize(8,16);
		this.setHitbox(0,0,8,16);
		this.addAnimation("descend",352,272,8,16,5,1);
		this.addCostume("tall",432,272,8,16);
		this.addCostume("short",464,272,8,16);
		this.setCurrentCostume("tall");
		this.world = world;
		this.level = level;
		
	}
	
	conditionProcess = function() {
		if (this.animationActive == -1 && this.currentCostume.name.includes("tall")) {
			let cond = getBarrierCondition(this.world,this.level);
			switch(cond) {
				case "KILL_ALL_ENEMIES":
					if (enemies.objs.length == 0) {
						//console.log("descending");
						this.setAnimation("descend");
					}
				break;
				case "GET_ALL_COINS":
					if (coins.objs.length == 0) {
						//console.log("descending");
						this.setAnimation("descend");
					}
				break;
			}
		}

	}
	
	process = function() {

		this.tick();
		if (this.animationActive != -1) {
			console.log(this.animations[this.animationActive].frames.length - 1 + "," + this.currentFrame);
			if (this.animations[this.animationActive].frames.length - 1 == this.currentFrame) {
				this.animationActive = -1;
				this.setCurrentCostume("short");
				this.solid = false;
			}
		}
		this.conditionProcess();
	}
}

class Tree extends Sprite {
	constructor(x,y,theme) {
		super();
		this.theme = theme;
		this.moveTo(x,y);
		this.solid = true;
		this.setSize(32,32);
		this.setHitbox(2,5,28,25);
		//console.log(this.hitbox);
		this.addCostume("lost_woods_tree",432,224,32,32);
		this.addCostume("blue_woods_tree",352,224,32,32);
		this.addCostume("lost_woods_tree_clear_bg",464,224,32,32);
		this.setCurrentCostume(this.theme + "_tree");
	}
	
	process = function() {
		this.tick();
	}
}