const 	serve = require('serve'),
		fs = require('fs'),
	    readline = require('readline'),
	    lineReader = require('line-reader'),
        Promise = require('bluebird');

const args = process.argv.slice(2);
if (args.length === 0){
	console.log("start server")
	const server = serve(__dirname + "/public", {
  		port: process.env.port || 5000,
  	ignore: ['node_modules']
})
} else {
	args.forEach( (arg, index, array) => {
		if (arg === "--convert" || arg === "-c"){
			if (!array[index + 1]){
				console.log("no parameter after -convert found");
				return;
			}

			convertObj(array[index + 1]);

		}
	})
}

function convertObj(path){

	let points = [],
		vertices = [],
		faces = [];

	const 	regExPoints = /v\s*(-?\d+(?:.\d*)?)\s*(-?\d+(?:.\d*)?)\s*(-?\d+(?:.\d*)?)/,
			regExVecs = /f\s*(-?[1-9]+) (-?[1-9]+) (-?[1-9]+)/;

	const lr = Promise.promisify(lineReader.eachLine);

	lr(path, (line, last) => {
		if (regExPoints.test(line)){
			let coords = regExPoints.exec(line);
			let point = {x: parseFloat(coords[1]), y: parseFloat(coords[2]), z: parseFloat(coords[3])};
			points.push(point);
		}

		if (regExVecs.test(line)){
			let points = regExVecs.exec(line);
			let velStart = vertices.length;
			vertices.push([points[1] - 1, points[2] - 1]);
			vertices.push([points[2] - 1, points[3] - 1]);
			vertices.push([points[3] - 1, points[1] - 1]);
			faces.push([velStart, velStart + 1, velStart + 2])
		}

	}).then( () => {

		obj = {
			type: "custom",
			points: points,
			vertices: vertices,
			faces: faces,
		}

		console.log(obj);

		fs.writeFile(path + ".json", JSON.stringify(obj), function (err) {
            if (err) console.log(err);
        });
	})

}