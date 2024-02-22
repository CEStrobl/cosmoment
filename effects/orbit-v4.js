// still
// grows and shrinks and disappears
// click to spawn
// no trail

let particles = []
let width = window.innerWidth;
let height = window.innerHeight;
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

function setup(){
	createCanvas(width, height);

	// let p = new Main()
	// particles.push(p)
}

function draw(){
	background(0)
	
	if(mouseIsPressed === true){
		if (enableSpawning === true) {
			let p = new SatelliteA()
			particles.push(p)
			enableSpawning = false
		}
	} else{
		enableSpawning = true
	}

	for (let i = 0; i < particles.length; i++) {
		const e = particles[i];
		e.update()
		e.show()
	}
}

class Main {
	constructor(){
		this.x = midpointX;
		this.y = midpointY;
		
		this.alpha = 25;
	}

	update(){
	}

	show(){
		noStroke()
		fill(255, this.alpha)
		ellipse(this.x, this.y, mainSize)
	}
}

class SatelliteA {
	constructor(){
		this.angle = 0;
		this.radius = 100;
		this.red = 255;
		this.g = 255;
		this.b = 255;
		this.a = 255;
		this.mySize = particleSize;
		this.d = 2;
		this.e = 0;
		this.f = 1;

		this.r = 0;

		this.x = midpointX;
		this.y = midpointY-this.radius;
		
		this.hide = false;
		
		this.alpha = 255;
		this.easing = 0.05;

		this.history = [];
	}


	update(){
		angleMode(DEGREES);

		// this.x = midpointX + this.radius * cos(this.d * (this.angle + this.e) / this.f);
		// this.y = midpointY + this.radius * cos(this.d * (this.angle + this.e) / this.f);

		this.r = 200 * sin(10 * this.angle) + 100;

		this.x = midpointX + this.r * cos(this.angle);
		this.y = midpointY + this.r * sin(this.angle);

		this.angle++

		// stabilize number
		if(this.a > 255) {this.a = 255}
		if(this.a < 0) {this.a = 0}
		if(this.mySize < 8) {this.mySize = 8}
		if(this.mySize > 15) {this.mySize = 15}

		let v = createVector(this.x, this.y);

		this.history.push(v);
	
		if (this.history.length > 200) {
		  this.history.splice(0, 1);
		}
	}

	show(){
		for (let i = 0; i < this.history.length; i++) {
			stroke(this.r,this.g,this.b-50,20)
			let pos = this.history[i];
			square(pos.x, pos.y, 5);
		}
		stroke(255)
		noStroke()
		fill(this.red,this.g,this.b,this.a)
		ellipse(this.x, this.y, this.mySize)
	}
}