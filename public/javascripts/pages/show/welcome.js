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
        },
        "lib/socket.io":{
            deps:[]
        }
    }
});
requirejs(["lib/jquery","lib/requstUtil","lib/socket.io","lib/jqueryPage","lib/bootstrap"],
    function ($,requstUtil,io) {
        var main = {
            camSelectShow:false,
            imgPath:'/static/images/show/',
            ininDay:"",
            time1:0,
            time2:1,
            time3:0.5,
            //上次数据加入动画对象的指针
            index:0,
            //缓存三个动画的对象
            activObject:{
                0:[],
                1:[],
                2:[]
            },
            init:function(){
                //初始化界面相关

                //初始化界面时钟
                main.initTime();
                //初始化摄像头选项
                main.initCamSelect();

                main.event();
                // main.startShowImg();
                // setInterval(function () {
                //     main.moveAction(data);
                // },5000);
                // main.moveAction(data);

            },
            initCamSelect:function () {
                requstUtil.request({
                    url:'/admin/hasLogin/ajaxCamera/list',
                    data:{},
                    callback:function (data) {
                        if(data.code == 0){
                            main.createElement(data);
                        }else{
                            // alert(data.msg);
                            return
                        }
                    }
                });
            },
            createElement:function (data) {
                var list = data.listrslt;
                var str = ""
                for(var i=0;i<list.length;i++){
                    var data = list[i];
                    var dataId = data.camid||'';//摄像头id
                    //只添加当前状态显示为开启的摄像头
                    if(data.camst == 1){
                        if(localStorage.getItem("camid") == dataId){
                            str +="<div class='selectCam_div' data-id='"+dataId+"' style='background: url(\"/static/images/cm_hover.png\")'><img  src='/static/images/cam_icon.png'>" +
                                "<div class='selectCam_info'  data-id='"+dataId+"'>"+data.name+"</div></div>"
                        }else{
                            str +="<div class='selectCam_div'data-id='"+dataId+"' style='background: url(\"/static/images/cm_mr.png\")'><img  src='/static/images/cam_icon.png'>" +
                                "<div class='selectCam_info'  >"+data.name+"</div></div>"
                        }
                    }
                }
                $(".selectCam").html(str);
            },
            //控制摄像头选项的显影
            hideCamSelect:function (data) {

                if(data){
                    $(".selectCam").hide();
                    $(".cam_arrow").hide();
                    main.camSelectShow = false
                }else{
                    $(".selectCam").show();
                    $(".cam_arrow").show();
                    main.camSelectShow = true;
                }
            },
            event:function () {
                //选择摄像头点击事件
                //显示所有摄像头信息
                $(".camSelect img").on("click",function () {
                    //如果已经展示，则隐藏
                    main.hideCamSelect(main.camSelectShow);

                });
                //选择摄像头点击事件
                $(".selectCam").on("click",".selectCam_div",function () {
                    main.camId = $(this).attr("data-id");
                    main.hideCamSelect(main.camSelectShow);
                    main.startShowImg();

                })

                $(window).unload (function () {
                    //关闭当前连接
                    main.socket.close();
                });


            },
            connectSocket:function () {


                var def = $.Deferred();
                //如果当前连接存在，断开连接
                if(main.socket){
                    main.socket.close();
                    main.socket ="";
                }

                //打开socket.io监听服务器端返回的数据
                var url = location.href.split("3000")[0];
                url+="3001";
                main.socket = io.connect(url);
                var id ="";
                main.socket.on("ok",function (data) {
                    //获取当前连接id值
                    main.socketId = data.id;
                    console.log(main.socketId);
                    //接受推送给当前id的数据
                    main.socket.on(data.id,function (data) {
                        console.log("getData");
                        // console.log(data);
                        main.moveAction(data);
                    });
                    //如果异常，断开连接
                    main.socket.on("dis"+data.id,function (data) {
                        //关闭当前连接
                        main.socket.close();
                    })


                    def.resolve();
                });


                //当前页面刷新或者退出，断掉当前连接

                main.socket.on("disconnect",function (data) {
                    console.log("over");
                    // main.moveAction(data);
                });
                return def;
            },
            startShowImg:function () {
                main.connectSocket().then(function () {
                    requstUtil.request({
                        url:"/welcome/getUserInfo",
                        data:{
                            camid:main.camId,
                            connectId:main.socketId
                        },
                        callback:function (data) {

                        }
                    })
                });


                //档接受到数据时，控制显示动画

            },
            moveAction:function (data) {
                //获取这次推送的内容
                var list = data.rsltlist||[];

                //本页面的动画一次最多显示三张，显示完成后记录其信息在有浮动窗口
                //并消除相应的节点


                //将对象分别加入相应的动画数组里面，进行动画排序等待
                for(var i = 0;i<list.length;i++){
                    if(main.index>2){
                        //如果当前指针大于2，则初始化相应的指针
                        main.index = 0
                    }
                    //修复当前没有人时，结果在第二位显示的问题
                    //如果当前数据数组里面已经没有值了，初始化main.index
                    // if(main.activObject[0].length == 0 &&main.activObject[1].length == 0 &&main.activObject[2].length == 0 ){
                    //     main.index = 0;
                    // }
                    var time = new Date();
                    var h =time.getHours()<10?("0"+time.getHours()):time.getHours();
                    var m =time.getMinutes()<10?("0"+time.getMinutes()):time.getMinutes();
                    list[i].time = h+":"+m;
                    main.activObject[main.index].push(list[i]);
                    main.index +=1;
                }
                //根据数据分别执行每个动作数组的动画
                for(var j = 0;j<3;j++){
                    var defFunction = function (index) {
                        main.doActionMethod(index).then(function (data) {
                            if(data !== undefined){
                                defFunction(data);
                            }
                        });
                    };
                    defFunction(j);
                }





            },
            doActionMethod:function (index) {
                var def = $.Deferred();
                setTimeout(function () {
                  //获取对应的数据
                    var arr = main.activObject[index];
                    if(arr.length == 0){
                        return def.resolve();
                    }
                    //获取数组中第一个数据
                    var data = arr.shift();

                    //获取相应数据的图片路径并生成合成图片
                    // main.draw(data.pic).then(function (url) {
                    //根据当前传入的index确定当前节点margin-left的值
                    var marginIndex = [0,3.85,3.8],userType = ["worker","VIP","fangke","warn"],positonLeft=[20.677,39.58,59.635];

                    //2017-11-1 修改：如果为黑名单的人，将出现警告标志
                    var str = ""
                    if(data.event == 1){
                        str +='<div style="position: absolute;left: '+
                            positonLeft[index]+'vw"><div class="welcome_userInfo_box" style=" background: url(\'/static/images/welcome/warnBg.png\');' +
                            'margin-left:'+marginIndex[index]+'vw;box-shadow: 0px 0px 30px 5px #ff3d3d">';
                    }else{
                        str ='<div style="position: absolute;left: '+
                            positonLeft[index]+'vw"><div class="welcome_userInfo_box" style=" background: url(\'/static/images/box.png\');;margin-left:'+marginIndex[index]+'vw;">';
                    }
                    // var str ='<div style="position: absolute;left: '+positonLeft[index]+'vw"><div class="welcome_userInfo_box" style=" background: url(\'/static/images/box.png\');;margin-left:'+marginIndex[index]+'vw;">';
                       str += '<img class="welcome_head_infoBg" src="/static/images/headBg.png" >'+
                        '<img class="userHeader_info" src="'+(main.imgPath+data.pic)+'" >'+
                        '<div class="userHeader_info_time">'+data.time+'</div>'+
                        '<div class="userHeader_info_name">'+data.pname+'</div>';
                    if(data.event == 1){
                        str+='<div class="userHeader_info_type"><img  src="/static/images/welcome/warn.png"></div></div></div>'
                    }else{
                        str += '<div class="userHeader_info_type"><img  src="/static/images/'+userType[data.persontype]+'.png"></div></div></div>'
                    }
                        // str += '<div class="userHeader_info_type"><img  src="/static/images/'+userType[data.persontype]+'.png"></div></div></div>'
                    var showDiv =$(str);
                    $(".welcome_userInfo_div").append(showDiv);


                        //创建前期移动style
                        if($(".beforeMove"+index).length == 0){
                             var style="<style class='beforeMove"+index+"' type='text/css'>";
                            style +=".beforeMove"+index+"{" +
                                "animation: beforeMoveAnimation"+index+" "+main.time1+"s ease-in;\n" +
                                "  animation-fill-mode:forwards;\n" +
                                "}\n";
                            style += "@keyframes beforeMoveAnimation"+index+"{\n" +
                                "0%{" +
                                // "\ntop:8vw;\nposition:absolute;\nleft:"+(20*(index+1))+"vw;\nwidth:0;\nheight:0;" +
                                "\nopacity:0;" +
                                "" +
                                "\n};\n" +
                                "100%{" +
                                "\nopacity:1\n" +
                                "\n}" +
                                "}";
                            style +="</style>"

                            $("body").append(style);

                        }

                        //创建后期移动style
                        if($(".afterMove"+index).length == 0){
                             var style="<style class='afterMove"+index+"' type='text/css'>";
                            style +=".afterMove"+index+"{" +
                                "animation: afterMoveAnimation"+index+" "+main.time3+"s ease-out;\n" +
                                "  animation-fill-mode:forwards;\n" +
                                "left:"+positonLeft[index]+"vw;\n"+
                                "}\n";
                            style += "@keyframes afterMoveAnimation"+index+"{\n" +
                                "0%{" +
                                // "\nopacity:1;\n" +
                                "left:"+positonLeft[index]+"vw;\n" +
                                "\n};\n" +
                                "50%{" +
                                // "\nopacity:0.5;\n" +
                                "left:"+(positonLeft[index]/2)+"vw;\n" +
                                "}"+
                                "100%{" +
                                // "\nopacity:0;\n" +
                                "left:0vw;\n"+
                                "\n}\n" +
                                "}";
                            style +="</style>"

                            $("body").append(style);

                        }
                        //给右边的记录框添加记录


                        //调用动画方法
                        main.contorlMove({
                            dom:showDiv,
                            classList:[{
                                time:main.time1,
                                name:"beforeMove"+index,
                                callback:function () {
                                    main.addHistory(data);
                                    //播放音频
                                    main.playAudio(data);
                                }
                            },{
                                time:main.time2,
                                name:'',
                                callback:function (dom) {
                                    // $(dom).children(".info").show();
                                }
                            },{
                                time:main.time3,
                                name:"afterMove"+index,
                                callback:function (dom) {

                                    $(dom).remove();

                                    def.resolve(index);
                                    // //改变节点的样式
                                    // $(dom).css("filter","brightness(1.0)");
                                    // //移除相应的class
                                    // $(dom).removeClass("beforeMove"+index);
                                    // $(dom).removeClass("afterMove"+index);

                                }
                            }]
                        })


                  // })


              },0);
              return def;
            },
            playAudio:function (param) {
                var stopAudio = function () {
                    if($("#warnAudio").length !==0){
                        $("#warnAudio")[0].parse();
                    }
                    if($("#audio").length !== 0){
                        $("#audio")[0].parse();
                    }
                }
                if(param.event == 1){

                    if($("#warnAudio").length == 0){
                        $("body").append("<audio id='warnAudio' style='display: none'><source src='/static/video/warn.mp3' type='audio/mp3' ></audio>")
                    }

                    $("#warnAudio")[0].play();
                }else{
                    if($("#audio").length == 0){
                        // var dom = $("<audio id='audio' style='display: none'><source src='/static/video/1.mp3' type='audio/mp3' ></audio>")
                        $("body").append("<audio id='audio' style='display: none'><source src='/static/video/1.mp3' type='audio/mp3' ></audio>")
                    }
                    $("#audio")[0].play();
                }

                // $(dom)[0].play();
            },
            addHistory:function (data) {
                //bug修复，运行时间过久后导致浏览器好用内存增加，
                //修复，不显示的历史记录全部删除


                  //根据数据在右边添加记录
                  //修改：修改右边显示的样式，及移动样式调整
                var str ='<div class="history_detail" >' +
                    '<img src="/static/images/headBg.png" class="history_detail_img1">'+
                    '<img src="'+(main.imgPath+data.pic)+'" class="history_detail_img2">'+
                    '<div class="history_detail_name">'+data.pname+'</div>'+
                    '<div class="history_detail_clock"><img  src="/static/images/clock.png"></div>'+
                    '<div class="history_detail_time">'+data.time+'</div>'+
                '</div>';

                //当延时加载记录时有异步问题
                //采用闭包形式控制动画
                //采用


                //改动：历史记录从上往下展示
                // $(".historyListScroll").append(str);
                $(".historyListScroll").prepend(str);

                var length = $(".history_detail").length;

                if(length>5){
                    //删除多余的历史节点
                    $(".history_detail:eq("+(length-1)+")").remove();
                }

                // var len =$(".history_detail").length;
                // if(len>5){
                //
                //     var height = $(".historyListScroll").css("margin-top","-"+((len-5)*5.309)+"vw");
                // }

                // var len = $(".historyList").children().length;
                // if(len-5>=0){
                //     var heigt = $($(".scrollDiv").children[0]).css("height");
                //     //当前条数大于5条时，
                //     // setTimeout(function () {
                //         $(".scrollDiv").append(str);
                //         var length = $(".scrollDiv").children().length;
                //         $(".scrollDiv").css("margin-top","-"+((length-5)*4)+"vw");
                //     // },main.time1*1000)
                // }else{
                //     // setTimeout(function () {
                //         $(".scrollDiv").append(str);
                //     // },main.time1*1000)
                // }
            },
            contorlMove:function (param) {
                //修改：将数组动画转化为单个节点单独执行动画，控制动画完成的时间
                //   手动传入，不再监听动画完成事件
                //传入的参数改为对象
                //具体结果如下
                /*
                * {
                     dom:指定具体图片
                     classList:[{time:0ms,
                             name:classname，
                               callback:function () {
                                    动画执行完成时的动作
                               }
                }
                * */
                var dom = param.dom, classList = param.classList, classIndex = 0, classLen = param.classList.length;
                //处理节点的等待动画
                (function addClass (objectParam){
                    if(objectParam.name){
                        $(dom).addClass(objectParam.name);
                    }else{
                        objectParam.callback(dom);
                    }
                    setTimeout(function () {
                        //当前指针 +1
                        classIndex += 1;
                        if(objectParam.callback&&objectParam.name){
                            objectParam.callback(dom);
                        }

                        if (classIndex < classLen) {
                            addClass(classList[classIndex])
                        } else {
                            // deffer.resolve();
                            return
                        }

                    }, objectParam.time*1000);
                })(classList[0]);

                // return deffer;
            },
            initTime:function () {

                //如果今天没有初始化事件，则初始化时间,如果已经初始化了时间，则和ininDay比对，如果当前为时间为同一天
                //不初始化日期框，否则初始化日期框
                var initCalendar = function (year,month,day,weekDay) {
                    var weekDayShow = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
                    $(".nowDay").html(day);
                    $(".year").html(weekDayShow[weekDay]+" "+year+"."+month);
                }
                var changeTime = function () {

                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1<10?("0"+(data.getMonth()+1)):(date.getMonth()+1);
                    var day = date.getDate()<10?("0"+date.getDate()):date.getDate();
                    var weekday = date.getDay();
                    var h =date.getHours()<10?("0"+date.getHours()):date.getHours();
                    var m =date.getMinutes()<10?("0"+date.getMinutes()):date.getMinutes();
                    var s =date.getSeconds()<10?("0"+date.getSeconds()):date.getSeconds();
                    $(".time").html(h+":"+m+":"+s+"</div>")
                    if(!main.ininDay){
                        main.ininDay = year+"-"+month+"-"+day;
                        initCalendar(year,month,day,weekday);
                    }else{
                        //判断当前天数是否为同一天
                        var str = year+"-"+month+"-"+day;
                        if(str !== main.ininDay ){
                            initCalendar(year,month,day,weekday);
                        }
                    }
                }
                changeTime();
                //设置定时器，每秒中刷新一次
                var timer = setInterval(function () {
                   changeTime()
                },1000)
            },
            draw:function(url){
                var def = $.Deferred();
                var data1= ['/static/images/bg02.png'];
                data1.push(url);
                var c=document.createElement('canvas'),
                    ctx=c.getContext('2d'),
                    len=data1.length;
                c.width=290;
                c.height=265;
                ctx.fillStyle='transparent';//画布填充颜色
                ctx.fill();
                function circleImg(ctx, img, x, y, r) {
                    ctx.save();
                    var d =2 * r;
                    var cx = x + r;
                    var cy = y + r;
                    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                    ctx.clip();
                    ctx.drawImage(img, x, y, d, d);
                    ctx.restore();
                 }
                function drawing(n){
                    if(n<len){
                        var img=new Image;
                        //img.crossOrigin = 'Anonymous'; //解决跨域
                        img.src=data1[n];
                        img.onload=function(){
                            if(n == 0){
                                ctx.drawImage(img,0,0,290,265);
                            }else{
                                circleImg(ctx,img,40,28,105);
                            }
                            drawing(n+1);//递归
                        }
                    }else{
                        //保存生成作品图片
                        // convertCanvasToImage(c);
                        def.resolve(c.toDataURL("image/png"));
                    }
                }
                drawing(0);
                return def;
         },
        // convertCanvasToImage:function (canvas) {
        //     var hc_image = new Image();
        //     hc_image.src = canvas.toDataURL("image/png");
        //     $('#imgBox').html(hc_image);
        // }
    };
    main.init();
})