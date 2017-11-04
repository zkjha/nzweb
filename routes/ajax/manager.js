var express = require('express');
var router = express.Router();


var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//摄像头列表
router.post("/list",function (req,res,next) {
    try {
        icePost.managerList().then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//新增管理员
router.post("/add",function (req,res,next) {
    var usernam = req.body.usernam;
    var password = req.body.password;
    var authority = req.body.authority;

    try {
        icePost.addManager([usernam,password,authority,"1"]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//修改密码
router.post("/changePassword",function (req,res,next) {
    var usernam = req.body.usernam;
    var password = req.body.password;

    try {
        icePost.changePassword(["",password,"",usernam]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//删除管理员
router.post("/deleteManager",function (req,res,next) {
    var userId = req.body.userId;

    try {
        icePost.deleteManager(["","","",userId]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});

module.exports = router;