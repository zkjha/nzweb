// **********************************************************************
//
// Copyright (c) 2003-2016 ZeroC, Inc. All rights reserved.
//
// **********************************************************************

var Ice = require("ice").Ice
// var Demo = require("./Hello").Demo;
var Demo = require("./WEBAPI").WebAPI;


Ice.MessageSizeMax = 204800;
var id = new Ice.InitializationData();
id.properties = Ice.createProperties();
id.properties.setProperty('Ice.MessageSizeMax', 204800);

var communicator;
// communicator = Ice.initialize(process.argv,id);
communicator = Ice.initialize(id);
// communicator.prototype.setProperty('Ice.MessageSizeMax', 2048)
// Ice.MessageSizeMax=2048;
// var proxy = communicator.stringToProxy("hello:default -h 192.168.2.220 -p 10000").ice_twoway().ice_secure(false);
// var proxy = communicator.stringToProxy("faceshow:default -h 192.168.2.220 -p 10000");
var proxy = communicator.stringToProxy("faceshow:default -h 192.168.2.106 -p 10000");



function common(method,params) {
    return new Promise(function (resolve,reject) {
        Demo.FaceShowPrx.checkedCast(proxy).then(function (twoway) {
            twoway[method](params).then(function (data) {
                console.log(data);
                resolve(data);
            },function (err) {
                console.log(err);
                reject(err);
            })
        })
    })
}


//公共参数转json
function changeJson(params) {
    if(typeof  params == "object"){
        return JSON.stringify(params);
    }else{
        return params
    }
}


function changeParam(param,structs) {
    for(var i=0;i<param.length;i++){
        param[i] = "'"+param[i]+"'";

    }
    var str = "new Demo."+structs+"(";
    str += param.join(",");
    str +=")";
    console.log(str);
    return  eval(str);
}

