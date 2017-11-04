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
                   location.href="/admin/hasLogin/manager/add";
               });

               // 修改密码点击事件
               $("#j_body").on("click",".changePassword",function () {
                   var usernam = $(this).attr("data-id");
                   Layer.layer({
                       type:'search',
                       title:'请输入新密码',
                       callback:function (data) {
                           if(data){
                               requstUtil.request({
                                   url:'/admin/hasLogin/ajaxManager/changePassword',
                                   data:{
                                       usernam:usernam,
                                       password:data
                                   },
                                   callback:function (data) {
                                       if(data.code == 0){
                                           alert("操作成功");
                                            return
                                       }else{
                                           return
                                       }
                                   }
                               });
                           }else{
                               return ;
                           }
                       }
                   })
               });

               //删除管理员
               $("#j_body").on("click",".iIsDelete",function () {
                   var userid = $(this).attr("data-id");
                   requstUtil.request({
                       url:'/admin/hasLogin/ajaxManager/deleteManager',
                       data:{
                           userId:userid
                       },
                       callback:function (data) {
                           if(data.code == 0){
                               alert("操作成功");
                               location.href = "/admin/hasLogin/manager/list";
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
                   url:'/admin/hasLogin/ajaxManager/list',
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
              var list = dataList.rslt;
               var str = "";
               for(var i = 0,l=list.length;i<l;i++){
                   var data = list[i]||{};
                   var dataId = data.userid||'';//用户id
                   str +="<tr class='minTr'>";
                   str +="<td>"+data.usernam+"</td>";//用户名
                   switch (data.authority){
                       case 1:
                           str +="<td class='i18n colorSpan_td ' data-title='objectType1'><span class='colorSpan_green i18n lineheight50' data-title=''>普通管理员</span></td>";
                           break;
                       case 0:
                           str +="<td class='i18n' data-title='objectType2'><span class='colorSpan_green i18n lineheight50' data-title=''>高级管理员</span></td>";
                           break;
                       // case "3":
                       //     str +="<td class='i18n' data-title='objectType3'>动物</td>";
                       //     break;
                       // case "4":
                       //     str +="<td class='i18n' data-title='objectType4'>仪器</td>";
                       //     break;
                       default:
                           str+="<td class='colorSpan_td lineheight50'><span class='colorSpan_blue i18n lineheight50' data-title=''>普通管理员</span></td>"

                   };
                   str +="<td>"+(data.createTime||new Date())+"</td>";//创建时间

                   str +="<td style='' class='colorSpan_td lineheight50'>" +
                       "<span class='btn action_span iIsDelete red ' data-title='' data-id='"+dataId+"'>删除</span>" +
                       "<span class='btn action_span changePassword blue width70' data-title='' data-id='"+dataId+"'>修改密码</span>" +
                       "</td>";

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

               //转换语言
               // list.changeLan();
           },
       };
       List.init();
})