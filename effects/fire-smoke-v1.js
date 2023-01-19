//follows mouse
// activate on click

let smokes = []
let flames = []
let width = window.innerWidth;
let height = window.innerHeight;
let midpointX = width/2;
let midpointY = height/2;


let particleSize = 50
let particleCount = 5
let decay = 3
let barrier = 120

let minReach = -0.8
let maxReach = 0.8

let minSpd = 3
let maxSpd = 8

function setup(){
	createCanvas(width, height);

}

function draw(){
	background(0)
	for (let i = 0; i < particleCount; i++) {
		if(mouseIsPressed === true){
	
			let f = new Flame()
			flames.push(f)
	
			let s = new Smoke()
			smokes.push(s)
		}

	}


	for (let i = smokes.length-1; i >= 0; i--) {
		const e = smokes[i];
		e.update()
		e.show()
		if(e.finished()) {
			smokes.splice(i,1)
		}
		
	}

	for (let i = flames.length-1; i >= 0; i--) {
		const e = flames[i];
		e.update()
		e.show()
		if(e.finished()) {
			flames.splice(i,1)
		}
		
	}
}

class Smoke {
	constructor(){
		this.smokeHue = random(50, 120)
		this.x = mouseX;
		this.y = mouseY;
		this.vx = random(minReach, maxReach);
		this.vy = random(-maxSpd, -minSpd)
		
		this.alpha = 0;
		this.holder = 200
	}

	finished(){
		return this.alpha < 0;
	}

	update(){
		this.x += this.vx
		this.y += this.vy
		if(this.x < mouseX+barrier && this.x > mouseX-barrier &&
			this.y < mouseY+barrier && this.y > mouseY-barrier) 
		{
			
		}
		else {
			this.alpha += this.holder/20
		}
		this.holder -= decay *2
		this.smokeHue -= decay*0.3
	}

	show(){
		// stroke(255)
		noStroke()
		fill(this.smokeHue, this.alpha)
		ellipse(this.x, this.y, particleSize)
	}
}

class Flame {
	constructor(){
		this.fireHue = 200
		this.x = mouseX;
		this.y = mouseY;
		this.vx = random(-0.7, 0.7);
		this.vy = random(-maxSpd, -minSpd)
		
		this.alpha = 200;
	}

	finished(){
		return this.alpha < 0;
	}

	update(){
		this.x += this.vx
		this.y += this.vy
		this.alpha -= decay*2.5
		this.fireHue -= decay*2.5
	}

	show(){
		// stroke(255)
		noStroke()
		fill(252, this.fireHue, 0, this.alpha)
		ellipse(this.x, this.y, particleSize/2, particleSize)
	}
}