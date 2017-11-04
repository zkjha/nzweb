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
                //获取当前会议id
                List.meetingId = location.href.split("=")[1];
                List.event();
                List.getPage(1)
            },
            event:function () {

                //新增按钮点击事件
                $("#addGroup").on("click",function () {
                    var arr = ["请输入新的公司名称","请输入新的部门名称","请输入新的职位名称"];
                    var title = arr[List.type];
                    layer.prompt({title: title, formType: 2}, function(data, index){
                        console.log(data);
                        layer.close(index);
                        if(!data){
                            layer.msg(title);
                            return
                        }
                        requstUtil.request({
                            url:"/admin/hasLogin/ajaxCompanyInfo/add",
                            data:{
                                id:List.meetingId
                            },
                            callback:function (data) {
                                if(data.code == 0){
                                    layer.msg("新增成功");
                                    location.href="/admin/hasLogin/companyInfo/list?type="+List.type;
                                }
                            }
                        })
                    });
                });

                //鼠标移动进去时显示关闭按钮
                $(".companylistInfoDiv").on("mouseenter",".singelInfo",function () {
                    $($(this).children(".floatClose")).show();
                })
                //鼠标移动出去时隐藏关闭按钮
                $(".companylistInfoDiv").on("mouseleave",".singelInfo",function () {
                    $($(this).children(".floatClose")).hide();
                });
                //点击删除按钮事件
                $(".companylistInfoDiv").on("click",".floatClose",function () {
                    var dataId = $(this).attr("data-id");
                    requstUtil.request({
                        url:"/admin/hasLogin/ajaxCompanyInfo/delete",
                        data:{
                            type:List.type,
                            id:dataId
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                layer.msg("删除成功");
                                location.href="/admin/hasLogin/companyInfo/list?type="+List.type;
                            }else{
                                layer.msg("删除失败");
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
                    url:'/admin/hasLogin/ajaxMeeting/menberManageList',
                    data:{
                        id:List.meetingId
                    },
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
                //初始化会议部位

                //初始化人员信息
                var list = dataList.addtendees;
                var str = "";
                for(var i = 0,l=list.length;i<l;i++){
                    var data = list[i]||{};
                    var dataId = data[idName]||'';//用户id
                    str  += "<div class='singelInfo'>";
                    str  += "<span class='label label-info companyInfo_span'>"+data.name+"</span>";
                    str += "<span class='glyphicon glyphicon-remove floatClose' data-id='"+dataId+"'></span></div>";

                }
                console.log(str);
                $(".companylistInfoDiv").html(str);


            },
        };
        List.init();
    })