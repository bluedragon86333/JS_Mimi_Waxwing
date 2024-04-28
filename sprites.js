class Sprite { //an assumption this class makes is that all costumes will be the same size. This may backfire eventually...
	x = 0;
	y = 0;
	xv = 0;
	yv = 0;
	width = 16;
	height = 16;
	direction = 0;
	size = 1; //scale factor of an object
	show = true;
	
	
	costumes = []; //loose costumes- static frames, idle poses, etc. not animations!!
	currentCostume = new Costume("",this.x,this.y,this.width,this.height);
	animationActive = false;
	canLeaveScreen = false;
	animations = [];
	
	
	moveSteps = function(stepCount) {
		this.x += Math.cos(this.direction);
		this.y += Math.sin(this.direction);
	};
	
	moveSteps = function(degrees) {
		this.direction -= degrees;
	};
	
	turnRight = function(degrees) {
		this.direction += degrees;
	};
	
	moveTo = function(newX,newY) {
		this.x = newX;
		this.y = newY;
	};
	
	setDir = function(newDeg) {
		this.direction = newDeg;
	};
	
	draw = function() {
		drawImgFromAtlas(this.currentCostume.name,this.currentCostume.sx,this.currentCostume.sy,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size);
	};
	
	setVel = function(newXV,newYV) {
		this.xv = newXV;
		this.yv = newYV;
	};
	
	checkBounds = function() {
		if (!this.canLeaveScreen) {
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.x + this.width > canvas.width) {
				this.x = canvas.width - this.width;
			}
			if (this.y < 0) {
				this.y = 0;
			}
			if (this.y + this.height > canvas.height) {
				this.y = game.height - game.height;
			}
		}
	};
	
	addCostume = function(name,sx,sy,w,h) {
		if (arguments.length == 3)
		{
			w = this.width;
			h = this.height;
		}
		this.costumes.push(new Costume(name,sx,sy,w,h));
	}
	
	addAnimation = function(name,tlx,tly,width,height,numOfFrames,frameDuration) { //frames are assumed to be left to right, horizontally
		let frames = [];
		for (let i = 0; i < numOfFrames; i++) {
			frames.push(new AnimationFrame(name + "_" + i,tlx + i * width,tly,width,height,frameDuration));
		}
		let anim = new Animation(name,frames);
		this.animations.push(anim);
	}
	
	setCurrentCostume = function(name) {
		if (this.animationActive) {
			
		}
		else
		{
			//this.currentCostume.name = name;
			for (let i = 0; i < this.costumes.length; i++) {
				if (name == this.costumes[i][0]) {
					this.currentCostume = this.costumes[i];					
					return;
				}
			}
		}
	}
}