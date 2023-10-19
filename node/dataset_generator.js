const draw = require('../common/draw.js');
const constants = require('../common/constants.js');
const utils = require('../common/utils.js');
const geometry = require('../common/geometry.js');
const featureFunctions = require('../common/featureFunctions.js');

const {createCanvas} = require('canvas');
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d')

const fs = require('fs');

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach(fn => {
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);
    const {session, student, drawings} = JSON.parse(content);
    for(let label in drawings){
        if(!utils.flaggedSamples.includes(id)){
            samples.push({
                id,
                label,
                student_name: student,
                student_id: session
            })

            const paths = drawings[label];
            fs.writeFileSync(constants.JSON_DIR + "/" + id + ".json", JSON.stringify(paths));
    
            generateImageFile(constants.IMG_DIR + '/' + id + '.png', paths);
            generateImageFile(constants.IMG_DIR2 + '/' + id + '.png', paths, true);
        }

        utils.printProgress(id, fileNames.length*8);
        id++;
    }
})

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

fs.writeFileSync(constants.SAMPLES_JS, "const samples = " + JSON.stringify(samples) + ';');

function generateImageFile (outFile, paths, extra_features = false) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    draw.paths(ctx, paths);

    if (extra_features) {
        const {vertices, hull} = geometry.minimumBoundingBox({points: paths.flat()});
        
        draw.path(ctx, [...vertices, vertices[0]], 'green');

        const roundness = geometry.roundness(hull);
        const R = Math.floor(roundness**5 * 255);
        const G = 0;
        const B = Math.floor((1 - roundness**5) * 255);
        const color = `rgb(${R}, ${G}, ${B})`;
        draw.path(ctx, [...hull, hull[0]], color, 10);

        const pixels = featureFunctions.getPixels(paths);
        const complexity = pixels.filter((a) => a != 0).length;
        draw.text(ctx, complexity, "blue");
    }

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outFile, buffer);
}