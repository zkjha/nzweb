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
                //初始化图片上传插件节点
                // Add.initWebuploader();
                Add.event();
                // Add.changeLan();
                // Add.initView();

            },
            event: function () {
                //新增按钮点击事件
                $("#addbutton").on("click",function () {
                    //获取相应的值
                    var usernam = $("#usernam").val();
                    var password = $("#password").val();
                    var authority = $("#authority").val();
                    if(!usernam){
                        alert("请输入用户名");
                        return
                    }
                    if(!password){
                        alert("请输入密码");
                        return
                    }
                    if(!authority){
                        alert("请选择权限");
                        return
                    }
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxManager/add',
                        data:{
                            usernam:usernam,
                            password:password,
                            authority:authority
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/manager/list";
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