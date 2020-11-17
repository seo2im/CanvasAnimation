const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

let isDown = false;
let points = [];

const Draw = () => {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

	points = points.map(point => {
		let {x, y, hw, hh, ratio} = point;
		ctx.translate(x, y);
		//ctx.clearRect(-hw - 0.5, -hh - 0.5, 2 * hw + 1, 2 * hh + 1)
		ctx.scale(ratio, ratio);
		ctx.fillRect(-hw, - hh, 2 * hw, 2 * hh);
		ctx.scale(1 / ratio, 1 / ratio);
		ctx.translate(-x, -y);
		ratio *= 0.9;
		if (ratio < 0.01)
			return null;
		return {...point, ratio : ratio}
	}).filter(e => e !== null)
}


canvas.onmousedown = (event) => {
	isDown = true;
	points = [...points, {x : event.clientX - rect.left, y : event.clientY - rect.top, hw : 10, hh : 10, ratio : 1}]
}

canvas.onmousemove = (event) => {
	if (isDown)
		points = [...points, {x : event.clientX - rect.left, y : event.clientY - rect.top, hw : 10, hh : 10, ratio : 1}]
}

canvas.onmouseup = (event) => {
	isDown = false;
}

setInterval(() => {
	Draw();
}, 100);