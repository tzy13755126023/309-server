var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var Order = {    
    //获取订单状态所有均未完成的数据  
    GetDiscompleted: function (sql,callback) {
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
   //获取状态为  待发货  订单数据  
    GetDaifahuo: function (sql,callback) {
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
    //获取状态为  待收货  订单数据  
    GetDaiShouhuo: function (sql,callback) {
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
    //获取状态为   待评价  订单数据  
    GetDaiPingJia: function (sql,callback) {
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
    //获取状态为   已完成  订单数据 和 获取已完成订单总利润
    GetYiWanCheng: function (sql,callback) {
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
    //将订单状态修改为 待收获 (orderstatus=3)
    updateOrderDaiShouHuo: function (sql,arr,callback) {
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
module.exports = Order;