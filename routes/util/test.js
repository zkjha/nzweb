
var Stream = require('node-rtsp-stream');

var express = require('express');
var router = express.Router();
var fs = require('fs');

var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//登录界面
router.get("/",function (req,res,next) {
    // fs.readFile("d:/js/2.txt",function (err,data) {
    //     console.log(err);
    //     console.log(data);
    // })
    stream = new Stream({
        name: 'name',
        streamUrl: 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov',
        wsPort: 9999
    });

    console.log(stream);

});

module.exports = router;