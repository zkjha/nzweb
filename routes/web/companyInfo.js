/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//公司信息管理
//type ：0 公司信息;1 部门信息；2 职位信息
router.get('/list', function(req, res, next) {
    var type = req.query.type;
    res.render('admin/companyInfo/list',
        {
            title:	'nztd',
            type:type
        }
    );
});





module.exports = router;
