var mysqlConfig =  require('../../sql/mysqlConfig');
var  mysql = require('mysql');

var conn = mysql.createConnection(mysqlConfig);

var DangJiBiBei = {
    // CURD 代表创建(Create)、读取(Read)更新(Update)和删除(Delete)操作
    //当季必备
    selectDangjibiei: function (sql,callback) {
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
    //当季推荐商品
    selectDangjibieiRecommanGoods:function (sql,callback) {
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

module.exports = DangJiBiBei;