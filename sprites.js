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
	costume = {
		"name":"",
		"x":"", //source x in atlas
		"y":"" //source y in atlas
	};
	
	costumes = [];
	canLeaveScreen = false;
	
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
		drawImgFromAtlas(this.costume.name,this.costume.x,this.costume.y,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size);
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
				this.y = canvas.height - this.height;
			}
		}
	};
	
	addCostume = function(name,sx,sy) {
		this.costumes.push([name,sx,sy]);
	}
	
	setCurrentCostume = function(name) {
		this.costume.name = name;
		for (let i = 0; i < this.costumes.length; i++) {
			if (name == this.costumes[i][0]) {
				this.costume.x = this.costumes[i][1];
				this.costume.y = this.costumes[i][2];
				
				return;
			}
		}
		
	}
}