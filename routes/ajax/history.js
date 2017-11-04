var express = require('express');
var router = express.Router();
var fs = require("fs");

var icePost = require("../util/hello/Client.js");

var session = require("../util/session");

var ejsExcel  = require("ejsexcel");



//历史记录
router.post("/list",function (req,res,next) {
    var pageSize = req.body.pageSize||-1;
    var pageNum = req.body.pageNum||-1;
    var name = req.body.name;
    var group = req.body.group||-1;
    var employeenum = req.body.employeenum||"";
    var type = req.body.type||-1;
    var personid = req.body.personid||-1;
    var startTime = req.body.startTime||"";
    var endTime = req.body.endTime||'';
    var idNum = req.body.idNum||"";

    try{
        icePost.getHistoryList([name,employeenum,idNum,group,type,startTime,endTime,personid,pageNum,pageSize]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (e){
        console.log(e);
        res.send({code:-1});
    }
    // console.log("222");
    // res.send({code:0,hisacrds:[
    //     {
    //         url:'/static/images/4.jpg',
    //         time:"2017-10-2",
    //         type:'1',
    //         id:"22"
    //     },
    //     {
    //         url:'/static/images/5.jpg',
    //         time:"2017-10-3",
    //         type:'0',
    //         id:"242"
    //     }
    // ]})
    // try {
    //     icePost.getHistoryList([name,startTime,endTime,department]).then(function (data) {
    //         res.send(data);
    //     }).catch(function (err) {
    //         console.log(err);
    //         res.send({code:-1})
    //     })
    // }catch (err){
    //     console.log(err);
    //     res.send({code:-1});
    // }

});
//删除历史记录
router.post("/delete",function (req,res,next) {
    var id = req.body.id||-1;
    // res.send({code:0});
    try {
        icePost.deleteHistory(id).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (err){
        console.log(err);
        res.send({code:-1});
    }

});


//考勤导出列表
router.post("/checkWorkExcel",function (req,res,next) {
    var name = req.query.name||'';
    var employeenum = req.query.employeenum||'';
    var startTime = req.query.startTime||"";
    var endTime = req.query.endTime||'';
    var department = req.query.department||-1;
    var type = req.query.type;

    try{
        icePost.getCheckWorkHistoryList({
            type:type,
            arr:[name,employeenum,department,startTime,endTime]
        }).then(function (data) {
            // console.log(data);
            if(data.code == 0){
                var dataList = data.aaqlist||[];
                var exlBuf = fs.readFileSync("./checkWork.xlsx");
                var name = new Date().getTime();
                ejsExcel.renderExcel(exlBuf, dataList).then(function(exlBuf2) {

                    res.set({
                                'Content-Type': 'application/octet-stream',
                                'Content-Disposition': 'attachment; filename='+name+'.xlsx'
                            });
                    res.send(exlBuf2)
                }).catch(function(err) {
                    console.error(err);
                });
            }
            // res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (e){
        console.log(e);
        res.send({code:-1});
    }

});
//导出列表
router.post("/historyExcel",function (req,res,next) {
    var pageSize = -2;
    var pageNum = req.body.pageNum||-1;
    var name = req.query.name||'';
    var group = req.query.group||-1;
    var employeenum = req.query.employeenum||"";
    var type = req.query.type||-1;
    var personid = req.query.personid||-1;
    var startTime = req.query.startTime||"";
    var endTime = req.query.endTime||'';
    var idNum = req.query.idNum||"";

    try{
        icePost.getHistoryList([name,employeenum,idNum,group,type,startTime,endTime,personid,pageNum,pageSize]).then(function (data) {
            console.log(data);
            if(data.code == 0){
                var dataList = data.hisacrds||[];
                var exlBuf = fs.readFileSync("./history.xlsx");
                var name = new Date().getTime();
                ejsExcel.renderExcel(exlBuf, dataList).then(function(exlBuf2) {

                    res.set({
                                'Content-Type': 'application/octet-stream',
                                'Content-Disposition': 'attachment; filename='+name+'.xlsx'
                            });
                    res.send(exlBuf2)
                }).catch(function(err) {
                    console.error(err);
                });
            }
            // res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (e){
        console.log(e);
        res.send({code:-1});
    }

});

//考勤记录列表
router.post("/checkWorkList",function (req,res,next) {
    var pageSize = req.body.pageSize||-1;
    var pageNum = req.body.pageNum||-1;
    var name = req.body.name||'';
    var employeenum = req.body.employeenum||'';
    var startTime = req.body.startTime||"";
    var endTime = req.body.endTime||'';
    var department = req.body.department||-1;
    var type = req.body.type;

    try{
        icePost.getCheckWorkHistoryList({
            type:type,
            arr:[name,employeenum,department,startTime,endTime,pageNum,pageSize]
        }).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-1});
        })
    }catch (e){
        console.log(err);
        res.send({code:-1})
    }
});


//设置黑白名单
router.post("/setGroup",function (req,res,next) {
    var id = req.body.id||-1;
    var group = req.body.group||-1;

    try{
        icePost.setGroupByHistory([id,group]).then(function (data) {
            res.send(data);
        },function (err) {
            console.log(err);
            res.send({code:-1});
        })
    }catch (e){
        console.log(err);
        res.send({code:-1})
    }
});
module.exports = router;