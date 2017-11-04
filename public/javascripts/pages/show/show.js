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
            //上次数据push进去数组的指针
            index:0,
            isOverMove:false,
            //用于存储将要执行的动画的节点对象
            activObject:{
                0:[],
                1:[],
                2:[],
                3:[],
                4:[],
                5:[]
            },
            //第一次运动时间
            time1:0.3,
            //停留时间
            time2:1,
            //收尾动作时间
            time3:0.3,
            code:-1,
            init:function () {
                // var socket = io.connect();
                // socket.on("connected",function (data) {
                //     console.log(data);
                //     data.id="1";
                //     data.url = "/static/images/4.jpg";
                //     var arr = {
                //         list:[data]
                //     }
                //     main.actionImgs(arr);
                // });



                //初始化圆形进度条
                main.initCricle();

                main.widthNum =document.body.clientWidth;
                main.heightNum =document.body.clientHeight;

                //初始化参会人员
                main.initMember();


                //初始化摄像头
                main.initCam();

                //创建长连接接受数据并处理数据推送后的相应的动画处理
                main.getSendDataAndDoAction();

                main.event();

                var data = {};
                data.rsltlist=[{

                },{

                },{

                },{

                },];
                main.moveAction(data);


                //图片移动到位子后，处理显示内容
                // main.alertMsg();
            },
            initMember:function () {
                var data = [{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },{
                    personid:1,
                    userName:'傲慢',
                    picPath:"/static/images/4.jpg",
                },];
                //根据数据来初始化界面的所有参会人员
                main.initMenberByData(data);
            },
            initMenberByData:function (data) {
                var list = data.list||data||[];
                var str = ""
                for(var i=0;i<list.length;i++){
                    str += "<div style='opacity: 0.4;width: 6.1458vw;height: 7.6vw;display: inline-block;margin: 0.9895vw 0vw 0vw 0.595vw; border-radius: 4px;background-color: rgb(54,122,173);color:white'>" +
                        "<img style='width: 4.583vw;height:4.583vw;border-radius: 50%;margin: 0.78125vw 0.78125vw 0.52vw 0.78125vw' src='/static/images/5.jpg'>" +
                        "<div style='text-align: center;font-size: 0.9473vw'>李易峰</div>" +
                        " </div>";
                }
                $(".menberBg").html(str);
            },
            getSendDataAndDoAction:function () {
                //创建长连接
                main.connectSocket().then(function () {
                    //根据长连接获取到的id来发送请求，并获取数据
                    requstUtil.request({
                        url:"/show/getShowUsers",
                        data:{

                        },
                        callback:function (data) {
                            //获取导
                        }
                    })
                })
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
                // socket.on("connected",function (data) {
                //     console.log(data);
                //     main.moveAction(data);
                // });
                var id ="";
                main.socket.on("ok",function (data) {
                    //获取当前连接id值
                    main.socketId = data.id;
                    console.log(main.socketId);
                    //接受推送给当前id的数据
                    main.socket.on(data.id,function (data) {
                        console.log("getData");
                        //根据数据显示动画
                        main.moveAction(data);
                    });
                    def.resolve();
                });


                //当前页面刷新或者退出，断掉当前连接

                main.socket.on("disconnect",function (data) {
                    console.log("over");
                    // main.moveAction(data);
                });
                return def;
            },

            //处理动画
            moveAction:function (data) {
                //当前动画逻辑
                //直接在中间展示，展示完成后再移动到相应的位置，显示图片消失，背景图片变亮

                //获取这次推送的内容
                var list = data.rsltlist||[];

                //本页面的动画一次最多显示六张，显示完成后记录其信息在有浮动窗口
                //并消除相应的节点


                //将对象分别加入相应的动画数组里面，进行动画排序等待
                for(var i = 0;i<list.length;i++){
                    if(main.index>5){
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
                for(var j = 0;j<5;j++){
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
            initCricle:function () {

                var canvas = document.getElementById('canvas'),  //获取canvas元素
                    context = canvas.getContext('2d'),  //获取画图环境，指明为2d
                    centerX = canvas.width/2,   //Canvas中心点x轴坐标
                    centerY = canvas.height/2,  //Canvas中心点y轴坐标
                    rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
                    speed = 0.1; //加载的快慢就靠它了
                var centerX1 = ($(canvas).css("width").split("px")[0])/2 -5;
                //初始化画布大小后按比例重新定义画布大小
                $(canvas).css("width","5vw");
                //绘制5像素宽的运动外圈
                function blueCircle(n){
                    context.save();
                    context.beginPath();
                    context.strokeStyle = "#0bb9e4"; //设置描边样式
                    context.lineWidth = 5; //设置线宽
                    context.beginPath(); //路径开始
                    context.arc(centerX, centerY, centerX1 , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                    context.stroke(); //绘制
                    context.closePath(); //路径结束
                    context.restore();
                }
                //绘制白色外圈
                function whiteCircle(){
                    context.save();
                    context.beginPath();
                    context.fillStyle = "#eaeaea";
                    context.lineWidth = 5; //设置线宽
                    context.strokeStyle = "#b0c8e4";

                    context.arc(centerX, centerY, centerX1 , 0, Math.PI*2, false);
                    context.stroke();
                    context.closePath();
                    context.fill();
                    context.restore();
                }
                //百分比文字绘制
                function text(n){
                    context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
                    context.beginPath();
                    // context.strokeStyle = "#00a7ff"; //设置描边样式
                    // context.strokeStyle = "#00a7ff"; //设置描边样式
                    context.fillStyle = "#00a7ff"; //设置描边样式
                    context.font = "24px Arial"; //设置字体大小和字体
                    //绘制字体，并且指定位置
                    // context.strokeText(n.toFixed(0)+"%", centerX-18, centerY+10);
                    context.fillText(n.toFixed(0)+"%",centerX-18,centerY+10);
                    context.stroke(); //执行绘制
                    context.closePath();
                    context.fill();
                    context.restore();
                }
                //动画循环
                (function drawFrame(){
                    window.requestAnimationFrame(drawFrame);
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    whiteCircle();
                    text(speed);
                    blueCircle(speed);
                    if(speed > 100) speed = 0;
                    speed += 0.1;
                }());
            },
            initCam:function () {
                //获取所有的摄像头数据
                requstUtil.request({
                    url:"/sign/getAllCamInfo",
                    data:{},
                    callback:function (data) {
                        if(data.code == 0){
                            // console.log(data);
                            main.createCamSelect(data.listrslt);
                        }else{
                            alert("获取摄像头信息失败");
                            return
                        }
                    }
                })
            },

            createCamSelect:function (params) {
                //根据获取到的摄像头信息展示摄像头信息
                var camid = localStorage.getItem("camid");
                var str = "<select id='cam'>";
                for(var i =0;i<params.length;i++){
                    var data = params[i];
                    if(camid == data.camid){
                        str +="<option value='"+data.camid+"' selected>"+data.name+"</option>"
                    }else if(i == 0){
                        str +="<option value='"+data.camid+"' selected>"+data.name+"</option>"
                    }else{
                        str +="<option value='"+data.camid+"'>"+data.name+"</option>"
                    }

                }
                str +="</select>";
                $(".dropdown").html(str);
                if(camid){
                    main.camid = camid;
                    main.initModal();
                }
            },
            event:function () {
                //绑定退出事件
                // $("#quit").on("click",function () {
                //     req
                // }),

                // 监听一次动画结束事件
                $(".allImgs").on("animationend",function (e) {
                    main.isOverMove = true;
                });


                // //监听切换摄像头事件
                $(".dropdown").on("change","#cam",function () {
                    var camid=main.camid = $(this).val();
                    localStorage.setItem("camid",camid);
                    main.initModal();
                });
                //刷新页面断开长连接
                $(window).unload (function () {
                    //关闭当前连接
                    main.socket.close();
                });


            },
            //给当前节点添加设定好的样式class
            kandleAnimation:function (dom,params,index) {
                if(index>0){
                    $(dom).removeClass(params[index-1]);
                }
                $(dom).addClass(params[index]);
            },



            //根据返回的数据
            initModal:function () {
                //必须选择了摄像头id才能进行请求操作
                //获取所有的图片及当前模式
                requstUtil.request({
                    url:"/sign/getAllUserInfo",
                    data:{

                    },
                    callback:function (data) {
                        if(data.code == 0){
                            // console.log(data);
                            main.showAllImages(data);

                            //渲染完成，获取当前来访客户的数据
                            // main.showUsers();
                        }else{
                            return ;
                        }
                    }
                })

                //
                //
                // var dom = $(".moveImg");
                // dom.animate({
                //     top:'45%',
                //     left:'45%',
                // },2000,function () {
                //     console.log("1");
                //     dom.addClass("afterMove");
                //
                //
                // })
                // // $(".flipper").addClass("turnBack");
            },
            showAllImages:function (data) {
                //获取当前页面的可是宽高



                var list = data.list||[];
                var str ="<div class='imgContainer'>"
                for(var i = 0,l=list.length;i<l;i++){
                    str +="<div id='"+list[i].id+"' data-index='"+i+"' style='filter:brightness(0.5);display:inline-block;width: "+(main.widthNum/20)+"px;" +
                        "height:"+((main.widthNum/20))+"px;position: absolute;left: "+(i*(main.widthNum/20))+"px ;top:"+(parseInt(i/20)*(main.widthNum/20)+20)+"px'>" +
                        "<img class='bgImg' style='height: 100%;width: 100%'    src='"+list[i].url+"'></div>";
                }
                str +="</div>";

                $("#allImgs").html(str);

            },
            showUsers:function () {
                requstUtil.request({
                    url:"/sign/getShowUsers",
                    data:{
                        camid:main.camid,
                        rsltnum:main.code
                    },
                    callback:function (data) {
                        if(data.code == 0){
                            console.log(data);

                            main.code +=1;
                            main.actionImgs(data);
                            setTimeout(function () {
                                main.actionImgs(data);
                            },5000);
                        }else{

                            return ;
                        }
                    }
                })
            },

            //斜移动动画控制
            actionImgs:function (datas) {


                //处理数据，将数据分别放到不同的动画里面去

                for(var i = 0;i<datas.list.length;i++){
                    //重置mian.index
                    if(main.index>5){
                        main.index =0;
                    }
                    main.actionMove[main.index].push(datas.list[i]);
                    main.index +=1;
                }

                //diaoyong 6个动画方法
                for(var j = 0;j<6;j++){
                    var defFunc = function (index) {
                        main.doActionMethod(index).then(function (data) {
                            if(data){
                                defFunc(data);
                            }
                        })
                    };
                    defFunc(j);
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
                    //找到数据对应图片的具体位置及dom元素
                    var id = data.id;
                    var dom = $("#" + id + "");
                    var domIndex = $(dom).attr("data-index");

                    //给元素添加相应提示信息
                    //object 为第一次移动的动画，afterObject为最后收尾的动画
                    var leftWidth=[21.9166, 40.666, 59.416, 21.9166, 40.666, 59.416];
                    //2017-10-27:当前动画改变，不用取对应的节点初始值做动画
                    var dom = $(' <div style="position: absolute;top:'+(index>2?31.769:10.4166)+'vw;left: '+leftWidth[index]+'vw;width: 16.666vw;height: 19.27vw;background: url(\'/static/images/sign/showBg.png\');background-repeat: no-repeat;background-size: cover">\n' +
                        '        <div style="text-align: center;padding-top: 2.08vw;height: 13.297vw">\n' +
                        '            <img style="width: 5.729vw;height: 5.729vw;border-radius: 50%;" src="/static/images/4.jpg">\n' +
                        '        </div>\n' +
                        '        <img style="width:2.7vw;height:2.7vw;position: absolute;top: 10.3125vw;left:6.9791vw" src="/static/images/sign/right.png">\n' +
                        '        <div style="text-align: center">\n' +
                        '            <div style="font-size: 1.5625vw;color:#ffb4bc">欢迎光临</div>\n' +
                        '            <div style="font-size: 1.25vw">黄忠中</div>\n' +
                        '        </div>\n' +
                        '\n' +
                        '    </div>')

                    $(".main").append(dom);

                    // var childrenDiv = $("#" + id + ">div").length;
                    // //给节点添加人名及类型
                    // //如果当前节点不存在div，则创建相应的div，否则不创建
                    // if (childrenDiv == 0) {
                    //     var strInfo = "<div class='userInfo' style='text-align: center;color:white;display: none'><div>";
                    //     if (data.type == 0) {
                    //         strInfo += "签到成功";
                    //     } else {
                    //         strInfo += "欢迎光临"
                    //     }
                    //     strInfo += "</div><div>" + data.name + "</div></div>";
                    //     $(dom).append(strInfo);
                    // }


                    //创建对应动画的css
                    if($("style.moveImg"+index).length ==0){
                        var strStyle = "<style class='moveImg" + index + "' type='text/css'>";
                        strStyle += ".moveImg" + index + "{" +
                            "animation: imgsMove" + index + " "+main.time1+"s;\n" +
                            "  animation-fill-mode:forwards;\n" +
                            "  position: absolute;\n" +
                            "  top:0%;\n" +
                            "  left: 0%;\n" +
                            "  height:" + ((main.widthNum / 20)) + "px ;\n" +
                            "  width: " + ((main.widthNum / 20)) + "px;\n" +
                            "  filter: brightness(0.5);" +
                            "\n}\n" +
                            "@keyframes imgsMove" + index + " {\n0%{\n" +
                            "filter:brightness(0.5);\n" +
                            "left:" + ((domIndex % 20) * (main.widthNum / 20)) + "px;\ntop:" + (parseInt(domIndex / 20) * (main.widthNum / 20) + 20) + "px; }\n100%{\n";
                        if (index <= 2) {
                            strStyle += "filter:brightness(1.0);\ntop:" + (main.heightNum / 4) + "px;\nleft:" + ((main.widthNum / 3) + index * (main.widthNum / 10)) + "px;\nwidth: " + ((main.widthNum / 10)) + "px;height:" + ((main.widthNum / 10)) + "px\n }\n"
                        } else {
                            strStyle += "filter:brightness(1.0);\ntop:" + (main.heightNum / 4 + main.widthNum / 10 + 50) + "px;\nleft:" + ((main.widthNum / 3) + (index- 3) * (main.widthNum / 10)) + "px;\nwidth: " + ((main.widthNum / 10)) + "px;height:" + ((main.widthNum / 10)) + "px\n }\n"
                        }
                        strStyle += "</style>";
                        $(document.body).append(strStyle);
                    }

                    //创建收尾动画css
                    //如果已经有相同的style，则不再重新创建
                    if($("style.afterMoveImg"+domIndex).length == 0){
                        var  afterStyle = "<style class='afterMoveImg" + domIndex + "' type='text/css'>";
                        afterStyle += ".afterMoveImg" + domIndex + "{" +
                            "animation: afterImgsMove" + domIndex + " "+main.time3+"s;\n" +
                            "  animation-fill-mode:forwards;\n" +
                            "  position: absolute;\n" +
                            "  top:0%;\n" +
                            "  left: 0%;\n" +
                            "  height:" + ((main.widthNum / 20)) + "px ;\n" +
                            "  width: " + ((main.widthNum / 20)) + "px;\n" +
                            "  filter: brightness(0.5);" +
                            "\n}\n" +
                            "@keyframes afterImgsMove" + domIndex + " {\n0%{\n";
                        if (index <= 2) {
                            afterStyle += "filter:brightness(1.0);\ntop:" + (main.heightNum / 4) + "px;\nleft:" + ((main.widthNum / 3) + index * (main.widthNum / 10)) + "px;\nwidth: " + ((main.widthNum / 10)) + "px;height:" + ((main.widthNum / 10)) + "px\n }\n"
                        } else {
                            afterStyle += "filter:brightness(1.0);\ntop:" + (main.heightNum / 4 + main.widthNum / 10 + 50) + "px;\nleft:" + ((main.widthNum / 3) + (index - 3) * (main.widthNum / 10)) + "px;\nwidth: " + ((main.widthNum / 10)) + "px;height:" + ((main.widthNum / 10)) + "px\n }\n"
                        }
                        afterStyle += "\n100%{\n" +
                            "width:" + ((main.widthNum / 20)) + "px;height:" + ((main.widthNum / 20)) +
                            "px;\nleft:" + ((domIndex % 20) * (main.widthNum / 20)) + "px;\n" +
                            "top:" + (parseInt(domIndex / 20) * (main.widthNum / 20) + 20) + "px;\nfilter:brightness(1.0);}\n";

                        afterStyle += "</style>";
                        $(document.body).append(afterStyle);
                    }
                    //调用动画方法
                    main.contorlMove({
                        dom:dom,
                        classList:[{
                            time:main.time1,
                            // name:"moveImg"+index
                        },{
                            time:main.time2,
                            name:'',
                            callback:function (dom) {
                                // $(dom).children("div").show();
                            }
                        },{
                            time:main.time3,
                            name:"afterMoveImg"+domIndex,
                            callback:function (dom) {
                                //改变节点的样式
                                $(dom).css("filter","brightness(1.0)");
                                //移除相应的class
                                $(dom).removeClass("moveImg"+index);
                                $(dom).removeClass("afterMoveImg"+domIndex);
                                //删除相应的结束动画
                                $(".afterMoveImg"+domIndex).remove();
                                def.resolve(index);
                            }
                        }]
                    })
                },0)
                return def;



            },
            // removeClass:function (param) {
            //     for(var i= 0;i<param.length;i++){
            //         var data = param[i];
            //         var dom = data.dom;
            //         for(var j = 0;j<data.classList.length;j++){
            //             var classData = data.classList[j];
            //             $(dom).removeClass(classData.name);
            //         }
            //     }
            // },
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
            }


              /*  //控制动画执行顺序
                /!*[{
                     dom:指定具体图片
                     classList:[{time:0ms,
                             name:classname，
                               callback:function () {
                                    动画执行完成时的动作
                               }
                },,,]  动画的

                }]*!/
                var len = param.length;
                //如果所有动画执行完毕，初始化全局属性值
                if(main.index>=len){
                    //当前动画结束时清楚动画class


                    main.isOverMove = false;
                    main.index = 0;
                    console.log("ok11")
                    callback(param)

                    return deffer.resolve();
                }
                var data = param[main.index];//指定当前参数

                //获取当前对象里面动画的参数
                //classList里面可能有连续的几个动画，所以要遍历完成后再处理
                //classIndex是当前执行的classList指针
                var dom = data.dom,classList=data.classList,classIndex = 0,classLen = data.classList.length;

                //迭代classList 的函数
                //classObject 为classList 里面的对象
                var classFunction  = function (classObject) {

                    $(dom).addClass(classObject.name);
                    classIndex += 1;
                    if(main.isOverMove){
                        main.isOverMove =false;
                        //如果前面的动画已经结束，就开始下面一个
                        if(classIndex >=classLen){
                            //对象里面class 动画已经执行完毕,开始下一个对象执行动画
                            main.index += 1;
                            main.contorlMove(param,callback);
                        }else{
                            classFunction(classList[classIndex])
                        }
                    }else{
                        var timer = setInterval(function () {
                            if(main.isOverMove){
                                main.isOverMove =false;
                                clearInterval(timer);
                                if(classIndex >=classLen){
                                    //对象里面class 动画已经执行完毕,开始下一个对象执行动画
                                    main.index += 1;
                                    main.contorlMove(param,callback);
                                }else{
                                    classFunction(classList[classIndex])
                                }
                            }
                        },100)
                    }
                }
                classFunction(classList[classIndex]);
                return deffer;
            }*/
        };
        main.init();
    })