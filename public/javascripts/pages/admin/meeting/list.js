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
            imgPath:'/static/images/show/',
            init:function () {
                List.event();
                List.getPage(1)
            },
            event:function () {
                //查询按钮点击事件
                $("#addGroup").on("click",function () {
                    List.getPage("1");
                });

                //参会人员管理
                $("#j_body").on("click",".menberManage",function () {
                    var id =  $(this).attr("data-id");
                    location.href = "/admin/hasLogin/meeting/meetingMenberManage?meetingId="+id;
                })
                //d导出按钮点击事件
                $("#exports").on("click",function () {
                    var param = List.getparam(),arr=[];
                    for(var name in param){
                        if(param[name]){
                            arr.push(name+"="+param[name]);
                        }
                    }
                    var url = "/admin/hasLogin/ajaxHistory/historyExcel?"+arr.join("&");
                    console.log(url);
                    var form=$("<form>");//定义一个form表单
                    form.attr("style","display:none");
                    form.attr("target","");
                    form.attr("method","post");//请求类型
                    form.attr("action",url);//请求地址
                    $("body").append(form);//将表单放置在web中
                    form.submit();//表单提交

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
                });

                //新增按钮点击事件
                $("#addGroup").on("click",function () {
                    location.href = "/admin/hasLogin/meeting/add";
                })


            },
            getparam:function () {
                return {};
                var param = {};
                //获取白黑名单
                param.group = $("#group").val()||'';

                //获取人员类型
                var type = $("#type").val()||'';
                if(type == -2){
                    //如果选中陌生人，则将personid赋值为-2
                    param.personid = -2;
                }else{
                    param.type = type||'';
                }

                //开始时间
                param.startTime = $("#startTime").val()||'';

                //结束时间
                param.endTime = $("#endTime").val()||'';

                //查询人员姓名
                param.name = $("#userName").val()||'';

                //查询人员身份证号
                param.idNum = $("#idNum").val()||'';

                return param;
            },
            getPage:function (nowPage) {
                $("#j_body").html("");
                var params = List.getparam();
                params.pageSize = 10;
                params.pageNum = nowPage;
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxMeeting/list',
                    data:params,
                    callback:function (data) {
                        if(data.code == 0){
                            // console.log(data);
                            //赋值全局页码
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
                var list = dataList.info;
                var str = "";
                for(var i = 0,l=list.length;i<l;i++){
                    var data = list[i]||{};
                    var dataId = data.confId||'';//会议id
                    str +="<tr>";
                    str +="<td>"+(data.name||"")+"</td>";//会议名称
                    str +="<td>data.topic</td>";//会议主题
                    str +="<td>data.time</td>";//会议时间
                    str +="<td>data.position</td>";//会议地点
                    str +="<td style='' class='colorSpan_td lineheight50'>" +
                        "<span class='action_span iIsDelete btn lineheight50' data-title='' data-id='"+dataId+"'>删除</span>" +
                        "<span class='action_span menberManage btn lineheight50' data-group='0' data-id='"+dataId+"'>参会人员管理</span>" +
                        "<span class='action_span meetingHistory btn lineheight50' data-group='1' data-id='"+dataId+"'>参会记录查询</span>" +
                        "</td>";

                    str +="</tr>"

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

            },
            // exportsData:function (data) {
            //     //判断浏览器类型
            //     function getExplorer() {
            //         var explorer = window.navigator.userAgent;
            //     //ie
            //         if (explorer.indexOf("MSIE") >= 0 || explorer.indexOf("Edge") >= 0 || (explorer.indexOf('Trident') > -1 && explorer.indexOf("rv:11.0") > -1)) {
            //             return 'ie';
            //         }
            //         else {
            //             return 'notIe'
            //         }
            //     }
            //     function dataToExcel(tableid, name, filename) {
            //         if (getExplorer() == 'ie') {
            //             var curTbl = document.getElementById(tableid);
            //             var oXL = new ActiveXObject("Excel.Application");
            //             var oWB = oXL.Workbooks.Add();
            //             var xlsheet = oWB.Worksheets(1);
            //             var sel = document.body.createTextRange();
            //             sel.moveToElementText(curTbl);
            //             sel.select;
            //             sel.execCommand("Copy");
            //             xlsheet.Paste();
            //             oXL.Visible = true;
            //             xlsheet.Columns("A:D").AutoFit;
            //             try {
            //                 var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            //             } catch (e) {
            //                 print("Nested catch caught " + e);
            //             } finally {
            //                 oWB.SaveAs(fname);
            //                 oWB.Close(savechanges = false);
            //                 oXL.Quit();
            //                 oXL = null;
            //                 idTmr = window.setInterval("Cleanup();", 1);
            //             }
            //
            //         }
            //         else {
            //             tableToExcel(tableid, name, filename)
            //         }
            //     }
            //     function Cleanup() {
            //         window.clearInterval(idTmr);
            //         CollectGarbage();
            //     }
            //     var tableToExcel = (function () {
            //         var uri = 'data:application/vnd.ms-excel;base64,',
            //             template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>' +
            //                 '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
            //                 '</head><body><table>{table}</table></body></html>',
            //             base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
            //             format = function (s, c) {
            //                 return s.replace(/{(\w+)}/g,
            //                     function (m, p) { return c[p]; })
            //             }
            //         return function (table, name, filename) {
            //             if (!table.nodeType) table = document.getElementById(table)
            //             var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            //             document.getElementById("dlink").href = uri + base64(format(template, ctx));
            //             document.getElementById("dlink").download = filename;
            //             document.getElementById("dlink").click();
            //         }
            //     })()
            //     //进行调用
            //     // 执行表格导出到excel
            //     dataToExcel('testId', 'test', 'xiazai.xls');
            // }

        };
        List.init();
    })