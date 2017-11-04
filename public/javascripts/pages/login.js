require.config({
    baseUrl:"/static/javascripts",
    shim:{
        "lib/requstUtil":{
            deps:['lib/jquery']
        },
        "lib/jqueryPage":{
            deps:['lib/jquery']
        },
        "lib/bootstrap":{
            deps: ['lib/jquery']
        }
    }
});
requirejs(["lib/jquery","lib/requstUtil","lib/jqueryPage","lib/bootstrap"],
    function ($,requstUtil) {
        var login = {
            init:function () {
                login.event();
            },
            event:function () {
                //监听登录点击事件
                $("#loginBtn").on("click",function () {
                   login.loginMethod();
                });
                //监听输入框点击输入事件，改变其样式
                $(".bgColor>input").on("focus",function () {
                    console.log("22");
                    var that = $(this).parent();
                    var div = $(that).children("div");
                    var input = $(that).children("input");
                    $(div).css({
                        border:"1.5px solid #006fc3",
                        'border-right':'none'
                    });
                    $(input).css({
                        border:"1.5px solid #006fc3",
                        'border-left':'none'
                    });
                })
                //监听输入框点击输入事件，改变其样式
                $(".bgColor>input").on("blur",function () {
                    var that = $(this).parent();
                    var div = $(that).children("div");
                    var input = $(that).children("input");
                    $(div).css({
                        'border':'none'
                    });
                    $(input).css({
                        border:"none"
                    });
                })

                //监听密码框回车事件
                $("#password").on("keypress",function (e) {
                    if(e.charCode == 13){
                        login.loginMethod();
                    }
                })


            },
            loginMethod:function () {
                var username = $("#username").val();
                var password = $("#password").val();
                if(!username){
                    alert("请输入用户名!!");
                    return
                }
                if(!password){
                    alert("请输入密码!!");
                    return
                }
                requstUtil.request({
                    url:'/admin/ajaxLogin/login',
                    data:{
                        username:username,
                        password:password
                    },
                    callback:function (data) {
                        if(data.code == 0){
                            //登录成功
                            location.href = "/admin/hasLogin/main?"+data.username;
                        }else if(data.code == -1 ||data.code == -2){
                            alert("用户名或密码错误");
                            return
                        }else{
                            alert("系统错误");
                            return;
                        }
                    }
                });
            },

        };
        login.init();
    })