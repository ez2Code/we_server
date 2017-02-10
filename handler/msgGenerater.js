
var generateTextMsg = function (fromUser,me,content){
	var resultJson = {'FromUserName':me,'ToUserName':fromUser,'MsgType':'text',
		'CreateTime':new Date().getTime(),'Content':content};
	return handleJson(resultJson);
}

function handleJson(data){
	for(key in data){
		if(key!='CreateTime'){
			data[key] = '<![CDATA['+data[key]+']]>';
		}
	}
	return data;
}

module.exports.generateTextMsg = generateTextMsg;