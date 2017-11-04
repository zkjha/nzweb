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
                    location.href="/admin/hasLogin/camera/add";
                });

                // 修改摄像头信息事件
                $("#j_body").on("click",".change",function () {
                    var camid = $(this).attr("data-id");
                    location.href = "/admin/hasLogin/camera/change?camid="+camid;
                });

                // 开关摄像头
                $("#j_body").on("click",".camopen",function () {
                    var camid = $(this).attr("data-id");
                    //获取将要改变为的状态
                    var type = $(this).attr("data-type");
                    requstUtil.request({
                        url:"/admin/hasLogin/ajaxCamera/changeStatu",
                        data:{
                            camid:camid,
                            type:type
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href ="/admin/hasLogin/camera/list"
                            }else{
                                alert("操作失败");
                                return
                            }
                        }
                    })
                });


                //删除
                $("#j_body").on("click",".iIsDelete",function () {
                    var camid = $(this).attr("data-id");
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxCamera/delete',
                        data:{
                            camid:camid
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/camera/list";
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
                    url:'/admin/hasLogin/ajaxCamera/list',
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
                var list = dataList.listrslt;
                var str = "";
                for(var i = 0,l=list.length;i<l;i++){
                    var data = list[i]||{};
                    var dataId = data.camid||'';//用户id
                    str +="<tr class='minTr'>";
                    str +="<td>"+data.CamIp+"</td>";//摄像头ip
                    str +="<td>"+data.name+"</td>";//摄像头ip
                    str +="<td>"+data.camaddress+"</td>";//摄像头ip

                    str +="<td style='' class='colorSpan_td lineheight50'>" +
                        "<span class='btn action_span iIsDelete i18n red ' data-title='' data-id='"+dataId+"'>删除</span>" +
                        "<span class='btn action_span change i18n blue ' data-title='' data-id='"+dataId+"'>修改</span>";
                    if(data.camst == 1){
                        str +="<span class='btn action_span camopen i18n red' data-title='' data-type='0' data-id='"+dataId+"'>关闭</span>"
                    }else{
                        //当前为关闭状态
                        str +="<span class='btn action_span camopen i18n lineheight50 blue' data-title='' data-type='1' data-id='"+dataId+"'>开启</span>"
                    }
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