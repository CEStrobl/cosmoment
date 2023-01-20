// still
// grows and shrinks and disappears
// click to spawn
// no trail

let particles = []
let width = window.innerWidth;
let height = window.innerHeight;
let midpointX = width/2;
let midpointY = height/2;

console.log(midpointX)


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

	let p = new Main()
	particles.push(p)

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
	// for (let i = 0; i < particleCount; i++) {

	// }
	

	for (let i = 0; i < particles.length; i++) {
		const e = particles[i];
		e.update()
		e.show()
		
	}

	// fill(255, 0,0, 100)
	// rect(midpointX + mainSize/2, 0, 5, height)
	// rect(0, midpointY + mainSize/2, width, 5)
	// fill(0, 255,0, 100)
	// rect(midpointX - mainSize/2, 0, 5, height)
	// rect(0, midpointY - mainSize/2, width, 5)
}

class Main {
	constructor(){
		this.x = midpointX;
		this.y = midpointY;
		// this.vx = random(minReach, maxReach);
		// this.vy = random(-maxSpd, -minSpd)
		
		this.alpha = 25;
	}


	update(){
		// this.x += this.vx
		// this.y += this.vy
		// this.alpha -=5
	}

	show(){
		// stroke(255)
		noStroke()
		fill(255, this.alpha)
		ellipse(this.x, this.y, mainSize)
	}
}

class SatelliteA {
	constructor(){
		this.angle = 0
		this.radius = 100
		this.r = 255
		this.g = 255
		this.b = 255
		this.a = 255
		this.mySize = particleSize

		this.x = midpointX;
		this.y = midpointY-this.radius;
		
		this.hide = false
		
		this.alpha = 255;
		this.easing = 0.05;
	}


	update(){
		angleMode(DEGREES)

		this.x = midpointX + this.radius * cos(this.angle)
		this.y = midpointY + this.radius * cos(this.angle)

		this.angle++


		// find hide
		if (cos(this.angle) <= -1) {
			this.hide = true
		} else if (cos(this.angle) >= 1) {
			this.hide = false
		}

		// hide when behind the main
		if (this.hide === true
		&&	this.x-particleSize/2 < midpointX + mainSize/2 -15
		&& this.x > midpointX - mainSize/2 +15
		&&  this.y-particleSize/2 < midpointY + mainSize/2 -15
		&& this.y > midpointY - mainSize/2 +15)
		{
			this.a += -80
		} else {
			this.a += 45
		}

		// stabilize number
		if(this.a > 255) {this.a = 255}
		if(this.a < 0) {this.a = 0}
		if(this.mySize < 8) {this.mySize= 8}
		if(this.mySize > 15) {this.mySize= 15}

		// larger and smaller depending on cycle
		if(this.hide === true) {
			this.mySize -= 0.1
		} else if (this.hide === false) {
			this.mySize += 0.1
		}

		// console.log("hide: ", this.hide, " status:", this.particleSize)
	}

	show(){
		stroke(255)
		noStroke()
		fill(this.r,this.g,this.b,this.a)
		ellipse(this.x, this.y, this.mySize)
	}
}