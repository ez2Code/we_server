var moveJokeTask = require('./moveJokeTask');

var startJobs = function () {
    moveJokeTask.move();
};

module.exports.startJobs = startJobs;