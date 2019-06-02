var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var ThroughGoods = {    
    //向浏览记录表中添加信息(封装接口)
    addToThroughGoods: function (sql,arr,callback) {
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
    //查看浏览记录中的商品信息(封装接口)
    selectThroughGoods: function (sql,arr,callback) {
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
    //清空浏览记录(封装接口)
    deleteThroughGoods: function (sql,arr,callback) {
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
module.exports = ThroughGoods;