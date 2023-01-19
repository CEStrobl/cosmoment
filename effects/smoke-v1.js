// still
// white shades

let particles = []
let width = window.innerWidth;
let height = window.innerHeight;
let midpointX = width/2;
let midpointY = height/2;


let size = 100
let particleCount = 5

let minReach = -4
let maxReach = 4

let minSpd = 1
let maxSpd = 20

function setup(){
	createCanvas(width, height);

}

function draw(){
	background(0)
	for (let i = 0; i < particleCount; i++) {
		let p = new Particle()
		particles.push(p)
	}


	for (let i = particles.length-1; i >= 0; i--) {
		const e = particles[i];
		e.update()
		e.show()
		if(e.finished()) {
			particles.splice(i,1)
		}
		
	}
}

class Particle {
	constructor(){
		this.x = midpointX;
		this.y = height-100;
		this.vx = random(minReach, maxReach);
		this.vy = random(-maxSpd, -minSpd)
		
		this.alpha = 255;
	}

	finished(){
		return this.alpha < 0;
	}

	update(){
		this.x += this.vx
		this.y += this.vy
		this.alpha -=5
	}

	show(){
		// stroke(255)
		noStroke()
		fill(255, this.alpha)
		ellipse(this.x, this.y, size)
	}
}