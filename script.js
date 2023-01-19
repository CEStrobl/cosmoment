// still
// white shades

let particles = []
let width = window.innerWidth;
let height = window.innerHeight;
let midpointX = width/2;
let midpointY = height/2;

console.log(midpointX)


let particleSize = 10
let particleCount = 1

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
			let p = new Satellite()
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
		ellipse(this.x, this.y, 100)
	}
}

class Satellite {
	constructor(){
		this.angle = 0
		this.radius = 100
		this.direction = 10

		this.x = midpointX;
		this.y = midpointY-this.radius;
		
		this.plus = 0
		this.minus = 5
		
		this.alpha = 255;
		this.easing = 0.05;
	}


	update(){
		angleMode(DEGREES)

		this.x = midpointX + this.radius * cos(this.angle)
		this.y = midpointY + this.radius * cos(this.angle)
		
		// this.x = midpointX + this.radius * cos(this.angle)
		// this.y = (Math.abs(sin(this.angle)) * this.direction) + midpointY

		// this.y += sin(this.angle)
		
		// if (this.direction >= this.radius) {
		// 	this.direction *= -this.direction
		// }
		
		// if (cos(this.angle) === -1 || cos(this.angle) === 1) {
		// 	this.direction *= -1
		// }

		this.angle++
		
		// translate(this.angle, this.angle)

		// if (cos(this.angle) === -1 || cos(this.angle) === 1) {
		// 	this.direction *= -1
		// }

		// if (this.direction === -1) {
		// 	this.angle--
		// } else {
		// 	this.angle++
		// }

	}

	show(){
		stroke(255)
		// noStroke()
		fill(255, this.alpha)
		ellipse(this.x, this.y, particleSize)
	}
}