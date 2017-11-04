/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var icePost = require("../util/hello/Client.js");
var socket = require("../util/socket");

//前台展示页面
router.get('/', function(req, res, next) {
    res.render('show/showWeb',
        {
            title:	'nztd',
            type:3
        }
    );
});

//获取所有图片
router.post('/getAllUserInfo', function(req, res, next) {
    var data = {
        code:0,
        list:[{
            id:"1",
            url:"/static/images/4.jpg"
        },{
            id:"2",
            url:"/static/images/5.jpg"
        },{
            id:"3",
            url:"/static/images/8.jpg"
        },{
            id:"4",
            url:"/static/images/7.jpg"
        },{
            id:"5",
            url:"/static/images/9.jpg"
        },{
            id:"6",
            url:"/static/images/login.jpg"
        },]
    }
    res.send(data);
});
//获取所以摄像头信息
router.post('/getAllCamInfo', function(req, res, next) {
    try {
        icePost.cameraList(["","","","","",1,-1]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1});
        })
    }catch (err){
        console.log(err);
        res.send({code:-1});
    }
});

//获取来访的客户
router.post('/getShowUsers', function(req, res, next) {
    // setInterval(function () {
    //     socket.emit({"name":'connected',value:{name:1}})
    // },3000);

    //
    // var camids = req.body.camid;
    // var rsltnums = req.body.rsltnum;
    // var currentRsltnums = "";
    // var timer = function (camids,rsltnums) {
    //     var time = setTimeout(function () {
    //         clearTimeout(time);
    //         getShowData(camids,rsltnums)
    //     },1000)
    // }
    // var getShowData = function (camid,rsltnum) {
    //     icePost.getUserName(['','',camid,'','',rsltnum]).then(function (data) {
    //         // console.log({data:data,val:"234"});
    //         if(data.code == 0){
    //             socket.emit(data);
    //             currentRsltnums = data.chkrslt&&data.chkrslt.rsltnum;
    //             console.log(currentRsltnums);
    //             // getShowData(camids,currentRsltnums);
    //             timer(camids,currentRsltnums);
    //         }else if(data.code == -1){
    //                 console.log(currentRsltnums);
    //                 // getShowData(camids,currentRsltnums);
    //                 timer(camids,currentRsltnums);
    //         }else if(data.code =-5){
    //             //number 可用
    //             currentRsltnums = data.chkrslt.rsltnum;
    //             // getShowData(camids,currentRsltnums);
    //             timer(camids,currentRsltnums);
    //         }
    //     }).catch(function (err) {
    //         console.log(err);
    //         // getShowData(camid,rsltnum);
    //         timer(camid,rsltnum);
    //     });
    // }
    //
    // try {
    //     // getShowData(camids,rsltnums);
    //     timer(camids,rsltnums);
    // }catch (err){
    //     console.log(err);
    //     // getShowData(camids,rsltnums);
    //     timer(camids,rsltnums)
    // }

    var data = {
        code:0,
        list:[{
            id:"1",
            url:"/static/images/4.jpg",
            name:"张三丰",
            type:"0"
        }, {
            id: "2",
            url: "/static/images/5.jpg",
            name:"李三丰",
            type:"1"
        },{
            id:"3",
            url:"/static/images/8.jpg",
            name:"我是谁",
            type:"1"
        },{
            id:"4",
            url:"/static/images/7.jpg",
            name:"不知道",
            type:"1"
        // },{
        //     id:"5",
        //     url:"/static/images/9.jpg",
        //     name:"一个人",
        //     type:"1"
        // },{
        //     id:"6",
        //     url:"/static/images/login.jpg",
        //     name:"没有人",
        //     type:"0"
        },]
    }
    res.send(data);
});







module.exports = router;
