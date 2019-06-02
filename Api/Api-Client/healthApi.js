var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var HealthData = {    
     //获取所有健康资讯
    readhealthData: function (sql,callback) {
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
    //获取详细健康资讯(封装接口)
    readXXhealthData: function (sql,callback) {
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
}
module.exports = HealthData;