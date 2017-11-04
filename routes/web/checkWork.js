/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//列表
router.get('/list', function(req, res, next) {
    res.render('admin/checkWork/list',
        {
            title:	'nztd'
        }
    );
});
//新增
router.get('/add', function(req, res, next) {
    res.render('admin/checkWork/add',
        {
            title:	'nztd'
        }
    );
});
//修改
router.get('/change', function(req, res, next) {
    var ruleId = req.query.ruleId;

    var data = JSON.parse(req.query.data);
    res.render('admin/checkWork/change',
        {
            title:	'nztd',
            ruleId:ruleId,
            data:data
        }
    );
});





module.exports = router;
