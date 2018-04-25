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

server.get('/check', function(req, res) {
	var word = req.query.word;
	getWord(word, res);
});

server.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

function getWord(word, res) {
	unirest.get("https://wordsapiv1.p.mashape.com/words/" + word )
		.header("X-Mashape-Key", "qgGsAcowYfmsh1HPJGVMvXHOAzpHp19qyavjsnm2Kjvx78TQdl")
		.header("Accept", "application/json")
		.end(function (result) {
			console.log(result.status);
			console.log("_____________SEPERATE_____________");
			console.log(result.status, result.headers, result.body);
			res.send(result);
	})
}

var port = 8000;
server.listen(port, function() {
  console.log('server listening on port ' + port);
});