var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var socket


var checkLogin = require("./routes/util/checkLogin");


//前台展示页面
var showWeb = require("./routes/web/show");
var welcomeWeb = require("./routes/web/welcome");


//后台管理系统

//登录界面
var login = require("./routes/web/login");
var ajaxLogin = require("./routes/ajax/login");

//后台管理主页面
var main = require("./routes/web/main");



//管理员管理
var manager = require("./routes/web/manager");
var ajaxManager = require("./routes/ajax/manager");

//摄像头管理
var cameraManage = require("./routes/web/cameraManage");
var ajaxCameraManage= require("./routes/ajax/cameraManage");


//图片上传管理
var photoManage = require("./routes/web/photoManage");
var ajaxPhotoManage = require("./routes/ajax/photoManage");


//历史记录管理
var history = require("./routes/web/history");
var ajaxHistory = require("./routes/ajax/history");


//系统设置
var companyInfo = require("./routes/web/companyInfo");
var ajaxCompanyInfo = require("./routes/ajax/companyInfo");

//考勤规则
var checkWork = require("./routes/web/checkWork");
var ajaxCheckWork = require("./routes/ajax/checkWork");



//迎宾语设置
var greetingWord = require("./routes/web/greetingWord");
var ajaxGreetingWord = require("./routes/ajax/greetingWord");


//会议管理
var meeting = require("./routes/web/meeting");
var ajaxMeeting = require("./routes/ajax/meeting");


//测试
var testFile = require("./routes/util/test");


//
// var b = new Buffer("efsdfeatge");
// Buffer.prototype.toByteArray = function () {
//     return Array.prototype.slice.call(this,0);
// }
// console.log(b);
// console.log(b.toByteArray());


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use("/static",express.static(path.join(__dirname, 'public')));


//前台展示页面

app.use("/test",testFile);

//签到
app.use("/sign",showWeb);

//迎宾，考勤
app.use("/welcome",welcomeWeb);




//后台管理系统


//登录界面
app.use("/admin/login",login);
app.use("/admin/ajaxLogin",ajaxLogin);

//所有登录后才能完成的请求(登录拦截)
app.use("/admin/hasLogin/*",checkLogin);


//后台管理界面主页面
app.use("/admin/hasLogin/main",main);


//系统设置
app.use("/admin/hasLogin/companyInfo",companyInfo);
app.use("/admin/hasLogin/ajaxCompanyInfo",ajaxCompanyInfo);

//考勤
app.use("/admin/hasLogin/checkWork",checkWork);
app.use("/admin/hasLogin/ajaxCheckWork",ajaxCheckWork);

//权限管理
app.use("/admin/hasLogin/manager",manager);
app.use("/admin/hasLogin/ajaxManager",ajaxManager);


//摄像头管理
app.use("/admin/hasLogin/camera",cameraManage);
app.use("/admin/hasLogin/ajaxCamera",ajaxCameraManage);


//图片上传管理
app.use("/admin/hasLogin/photo",photoManage);
app.use("/admin/hasLogin/ajaxPhoto",ajaxPhotoManage);


//历史记录查询
app.use("/admin/hasLogin/history",history);
app.use("/admin/hasLogin/ajaxHistory",ajaxHistory);


//迎宾语管理
app.use("/admin/hasLogin/greetingWord",greetingWord);
app.use("/admin/hasLogin/ajaxGreetingWord",ajaxGreetingWord);



//会议管理
app.use("/admin/hasLogin/meeting",meeting);
app.use("/admin/hasLogin/ajaxMeeting",ajaxMeeting);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
