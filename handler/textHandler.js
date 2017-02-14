var msgGenerater = require('./msgGenerater');
var jokeHandler = require('./jokeHandler');
var weatherHandler = require('./weatherHandler');
var replyer = require('./replyer');
var config = require('../config/config');

var handle = function(res,msgData){
	var content = msgData.Content[0];
	var msgContent ='';

	function handleResult(data){
		var fromUser = msgData.FromUserName[0];
		var me = msgData.ToUserName[0];
		var resultJson = msgGenerater.generateTextMsg(fromUser,me,data);
		replyer.reply(res,resultJson);
	}
	if(content=='网盘'){
        handleResult(config.diskPath);
    }else if(content.indexOf('天气')>-1){
		weatherHandler.handle('chengdu',handleResult);
	}else if(content.indexOf('笑话')>-1||content.indexOf('段子')>-1){
        jokeHandler.handle(handleResult);
	}
	else{
		msgContent = 'Sorry! I can\'t understand you. You can input 『天气』 to check the weather or 『笑话』 to get a fun story.';
		handleResult(msgContent);
	}
};

module.exports.handle = handle;