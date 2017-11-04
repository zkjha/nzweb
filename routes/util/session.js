var crypto = require('crypto');

var session ={
    hashPW:function (userName,pwd) {
        var hash = crypto.createHash('md5');
        hash.update(userName + pwd);
        return hash.digest('hex');
    },
    userInfo:{

    }

};
module.exports = session;