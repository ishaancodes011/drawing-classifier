const constants= {};

constants.DATA_DIR = '../data';
constants.RAW_DIR = constants.DATA_DIR + '/raw';
constants.DATASET_DIR = constants.DATA_DIR + '/dataset';
constants.JSON_DIR = constants.DATASET_DIR + '/json';
constants.IMG_DIR = constants.DATASET_DIR + '/img';
constants.IMG_DIR2 = constants.DATASET_DIR + '/img2';
constants.SAMPLES = constants.DATASET_DIR + '/samples.json';
constants.FEATURES = constants.DATASET_DIR + '/features.json';
constants.FEATURES2 = constants.DATASET_DIR + '/features2.json';
constants.TRAINING = constants.DATASET_DIR + '/training.json';
constants.TRAINING2 = constants.DATASET_DIR + '/training2.json';
constants.TESTING = constants.DATASET_DIR + '/testing.json';
constants.TESTING2 = constants.DATASET_DIR + '/testing2.json';
constants.JS_OBJECTS = '../common/js_objects';
constants.SAMPLES_JS = constants.JS_OBJECTS + '/samples.js';
constants.FEATURES_JS = constants.JS_OBJECTS + '/features.js';
constants.FEATURES_JS2 = constants.JS_OBJECTS + '/features2.js';
constants.TRAINING_JS = constants.JS_OBJECTS + '/training.js';
constants.TRAINING_JS2 = constants.JS_OBJECTS + '/training2.js';
constants.TESTING_JS = constants.JS_OBJECTS + '/testing.js';
constants.TESTING_JS2 = constants.JS_OBJECTS + '/testing2.js';
constants.MIN_MAX_JS = constants.JS_OBJECTS + '/minMax.js';
constants.MIN_MAX_JS2 = constants.JS_OBJECTS + '/minMax2.js';
constants.DECISION_BOUNDARY = constants.DATASET_DIR + '/models/decision_boundary.png'

if(typeof module !== 'undefined'){
    module.exports = constants;
}