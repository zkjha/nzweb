$(document).ready(function () {
    var main = {
        init:function () {
            // $(".moveImg").on("animationend",function (e) {
            //     console.log(e);
            // });

            //获取所有图片并展示























            //初始化页面模式
            main.initModal();


            main.event();

            //图片移动到位子后，处理显示内容
            // main.alertMsg();
        },
        event:function () {
            //绑定退出事件
            $("#quit").on("click",function () {
                req
            })


        },



        //根据返回的数据
        initModal:function () {
            var dom = $(".moveImg");
            dom.animate({
                top:'45%',
                left:'45%',
            },2000,function () {
                console.log("1");
                dom.addClass("afterMove");


            })
            // $(".flipper").addClass("turnBack");
        },



        getWindowHeight:function () {
            if(document.compatMode == "BackCompat") {
                return document.body.scrollHeight
                // return {
                    // width: document.body.scrollWidth,
                    // height: document.body.scrollHeight
                    // height: document.body.scrollHeight
                // };
            } else {
                return Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
                // {
                //     width: Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),
                //     height: Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)
                // }
            }
        },
    };
    main.init();
})