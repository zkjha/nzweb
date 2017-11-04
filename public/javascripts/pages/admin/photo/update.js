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
requirejs(['lib/jquery','lib/requstUtil',"lib/province","lib/bootstrap"],
    function ($,requstUtil,province) {
        var Change = {
            init: function () {
                Change.personid = $("#addbutton").attr("data-id");
                Change.type = $("#addbutton").attr("data-type");
                //初始化界面信息
                Change.initView();



                Change.event();
                //初始化下拉菜单
                Change.initSelect();

            },
            initSelect:function () {
                //处理相应的下拉框初始事件

                // 城市下拉框初始化
                province.name = "name";
                province.val = "name";
                province.msg = "请选择城市";
                Change.initOption(province,$("#city"));

                //公司，部门，职位相应下拉框初始化
                Change.initCompanyInfo();

                //初始化考勤规则下拉框
                Change.initCheckWork();
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
                            Change.initOption(detail,$("#attendance"));

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
                                    Change.initOption(detail,$("#"+allId[index]+""));
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
            event: function () {
                //性别点击切换按钮背景事件
                $(".gender").on("click",function () {
                    $(".gender").each(function (index ,dom ) {
                        $(dom).removeClass("radio_select");
                    })
                    $(this).addClass("radio_select");
                })

                //性别点击切换按钮背景事件
                $(".group").on("click",function () {
                    $(".group").each(function (index ,dom ) {
                        $(dom).removeClass("radio_select");
                    })
                    $(this).addClass("radio_select");
                })


                //点击更换头像事件
                $("#fileBtn").on("click",function () {
                    var fileInput = $("<input id='file'  type='file' />")
                    $(fileInput).on("change",function (e) {
                        //处理上传文件
                        //显示选择文件名
                        var file = e.target.files[0];
                        var types=["jpg","png","gif","avi","rm","asf","wmv","mov","mp4"];

                        var name = file.name.toLowerCase();
                        var status="";
                        for(var i = 0;i<types.length;i++){
                            if(name.indexOf(types[i])!==-1){
                                status = true;
                            }
                        }
                        if(!status){
                            alert("只能上传图片和视频");
                            return
                        }
                        var formdata = new FormData();
                        formdata.append("files",file);
                        var url = "/admin/hasLogin/ajaxPhoto/updateImg?personid="+Change.personid+"&persontype="+Change.type;
                        var xhr = new XMLHttpRequest();
                        xhr.open("post", url, true);
                        xhr.onload = function (data) {
                            if(this.status == 200){
                                alert("新增成功");
                                location.href = "/admin/hasLogin/photo/list?type="+Change.type;
                            }else{
                                alert("新增失败");
                                return
                            }
                        };
                        xhr.send(formdata);
                        //显示上传文件名
                        // $("#fileDiv").html(file.name);
                        // $("#fileDiv").val(file);


                    });

                    $(fileInput).click();
                    // console.log(inputFile)

                });

                    //修改按钮点击事件
                $("#addbutton").on("click",function () {
                    var object = {};
                    //用户名
                    object.userName = $("#userName").val();
                    object.gender = $(".gender.radio_select").attr("data-type");

                    //身份证号码
                    object.IDnumber= $("#IDnumber").val();
                    if(Change.type == 0){
                        //工号
                        object.jobNumber = $("#jobNumber").val();
                        //生日
                        object.brithDay = $("#brithDay").val();
                    }
                    object.comeDay = $("#comeDay").val();
                    //如果是访客则需要输入来访时间
                    if(Change.type == 2){
                        object.comeTime = $("#comeTime").val();
                    }
                    //group
                    object.group = $(".group.radio_select").attr("data-type");
                    //company

                    object.company = $("#company").val();

                    //department
                    object.department = $("#department").val();

                    //position

                    object.position  = $("#position").val();

                    //city
                    object.city = $("#city").val();

                    //考勤规则
                    object.attendance = $("#attendance").val();

                    object.type = Change.type;
                    object.personid = Change.personid;
                    requstUtil.request({
                        url:'/admin/hasLogin/ajaxPhoto/change',
                        data:object,
                        callback:function (data) {
                            if(data.code == 0){
                                alert("操作成功");
                                location.href = "/admin/hasLogin/photo/list?type="+Change.type;
                            }else{
                                // alert(data.msg);
                                return
                            }
                        }
                    });

                })

            },
            initView:function () {
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxPhoto/getDetail',
                    data:{
                        personid:Change.personid,
                        type:Change.type
                    },
                    callback:function (data) {
                        if(data.code == 0){
                            console.log(data);
                            Change.initViewByData(data.data);
                        }else{
                            // alert(data.msg);
                            return
                        }
                    }
                });

            },
            initViewByData:function (data) {
                /*  int type;
                    int personid;
                    string pname;
                    int gender;
                    string birth;
                    string IDNum;
                    string employeenum;
                    string entrytime;
                    string picdirect;
                */

                //用户头像
                if(data.picdirect){

                    // $("#userImg").attr("src",data.picdirect);
                    var img = document.getElementById("userImg");
                    img.src="/static/images/show/"+data.picdirect.split(";")[0];
                }
                // $("#userImg").src="/static/images/show/"+data.picdirect;
                //用户名
                $("#userName").val(data.pname);
                //性别
                $(".gender").each(function (i,dom) {
                    if($(dom).attr("data-type")==data.gender){
                        if(!$(dom).hasClass("radio_select")){
                            $(dom).addClass("radio_select");
                        }
                    }else{
                        $(dom).removeClass("radio_select");
                    }
                })

                //身份证号码
                $("#IDnumber").val(data.IDNum);
                if(Change.type == 0){
                    //工号
                    $("#jobNumber").val(data.employeenum);
                    //生日
                    $("#brithDay").val(data.birth);
                }
                //来访日期和入职时间
                $("#comeDay").val(data.entrydate);

                //来访时间
                $("#comeTime").val(data.entrytime);

                //城市
                if(data.city){
                    $("#city").append("<option value='"+data.city+"' selected>"+data.city+"</option>");
                }


                if(data.company){
                    //公司
                    $("#company").append("<option value='"+data.companyid+"' selected>"+data.company+"</option>");
                }

                if(data.department){
                    //部门
                    $("#department").append("<option value='"+data.departmentid+"' selected>"+data.department+"</option>");
                }

                if(data.position){
                    //职位
                    $("#position").append("<option value='"+data.positionid+"' selected>"+data.position+"</option>");
                }


                if(data.attendancerule){
                    //考勤规则
                    $("#attendance").append("<option value='"+data.attendanceid+"' selected>"+data.attendancerule+"</option>");
                }



                //楼号

                $("#addr").val(data.addr);
                //group
                if(data.group == 0){
                    $($("input[name='group']")[0]).attr("checked",true);
                }else{
                    $($("input[name='group']")[1]).attr("checked",true);
                }



            }
        };


        Change.init();


    });