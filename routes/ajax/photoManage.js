var express = require('express');
var router = express.Router();
var fs = require('fs');


var icePost = require("../util/hello/Client.js");

var session = require("../util/session");


//上传图片
router.post("/add",function (req,res,next) {
    var IDnumber = req.query.IDnumber||'';
    var birthDay = req.query.brithDay||'';
    var comeDay = req.query.comeDay||'';
    var filetype = req.query.filetype||-1;
    var jobNumber = req.query.jobNumber||'';
    var persontype = req.query.persontype||-1;
    var sex = req.query.sex||-1;
    var username = req.query.username||'';
    //comeTime,group,company,city,addr,position,attendance,department
    var comeTime = req.query.comeTime||"";
    var group = req.query.group||-1;
    var company = req.query.company||-1;
    var city = req.query.city||"";
    var addr = req.query.addr||"";
    var position = req.query.position||-1;
    var attendance = req.query.attendance||-1;
    var department = req.query.department||-1;

    // Buffer.prototype.toByteArray = function () {
    //     return Array.prototype.slice.call(this,0);
    // }
    var file = req.body.file;
    var chunk =[];
    req.on("data",function (data) {
        chunk.push(data);
    });
    req.on("end",function () {
        console.log("over");
        // console.log(chunk);
        var datas =  Buffer.concat(chunk);
        // console.log(datas.toString());

        var rems = [];
        for(var i=0;i<datas.length;i++){
            var v = datas[i];
            var v2 = datas[i+1];
            if(v==13 && v2==10){
                rems.push(i);
            }
        }
        var picmsg_1 = datas.slice(rems[0]+2,rems[1]).toString();

        var filename = picmsg_1.match(/name=".*"/g)[0].split('"')[1];


        var nbuf = datas.slice(rems[3]+2,rems[rems.length-2]);//图片数据
        // console.log(nbuf);
        var name = new Date().getTime();
        // fs.writeFile(name+".jpg",nbuf);
        // console.log(filetype);
        console.log([nbuf,filetype,persontype,username,sex,birthDay,IDnumber,jobNumber,comeDay,comeTime,group,company,city,addr,position,attendance,department]);


        try {
            icePost.unloadTest([nbuf,filetype,persontype,username,sex,birthDay,IDnumber,jobNumber,comeDay,comeTime,group,company,city,addr,position,attendance,department]).then(function (data) {

                console.log(data);
                var text = ""+data.code;

                res.send({code:data.code});
            }).catch(function (err) {
                console.log(err);
                res.send({code:-1})
            })
        }catch (err){
            console.log(err);
            res.send({code:-1})
        }


    })



});
//获取当前页面的数据
router.post("/list",function (req,res,next) {
    var type = req.body.type;
    var username = req.body.username;
    var gender = req.body.gender||-1;
    var idNum = req.body.idNum;
    var group = req.body.group||-1;//黑白名单
    var company = req.body.company||-1;//公司名
    var city = req.body.city||"";//城市
    var addr = req.body.addr||"";//位置
    var position = req.body.position||-1;//职位
    var attendance = req.body.attendance||-1;//考勤规则
    var department = req.body.department||-1;//部门
    try {
        icePost.getUserInfoList(["","",type,username,gender,"",idNum,"","","",group,company,city,addr,position,attendance,department]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (err){
        console.log(err);
        res.send({code:-1})
    }

});
//删除员工信息
router.post("/delete",function (req,res,next) {
    var personid = req.body.personid||-1;
    var persontype = req.body.persontype||-1;
    try {
        icePost.deleteUserInfo([1,0]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (err){
        console.log(err);
        res.send({code:-1})
    }

});
//获取员工信息详情
router.post("/getDetail",function (req,res,next) {
    var personid = req.body.personid;
    var type = req.body.type;
    try {
        icePost.getUserInfoList(["","",type,"",-1,"","","","","",-1,-1,"","",-1,-1,-1]).then(function (data) {
            var list = data.infolist;
            var datas = ""
            for(var i = 0;i<list.length;i++){
                var detailData = list[i];
                if(detailData.personid == personid){
                    datas = detailData
                }
            }
            res.send({code:0,data:datas});
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (err){
        console.log(err);
        res.send({code:-1})
    }

});
router.post("/change",function (req,res,next) {


    var personid = req.body.personid;
    var type = req.body.type;
    var userName = req.body.userName;
    var gender = req.body.gender||-1;
    var IDnumber = req.body.IDnumber;
    var jobNumber = req.body.jobNumber;
    var brithDay = req.body.brithDay;
    var comeDay = req.body.comeDay;

    //
    var comeTime = req.body.comeTime||"";
    var group = req.body.group||-1;
    var company = req.body.company||-1;
    var city = req.body.city||"";
    var addr = req.body.addr||"";
    var position = req.body.position||-1;
    var attendance = req.body.attendance||-1;
    var department = req.body.department||-1;
    /*
	string picdirect; //图片路径
	string entrydate; //下面的定义参见上面
	int group;
	string company;
	string city;
	string addr;
	string position;
	string attendancerule;
	string department;
	int companyid;
	int positionid;
	int attendanceid;
	int departmentid;*/
    try {
        icePost.updateUserInfo([type,personid,userName,gender,brithDay,IDnumber,jobNumber,comeTime,"",comeDay,group,"",city,addr,"","","",
            company,position,attendance,department]).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            res.send({code:-1})
        })
    }catch (err){
        console.log(err);
        res.send({code:-1})
    }

});
//更新图片信息
router.post("/updateImg",function (req,res,next) {
    var personid = req.query.personid;
    var persontype = req.query.persontype;
    var chunk =[];
    req.on("data",function (data) {
        chunk.push(data);
    });
    req.on("end",function () {
        console.log("over");
        // console.log(chunk);
        var datas =  Buffer.concat(chunk);
        // console.log(datas.toString());

        var rems = [];
        for(var i=0;i<datas.length;i++){
            var v = datas[i];
            var v2 = datas[i+1];
            if(v==13 && v2==10){
                rems.push(i);
            }
        }
        // console.log(datas.toString());
        var picmsg_1 = datas.slice(rems[0]+2,rems[1]).toString();

        var filename = picmsg_1.match(/name=".*"/g)[0].split('"')[1];


        var nbuf = datas.slice(rems[3]+2,rems[rems.length-2]);//图片数据
        console.log(personid)

        try {
            icePost.updateImg([personid,persontype,nbuf]).then(function (data) {

                console.log(data);
                console.log("11");
                var text = ""+data.code;
                console.log(text);
                // res.send(data);
                res.end();
                ;
            }).catch(function (err) {
                console.log(err);
                res.send({code:-1})
            })
        }catch (err){
            console.log(err);
            res.send({code:-1})
        }


    })

});

module.exports = router;