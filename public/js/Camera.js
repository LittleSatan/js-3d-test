import {Vec} from "./Vec.js";

export class Camera {
	constructor(position = new Vec(0, 0, 0), zoom = 6){
		this.position = position;
		this.zoom = zoom;
	}

	rotateAroundCamera(point){

	}

	getRelativeToCamera(point){

		let realDistance = Math.sqrt(
			(this.position.x - point.x) ** 2 + 
			(this.position.y - point.y) ** 2 + 
			(this.position.z - point.z) ** 2);

		let zDistance = this.position.z + point.z;

		let fov = Math.sqrt(Math.abs(zDistance));
//		let fov = zDistance;

		let x = ((this.position.x + point.x) / fov) * (this.zoom ** 2);
		let y = ((this.position.y + point.y) / fov) * (this.zoom ** 2);
		let z = (this.position.z + point.z);
		return {x: x, y: y, z: z};
	}
}