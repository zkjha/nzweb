/**
 * Created by zkj on 2017/8/2 0002.
 */
var express = require('express');
var router = express.Router();
var test = require("../util/hello/Client.js");


//前台展示页面
router.get('/', function(req, res, next) {
    res.cookie("cache","");
    res.render('admin/login',
        {
            title:	'nztd',
        }
    );
});




module.exports = router;
