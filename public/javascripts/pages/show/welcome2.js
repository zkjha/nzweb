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
            time1:1,
            time2:2,
            time3:1,
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
                var data = {}
                data.list = [{
                    pic:"/static/images/4.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/5.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                },{
                    pic:"/static/images/6.jpg",
                    type:0,
                    pname:"罗祥子"
                }];
                main.moveAction(data);
                // 将图片合成为一张
                // main.draw(data.url).then(function (data) {
                //     var showDiv = $("<div style=''><div style='width: 100%'><img width='100%' src='"+data+"'></div>" +
                //         "<div class='info' style='display: none'>罗祥子</div><div class='info' style='display: none'>欢迎光临</div></div>")
                //     $("body").append(showDiv);
                //
                //     var style="<style type='text/css'>";
                //     style +=".test{" +
                //         "animation: testMove 1s;\n" +
                //         "top:8vw;\nposition:absolute;\nleft:20vw;\nwidth:20vw;\nheight:25vw;\nbackground:#2f0c0c\n" +
                //         "}\n";
                //     style += "@keyframes testMove{\n" +
                //         "0%{" +
                //         "\ntop:8vw;\nposition:absolute;\nleft:20vw;\nwidth:0;\nheight:0;" +
                //         "" +
                //         "\n};\n" +
                //         "100%{" +
                //         "\ntop:15vw;\nposition:absolute;\nleft:20vw;\nwidth:20vw;\nheight:25vw;\n" +
                //         "\n}" +
                //         "}";
                //     style +="</style>"
                //
                //     $("body").append(style);
                //
                //     $(showDiv).addClass("test")
                // });

                // main.event();
                // // 启动监听推送事件
                // main.startShowImg();
                //
            },

            event:function () {

            },
            startShowImg:function () {
                //打开socket.io监听服务器端返回的数据
                var socket = io.connect();
                socket.on("connected",function (data) {
                    console.log(data);
                    //main.moveAction(data);
                });
                requstUtil.request({
                    url:"/welcome/getUserInfo",
                    data:{
                        camid:"43",
                    },
                    callback:function (data) {

                    }
                })

                //档接受到数据时，控制显示动画

            },
            moveAction:function (data) {
                //获取这次推送的内容
                var list = data.list||[];

                //本页面的动画一次最多显示三张，显示完成后记录其信息在有浮动窗口
                //并消除相应的节点


                //将对象分别加入相应的动画数组里面，进行动画排序等待
                for(var i = 0;i<list.length;i++){
                    if(main.index>2){
                        //如果当前指针大于2，则初始化相应的指针
                        main.index = 0
                    }
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
                    main.draw(data.pic).then(function (url) {
                        var showDiv = $("<div  style='color:white'><div style='width: 100%'><img width='100%' src='"+url+"'></div>" +
                            "<div style='width: 100%;text-align: center;margin-top: 1vw'><b>"+data.pname+"</b><br>欢迎光临</div></div>")
                        $("body").append(showDiv);


                        //创建前期移动style
                        if($(".beforeMove"+index).length == 0){
                            var style="<style class='beforeMove"+index+"' type='text/css'>";
                            style +=".beforeMove"+index+"{" +
                                "animation: beforeMoveAnimation"+index+" "+main.time1+"s ease-in;\n" +
                                "  animation-fill-mode:forwards;\n" +
                                "top:8vw;\nposition:absolute;\nleft:"+(20*(index+1)+index)+"vw;\nwidth:15vw;\nheight:22vw;\nbackground:#A65000\n" +
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
                                "top:8vw;\nopacity:0;\nfilter: alpha(opacity=0);\nposition:absolute;\nleft:"+(20*(index+1)+index)+"vw;\nwidth:15vw;\nheight:22vw;\nbackground:#A65000\n" +
                                // "\nwidth:20vw;\nheight:25vw;" +
                                "}\n";
                            style += "@keyframes afterMoveAnimation"+index+"{\n" +
                                "0%{" +
                                "\nopacity:1" +
                                "" +
                                "\n};\n" +
                                "100%{" +
                                "\nopacity:0\n" +
                                "\n}\n" +
                                "}";
                            style +="</style>"

                            $("body").append(style);

                        }
                        //给右边的记录框添加记录
                        main.addHistory(data);

                        //调用动画方法
                        main.contorlMove({
                            dom:showDiv,
                            classList:[{
                                time:main.time1,
                                name:"beforeMove"+index
                            },{
                                time:main.time2,
                                name:'',
                                callback:function (dom) {
                                    $(dom).children(".info").show();
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


                    })


                },0);
                return def;
            },
            addHistory:function (data) {
                //根据数据在右边添加记录
                console.log(data);
                var str = "<div style='font-size:1vw;height: 1.5vw;margin-bottom: 1vw'>";
                str += data.pname;
                if(data.type == 0){
                    str +="签到成功";
                }else{
                    str += "欢迎光临";
                }
                str +="</div>";
                var len = $(".scrollDiv").children().length;
                if(len-24>=0){
                    var heigt = $($(".scrollDiv").children[0]).css("height");
                    //当前条数大于25条时，
                    setTimeout(function () {
                        $(".scrollDiv").append(str);
                        $(".scrollDiv").css("margin-top","-"+(len-24)+"vw");
                    },main.time1*1000)
                }else{
                    setTimeout(function () {
                        $(".scrollDiv").append(str);
                    },main.time1*1000)
                }




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
                var changeTime = function () {
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = date.getMonth()+1<10?("0"+(data.getMonth()+1)):(date.getMonth()+1);
                    var day = date.getDate()<10?("0"+date.getDate()):date.getDate();
                    var h =date.getHours()<10?("0"+date.getHours()):date.getHours();
                    var m =date.getMinutes()<10?("0"+date.getMinutes()):date.getMinutes();
                    var s =date.getSeconds()<10?("0"+date.getSeconds()):date.getSeconds();
                    $(".time").html("<div>"+year+"年"+month+"月"+day+"日</div><div>"+h+" : "+m+" : "+s+"</div>")
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