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
        var Add = {
            init: function () {
                //获取当前的类型
                // 0表示员工,1：高层，2访客，
                Add.type = $("#addbutton").attr("data-type");
                //All:代表批量导入和视频
                Add.uploadType = $("#addbutton").attr("data-uploadType");
                //如果当前页面为批量导入，隐藏进度条
                if(Add.uploadType == "All"){
                    $(".process").hide();
                }



                //初始化下拉框选项
                Add.initSelect();
                Add.event();

            },
            initSelect:function () {
                //处理相应的下拉框初始事件
                //

                // 城市下拉框初始化
                province.name = "name";
                province.val = "name";
                province.msg = "请选择城市";
                Add.initOption(province,$("#city"));

                //公司，部门，职位相应下拉框初始化
                Add.initCompanyInfo();

                //初始化考勤规则下拉框
                Add.initCheckWork();
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
                            Add.initOption(detail,$("#attendance"));

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
                                    Add.initOption(detail,$("#"+allId[index]+""));
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



                //上传图片点击事件


                //2017-10-18
                /*
                * 上传逻辑变动，批量上传由原先的压缩文件见改为多文件上传替代
                * 图片和文件上传是，图片的命名规则为 ：姓名_黑白名单_身份证号,中间为下划线
                *
                */
                $("#fileBtn").on("click",function () {


                    //如果当前上传为批量上传，则创建可以多选择的上传框
                    if(Add.uploadType == "All"){
                        var fileInput = $("<input id='file' multiple  type='file' />")
                    }else{
                        var fileInput = $("<input id='file'   type='file' />")
                    }

                    // var fileInput = $("<input id='file' multiple  type='file' />")
                    $(fileInput).on("change",function (e) {
                        //处理上传文件

                        /*
                            现在批量上传改为上传多个文件，处理方式由原来的单一文件上传改为多文件上传
                            原先的处理逻辑在单条不变，批量上传做单独处理


                        */
                        //显示选择文件名
                        var files = e.target.files;
                        var types=[];
                        //如果是批量上传。则只能上传压缩文件
                        if(Add.uploadType == "All"){
                            types=["jpg","png","gif","avi","rm","asf","wmv","mov","mp4"];
                            types.name = "All";
                        }else{
                            types.name ="one";
                            types=["jpg","png","gif"]
                        }
                        for(var j=0;j<files.length;j++){
                            var file = files[j];
                            var name = file.name.toLowerCase();
                            var status="";
                            for(var i = 0;i<types.length;i++){
                                if(name.indexOf(types[i])!==-1){
                                    status = true;
                                }
                            }
                            if(!status){
                                if(types.name == "All"){
                                    alert("只能上传图片和视频");
                                }else{
                                    alert("只能上传图片");
                                }
                                return
                            }
                        }

                        //显示上传文件名
                        if(Add.uploadType !== "All"){
                            //显示预览图片
                            var url = URL.createObjectURL(files[0]);
                            $("#fileDiv").attr("src",url);
                        }
                        $("#fileDiv").val(files);

                    });

                    $(fileInput).click();
                    // console.log(inputFile)

                });
                //监听提交按钮点击事件
                $("#addbutton").on("click",function () {

                    //改动，分开处理批量上传及单条信息上传

                    //批量上传时显示进度条
                    if(Add.uploadType == "All"){

                        //批量处理上传方法
                        Add.batchUpload().then(function (index,total) {
                            if(index !== total){
                                $(".uploadFail").show()
                            }else{
                                $(".uploadSuccess").show()
                                setTimeout(function () {
                                    location.href = "/admin/hasLogin/photo/list?type="+Add.type;
                                },2000)
                            }
                        })

                    }else{
                        var data = Add.getParamsAndCheck();

                        if(data.msg){
                            alert(data.msg);
                            return
                        }
                        var datas = data.data;
                        //上传人物类型
                        datas.persontype = Add.type;
                        var files = datas.file[0];
                        var filetype = files.type.toLowerCase();

                        //上传文件类型
                        if(Add.uploadType == "All"){
                            if(filetype.indexOf("video") !== -1){
                                //视频
                                datas.filetype = 2;
                            }else{

                                datas.filetype = 0;
                            }

                        }else{
                            // if(filetype.indexOf("image") !== -1){
                            datas.filetype = 0;
                            // }else{
                            //     datas.filetype = 2
                            // }
                        }
                        //如果上传的不为图片，data.username为文件的具体格式
                        if(datas.filetype !== 0 ){
                            datas.username = datas.file.name.split(".")[1];
                        }
                        var formdata = new FormData();
                        formdata.append("files",files);
                        var url = "/admin/hasLogin/ajaxPhoto/add?",args=[];
                        for(var name in datas){
                            if(name !== "file"){
                                args.push(name+"="+datas[name]);
                            }
                        }
                        var params = args.join("&");
                        url += params;
                        console.log(url)
                        var xhr = new XMLHttpRequest();
                        xhr.open("post", url, true);
                        xhr.onload = function (data) {
                            var datas = JSON.parse(data&&data.target&&data.target.response);
                            if(datas.code  == 0){
                                // sucNum +=1;
                                Add.showProcess(sucNum,len);

                            }else{
                                alert("上传失败");
                                return
                            }
                        };
                        xhr.send(formdata);

                    }
                })
            },
            batchUpload:function(){
                var def = new $.Deferred();
                //初始化进度条的值
                $(".processDiv>span").css("width","0%");
                $(".process>span").html("0%");
                $(".process").show();

                //验证参数
                var data = Add.getParamsAndCheck();
                if(data.msg){
                    alert(data.msg);
                    return ;
                }
                //添加，如果为批量上传，显示进度条

                //获取上传的文件数组
                var datas = data.data;


                //记录上传成功的数量
                var sucNum =0,len = datas.file.length,currentNum = 0;
                datas.persontype = Add.type;
                //遍历文件数组
                for (var i= 0 ;i<len;i++){

                    var files = datas.file[i];
                    var filetype = files.type.toLowerCase();
                    //上传文件类型
                    if(filetype.indexOf("video") !== -1){
                        //视频
                        datas.filetype = 2;
                    }else{

                        datas.filetype = 0;
                    }

                    var fileName = files.name.split(".")[0];
                    var fileNameInfo = fileName.split("_");
                    datas.username = fileNameInfo[0];//姓名

                    datas.group = fileNameInfo[1];//黑白类型
                    if(Add.type == "0"){
                        datas.jobNumber = fileNameInfo[2];//工号
                    }else{
                        datas.IDnumber = fileNameInfo[2];//身份证号
                    }


                    //如果上传的不为图片，data.username为文件的具体格式
                    if(datas.filetype !== 0 ){
                        datas.username = datas.file.name.split(".")[1];
                    }
                    var formdata = new FormData();
                    formdata.append("files",files);
                    var url = "/admin/hasLogin/ajaxPhoto/add?",args=[];
                    for(var name in datas){
                        if(name !== "file"){
                            args.push(name+"="+datas[name]);
                        }
                    }
                    var params = args.join("&");
                    url += params;
                    console.log(url)
                    var xhr = new XMLHttpRequest();
                    xhr.open("post", url, true);
                    xhr.onload = function (data) {
                        currentNum +=1;
                        var datas = JSON.parse(data&&data.target&&data.target.response);
                        if(datas.code  == 0){
                            sucNum +=1;
                            Add.showProcess(sucNum,len);

                        }
                        //上传完成，释放异步
                        if(currentNum == len){
                            def.resolve(sucNum,len);
                        }
                    };
                    xhr.send(formdata);

                }
                return def;


                //如果当前的上传为批量上传，则将文件名信息包含进去


            },
            //上传进度条控制
            showProcess:function (index,total) {
                var str = ((index/total)*100)+"%";
                $(".processDiv>span").animate({
                    "width":str
                },100);
                $(".process>span").html(str);
            },
            getParamsAndCheck:function () {
                var datas={
                    data:{}
                };
                var data = datas.data;
                data.file = $("#fileDiv").val()||'';//文件
                data.username = $("#userName").val()||'';//姓名
                data.sex = $(".gender.radio_select").attr("data-type")||'';//性别
                data.IDnumber = $("#IDnumber").val()||'';//身份证
                data.jobNumber = $("#jobNumber").val()||'';//工号
                data.brithDay = $("#brithDay").val()||'';//生日
                data.comeDay = $("#comeDay").val()||'';//来访时间和入职时间
                data.comeTime = $("#comeTime").val()||"";//来访时间和入职时间
                data.city = $("#city").val()||'';//城市
                data.company = $("#company").val()||'';//公司
                data.department = $("#department").val()||'';//部门
                data.position = $("#position").val()||'';//职位
                data.attendance = $("#attendance").val()||'';//考勤规则
                data.addr = $("#addr").val()||'';//楼号
                data.group = $(".group.radio_select").attr("data-type")||'';//黑白名单
                console.log(data);

                if(!data.file){
                    datas.msg = "请选择上传文件"
                    return datas;
                }
                if(Add.uploadType == "All"){
                    return datas;
                }
                if(!data.username){
                    datas.msg = "请输入姓名"
                    return datas;
                }
                if(!data.IDnumber){
                    datas.msg = "请输入身份证号"
                    return datas;
                }
                var IDNumberT = /^\d{17}(\d|x)$/i;
                if(!IDNumberT.test(data.IDnumber)){
                    datas.msg = "请输入合法的身份证号码";
                    return datas;
                }
                if(Add.type == "0"){
                    if(!data.jobNumber){
                        datas.msg = "请输入工号"
                        return datas;
                    }
                    if(!data.comeDay){
                        datas.msg= "请选择入职时间";
                        return datas;
                    }
                    //入职时间不能早于出生时间
                    var getNumByDate = function (param) {
                        //返回一个年月日所组成的数组
                        return param.split("-");
                    }
                    var comeDayArr = getNumByDate(data.comeDay),brithDayArr = getNumByDate(data.brithDay);
                    if(comeDayArr[0]<brithDayArr[0]){
                        datas.msg = "入职时间不能比出生日期更早！";
                        return datas
                    }else if(comeDayArr[0] == brithDayArr[0]){
                        if(comeDayArr[1]<brithDayArr[1]){
                            datas.msg = "入职时间不能比出生日期更早！"
                            return datas;
                        }else if(comeDayArr[1]==brithDayArr[1]){
                            if(comeDayArr[2]<brithDayArr[2]){
                                datas.msg = "入职时间不能比出生日期更早！"
                                return datas;
                            }
                        }
                    }
                }else{
                    if(!data.comeDay){
                        datas.msg="请选择来访时间"
                        return datas;
                    }
                }

                return datas;

            }
        }

        Add.init();


    });