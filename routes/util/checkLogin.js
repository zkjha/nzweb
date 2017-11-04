/**
 * Created by liupengyan on 16/12/12.
 * 用户登陆拦截
 */
var session = require("./session");
var loginIntercepter=function(req, res, next) {
    var x_requested_with=req.get("x-requested-with");
    if(x_requested_with){//ajax请求
        console.log("ajax请求拦截");
        var cache = req.cookies&&req.cookies.cache||{};
        if(!cache.username){
            var json_body={"code":-1,"msg":"未登陆"};
            res.send(json_body);
        }else{
            if(cache.hash == session.userInfo[cache.username]){
                next();
            }else{
                var json_body={"code":-1,"msg":"未登陆"};
                res.send(json_body);
            }
        }

    }else{//网页请求
        console.log("网页请求拦截");
        var cache = req.cookies&&req.cookies.cache||{};
        if(!cache.username){
            res.redirect("/admin/login");
        }else{
            if(cache.hash == session.userInfo[cache.username]){
                next();
            }else{
                res.redirect("/admin/login");
            }
        }

    }

};

module.exports = loginIntercepter;