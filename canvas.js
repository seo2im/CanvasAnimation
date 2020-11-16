const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let points = [];
let id = -1;

function Anim () {
	points = points.map(point => {
		let {x, y, w, h} = point;
		
		ctx.clearRect(x, y, w + 1, h + 1);
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
	points.push({x : event.pageX, y : event.pageY, w : 20, h : 20})
})

interval = setInterval(Anim, 100);

