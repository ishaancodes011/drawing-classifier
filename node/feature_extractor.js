const constants = require('../common/constants.js');
const featureFunctions = require('../common/featureFunctions.js');
const utils = require('../common/utils.js');

const fs = require('fs');

console.log("EXTRACTING FEATURES ....");

const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));
const samples2 = JSON.parse(fs.readFileSync(constants.SAMPLES));

for(const sample of samples){
    const paths = JSON.parse(fs.readFileSync(constants.JSON_DIR + '/' + sample.id + '.json'));
    
    const functions = featureFunctions.inUse.map(f=>f.function);
    sample.point = functions.map(f=>f(paths));
};
for (let i = 0; i < samples2.length; i++) {
    const sample = samples2[i];
    const paths = JSON.parse(fs.readFileSync(constants.JSON_DIR + '/' + sample.id + '.json'));
    
    const functions = featureFunctions.inUse2.map(f=>f.function);
    sample.point = functions.map(f=>f(paths));
    utils.printProgress(i, samples.length - 1);
};

const featureNames = featureFunctions.inUse.map(f=>f.name);
const featureNames2 = featureFunctions.inUse2.map(f=>f.name);

console.log("GENERATING SPLITS...");

const trainingAmount = samples.length * 0.5;

const training = [];
const training2 = [];
const testing = [];
const testing2 = [];
for(let i=0;i<samples.length;i++){
    if(i<trainingAmount){
        training.push(samples[i]);
        training2.push(samples2[i]);
    } else {
        testing.push(samples[i]);
        testing2.push(samples2[i]);
    }
}

const minMax = utils.normalizePoints(training.map(s=>s.point));
const minMax2 = utils.normalizePoints(training2.map(s=>s.point));
utils.normalizePoints(testing.map(s=>s.point), minMax);
utils.normalizePoints(testing2.map(s=>s.point), minMax2);

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featureNames, 
        samples:samples.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);
fs.writeFileSync(constants.FEATURES2,
    JSON.stringify({
        featureNames:featureNames2, 
        samples:samples2.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);

fs.writeFileSync(constants.FEATURES_JS,
    `const features = ${JSON.stringify({featureNames, samples})};`
);
fs.writeFileSync(constants.FEATURES_JS2,
    `const features2 = ${JSON.stringify({featureNames:featureNames2, samples2})};`
);

fs.writeFileSync(constants.TRAINING,
    JSON.stringify({
        featureNames, 
        samples:training.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);
fs.writeFileSync(constants.TRAINING2,
    JSON.stringify({
        featureNames:featureNames2, 
        samples:training2.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);

fs.writeFileSync(constants.TRAINING_JS,
    `const training = ${JSON.stringify({featureNames, samples:training})};`
);
fs.writeFileSync(constants.TRAINING_JS2,
    `const training2 = ${JSON.stringify({featureNames:featureNames2, samples:training2})};`
);

fs.writeFileSync(constants.TESTING,
    JSON.stringify({
        featureNames, 
        samples:testing.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);
fs.writeFileSync(constants.TESTING2,
    JSON.stringify({
        featureNames:featureNames2, 
        samples:testing2.map(s=>{
            return {
                label:s.label,
                point:s.point
            };
        })
    })
);

fs.writeFileSync(constants.TESTING_JS,
    `const testing = ${JSON.stringify({featureNames, samples:testing})};`
);
fs.writeFileSync(constants.TESTING_JS2,
    `const testing2 = ${JSON.stringify({featureNames:featureNames2, samples:testing2})};`
);

fs.writeFileSync(constants.MIN_MAX_JS, `const minMax = ${JSON.stringify(minMax)}`)
fs.writeFileSync(constants.MIN_MAX_JS2, `const minMax2 = ${JSON.stringify(minMax2)}`)

console.log("DONE");