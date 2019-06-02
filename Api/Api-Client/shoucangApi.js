var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var ShouCang = {    
	//收藏商品和商家共用一套api
    //向收藏商家/商品表中添加信息(封装接口)
    addTOShoucang: function (sql,arr,callback) {
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
    //判断该商家/商品是否已经被收藏过
    selectByuserAnStoresID: function (sql,arr,callback) {
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
    //取消收藏商家/商品
    QXStarStores: function (sql,arr,callback) {
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
    //查询收藏商家/商品 信息
    ChaxunStarStore: function (sql,arr,callback) {
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
module.exports = ShouCang;