// movement by mouse
// grows and shrinks and disappears
// click to spawn
// trail commented in show
// X orbit

let particles = []
let width = window.innerWidth;
let height = window.innerHeight - 40;
let midpointX = width/2;
let midpointY = height/2;


let particleSize = 10
let particleCount = 1

let mainSize = 100

let minReach = -4
let maxReach = 4

let minSpd = 1
let maxSpd = 20

let enableSpawning = true

let curx = 0
let cury = 0
let speed = 30

//library function to find the co-ords of the mouse
let mposx = 0;
let mposy = 0;

function setup(){
	createCanvas(width, height);
	background(0)
	
}

function createVectorDirection(mx, my, cx, cy){
    return createVector((mx-cx),(my-cy));
}
function moveCurrent(cx, cy, mx, my, v, s){
	curx += (v.x * 1/s);
	cury += (v.y * 1/s);
}

function draw(){
	background("black")

	
	mposx = mouseX;
	mposy = mouseY;

	//find the vector between the cursor and current text position
	vec = createVectorDirection(mposx, mposy, curx, cury);

	// move the text in the direction of the cursor and apply a speed variable
	moveCurrent(curx, cury, mposx, mposy, vec, speed); 

	//curx&cury are updated by moveCurrent then drawn to the canvas
	let p = new Main()
	p.show(mposx, mposy, curx, cury)
	
	if(mouseIsPressed === true){
		if (enableSpawning === true) {
			let p = new SatelliteA(curx,cury)
			particles.push(p)
			let b = new SatelliteB(curx,cury)
			particles.push(b)
			enableSpawning = false
		}
	} else{
		enableSpawning = true
	}
	
	
	for (let i = 0; i < particles.length; i++) {
		const e = particles[i];
		e.update(curx,cury)
		e.show()
		
	}
	
}

class Main {
	constructor(){
		// this.x = mouseX;
		// this.y = mouseY;
		
		this.alpha = 25;
	}


	update(){
	}

	show(mx, my, cx, cy){
		noStroke()
		fill(this.alpha)
		// ellipse((mx-cx),(my-cy), mainSize)
		ellipse((cx),(cy), mainSize)
	}
}

class SatelliteA {
	constructor(cx, cy){
		this.angle = 0
		this.radius = 100
		this.r = 255
		this.g = 255
		this.b = 255
		this.a = 255
		this.mySize = particleSize

		this.x = midpointX;
		this.y = midpointY-this.radius;
		
		this.hide = false;
		
		this.alpha = 255;
		this.easing = 0.5;

		this.history = [];
	}
	
	
	update(cx, cy){
		angleMode(DEGREES)
		this.cx = cx*2
		this.cy = cy*2

		this.cx += (mouseY * 1/200);
		this.cy += (mouseY * 1/(this.mySize * 20));

		this.targetX = this.cx *this.easing
		this.targetY = this.cy *this.easing

		this.x = this.targetX + this.radius * cos(this.angle)
		this.y = this.targetY + this.radius * cos(this.angle) 

		this.angle++


		// find hide
		if (cos(this.angle) <= -1) {
			this.hide = true
		} else if (cos(this.angle) >= 1) {
			this.hide = false
		}

		// hide when behind the main
		if (this.hide === true
		&&	this.x-particleSize/2 < cx + mainSize/2 -15
		&& this.x > cx - mainSize/2 +15
		&&  this.y-particleSize/2 < cy + mainSize/2 -15
		&& this.y > cy - mainSize/2 +15)
		{
			this.a += -80
		} else {
			if(this.a > 255) {this.a = 255}
			else{

				this.a += 45
			}
		}

		// stabilize number
		if(this.a < 0) {this.a = 0}
		if(this.mySize < 8) {this.mySize= 8}
		if(this.mySize > 15) {this.mySize= 15}

		// larger and smaller depending on cycle
		if(this.hide === true) {
			this.mySize -= 0.1
		} else if (this.hide === false) {
			this.mySize += 0.1
		}

		// trail
		let v = createVector(this.x, this.y);

		this.history.push(v);
	
		if (this.history.length > 10) {
		  this.history.splice(0, 1);
		}
	}

	show(){
		// beginShape();
		// for (let i = 0; i < this.history.length; i++) {
		// 	stroke(this.r,this.g,this.b-50,20)
		//   let pos = this.history[i];
		//   noFill();
		//   vertex(pos.x, pos.y);
		//   endShape();
		// }
		noStroke()
		fill(this.r,this.g,this.b,this.a)
		ellipse(this.x, this.y, this.mySize)
	}
}

class SatelliteB {
	constructor(cx, cy){
		this.angle = 0
		this.radius = 100
		this.r = 255
		this.g = 255
		this.b = 255
		this.a = 255
		this.mySize = particleSize

		this.x = midpointX;
		this.y = midpointY-this.radius;
		
		this.hide = false;
		
		this.alpha = 255;
		this.easing = 0.5;

		this.history = [];
	}
	
	
	update(cx, cy){
		angleMode(DEGREES)
		this.cx = cx*2
		this.cy = cy*2

		this.cx += (mouseY * 1/200);
		this.cy += (mouseY * 1/(this.mySize * 20));

		this.targetX = this.cx *this.easing
		this.targetY = this.cy *this.easing

		this.x = this.targetX + this.radius * -cos(this.angle)
		this.y = this.targetY + this.radius * cos(this.angle) 

		this.angle++


		// find hide
		if (cos(this.angle) <= -1) {
			this.hide = true
		} else if (cos(this.angle) >= 1) {
			this.hide = false
		}

		// hide when behind the main
		if (this.hide === true
		&&	this.x-particleSize/2 < cx + mainSize/2 -15
		&& this.x > cx - mainSize/2 +15
		&&  this.y-particleSize/2 < cy + mainSize/2 -15
		&& this.y > cy - mainSize/2 +15)
		{
			this.a += -80
		} else {
			if(this.a > 255) {this.a = 255}
			else{

				this.a += 45
			}
		}

		// stabilize number
		if(this.a < 0) {this.a = 0}
		if(this.mySize < 8) {this.mySize= 8}
		if(this.mySize > 15) {this.mySize= 15}

		// larger and smaller depending on cycle
		if(this.hide === true) {
			this.mySize -= 0.1
		} else if (this.hide === false) {
			this.mySize += 0.1
		}

		// trail
		let v = createVector(this.x, this.y);

		this.history.push(v);
	
		if (this.history.length > 10) {
		  this.history.splice(0, 1);
		}
	}

	show(){
		// beginShape();
		// for (let i = 0; i < this.history.length; i++) {
		// 	stroke(this.r,this.g,this.b-50,20)
		//   let pos = this.history[i];
		//   noFill();
		//   vertex(pos.x, pos.y);
		//   endShape();
		// }
		noStroke()
		fill(this.r,this.g,this.b,this.a)
		ellipse(this.x, this.y, this.mySize)
	}
}