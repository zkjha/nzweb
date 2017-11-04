/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//权限管理列表
router.get('/list', function(req, res, next) {
    res.render('admin/manager/list',
        {
            title:	'nztd',
        }
    );
});

//新增管理员
router.get('/add', function(req, res, next) {
    res.render('admin/manager/add',
        {
            title:	'nztd',
        }
    );
});




module.exports = router;
