const https = require('https');
const config = require('../config/config');

var getWeather = function (location,callback){
    var opt = deepCopy(config.weatherOpt);
    opt.path += location;
    https.get(opt, function(res){
        var data = '';
        res.on('data', function(d){
            data+=d;
        });
        res.on('end',function(){
            callback(parseMsg(JSON.parse(data)));
        })

    }).on('error', function(e) {
        console.error(e);
    });
}

function parseMsg(data){
    var jsonObj = data.results[0];
    var strObj = '您好，当前所在城市为：'+jsonObj.location.name+'，';
    strObj+='白天天气：'+jsonObj.daily[0].text_day+'，夜晚天气：'+jsonObj.daily[0].text_night+'，';
    strObj+='最高温度：'+jsonObj.daily[0].high+'℃，最低温度：'+jsonObj.daily[0].low+'℃。';
    return strObj;
}

function deepCopy(p) {
    var c = {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

module.exports.handle = getWeather;
