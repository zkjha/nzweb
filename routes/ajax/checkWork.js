var express = require('express');
var router = express.Router();
var fs = require("fs");

var icePost = require("../util/hello/Client.js");




//新增
router.post("/add",function (req,res,next) {
    var ruleName = req.body.ruleName;
    var alcheckin = req.body.alcheckin;
    var checkin = req.body.checkin;
    var checkout = req.body.checkout;
    var lacheckout = req.body.lacheckout;
    try{
        icePost.addRule([-1,ruleName,alcheckin,checkin,checkout,lacheckout,"",""]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-5});
        })
    }catch (e){
        console.log(err);
        res.send({code:-5});
    }

});

//修改
router.post("/change",function (req,res,next) {
    var ruleId = req.body.ruleId;
    var ruleName = req.body.ruleName;
    var alcheckin = req.body.alcheckin;
    var checkin = req.body.checkin;
    var checkout = req.body.checkout;
    var lacheckout = req.body.lacheckout;
    try{
        icePost.changeRule([ruleId,ruleName,alcheckin,checkin,checkout,lacheckout,"",""]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-5});
        })
    }catch (e){
        console.log(err);
        res.send({code:-5});
    }

});


//删除
router.post("/delete",function (req,res,next) {
    var id = req.body.ruleId;
    try{
        icePost.deleteRule([id,"","","","","","",""]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-5});
        })
    }catch (e){
        console.log(err);
        res.send({code:-5});
    }

});
//查询列表
router.post("/list",function (req,res,next) {
    // var type = req.body.type;
    try{
        icePost.getRuleList(["","","","","","","",""]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-5});
        })
    }catch (e){
        console.log(err);
        res.send({code:-5});
    }

});

module.exports = router;