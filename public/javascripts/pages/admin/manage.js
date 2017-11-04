/**
 * Created by  on .
 */

require.config({

    baseUrl:"/static/javascripts",
    shim: {
        'lib/bootstrap': {
            deps: ['lib/jquery']
        }
    },
});

// Start the main app logic.
requirejs(['lib/jquery','lib/bootstrap'],function($,bootstrap){

    //初始化用户名称
    var username = location.href.split("?")[1];
    $(".username").html(username);

    //页面布局格式
    changeiframesize();

    //设默认语言为选中状态
    if(localStorage.getItem("lan")){
        $("select option[value="+localStorage.getItem('lan')+"]").attr("selected",true);
    }else{
        localStorage.setItem("lan",localStorage.getItem("navigatorLan"));
    }


    //切换语言事件
    $("#changLan_select").on("change",function (e) {
        localStorage.setItem("lan",e.target.value);
        changLan(e.target.value||lan);
    })

    //点击退出按钮事件
    $("#quit").on("click",function () {
        location.href="/admin/login"

    })
    $(window).resize(function(){
        changeiframesize();
    });

    //给iframe背景添加样式
    var iframeWindow = document.getElementById("J_iframe");
    if(iframeWindow.contentWindow){
        var ifBody = iframeWindow.contentWindow.document.body
        $(ifBody).css({
            "margin-top": "2vw"
        });
    }


    $(".lpy-sidebar-first a").click(function(){
        $(".lpy-sidebar-second").hide();
        $(this).parent().next().slideDown();
    });

    $(".nav-ul").on("click",function () {
        $(".nav-ul").each(function (t,dom) {
            $(dom).removeClass("nav-click");
            $(dom).removeClass("nav-border");
            var ul = $(dom).children("ul");
            $(ul).removeClass("nav-click");
        })
        $(this).addClass("nav-click");
        $(this).addClass("nav-border");
        var ult = $(this).children("ul");
        $(ult).addClass("nav-click");
    })

    $(".lpy-sidebar-first:first a").click();
    $(".lpy-sidebar-second li a").click(function(){
        var _this=$(this);
        var url=_this.attr("data-url");
        $(".active").removeClass("active");
        _this.parent().addClass("active");
        $("#J_iframe").attr("src",url);
    });
    $(".lpy-sidebar-second:first li:first a").click();
    function changeiframesize(){
        var window_height=$(window).height();
        $(".main").css("height",window_height-55)
    }
    $(".dhx_set").click(function(){
        var _this=$(this);
        var url=$(this).attr("data-url");
        $("#J_iframe").attr("src",url);
    });


});
