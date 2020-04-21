const http = require("http");
const url = require("url");
const querystring = require('querystring');

http.createServer(function(req,res){
    if(req.method === "GET"){
        let queries = querystring.parse(url.parse(req.url).query);
        let callbackName = queries["callback"];        
        let obj = {tickets:"from shanghai to sydney",price:1000}
        res.end(callbackName+"("+JSON.stringify(obj)+")");
    }
}).listen(3000);