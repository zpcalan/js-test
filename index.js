var http = require('http');
var server = http.createServer();

var express=require('express')
var app=express()
app.use(express.static('public'))
var server = app.listen(8088, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});