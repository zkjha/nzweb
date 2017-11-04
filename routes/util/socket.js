function initSocket() {
    return new Promise(function (resolve,reject) {
        var app1 = require('express')();
        var server1 = require('http').createServer(app1);
        var io = require('socket.io')(server1);
        io.on('connection', function(client){
            // clientSocket = client;
            client.myid = this.id;
            console.log("socket connect")
            //返回唯一id值，推送数据时根据id来推送
            client.emit("ok",{id:this.id});
            //接受断开连接事件
            client.on(this.id, function(data){
                client.disconnect(data);
            });
            resolve(client);

        });
        server1.listen(3001);
    })
    // var app1 = require('express')();
    // var server1 = require('http').createServer(app1);
    // var io = require('socket.io')(server1);
    // io.on('connection', function(client){
    //     // clientSocket = client;
    //     client.id = this.id;
    //     console.log("socket connect")
    //     //返回唯一id值，推送数据时根据id来推送
    //     client.emit("ok",{id:this.id});
    //     //接受断开连接事件
    //     client.on(this.id, function(data){
    //         client.disconnect(data);
    //     });
    //
    // });
    // server1.listen(3001);
}

var socket = {
    allconnects:{

    },
    init:function () {
        //每次初始化时，初始化链接库
        socket.allconnects = {};
        var app1 = require('express')();
        var server1 = require('http').createServer(app1);
        var io = require('socket.io')(server1);
        io.on('connection', function(client){
            //连接成功后将连接存放在缓存中
            socket.allconnects[client.id] = client;

            console.log(client.id);
            socket.client = client;
            // clientSocket = client;
            console.log("socket connect")
            //返回唯一id值，推送数据时根据id来推送
            client.emit("ok",{id:client.id});
            //接受断开连接事件
            // client.on(client.id, function(data){
            //     console.log("disconnecting");
            //     client.disconnect(data);
            // });
            client.on("disconnect",function (data) {
                console.log("disconnectIng");
                console.log(data);
                //释放缓存
                socket.allconnects[client.id] =""
            })
        });
        server1.listen(3001);
    },
    emit:function (id,data) {
        if(socket.allconnects[id]){
            socket.allconnects[id].emit(id,data);
            // console.log(socket.allconnects.length);
        }
    },
    disConnnect:function (id) {
        if(socket.allconnects[id]){
            socket.allconnects[id].emit("dis"+id,"disconnect");
        }
    }
}
module.exports = socket;

