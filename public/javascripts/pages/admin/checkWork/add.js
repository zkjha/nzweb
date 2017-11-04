// zkj 2017/8/4
require.config({
    baseUrl:"/static/javascripts",
    shim:{
        "lib/requstUtil":{
            deps:['lib/jquery']
        },
        "lib/bootstrap":{
            deps: ['lib/jquery']
        }
    }
});
requirejs(['lib/jquery','lib/requstUtil',"lib/bootstrap"],
    function ($,requstUtil) {
        var Add = {
            init: function () {
                Add.event();

            },
            event: function () {
                //新增按钮点击事件
                $("#addbutton").on("click",function () {
                    //获取相应的值
                    var ruleName = $("#ruleId").val();//规则名称
                    var alcheckin = $("#alcheckin").val();//最早签到时间
                    var checkin = $("#checkin").val();//最晚签到时间
                    var checkout = $("#checkout").val();//最早签退时间
                    var lacheckout = $("#lacheckout").val();//最晚签退时间
                    if(!ruleName){
                        alert("请输入规则名称");
                        return
                    }
                    // if(!password){
                    //     alert("请输入网络摄像头密码");
                    //     return
                    // }
                    if(!alcheckin){
                        alert("请输入最早签到时间");
                        return
                    }
                    if(!checkin){
                        alert("请输入最晚签到时间");
                        return
                    }
                    if(!checkout){
                        alert("请输入最早签退时间");
                        return
                    }
                    if(!lacheckout){
                        alert("请输入最晚签退时间");
                        return
                    }
                    //逻辑性验证
                    var msg = Add.checkRight(alcheckin,checkin,checkout,lacheckout);
                    if(msg){
                        alert(msg);
                        return;
                    }
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCheckWork/add',
                        data:{
                            ruleName:ruleName,
                            alcheckin:alcheckin+":00",
                            checkin:checkin+":00",
                            checkout:checkout+":00",
                            lacheckout:lacheckout+":00"
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/checkWork/list";
                            }else{
                                // alert(data.msg);
                                alert("新增失败");
                                return
                            }
                        }
                    });

                })

            },
            checkRight:function (alcheckin,checkin,checkout,lacheckout) {
                var checkParams = function (params) {
                    return params.split(":");
                };
                var alcheckinArr = checkParams(alcheckin),checkinArr = checkParams(checkin),
                    checkoutArr = checkParams(checkout),lacheckoutArr = checkParams(lacheckout);
                //如果最早签到时间比最晚签到时间late，则提示错误
                if(checkinArr[0]<alcheckinArr[0]||(checkinArr[0] ==alcheckinArr[0]&&checkinArr[1]< alcheckinArr[1])){
                    return "最早签到时间不能比最晚签到时间晚！！";
                }
                //最早签退时间不能比最晚签退时间晚
                if(lacheckoutArr[0]<checkoutArr[0]||(checkoutArr[0] ==lacheckoutArr[0]&&lacheckoutArr[1]<checkoutArr[1])){
                    return "最早签退时间不能比最晚签退时间晚！！";
                }
                //最晚签到时间不能比最早签退时间晚
                // if(checkoutArr[0]<checkinArr[0]||(checkinArr[0] ==checkoutArr[0]&&checkinArr[1]< checkoutArr[1])){
                //     return "最晚签到时间不能比最早签退时间晚！！";
                // }
                return "";
            }
        }

        Add.init();


    });