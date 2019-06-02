var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var storesruzhu = {
	//获取商家入驻数据  来判断当前用户是否是入驻商家
    GetStoresInfo: function (sql,arr,callback) {
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
    //判断商家ID是否被占用 
    isStoreID: function (sql,arr,callback) {
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
    //申请商家入驻(添加商家)
    addStores: function (sql,arr,callback) {
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

module.exports = storesruzhu;