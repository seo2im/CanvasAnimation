const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
let id = -1;

function Anim () {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	points = points.map(point => {
		let {x, y, w, h} = point;
		
		w = w < 0.5 ? 0 : w * 0.9;
		h = h < 0.5 ? 0 : h * 0.9;

		if (w === 0)
			return null;
		ctx.fillRect(x, y, w, h);
		return {...point, w : w, h : h};
	})
	points = points.filter(e => e !== null);

	console.log(points);
}

canvas.addEventListener('click', function (event) {
	points.push({x : event.offsetX, y : event.offsetY, w : 20, h : 20})
})

interval = setInterval(Anim, 100);

