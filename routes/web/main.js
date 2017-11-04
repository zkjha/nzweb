/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//后台管理界面
router.get('/', function(req, res, next) {
    res.render('admin/main',
        {
            title:	'nztd',
        }
    );
});


module.exports = router;
