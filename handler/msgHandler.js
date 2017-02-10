var textHandler = require('./textHandler');
var eventHandler = require('./eventHandler');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;

var processMsg = function (data,response){
	parseString(data, function (err, result) {
	    if(err){
	    	console.log(err);
	    }else{
	    	result = result.xml;
	    	var msgType = result.MsgType[0];
	    	switch(msgType){
	    		case 'text':{
	    			textHandler.handle(response,result);
	    			break;
	    		}
	    		case 'event':{
	    			eventHandler.handle(response,result);
	    			break;
	    		}
	    	}
	    }
	});
}

module.exports.processMsg = processMsg;
