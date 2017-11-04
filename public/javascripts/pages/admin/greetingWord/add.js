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

                    //获取相应的类型
                    var type = $("#type").val();

                    //获取相应的迎宾词
                    var greetingWord = $("#greetingWord").val();


                    if(!type){
                        alert("请选择适用人群");
                        return
                    }
                    if(!greetingWord){
                        alert("请输入迎宾词！！");
                        return
                    }


                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxGreetingWord/add',
                        data:{
                            type:type,
                            // password:password,
                            greetingWord:greetingWord,
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/greetingWord/list";
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