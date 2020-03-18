const http = require("http");
const fs = require("fs");

http
    .createServer((req, res) => {
        const { method, url } = req;
        console.log('method:', method);      
        console.log('cookie', req.headers.cookie);
        if ((method == "GET" || method == "POST") && url == "/users") {
            //第二步 服务器通过预检，发送请求
            res.setHeader("Content-Type", "application/json");           
            setHeader(res);
            res.setHeader('Set-Cookie', 'cookie1=va222;')
            res.end(JSON.stringify([{ name: "tom", age: 20 }]));
        } else if (method == "OPTIONS" && url == "/users") {
            //如果浏览器发过来的请求符合需预检的要求
            //则会向服务器发送一个方法为option的预检请求
            //以获知服务器是否允许该实际请求
            //第一步:预检请求 
            console.log("preflight");
            setHeader(res);
            res.end();
        }
    })
    .listen(3001);

function setHeader(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Headers', 'XToken,Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}
