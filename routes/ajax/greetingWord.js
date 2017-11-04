var express = require('express');
var router = express.Router();


var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//迎宾词语列表
router.post("/list",function (req,res,next) {
    try {
        icePost.getGreetingWordList().then(function (data) {
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
    var type = req.body.type||-1;
    var greetingWord = req.body.greetingWord;
    var weleordid = req.body.weleordid||-1;

    try {
        icePost.addGreetingWord([type,greetingWord,weleordid]).then(function (data) {
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

    var weleordid = req.body.id||-1;

    try {
        icePost.deleteGreetingWord(["","",weleordid]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
        })
    }catch (err){
        console.log(err);
    }

});

module.exports = router;