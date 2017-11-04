require.config({
    baseUrl:"/static/javascripts",
    paths:{
        "lib/jquery":"lib/jquery"
    },
    shim:{
        "lib/jquery":{
            deps:[],
            exports:"lib/jquery"
        },
        "lib/requstUtil":{
            deps:['lib/jquery']
        },

        "lib/bootstrap":{
            deps: ['lib/jquery']
        }
    }
});
requirejs(["lib/jquery","lib/requstUtil","lib/bootstrap"],
    function ($,requstUtil) {
        var List = {
            init:function () {

                List.event();
                List.getPage(1)
            },
            event:function () {

                //新增按钮点击事件
                $("#addGroup").on("click",function () {
                    location.href = "/admin/hasLogin/greetingWord/add";
                });
                //点击删除按钮事件
                $("#j_body").on("click",".iIsDelete",function () {
                    var dataId = $(this).attr("data-id");
                    requstUtil.request({
                        url:"/admin/hasLogin/ajaxGreetingWord/delete",
                        data:{
                            id:dataId
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("删除成功");
                                location.href="/admin/hasLogin/greetingWord/list";
                            }else{
                                alert("删除失败");
                                return;
                            }
                        }
                    })
                })







            },
            getPage:function (nowPage) {
                var option = {
                    pageSize:10,
                    pageNumber:nowPage
                }
                List.nowPage = nowPage;
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxGreetingWord/list',
                    data:{},
                    callback:function (data) {
                        if(data.code == 0){
                            console.log(data.data);
                            List.createElement(data);
                        }else{
                            // alert(data.msg);
                            return
                        }
                    }
                });
            },
            createElement:function (dataList) {

                var list = dataList.welcowords;
                var str = "<tr>";
                for(var i = 0,l=list.length;i<l;i++){
                    var data = list[i]||{};
                    var dataId = data.weleordid||'';//用户id
                    str +="<td class='colorSpan_td lineheight50'><span class='colorSpan_blue i18n lineheight50' data-title=''>";
                    str = List.createTypeByUser(data.type,str);
                    str+="</span></td>";
                    str  += "<td>"+data.welcword+"</td>";
                    str += "<td style='text-align: center' class='colorSpan_td lineheight50'>" +
                        "<span class='btn action_span iIsDelete i18n lineheight50' data-title='' data-id='"+dataId+"'>删除</span>" +
                        "</td>";

                }
                str += "</tr>";
                console.log(str);
                $("#j_body").html(str);


            },
            createTypeByUser:function (type,str) {
                var types = {
                    0:"员工",
                    1:"",
                    2:"访客"
                }
                str += types[type];
                return str;
            }
        };
        List.init();
    })