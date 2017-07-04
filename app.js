    const express = require('express'), //express 框架 
        wechat = require('./wechat/wechat'),
        config = require('./config'); //引入配置文件
    const path = require('path');

    var router = express.Router();
    //实例 express
    var app = express();
    app.use(express.static(path.join(__dirname, 'public')));
    var wechatApp = new wechat(config); //实例wechat 模块

    //用于处理所有进入 3000 端口 get 的连接请求
    app.get('/', function(req, res) {
        wechatApp.auth(req, res);
    });

    //用于请求获取 access_token
    app.get('/getAccessToken', function(req, res) {
        wechatApp.getAccessToken().then(function(data) {
            res.send(data);
        });
    });

    router.get('/index', function(req, res) {
        res.sendfile('index.html');
    });
    //用于处理所有进入 3000 端口 post 的连接请求
    app.post('/', function(req, res) {
        wechatApp.handleMsg(req, res);
    });


    //监听3000端口
    app.listen(3000);