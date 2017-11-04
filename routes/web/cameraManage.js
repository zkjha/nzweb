/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//摄像头管理列表
router.get('/list', function(req, res, next) {
    res.render('admin/camera/list',
        {
            title:	'nztd',
        }
    );
});

//新增摄像头
router.get('/add', function(req, res, next) {
    res.render('admin/camera/add',
        {
            title:	'nztd',
        }
    );
});

//修改摄像头信息
router.get('/change', function(req, res, next) {
    res.render('admin/camera/change',
        {
            title:	'nztd',
        }
    );
});




module.exports = router;
