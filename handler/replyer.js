var xml2js = require('xml2js');

var reply = function(res,jsonObj){
	var obj = {'xml':jsonObj};
	var builder = new xml2js.Builder();
	var xml = builder.buildObject(obj);
	xml = xml.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
	res.end(xml);
}


module.exports.reply = reply;