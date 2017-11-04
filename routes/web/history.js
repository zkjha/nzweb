/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//历史记录列表
router.get('/list', function(req, res, next) {
    res.render('admin/history/list',
        {
            title:	'nztd'
        }
    );
});


//考勤历史记录列表
router.get('/checkWorkList', function(req, res, next) {
    res.render('admin/history/checkWorkList',
        {
            title:	'nztd'
        }
    );
});




module.exports = router;
