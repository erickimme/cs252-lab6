var express = require('express');
var unirest = require('unirest');

var server = express();
server.use(express.static(__dirname));

server.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.get('/main.html?method=signup', function(req, res) {
  res.sendFile(__dirname + '/main.html');
});

server.get('/main.html?method=login', function(req, res) {
  res.sendFile(__dirname + '/main.html');
});

server.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

function getWord(word) {
	unirest.get("https://wordsapiv1.p.mashape.com/words/" + word )
		.header("X-Mashape-Key", "qgGsAcowYfmsh1HPJGVMvXHOAzpHp19qyavjsnm2Kjvx78TQdl")
		.header("Accept", "application/json")
		.end(function (result) {
			console.log(result.status, result.headers, result.body);
	});
}

// function getWord() {
// 	var tools = require('./control.js');
// 	var currWord = tools.getWord();

// 	unirest.get("https://wordsapiv1.p.mashape.com/words/" + currWord)
// 		.header("X-Mashape-Key", "qgGsAcowYfmsh1HPJGVMvXHOAzpHp19qyavjsnm2Kjvx78TQdl")
// 		.header("Accept", "application/json")
// 		.end(function (result) {
// 			console.log(result.status, result.headers, result.body);
// 	});
// }

var port = 8000;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});