var express = require('express');
var router = express.Router();


var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//摄像头列表
router.post("/list",function (req,res,next) {
    var type = req.body.type||-1;
    try {
        icePost.cameraList(["","","","","",type,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//新增摄像头
router.post("/add",function (req,res,next) {
    var name = req.body.name;
    var CamIp = req.body.CamIp;
    // var password = req.body.password;
    var address = req.body.address;

    try {
        icePost.addCamera([name,CamIp,"","",address,-1,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//获取当前摄像头信息
router.post("/getDetail",function (req,res,next) {
    var camid = req.body.camid;
    try {
        icePost.getDetail(["","",camid,"","",-1,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//修改信息
router.post("/change",function (req,res,next) {
    var name = req.body.name;
    var camid = req.body.camid;
    var password = req.body.password;
    var address = req.body.address;
    try {
        icePost.changeCameraInfo([name,"",camid,password,address,-1,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//开关摄像头
router.post("/changeStatu",function (req,res,next) {

    var camid = req.body.camid;
    var type = req.body.type;
    console.log(type);
    try {
        icePost.changeStatus(["","",camid,"","",-1,-1],type).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//删除管理员
router.post("/delete",function (req,res,next) {
    var camid = req.body.camid;

    try {
        icePost.deleteCamera(["","",camid,"","",-1,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});

module.exports = router;