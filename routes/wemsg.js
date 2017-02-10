var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var config = require('../config/config');
var msgHandler = require('../handler/msgHandler');

router.get('/', function(req, res, next) {
	if(validateServer(req)){
		res.end(req.query.echostr);
	} else {
		res.end('fail');
	}
});

router.post('/',function(req,res){
	var response = res;
	var formData = '';
	req.on('data',function(data){
		formData += data;
	});
	req.on('end',function(){
		msgHandler.processMsg(formData,response);
	});
});

function validateServer(req){
	var token=config.token;
	var signature = req.query.signature;
	var timestamp = req.query.timestamp;
	var nonce     = req.query.nonce;
	var oriArray = new Array();
	oriArray[0] = nonce;
	oriArray[1] = timestamp;
	oriArray[2] = token;
	oriArray.sort();
    var original = oriArray.join('');
	var scyptoString=sha1(original);
	if(signature == scyptoString){
		return true;
	} else {
		return false;
	}
}

function sha1(str) {
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}

module.exports = router;