var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var server = http.createServer(ecstatic);
server.listen(8089);
console.log('http://localhost:8089');
