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
        var Change = {
            init: function () {
                //初始化界面信息
                Change.initView()
                
                Change.event();

            },
            event: function () {
                //修改按钮点击事件
                $("#addbutton").on("click",function () {
                    //获取相应的值
                    var name = $("#name").val();
                    var password = $("#password").val();
                    var address = $("#address").val();
                    // if(!CamIp){
                    //     alert("请输入网络摄像头ip地址");
                    //     return
                    // }
                    // if(!password){
                    //     alert("");
                    //     return
                    // }
                    // if(!name){
                    //     alert("请输入名称");
                    //     return
                    // }
                    // if(!address){
                    //     alert("请输入地址");
                    //     return
                    // }
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCamera/change',
                        data:{
                            name:name,
                            camid:Change.camid,
                            password:password,
                            address:address
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/camera/list";
                            }else{
                                // alert(data.msg);
                                return
                            }
                        }
                    });

                })

            },
            initView:function () {
                var query = location.href.split("?")[1];
                var camid = Change.camid = query.split("=")[1];
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxCamera/getDetail',
                    data:{
                        camid:camid
                    },
                    callback:function (data) {
                        if(data.code == 0){
                            console.log(data);
                            var datas = data.listrslt[0];
                            Change.initViewByData(datas);
                        }else{
                            // alert(data.msg);
                            return
                        }
                    }
                });

            },
            initViewByData:function (data) {
                $("#CamIp").val(data.CamIp);
                $("#password").val(data.password);
                $("#name").val(data.name);
                $("#address").val(data.address);
            }
        };


        Change.init();


    });