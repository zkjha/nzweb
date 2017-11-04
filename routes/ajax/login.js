var express = require('express');
var router = express.Router();
var fs = require('fs');

var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//登录界面
router.post("/login",function (req,res,next) {
    // fs.readFile("d:/js/2.txt",function (err,data) {
    //     console.log(err);
    //     console.log(data);
    // })

    if(!req.body.username){
        return
    }
    if(!req.body.password){
        return
    }
    var username = req.body.username;
    var  option = [req.body.username,req.body.password];
    console.log("111");
    icePost.login(option).then(function (data) {
        if(data.code == 0 ){
            //登录成功
            var userName = req.body.username;
            var hash = session.hashPW(userName,req.body.password);
            session.userInfo[userName] = hash;
            res.cookie("cache",{username:userName,hash:hash},{maxAge: 6000000});
        }
        data.username = username;
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    })

});

module.exports = router;