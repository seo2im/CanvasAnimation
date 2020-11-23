const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rect = canvas.getBoundingClientRect();

let prePos = {x : 30, y : 30, w : 30, h : 30}
let nextPos = {x : 30, y : 30, w : 30, h : 30}
let isDown = false;


canvas.onmousedown = (event) => {
	isDown = true;
}

canvas.onmousemove = (event) => {
	if (!isDown)
		return ;
	nextPos = {...nextPos, x : event.clientX - rect.left, y : event.clientY - rect.top}
}

canvas.onmouseup = (event) => {
	isDown = false;
}

ctx.fillRect(prePos.x, prePos.y, prePos.w, prePos.h);

setInterval(() => {
	if (prePos.x !== nextPos.x && prePos.y !== nextPos.y){
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
		ctx.fillRect(nextPos.x, nextPos.y, nextPos.w, nextPos.h);
		prePos = {...nextPos};
	}
}, 30);