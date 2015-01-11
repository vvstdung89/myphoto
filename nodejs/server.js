var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;


function processPost(request, response, callback) {
    var result = '';
    if(request.method == 'POST') {
        if (request.url == '/upload.php'){
            request.on('data', function(data) {
                console.log(data);
            });
        }
        callback(result);
    }
}


function processGet(request, response, callback) {
    var result = '';
    if(request.method == 'GET') {
        if (request.url == '/image'){
            files = fs.readdirSync("/var/www/html/myphoto/data");
            console.log(files);
            for(var i = 0; i <files.length; i++) {
                result = result + "'"+files[i]+ "',";
            }
        }
        callback(result);
    }
}

http.createServer(function(request, response) {
    
    if (request.method == "GET"){
        processGet(request, response, function(data) {
            response.writeHead(200, "OK", {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'} );
            response.end(data);
        });
    }   

    if(request.method == 'POST') {
        processPost(request, response, function(check) {
            // Use request.post here
            response.writeHead(200, "OK", {'Content-Type': 'text/plain','Access-Control-Allow-Origin':'*'} );
            response.end(check);
        });
    }

}).listen(8080);