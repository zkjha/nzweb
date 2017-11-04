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
                    var ruleId = $("#ruleId").attr("value");
                    var ruleName = $("#ruleName").val();//规则名称
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
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCheckWork/change',
                        data:{
                            ruleId:ruleId,
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
                                return
                            }
                        }
                    });

                })

            },
        }

        Add.init();


    });