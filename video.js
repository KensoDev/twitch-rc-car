var spawn = require('child_process').spawn;
var http = require('http');

var child = spawn('/opt/vc/raspivid', ['-hf', '-w', '640', '-h', '480', '-fps', '20', '-t', '999999999', 'o', '-'])

var server = http.createServer(function(requ, res) {
  child.stdout.pipe(res);
});

server.listen(8080);

console.log("server is listening on 8080");
