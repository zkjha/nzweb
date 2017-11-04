var express = require('express');
var router = express.Router();


var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//会议列表
router.post("/list",function (req,res,next) {
    try {
        icePost.MeetingList().then(function (data) {
            var datas = JSON.parse(data);
            res.send(datas);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//新增会议
router.post("/add",function (req,res,next) {
    var params = {};
    //会议名称
    params.name = req.body.name;
    //会议主题
    params.topic = req.body.topic;
    //会议地点
    params.topic = req.body.topic;
    //会议时间
    params.time = req.body.time;

    try {
        icePost.addMeeting(params).then(function (data) {
            var datas = JSON.parse(data);
            res.send(datas);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});
//获取当前会议的所有参会人员
router.post("/menberManageList",function (req,res,next) {
    var id = req.body.id||-1;

    try {
        icePost.meetingMenberManage(id).then(function (data) {
            var datas = JSON.stringify(data);
            res.send(datas);
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