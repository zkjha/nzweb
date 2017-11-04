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
requirejs(["lib/jquery","lib/requstUtil","lib/layer","lib/jqueryPage","lib/bootstrap"],
    function ($,requstUtil,Layer) {
        var List = {
            init:function () {
                List.event();
                List.getPage(1)
            },
            event:function () {
                //新增按钮点击事件
                $("#addGroup").on("click",function () {
                    location.href="/admin/hasLogin/checkWork/add";
                });

                // 修改摄像头信息事件
                $("#j_body").on("click",".change",function () {
                    var ruleId = $(this).attr("data-id");
                    var data = $(this).attr("data-detail");
                    console.log(data);
                    location.href = "/admin/hasLogin/checkWork/change?ruleId="+ruleId+"&data="+data;
                });


                //删除
                $("#j_body").on("click",".iIsDelete",function () {
                    var ruleId = $(this).attr("data-id");
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCheckWork/delete',
                        data:{
                            ruleId:ruleId
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/checkWork/list";
                            }else{
                                return
                            }
                        }
                    });
                })


            },
            getPage:function (nowPage) {
                var option = {
                    pageSize:10,
                    pageNumber:nowPage
                }
                List.nowPage = nowPage;
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxCheckWork/list',
                    data:option,
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
                var list = dataList.rulelist;
                var str = "";
                for(var i = 0,l=list.length;i<l;i++){
                    var data = list[i]||{};
                    var dataId = data.ruleid||'';//用户id
                    str +="<tr class='minTr'>";
                    str +="<td>"+data.rulename+"</td>";//规则名称
                    str +="<td>"+data.alcheckin.slice(0,5)+"</td>";//最早签到时间
                    str +="<td>"+data.checkin.slice(0,5)+"</td>";//最晚签到时间
                    str +="<td>"+data.checkout.slice(0,5)+"</td>";//最早签退时间
                    str +="<td>"+data.lacheckout.slice(0,5)+"</td>";//最晚签退时间

                    str +="<td style='' class='colorSpan_td lineheight50'>" +
                        "<span class='action_span btn iIsDelete red' data-title='' data-id='"+dataId+"'>删除</span>" +
                        "<span class='action_span btn change blue ' data-title='' data-detail='"+JSON.stringify(data)+"' data-id='"+dataId+"'>修改</span>";
                    str +="</td>";

                    str +="</tr>"

                }
                $("#j_body").html(str);
                // $("#j_footer").html("<span><span class='i18n' data-title='tips_one'>总共</span>&nbsp&nbsp"+dataList.data.iTotalpages+"&nbsp&nbsp<span class='i18n' data-title='pages'>页</span> ，<span class='i18n' data-title='tips_two'>当前为第</span>&nbsp&nbsp"+
                //     List.nowPage +"&nbsp&nbsp<span  class='i18n' data-title='pages'> 页</span></span>");
                // $("#j_pageNum").html("");
                // $("#j_pageNum").pagination({
                //     count: dataList.data.iTotalrecords, //总数
                //     size: 10, //每页数量
                //     index: List.nowPage,//当前页
                //     lrCount: 3,//当前页左右最多显示的数量
                //     lCount: 1,//最开始预留的数量
                //     rCount: 1,//最后预留的数量
                //     callback: function (options) {
                //         List.getPage(options.index);
                //     }
                // });

            },
        };
        List.init();
    })