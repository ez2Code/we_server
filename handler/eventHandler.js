var msgGenerater = require('./msgGenerater');
var replyer = require('./replyer');


var handle = function(res,msgData){
	var event = msgData.Event[0];
	var resultJson = '';
	switch (event){
		case 'subscribe':{
			resultJson = handleSubscribe(msgData);
			break;
		}
	}
	replyer.reply(res,resultJson);
}

function handleSubscribe(msgData){
	var fromUser = msgData.FromUserName[0];
	var me = msgData.ToUserName[0];
	var resultJson = msgGenerater.generateTextMsg(fromUser,me,'hey!we appreciate your subscription!enjoy yourself!');
	return resultJson;
}

module.exports.handle = handle;