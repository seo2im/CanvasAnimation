const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
class Vec2d {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	add(vec) {
		return new Vec2d(this.x + vec.x, this.y + vec.y)
	}

	sub(vec) {
		return new Vec2d(this.x - vec.x, this.y - vec.y)
	}

	div(value) {
		return new Vec2d(this.x / value, this.y / value);
	}

	mul(value) {
		return new Vec2d(this.x * value, this.y * value);
	}

	len() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	norm() {
		if (this.len() === 0)
			return;
		this.x /= this.len();
		this.y /= this.len();
	}

	dir() {
		if (this.len() === 0)
			return this;
		return new Vec2d(this.x / this.len(), this.y / this.len());
	}
}

/*
	left : 37 up : 38 right : 39 down : 40
*/
let point = { x : 30, y : 30, dir : new Vec2d(0, 0)};

window.onkeydown = ({ keyCode }) => {
	switch (keyCode) {
		case 37 :
			point = {...point, dir : point.dir.add(new Vec2d(-0.1, 0))}
			break;
		case 38 :
			point = {...point, dir : point.dir.add(new Vec2d(0, -0.1))}
			break;
		case 39 :
			point = {...point, dir : point.dir.add(new Vec2d(0.1, 0))}
			break;
		case 40 :
			point = {...point, dir : point.dir.add(new Vec2d(0, 0.1))}
			break;
	}
	
}

window.onkeyup = () => {
	point = {...point, dir : new Vec2d(0, 0)}
}

const Draw = () => {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	ctx.fillRect(point.x - 5, point.y - 5, 10, 10);
}

const Move = () => {
	point = {...point, x : point.x + point.dir.x, y : point.y + point.dir.y }
}

setInterval(() => {	
	Move();
}, 100)

setInterval(() => {
	Draw();
}, 100)


