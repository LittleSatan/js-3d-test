import {Vec} from "./Vec.js";

export function draw(ctx, camera, obj){
	ctx.strokeStyle = obj.colour;
	for (let vertex of obj.vertices){

		// get point
		let pointStart = obj.points[vertex[0]];
		let pointEnd = obj.points[vertex[1]];

		pointStart = rotatePointOnObject(pointStart, obj);
		pointEnd = rotatePointOnObject(pointEnd, obj);

		// move according to the obj itself
		pointStart = offSetPointToObject(pointStart, obj);
		pointEnd = offSetPointToObject(pointEnd, obj);

		pointStart = camera.getRelativeToCamera(pointStart);
		pointEnd = camera.getRelativeToCamera(pointEnd);

		ctx.beginPath();
		ctx.moveTo(	pointStart.x, pointStart.y);
		ctx.lineTo(	pointEnd.x, pointEnd.y);
		ctx.stroke();	
	}
}

function offSetPointToObject(point, obj){
	let x = point.x + obj.position.x;
	let y = point.y + obj.position.y;
	let z = point.z + obj.position.z;
	return {x: x, y: y, z: z};
}

function rotatePointOnObject(origPoint, obj){

	let rotation = [obj.rotation.x * Math.PI * 2, obj.rotation.y * Math.PI * 2, obj.rotation.z * Math.PI * 2];


	let point = {...origPoint};
	let tempPoint = {...point}

	point.x = Math.cos(rotation[0]) * (tempPoint.x) - Math.sin(rotation[0]) * (tempPoint.z);
	point.z = Math.sin(rotation[0]) * (tempPoint.x) - Math.cos(rotation[0]) * (tempPoint.z);

/*	tempPoint = {...point}

	point.x = Math.cos(rotation[1]) * (tempPoint.x) - Math.cos(rotation[1]) * (tempPoint.y);
	point.y = Math.sin(rotation[1]) * (tempPoint.x) - Math.cos(rotation[1]) * (tempPoint.y);*/

/*	tempPoint = {...point}

	point.y = Math.sin(rotation[2]) * (tempPoint.y) - Math.cos(rotation[2]) * (tempPoint.z);
	point.z = Math.cos(rotation[2]) * (tempPoint.y) - Math.sin(rotation[2]) * (tempPoint.z);*/

    return point;

}