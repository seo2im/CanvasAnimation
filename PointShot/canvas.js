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

const add = (v1, v2) => {
	return v1.add(v2);
}

const sub = (v1, v2) => {
	return v1.sub(v2);
}

const dot = (v1, v2) => {
	return (v1.x * v2.x + v1.y * v2.y) / (v1.len() + v2.len())
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

let points = [];

const BulletPosInit = (pointPos) => {
	const bullets = [];
	for (let i = 0; i < 7; i++)
	{
		let pos;
		const flag = Math.random();
		if (0 <= flag && flag < 0.25)
			pos = new Vec2d(0, Math.random() * canvas.clientHeight);
		else if (0.25 <= flag && flag < 0.5)
			pos = new Vec2d(canvas.clientWidth, Math.random() * canvas.clientHeight);
		else if (0.5 <= flag && flag <= 0.75)
			pos = new Vec2d(Math.random() * canvas.clientWidth, 0);
		else
			pos = new Vec2d(Math.random() * canvas.clientWidth, canvas.clientHeight);
		bullets.push({ pos : pos, dist : pointPos.sub(pos).div(50) })
	}
	return bullets;
}

const DrawPoint = (ctx, pos, color) => {
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
}

const MoveBullets = (bullets, pointPos) => {
	return bullets.map(bullet => {
		const { pos, dist } = bullet;
		const newPos = pos.add(dist);

		if (newPos.sub(pointPos).len() >= 1)
			return { pos : newPos, dist : dist };
		return null;
	}).filter(e => e !== null);
}

const DrawBullet = (ctx, bullets) => {
	bullets.forEach(bullet => {
		const { pos } = bullet; 
		DrawPoint(ctx, pos, 'red');
	})
}

const DrawScreen = () => {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	points = points.map(point => {
		let { pos, bullets } = point;
		DrawPoint(ctx, pos, 'black');
		DrawBullet(ctx, bullets);
		bullets = MoveBullets(bullets, pos);
		if (bullets.length !== 0) 
			return {...point, bullets : bullets}
		else 
			return null;
	}).filter(e => e !== null);
}

canvas.onmousedown = (e) => {
	const pos = new Vec2d(event.clientX - rect.left, event.clientY - rect.top);

	points = [...points, {
		pos : pos,
		bullets : BulletPosInit(pos),
	}]
}

setInterval(() => {
	DrawScreen();
}, 10);