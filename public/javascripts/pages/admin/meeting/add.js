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
                    var params = {};
                    //获取会议主题
                    params.topic = $("#topic").val();

                    //获取会议名称
                    params.name = $("#name").val();
                    //会议地点
                    params.position = $("#position").val();
                    //会议日期
                    params.date = $("#date").val();
                    //会议时间
                    params.time = $("#time").val();
                    var msg = Add.checkParams(params);
                    if(msg){
                        alert(msg);
                        return
                    }
                    //将时间合并为后台所需格式
                    params.time = params.date+" "+params.time;
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxMeeting/add',
                        data:params,
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/meeting/list";
                            }else{
                                // alert(data.msg);
                                return
                            }
                        }
                    });

                })

            },
            checkParams:function (params) {
                var alertMsg = {
                    topic:"请输入会议主题!",
                    name:"请输入会议名称!",
                    position:"请输入会议地点!",
                    date:"请选择会议日期!",
                    time:"请选择会议时间！"
                },msg="";
                for(var i in params){
                    if(!params[i]){
                        msg =alertMsg[i];
                        break;
                    }
                }
                return msg;
            }
        }

        Add.init();


    });