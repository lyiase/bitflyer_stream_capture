var fs = require('fs');
var moment = require("moment");
var bitflyer = require('bitflyer-node');
var syncRequest = require('sync-request');

// bitflyer-API
var streaming = new bitflyer.Streaming();

// ストリーミングで約定取得
streaming.subscribeExecutions(function (err,message) {
	// エラー出力
	if(err) return console.error(err);
	console.log(
		"[execution__BTC_JPY]",
		"count", message.length,
	);
	
	// 記録用のJSONに変換
	var data = JSON.stringify(message) + "\n";
	
	// 記録
	fs.appendFile('data/execution_BTC_JPY.dat', data, (err) => {
		if(err){
			console.log("append data fail!",err);
		}
	});
});
	
// ストリーミングでTicker取得
streaming.subscribeTicker(function (err,message) {
	// エラー出力
	if(err) return console.error(err);
	console.log(
		"[ticker_____BTC_JPY]",
		"timestamp", message.timestamp,
		"ltp", message.ltp,
	);
	
	// 記録用のJSONに変換
	var data = JSON.stringify(message) + "\n";
	
	// 記録
	fs.appendFile('data/ticker_BTC_JPY.dat', data, (err) => {
		if(err){
			console.log("append data fail!",err);
		}
	});
});
	
// ストリーミングでBoard取得
streaming.subscribeBoardSnapshot(function (err,message) {
	// エラー出力
	if(err) return console.error(err);
	message.timestamp = moment().toISOString();
	console.log(
		"[boardsnap_BTC_JPY]",
		"timestamp", message.timestamp,
		"mid_price", message.mid_price,
		"asks", message.asks.length,
		"bids", message.volume,
	);
	
	// 記録用のJSONに変換
	var data = JSON.stringify(message) + "\n";
	
	// 記録
	fs.appendFile('data/board_snapshot_BTC_JPY.dat', data, (err) => {
		if(err){
			console.log("append data fail!",err);
		}
	});
});

// ストリーミングでBoard差分取得
streaming.subscribeBoard(function (err,message) {
	// エラー出力
	if(err) return console.error(err);
	message.timestamp = moment().toISOString();
	console.log(
		"[board______BTC_JPY]",
		"timestamp", message.timestamp,
		"mid_price", message.mid_price,
		"asks", message.asks.length,
		"bids", message.bids.length,
	);
	
	// 記録用のJSONに変換
	var data = JSON.stringify(message) + "\n";
	
	// 記録
	fs.appendFile('data/board_BTC_JPY.dat', data, (err) => {
		if(err){
			console.log("append data fail!",err);
		}
	});
});

