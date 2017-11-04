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
                    var name = $("#name").val();
                    var CamIp = $("#CamIp").val();
                    // var password = $("#password").val();
                    var address = $("#address").val();
                    if(!CamIp){
                        alert("请输入网络摄像头ip地址");
                        return
                    }
                    // if(!password){
                    //     alert("请输入网络摄像头密码");
                    //     return
                    // }
                    if(!name){
                        alert("请输入名称");
                        return
                    }
                    if(!address){
                        alert("请输入地址");
                        return
                    }
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCamera/add',
                        data:{
                            name:name,
                            // password:password,
                            CamIp:CamIp,
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
        }

        Add.init();


    });