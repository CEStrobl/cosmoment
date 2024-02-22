// left click spawns water
// very laggy when theres a lot
// squishes according to velocity
// extra bouncy

let ocean = []
let width = window.innerWidth;
let height = window.innerHeight -40;
let midpointX = width/2;
let midpointY = height/2;

let gravity = 0.5
let bounciness = 0.4


let particleSize = 50
let particleCount = 5
let barrier = 120

function getDist(x1, y1, x2, y2) {
	let xDist = x2-x1
	let yDist = y2-y1
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)) 
}

function setup(){
	createCanvas(width, height);

}




function draw(){
	background(0)
	for (let i = 0; i < particleCount; i++) {
		if(mouseIsPressed === true){
			if (mouseButton === LEFT) {
				let w = new Water()
				ocean.push(w)
			}
			if (mouseButton === RIGHT) {
			}
		}

	}
	
	for (let i = 0; i < ocean.length; i++) {
		const e = ocean[i];
		e.update()
		e.show()
		
		for (let o = 0; o < ocean.length; o++) {
			const f = ocean[o];
			if(e != f && e.intersects(f)){
				e.vx += random(-1, 1)
				e.vy += random(-0.5, 0.5)
				f.vx += random(-1, 1)
				f.vy += random(-0.5, 0.5)

				// e.vy *= -1
				// e.vx *= bounciness
			}
		}
	}


}

class Water {
	constructor(){
		this.red = 44
		this.green = random(180, 230)
		this.blue = random(230, 255)

		this.x = mouseX;
		this.y = mouseY;
		this.vx = random(-0.5, 0.5);
		this.vy = 0
		
		this.alpha = 200;
		this.holder = 200
	}

	intersects(other){
		var d = getDist(this.x, this.y, other.x, other.y,)
		if(d < particleSize*5) {
			return true
		} else { return false}
	}

	update(){
		// this.vx += gravity
		this.x += this.vx
		
		this.vy += gravity
		this.y += this.vy

		// getDist(x1, y1, x2, y2)

		//if touches bottom border
		if (this.y + particleSize/2 > height) {
			this.y = height - particleSize/2
			this.vy *= - bounciness
		}
		
		if (this.x + particleSize/2 > width-200 || this.x + particleSize/2 < 100) {

			// this.x = width-200 - particleSize/2
			this.vx *= - bounciness
			this.vx = -this.vx

			// this.blue = 100
		}

		if (this.x + particleSize/2 > width-100 || this.x + particleSize/2 < 50) {

			// this.x = width-200 - particleSize/2
			this.vx *= - bounciness+0.2
			this.vx = -this.vx

			// this.blue = 100
		}


		if(this.x < mouseX+barrier && this.x > mouseX-barrier &&
			this.y < mouseY+barrier && this.y > mouseY-barrier) 
		{
			
		}
		else {
		}
	}

	show(){
		// stroke(255)
		noStroke()
		fill(this.red, this.green, this.blue, this.alpha)
		ellipse(this.x, this.y, particleSize+this.vx, particleSize+this.vy)
	}
}
