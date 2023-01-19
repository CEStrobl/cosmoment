// follows mouse
// gray variants

let particles = []
let width = window.innerWidth;
let height = window.innerHeight;
let midpointX = width/2;
let midpointY = height/2;


let size = 50
let particleCount = 5
let decay = 3

let minReach = -1
let maxReach = 1

let minSpd = 1
let maxSpd = 10

function setup(){
	createCanvas(width, height);

}

function draw(){
	background(0)
	for (let i = 0; i < particleCount; i++) {
		if(mouseIsPressed === true){
	
		}
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
		this.smokeHue = random(50, 120)
		this.x = mouseX;
		this.y = mouseY;
		this.vx = random(minReach, maxReach);
		this.vy = random(-maxSpd, -minSpd)
		
		this.alpha = 200;
	}

	finished(){
		return this.alpha < 0;
	}

	update(){
		this.x += this.vx
		this.y += this.vy
		this.alpha -=decay
	}

	show(){
		// stroke(255)
		noStroke()
		fill(this.smokeHue, this.alpha)
		ellipse(this.x, this.y, size)
	}
}