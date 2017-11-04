/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//新增
router.get('/add', function(req, res, next) {
    var type = req.query.type;
    var uploadType = req.query.uploadType||"";
    res.render('admin/photo/addPhoto',
        {
            title:	'nztd',
            type:type,
            uploadType:uploadType
        }
    );
});

//列表
router.get('/list', function(req, res, next) {
    var type = req.query.type;
    res.render('admin/photo/list',
        {
            title:	'nztd',
            type:type
        }
    );
});
//修改页面
router.get('/update', function(req, res, next) {
    var type = req.query.type;
    var personid = req.query.personid;

    res.render('admin/photo/update',
        {
            title:	'nztd',
            type:type,
            personid:personid,
        }
    );
});




module.exports = router;
