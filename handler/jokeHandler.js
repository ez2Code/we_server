/**
 * Created by Levy on 2017/2/10.
 */

var fs = require('fs');
var config = require('../config/config');
var index=0;

var getJoke = function (callback) {
    fs.readdir(config.jokeDir, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        var count = files.length;
        if(index<count-1){
            index+=1;
        }else {
            index=0;
        }
        fs.readFile(config.jokeDir+files[index],'UTF-8' ,function (err, data) {
            if (err) throw err;
            callback(data);
        });
    });
};

module.exports.handle = getJoke;