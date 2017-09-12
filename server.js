var http = require('http');
var querystring = require('querystring');
var request = require('request');

http.createServer(function(req, res) {
    var request_body = '';

    // 允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    //获取数据
    req.on('data', function(chunk) {
        request_body += chunk;
    });

    //发送请求并获取返回值
    req.on('end', function() {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});

        request_body = querystring.parse(request_body);
        console.log(querystring.stringify(request_body));

        request({
            url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=13',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: querystring.stringify(request_body)
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                res.end(JSON.stringify(body));
            }
            else {
                console.log("error: " + error);
            }
        });
    });
}).listen(8888);

console.log('running');