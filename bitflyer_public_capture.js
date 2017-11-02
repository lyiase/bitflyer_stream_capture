var fs = require('fs');
var moment = require("moment");
var request = require('request');

setInterval(function(){
	// BTC_JPYのboardstateを取得
	request('https://api.bitflyer.com/v1/getboardstate?product_code=BTC_JPY',function(err,res,body){
		
		if (err && res.statusCode != 200){
			console.error(err);
			return;
		}
		
		message = JSON.parse(body);
		message.timestamp = moment().toISOString();
		console.log("[boradstate_BTC_JPY]","timestamp", message.timestamp);
		
		// 記録用のJSONに変換
		var data = JSON.stringify(message) + "\n";
		
		// 記録
		fs.appendFile('data/boardstate_BTC_JPY.dat', data, (err) => {
			if(err) console.log("append data fail!",err);
		});
	});
	
	// FX_BTC_JPYのboardstateを取得
	request('https://api.bitflyer.com/v1/getboardstate?product_code=FX_BTC_JPY',function(err,res,body){
		
		if (err && res.statusCode != 200){
			console.error(err);
			return;
		}
		
		message = JSON.parse(body);
		message.timestamp = moment().toISOString();
		console.log("[boradstate_FX_BTC_JPY]","timestamp", message.timestamp);
		
		// 記録用のJSONに変換
		var data = JSON.stringify(message) + "\n";
		
		// 記録
		fs.appendFile('data/boardstate_FX_BTC_JPY.dat', data, (err) => {
			if(err) console.log("append data fail!",err);
		});
	});
},1000);