var test = {




    //登录查询
    login:function (params) {
        var demo= new Demo.Account(params[0],params[1]);

        return common("AccountCheck",demo);
        // return new Promise(function (resolve, reject) {
        //     var demo= new Demo.Account(params[0],params[1]);
        //     Demo.FaceShowPrx.checkedCast(proxy).then(function (twoway) {
        //         twoway.AccountCheck(demo).then(function (data,data1) {
        //             resolve(data1);
        //         },function (err) {
        //             reject(err);
        //         })
        //     })
        // })
    },






    //权限查询
    managerList:function (param) {
        return common("AccountQuery");
    },
    //新增管理员
    addManager:function(param){
        var params = changeParam(param,"Account");
        return common("AccountAdd",params);
    },






    //公司信息管理
    //由于公司名称，部门，职位三个接口功能相似，接口公用
    // y用type来区分不同的类别
    //新增公司信息
    addCompanyInfo:function (param) {
        var type = param.type;
        var methods =["CompanyAdd","DeptAdd","PositAdd"];
        console.log(methods[type]);
        console.log(param.arr);
        return common(methods[type],param.arr);
    },
    //删除公司信息
    deleteCompanInfo:function (param) {
        var type = param.type;
        var methods =["CompanyDelete","DeptDelete","PositDelete"];
        console.log(methods[type]);
        console.log(param.arr);
        return common(methods[type],param.arr);
    },
    //获取公司信息
    companyList:function (param) {
        var type = param.type;
        var methods =["CompanyQuery","DeptQuery","PositQuery"];
        return common(methods[type]);
    },






    //考勤规则制定
    //新增
    addRule:function (param) {
        var params = changeParam(param,"AttendRuleInfo");
        return common("AttendRuleAdd",params);
    },
    //获取列表
    getRuleList:function (param) {
        var params = changeParam(param,"AttendRuleInfo");
        return common("AttnedRuleQuery",params);
    },
    //删除规则
    deleteRule:function (param) {
        var params = changeParam(param,"AttendRuleInfo");
        return common("AttnedRuleDelete",params);
    },
    //修改规则
    changeRule:function (param) {
        var params = changeParam(param,"AttendRuleInfo");
        return common("AttnedRuleModefy",params);
    },








    //修改密码
    changePassword:function (param) {
        var params = changeParam(param,"Account");
        return common("AccountModefy",params);
    },


    //删除管理员
    deleteManager:function (param) {
        var params = changeParam(param,"Account");
        return common("AccountDelete",params);
    },

    //摄像头列表
    cameraList:function (param) {
        var params = changeParam(param,"CamInfo");
        return common("CamQuery",params);
    },

    //新增摄像头
    addCamera:function (param) {
        var params = changeParam(param,"CamInfo");
        return common("CamAdd",params);
    },

    //删除摄像头
    deleteCamera:function (param) {
        var params = changeParam(param,"CamInfo");
        return common("CamDelete",params);
    },

    //获取详细信息
    getDetail:function (param) {
        var params = changeParam(param,"CamInfo");
        return common("SigCamQuery",params);
    },

    //修改摄像头信息
    changeCameraInfo:function(param){
        var params = changeParam(param,"CamInfo");
        return common("SigCamQuery",params);
    },
    //开关摄像头
    changeStatus:function (param,type) {
        var params = changeParam(param,"CamInfo");
        if(type == 0){
            return common("ChkCamStop",params);
        }else if(type == 1){
            return common("ChkCamStart",params);
        }else{
            return null;
        }
    },







    //人员信息管理列表
    getUserInfoList:function (param) {
      var pararms = changeParam(param,"FileInfo");
      return common("PicQuery",pararms);
    },
    //删除人员信息
    deleteUserInfo:function (param) {
        var params = changeParam(param,"PersonIdType")
        return common("PicDelete",param);
    },
    //获取单个员工的详细信息
    getUserInfoDetail:function (param) {
        return common("",param);
    },
    //上传人员图片及信息
    unloadTest:function (param) {

        var params = new Demo.FileInfo(param[0],param[1],param[2],param[3],param[4],
            param[5],param[6],param[7],param[8],param[9],param[10],param[11],param[12],param[13],param[14],param[15],param[16]);

        return common("PicUpload",params);
    },

    //updateImg
    updateImg:function (param) {
        var params = new Demo.Mpic(param[0],param[1],param[2]);

        return common("PicUpdate",params);
    },
    //修改用户信息
    updateUserInfo:function (param) {
        var params = changeParam(param,"PersonInfo");
        return common("PicModefy",params);
    },






    //历史记录列表
    getHistoryList:function (param) {
        var params = changeParam(param,"HisInfo");
        return common("HistoryQuery",params);
    },
    //删除历史记录
    deleteHistory:function (param) {
        // var params = changeParam(param,"HisInfo");
        return common("HistoryDelete",param);
    },
    //考勤记录表
    getCheckWorkHistoryList:function (param) {
        // type:0正常状态,1为异常考勤状态
        var params = changeParam(param.arr,"AAQueryInfo");
        return common(param.type == 1?"AbAttenAccordQuery":"AttenAccordQuery",params);


    },
    //设置黑白名单
    setGroupByHistory:function (param) {
        var params = changeParam(param,"GroupModefy");
        return common("HistoryGroup",params);
    },





    //前端展示获取识别信息的接口
    getUserName:function (param) {
        var params = changeParam(param,"CamInfo");
        return common("ChkRsltQuery",params)
    },





    //迎宾词语相应接口
    getGreetingWordList:function (param) {

        return common("WelWordQuery");
    },
    addGreetingWord:function (param) {
        var params = changeParam(param,"WWInfo");
        return common("WelWordAdd",params);
    },
    deleteGreetingWord:function (param) {
        var params = changeParam(param,"WWInfo");
        return common("WelWordDelete",params);
    },




    //会议相关接口
    //新增会议
    addMeeting:function (params) {
        var param = changeJson(params);
        return common("AddConference",param);
    },
    //会议列表
    MeetingList:function (params) {
        var param = changeJson(params);
        return common("QueryConfInfo",param);
    },
    //获取单个会议的所有参会人员
    meetingMenberManage:function (params) {
        return common("QueryConfInfo",params);
    }




}
module.exports = test;