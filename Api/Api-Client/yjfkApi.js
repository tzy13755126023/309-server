var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var YJFK = {    
    //向意见反馈表中添加信息(封装接口)
    addToYJFK: function (sql,arr,callback) {
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
}
module.exports = YJFK;