var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var userInfo = {
    // CURD 代表创建(Create)、读取(Read)更新(Update)和删除(Delete)操作
    //查找：
    readAlluser: function (sql,callback) {
        conn.query(sql,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
    //登录：
    login: function (sql,arr,callback) {
        // query可以接受三个参数
        // 参数1：数据库语句
        // 参数2：数据库语句参数 [Array]
        // 参数3：回调函数
        conn.query(sql,arr,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
    //修改用户信息
    UpdateInfo: function (sql,arr,callback) {
        conn.query(sql,arr,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
    // 删除用户
    deleteInfo: function (sql,arr,callback) {
        conn.query(sql,arr,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
    //充值金额
    updateMoney: function (sql,arr,callback) {
        conn.query(sql,arr,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
    //模糊查找用户
    selectByusername: function (sql,arr,callback) {
        conn.query(sql,arr,function (error,result) {
            if (error){
                jsonp:{
                    code:-1
                    msg:'错误'
                }
            }else{
                callback(result);
            }
        })
    },
}

module.exports = userInfo;