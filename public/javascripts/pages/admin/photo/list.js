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
               List.type = $(".currentType").attr("data-type");
               console.log(List.type);
               List.initSelect();
               List.event();
               List.getPage(1)
           },
           initSelect:function () {
               //处理相应的下拉框初始事件

               //公司，部门，职位相应下拉框初始化
               List.initCompanyInfo();

               //初始化考勤规则下拉框
               List.initCheckWork();
           },
           initCheckWork:function () {
               requstUtil.request({
                   url:"/admin/hasLogin/ajaxCheckWork/list",
                   data:{},
                   callback:function (data) {
                       if(data.code == 0){
                           var detail = data.rulelist;
                           detail.name="rulename";
                           detail.val = "ruleid";
                           detail.msg = "请选择考勤规则";
                           List.initOption(detail,$("#attendance"));

                       }
                   }
               })
           },
           initCompanyInfo:function () {
               //type :0 c城市，1部门，2，职位
               var name = ["comp","dept","posit"],val=["companyid","departmentid","positionid"],
                   msg = ["请选择公司","请选择部门","请选择职位"],allId=["company","department","position"];
               for(var i =0;i<3;i++){
                   (function (index) {
                       requstUtil.request({
                           url:"/admin/hasLogin/ajaxCompanyInfo/list",
                           data:{
                               type:i
                           },
                           callback:function (data) {
                               if(data.code == 0){
                                   var listName = name[index];
                                   var detail = data[listName];
                                   detail.name="name";
                                   detail.val = val[index];
                                   detail.msg = msg[index];
                                   List.initOption(detail,$("#"+allId[index]+""));
                               }
                           }
                       })
                   })(i)

               }
           },

           //处理数据并展示出来
           //data.name:将展示的数据在data里面的属性名
           //data.val:选项的val值在data里面的字段
           //data:数据
           //父节点
           //data.msg 选项首项提示语
           initOption:function (data,dom) {
               var name = data.name,val = data.val,msg =data.msg;
               var str ="<option value=''>"+msg+"</option>";
               for(var i = 0;i<data.length;i++){
                   var detailData = data[i];
                   str += "<option value='"+detailData[val]+"'>"+detailData[name]+"</option>"
               }
               $(dom).append(str);
           },
           event:function () {
               //新增按钮点击事件
               $("#addGroup").on("click",function () {
                   var type = $(this).attr("data-type");
                   location.href="/admin/hasLogin/photo/add?type="+type;
               });


               //批量导入点击事件
               $("#addAllGroup").on("click",function () {
                   location.href = "/admin/hasLogin/photo/add?type="+List.type+"&uploadType=All";
               });

               //查询点击事件
               $("#querySearch").on("click",function () {
                   List.getPage(1);
               })

               // // 修改密码点击事件
               // $("#j_body").on("click",".changePassword",function () {
               //     var usernam = $(this).attr("data-id");
               //     Layer.layer({
               //         type:'search',
               //         title:'请输入新密码',
               //         callback:function (data) {
               //             if(data){
               //                 requstUtil.request({
               //                     url:'/admin/hasLogin/ajaxManager/changePassword',
               //                     data:{
               //                         usernam:usernam,
               //                         password:data
               //                     },
               //                     callback:function (data) {
               //                         if(data.code == 0){
               //                             alert("操作成功");
               //                              return
               //                         }else{
               //                             return
               //                         }
               //                     }
               //                 });
               //             }else{
               //                 return ;
               //             }
               //         }
               //     })
               // });

               //删除员工信息
               $("#j_body").on("click",".iIsDelete",function () {
                   var personid = $(this).attr("data-id");
                   requstUtil.request({
                       url:'/admin/hasLogin/ajaxPhoto/delete',
                       data:{
                           personid:personid,
                           persontype:List.type
                       },
                       callback:function (data) {
                           if(data.code == 0){
                               alert("操作成功");
                               location.href = "/admin/hasLogin/photo/list?type="+List.type;
                           }else{
                               return
                           }
                       }
                   });
               });


               //修改信息
               $("#j_body").on("click",".update",function () {
                   var personid = $(this).attr("data-id");
                   location.href  = "/admin/hasLogin/photo/update?type="+List.type+"&personid="+personid;
               })


           },
           getPage:function (nowPage) {
               var option = {
                   pageSize:10,
                   pageNumber:nowPage
               }
               List.nowPage = nowPage;
               option.type = $(".currentType").attr("data-type");
               List.getQueryParam(option);
               requstUtil.request({
                   url:'/admin/hasLogin/ajaxPhoto/list',
                   data:option,
                   callback:function (data) {
                       if(data.code == 0){
                           console.log(data.infolist);
                           List.createElement(data);
                       }else{
                           // alert(data.msg);
                           return
                       }
                   }
               });
           },

           //获取当前查询条件的值
           getQueryParam:function (param) {
               param.gender = $("#gender").val();
               param.username = $("#userName").val();
               param.idNum = $("#idNum").val();
               //新增查询条件
               param.group = $("#group").val();//黑白名单
               param.company = $("#company").val();//公司
               param.department = $("#department").val();//部门
               param.position = $("#position").val();//职位
           },
           createElement:function (dataList) {
              var list = dataList.infolist;
               var str = "";
               if(List.type == 0){
                   for(var i = 0,l=list.length;i<l;i++){
                       var data = list[i]||{};
                       var dataId = data.personid||'';//用户id
                       str +="<tr class='imgTr'>";
                       str +="<td><img style='width: 100px; height: 100px' src='"+(List.imgPath+data.picdirect.split(";")[0])+"'></td>";//头像
                       str +="<td class='lineheight6.5'>"+data.pname+"</td>";//用户名
                       switch (data.gender){//性别
                           case 1:
                               str +="<td class='i18n colorSpan_td lineheight6.5 ' data-title='objectType1'><span class='colorSpan_green i18n lineheight50' data-title=''>女</span></td>";
                               break;
                           case 0:
                               str +="<td class='i18n lineheight6.5' data-title='objectType2'><span class='colorSpan_green i18n lineheight50' data-title=''>男</span></td>";
                               break;
                           default:
                               str+="<td class='colorSpan_td lineheight6.5'><span class='colorSpan_blue i18n lineheight50' data-title=''>未知</span></td>"

                       };
                       str +="<td class='lineheight6.5'>"+data.birth+"</td>";//出生时间
                       str +="<td class='lineheight6.5'>"+data.IDNum+"</td>";//身份证号
                       str +="<td class='lineheight6.5'>"+data.employeenum+"</td>";//工号
                       str +="<td class='lineheight6.5'>"+data.entrydate+"</td>";//入职时间

                       str +="<td class='lineheight6.5'  >" +
                           "<span class='btn action_span red iIsDelete i18n ' data-title='' data-id='"+dataId+"'>删除</span>" +
                           "<span class='btn action_span blue update i18n' data-title='' data-id='"+dataId+"'>修改</span>" +
                           "</td>";

                       str +="</tr>"

                   }
               }else if(List.type == 2){
                   for(var i = 0,l=list.length;i<l;i++){
                       var data = list[i]||{};
                       var dataId = data.personid||'';//用户id
                       str +="<tr>";
                       str +="<td><img style='width: 100px; height: 100px' src='"+(List.imgPath+data.picdirect.split(";")[0])+"'></td>";//头像
                       str +="<td>"+data.pname+"</td>";//用户名
                       switch (data.gender){//性别
                           case 1:
                               str +="<td class='i18n colorSpan_td ' data-title='objectType1'><span class='colorSpan_green i18n lineheight50' data-title=''>女</span></td>";
                               break;
                           case 0:
                               str +="<td class='i18n' data-title='objectType2'><span class='colorSpan_green i18n lineheight50' data-title=''>男</span></td>";
                               break;
                           default:
                               str+="<td class='colorSpan_td lineheight50'><span class='colorSpan_blue i18n lineheight50' data-title=''>未知</span></td>"

                       };
                       // str +="<td>"+data.birth+"</td>";//出生时间
                       str +="<td>"+data.IDNum+"</td>";//身份证号
                       // str +="<td>"+data.employeenum+"</td>";//工号
                       str +="<td>"+((data.entrydate||"")+" "+(data.entrytime||''))+"</td>";//来访时间

                       str +="<td style='text-align: center' class='colorSpan_td lineheight50'>" +
                           "<span class='btn action_span red iIsDelete' data-title='' data-id='"+dataId+"'>删除</span>" +
                           "<span class='btn action_span update blue update' data-title='' data-id='"+dataId+"'>修改</span>" +
                           "</td>";

                       str +="</tr>"

                   }
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