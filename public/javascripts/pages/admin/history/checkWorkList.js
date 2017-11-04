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
            type:0,
            init:function () {
                List.initSelect();
                List.event();
                List.getPage(1)
            },
            initSelect:function () {
                //
                requstUtil.request({
                    url:"/admin/hasLogin/ajaxCompanyInfo/list",
                    data:{
                        type:1
                    },
                    callback:function (data) {
                        if(data.code == 0){
                            var str ="";
                            var list = data.dept;
                            for(var i = 0;i<list.length;i++){
                                str +="<option value='"+list[i].departmentid+"'>"+list[i].name+"</option>"
                            }
                            $("#department").append(str);
                        }
                    }
                })
            },
            event:function () {
                //查询按钮点击事件
                $("#addGroup").on("click",function () {
                    List.type = 0;
                    List.getPage("1");
                });
                //异常导入查询点击事件
                $("#abSearch").on("click",function () {
                    List.type = 1;
                    List.getPage("1");
                })

                //d导出按钮点击事件
                $("#exports").on("click",function () {
                    var param = List.getparam(),arr=[];
                    for(var name in param){
                        if(param[name]){
                            arr.push(name+"="+param[name]);
                        }
                    }
                    var url = "/admin/hasLogin/ajaxHistory/checkWorkExcel?"+arr.join("&");
                    console.log(url);
                    var form=$("<form>");//定义一个form表单
                    form.attr("style","display:none");
                    form.attr("target","");
                    form.attr("method","post");//请求类型
                    form.attr("action",url);//请求地址
                    $("body").append(form);//将表单放置在web中
                    form.submit();//表单提交
                    // List.exportsData();
                    // requstUtil.request({
                    //     url:"/admin/hasLogin/ajaxHistory/exports",
                    //     data:param,
                    //     callback:function (data) {
                    //         if(data.code == 0){
                    //             List.exportsData(data);
                    //         }else{
                    //             alert("导出失败");
                    //             return
                    //         }
                    //     }
                    // })

                })


                //删除管理员
                $("#j_body").on("click",".iIsDelete",function () {
                    var historyId = $(this).attr("data-id");
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxHistory/delete',
                        data:{
                            id:historyId
                        },
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/history/list";
                            }else{
                                return
                            }
                        }
                    });
                })


            },
            getparam:function () {
                var param = {};
                //获取部门
                param.department = $("#department").val()||'';


                //开始时间
                param.startTime = $("#startTime").val()||'';

                //结束时间
                param.endTime = $("#endTime").val()||'';

                //查询人员姓名
                param.name = $("#userName").val()||'';

                //查询人员身份证号
                param.employeenum = $("#employeenum").val()||'';

                return param;
            },
            getPage:function (nowPage) {
                $("#j_body").html("");
                var params = List.getparam();
                params.type = List.type;
                params.pageSize = 10;
                params.pageNum = nowPage;
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxHistory/checkWorkList',
                    data:params,
                    callback:function (data) {
                        if(data.code == 0){
                            console.log(data);
                            List.nowPage = nowPage;
                            List.createElement(data);
                        }else{
                            // alert(data.msg);
                            return
                        }
                    }
                });
            },
            createElement:function (dataList) {
                //考勤结果数组
                //0-考勤正常   1-迟到   2-早退   3-迟到早退   4-考勤异常   5-缺勤
                var resultArr = ["考勤正常","迟到","早退","迟到早退","考勤异常","缺勤"];
                var list = dataList.aaqlist;
                var str = "";
                for (var i = 0, l = list.length; i < l; i++) {
                    var data = list[i] || {};
                    // var dataId = data.hisid || '';//用户id
                    str += "<tr class='imgTr'>";
                    str += "<td>" + (data.name || "") + "</td>";//用户名
                    str += "<td>" + (data.department || "") + "</td>";//部门
                    str += "<td>" + (data.employeenum || "") + "</td>";//工号
                    str += "<td>" + (data.date||'') + "</td>";//日期
                    str += "<td>" + (data.checkin||'') + "</td>";//签到时间
                    str += "<td>" + (data.checkout||'') + "</td>";//签退时间
                    str += "<td>" + (data.attendrule||'') + "</td>";//考勤规则
                    //签到结果
                    str += "<td>"+resultArr[data.attendresult]+"</td>";


                    // str += "<td style='' class='colorSpan_td lineheight50'>" +
                    //     "<span class='action_span iIsDelete btn lineheight50' data-title='' data-id='" + dataId + "'>删除</span>" +
                    //     "<span class='action_span change btn lineheight50' data-title='' data-id='" + dataId + "'>设为白名单</span>" +
                    //     "<span class='action_span change btn lineheight50' data-title='' data-id='" + dataId + "'>设为黑名单</span>" +
                    //     "</td>";

                    str += "</tr>"

                }
                $("#j_body").html(str);
                var totalpage =  Math.ceil(dataList.totalCount/dataList.pageSize);
                $("#j_footer").html("<span><span class='i18n' data-title='tips_one'>总共</span>&nbsp&nbsp"+totalpage+"&nbsp&nbsp<span class='i18n' data-title='pages'>页</span> ，<span class='i18n' data-title='tips_two'>当前为第</span>&nbsp&nbsp"+
                    List.nowPage +"&nbsp&nbsp<span  class='i18n' data-title='pages'> 页</span></span>");
                $("#j_pageNum").html("");
                $("#j_pageNum").pagination({
                    count: dataList.totalCount, //总数
                    size: 10, //每页数量
                    index: List.nowPage,//当前页
                    lrCount: 3,//当前页左右最多显示的数量
                    lCount: 1,//最开始预留的数量
                    rCount: 1,//最后预留的数量
                    callback: function (options) {
                        List.getPage(options.index);
                    }
                });
            }
        };
        List.init();
    })