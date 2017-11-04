var express = require('express');
var router = express.Router();
var fs = require("fs");

var icePost = require("../util/hello/Client.js");




//新增
router.post("/add",function (req,res,next) {
    //type: 0 公司,1 部门,2 职位
    var type = req.body.type;
    var name = req.body.name;
    try{
        icePost.addCompanyInfo({
            type:type,
            arr:name
        }).then(function (data) {
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
    //type: 0 公司,1 部门,2 职位
    var type = req.body.type;
    var id = req.body.id||-1;
    try{
        icePost.deleteCompanInfo({
            type:type,
            arr:id
        }).then(function (data) {
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
//获取列表信息
router.post("/list",function (req,res,next) {
    //type: 0 公司,1 部门,2 职位

    var type = req.body.type;
    try{
        icePost.companyList({
            type:type,
            arr:[]
        }).then(function (data) {
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