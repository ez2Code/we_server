/**
 * Created by Levy on 2017/2/11.
 */

var schedule = require('node-schedule');
var config = require('../config/config');
var fs = require('fs')
var exec = require('child_process').exec;

var rule = new schedule.RecurrenceRule();
rule.second  = [0,10,20,30,40,50];


var moveFile = function() {
    var sourceDir = config.jokeUploadDir;
    var targetDir = config.jokeDir;
    schedule.scheduleJob(rule,function () {
        fs.readdir(sourceDir, function (err, files) {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach(function (fileName) {

                exec('mv '+ sourceDir + fileName+' '+targetDir+new Date().getTime(), function(err){
                    if(err){
                        console.error('fail to move:'+err);
                    }
                });
            })
        });
    });
};

module.exports.move = moveFile;