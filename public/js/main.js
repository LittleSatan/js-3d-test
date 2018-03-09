'use strict';
import {makeBox, makePyramide, makeTrapez, makeDiamond, makeTeddy} from "./Shapes.js";
import {draw} from "./draw.js";
import {Camera} from "./Camera.js";
import {Vec} from "./Vec.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const camera = new Camera(new Vec( 0, 0, 80));

const objects = [];

//objects.push(makeTeddy(new Vec(0, 0, 100)));
objects.push(makeBox(new Vec(0, 0, 0), 50));
objects.push(makePyramide(new Vec(0, 0, 0), 50, 50));

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousemove', event => {

	for (let object of objects){
		object.position.x = (event.clientX - canvas.width * 0.5) * 0.1;
		object.position.y = (event.clientY - canvas.height * 0.5) * 0.1;
	}
	objects[1].position.y -= 50; 
});


function resizeCanvas(){
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.resetTransform();
	ctx.translate(window.innerWidth * 0.5, window.innerHeight * 0.5);
}

function loop(time = 0){

	// CALCULATE
	for (let object of objects){
//		object.position.z = Math.sin(time * 0.001) * 50 - 0;
		object.rotation.x += 0.0001;
//		object.rotation.z += 0.01;

	}

	// DRAW

	// clear rect
	ctx.fillRect(canvas.width * -0.5, canvas.height * -0.5, canvas.width, canvas.height);

	// draw coord system lines
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#444";
	ctx.beginPath();
	ctx.moveTo(canvas.width * -0.5, 0);
	ctx.lineTo(canvas.width * 0.5, 0);
	ctx.stroke();	
	ctx.beginPath();
	ctx.moveTo(0, canvas.height * -0.5);
	ctx.lineTo(0, canvas.height * 0.5);
	ctx.stroke();	

	ctx.lineWidth = 3;
	for (let object of objects){
		draw(ctx, camera, object);
	}
	requestAnimationFrame(loop);
}

resizeCanvas();
loop();