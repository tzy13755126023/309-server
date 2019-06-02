var express  = require('express');
var router = express.Router();
var userApi = require('../Api/Api-Client/userApi.js')
var qiantaiApi = require('../Api/Api-Client/qiantaiApi.js')
var storesApi = require('../Api/Api-Client/storesApi.js')
var storesgoodsApi = require('../Api/Api-Client/storesgoodsApi.js')
var shoucangApi = require('../Api/Api-Client/shoucangApi.js')
var throughGoodsApi = require('../Api/Api-Client/throughGoodsApi.js')
var yjfkApi = require('../Api/Api-Client/yjfkApi.js')
var addressApi = require('../Api/Api-Client/addressApi.js')
var zhanghuguanliApi =require('../Api/Api-Client/zhanghuguanliApi.js')
var orderApi  = require('../Api/Api-Client/orderApi.js')
var healthApi  = require('../Api/Api-Client/healthApi.js')
var recordApi  = require('../Api/Api-Client/recordApi.js')
var jiujiuApi  = require('../Api/Api-Client/jiujiuApi.js')
var dangjibibeiApi = require('../Api/Api-Client/dangjibibeiApi.js')
var storesruzhuApi  = require('../Api/Api-Client/storesruzhuApi.js')
var $sql = require('../sql/sqlMap-Client.js');  //关于商城Client的sql
const jwt = require('jsonwebtoken')

const header = {
  "alg": "HS256", 
  "typ": "JWT"
}
// Token 数据
const payload = {
  name: '309药膳坊',
  // admin: true
}

// 密钥
const secret = 'I love cs!'
// 签发 Token
const token = jwt.sign(payload, secret, { expiresIn: '3h' })

// 输出签发的 Token
// console.log('token值:'+token)

// 验证 Token
jwt.verify(token, secret, (error, decoded) => {
  if (error) {
    console.log(error.message)
    return false
  }
  // console.log(decoded)
})

//登录请求
router.post('/login', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var arr = [username,password]
    // var sql = $sql.user.select_name+= "where username ='"+ username +"'";
    console.log(req.body.username)
    console.log($sql.user.login)
    userApi.login($sql.user.login, arr, function(data) {
        if (data.length!=0) {
            // res.status(200).json(data);
            res.status(200).json({
                code:0,
                userInfo:data,
                token:token+username,
            })
        }else{
            res.status(200).json({
                code:'-1',
                message:'error'
            })
        }
    })
}),
//注册请求
router.post('/register',function(req,res){
    var username = req.body.username
    var password = req.body.password
    var  address = req.body.address
    var    tel   = req.body.tel
    var  money   = req.body.money
    var  arr=[username,password,tel,address,money]
    userApi.register($sql.user.create,arr,function(data){
         if (data.affectedRows) {
            return res.status(200).json({
                code: 0,
                message: "注册成功！"
            });
        }else{
            return res.status(500).json({
                code: -1,
                message: "注册失败"
            })
        }
    })
})
//按照用户名查找
router.post('/getbyusername',function(req,res){
    var username = req.body.username
    var arr = username
    // var sql = $sql.user.readbyUsername;
    userApi.readbyUsername($sql.user.readbyUsername,arr,function(data){
        if (data.length!=0) {
            res.status(200).json(data);
        }else{
            res.send({
                code:0,
                message:'可以注册'
            })
        }
    })
}),
//获取所有用户信息
router.get('/getAlluser',function(req,res){
    var sql = $sql.user.read
    userApi.read(sql,function(data){
        res.status(200).json(data)
    })
}),
//获取当前帐户金额
router.post('/getUserMoney',function(req,res){
    var username = req.body.username
    var arr = username
    userApi.getUserMoney($sql.user.getUserMoney,arr,function(data){
       res.status(200).json(data)
    })
}),
//获取首页line1商品
router.get('/selectline1',function (req,res) {
    var sql = $sql.showqiantai.select1
    qiantaiApi.read(sql,function(data) {
        res.status(200).json(data)
    })
}),
//获取首页line2商品
router.get('/selectline2',function (req,res) {
    var sql = $sql.showqiantai.select2
    qiantaiApi.read(sql,function(data) {
        res.status(200).json(data)
    })
}),
//获取首页line3商品
router.get('/selectline3',function (req,res) {
    var sql = $sql.showqiantai.select3
    qiantaiApi.read(sql,function(data) {
        res.status(200).json(data)
    })  
}),
//获取精选商品
router.get('/selectjxsp',function (req,res) {
    var sql = $sql.jxsp.selectjxsp
    qiantaiApi.read(sql,function(data) {
        res.status(200).json(data)
    }) 
})
//获取已审核商家列表(3条数据,显示在找药页面)
router.get('/selectstores',function (req,res) {
    var sql = $sql.stores.selectall
    storesApi.read(sql,function(data) {
        res.status(200).json(data)
    })   
})
//获取所有已审核的商家信息列表
router.get('/selectAllStores',function (req,res) {
    var sql = $sql.stores.selectAllStores
    storesApi.read(sql,function(data) {
        res.status(200).json(data)
    })   
})
//获取拥有该商品ID的商家详细信息
router.get('/storegoods/:goodsEname',function (req,res) {
     var goodsEname = req.params.goodsEname
     var sql = $sql.storesGoods.selectBygoodsName +" '"+ goodsEname +"' "
    // var sql = $sql.storesGoods.selectBygoodsName;
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     });
})
//获取某个商家的详细信息
router.get('/storeInfo/:storesID',function (req,res) {
     var storesID = req.params.storesID
     var sql = $sql.storesGoods.selectBystoresID +" '"+ storesID +"' "
     // console.log(sql)
     storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     });
})
//获取商家的运费信息byStoresID
router.get('/storeYunFei/:storesID',function (req,res) {
     var storesID = req.params.storesID
     var sql = $sql.stores.selectYunfei +" '"+ storesID +"' "
     console.log(sql)
     storesApi.read(sql,function(data){
         res.status(200).json(data)
     });
})
//获取某个商家所卖的全部商品
router.get('/storeInfo/:storesID/:offset/:pageSize',function (req,res) {
     var storesID = req.params.storesID
     var offset = req.params.offset
     var pageSize = req.params.pageSize
     var sql = $sql.storesGoods.selectBystoresID +" '"+ storesID +"' " + " limit "+offset+","+pageSize+" "
     // console.log(sql)
     storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     });
})
//获取某个商家的推荐商品信息
router.get('/StoreRecommandGoods/:storesID',function (req,res) {
     var storesID = req.params.storesID
     var sql = $sql.storesGoods.StoreRecommandGoods + " '"+ storesID +"' "
     // console.log(sql)
     storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取某个商家的商品分类信息
router.get('/StoreFenleiGoods/:storesID/:goodstype',function (req,res) {
     var storesID = req.params.storesID
     var goodstype = req.params.goodstype
     var sql = $sql.storesGoods.StoreFenleiGoods +" where stores.storesID = '"+ storesID +"' " 
             + " and goodstype='"+ goodstype +"'"
     // console.log(sql)
     storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     });
})
//获取找药分类的商品分类信息
router.get('/ZhaoyaoFenlei/:goodstype/:offset/:pageSize',function (req,res) {
     var goodstype = req.params.goodstype
     var offset = req.params.offset
     var pageSize = req.params.pageSize
     var sql = $sql.zhaoYaofenlei.selectBygoodstype +"'"+ goodstype +"' " + " limit "+offset+","+pageSize+" "
     // console.log(sql)
     storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取高发疾病的商品信息
router.get('/Gaofajibing/:goodszz',function (req,res) {
     var goodszz = req.params.goodszz
     // var index = req.params.index;
     var sql = $sql.gaofaJibing.selectBygaofaJibing +" '"+ goodszz +"' " 
     // console.log(sql)
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取搜索组件的商品信息
router.get('/searchLsit/:searchvalue/:offset/:pageSize',function (req,res) {
     var searchvalue = req.params.searchvalue
     var offset = req.params.offset
     var pageSize = req.params.pageSize
     var sql = $sql.searchList.serach +" where goodsName like '%"+ searchvalue +"%' or goodszz like '%"+ searchvalue +"%' " 
     + " or goodsWenhao like '%"+ searchvalue +"%' limit "+offset+","+pageSize+" "
     // console.log(sql)
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取商品详情页信息
router.get('/Goodsxiangqing/:goodsID',function (req,res) {
     var goodsID = req.params.goodsID
     var sql = $sql.Goodsxiangqing.Goodsxiangqing + " where goodsID = '" + goodsID + "' " 
     // console.log(sql)
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取全部商品评价信息
router.get('/goodsPJ/:goodsID',function (req,res) {
     var goodsID = req.params.goodsID
     var sql = $sql.goodsPJ.goodsPJ + " where goodsID = '" + goodsID + "'  order by PJtime desc " 
     // console.log(sql)
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//获取分页商品评价信息
router.get('/goodsPJ/:goodsID/:offset/:pageSize',function (req,res) {
     var offset = req.params.offset
     var pageSize = req.params.pageSize
     var goodsID = req.params.goodsID
     var sql = $sql.goodsPJ.goodsPJ + " where goodsID = '" + goodsID + "' order by PJtime desc  limit "+offset+","+pageSize+" " 
     // console.log(sql)
    storesgoodsApi.read(sql,function(data){
         res.status(200).json(data)
     })
})
//向 收藏商家表中添加信息
router.post('/starStores',function(req,res){
    var username = req.body.username
    var storesID = req.body.storesID
    var storesName = req.body.storesName
    var arr = [username,storesID,storesName]
    var sql = $sql.shouCang.addToStarStores
    // console.log(sql)
    shoucangApi.addTOShoucang(sql,arr,function(data){
        if (data.affectedRows) {
            return res.status(200).json({
                code: 0,
                message: "收藏商家成功！"
            });
        }else{
            return res.status(500).json({
                code: -1,
                message: "收藏商家失败！"
            })
        }
    })
})
//判断该商家是否已经被收藏过
router.post('/selectByuserAnStoresID',function(req,res){
    var username = req.body.username
    var storesID = req.body.storesID
    var arr = [username,storesID]
    var sql = $sql.shouCang.selectByuserAnStoresID
    shoucangApi.selectByuserAnStoresID(sql,arr,function(data){
            res.status(200).json(data);
    })
})
//取消收藏商家
router.post('/qxStarStores',function(req,res){
    var username = req.body.username
    var storesID = req.body.storesID
    var arr = [username,storesID]
    var sql = $sql.shouCang.QXStarStores
    shoucangApi.QXStarStores(sql,arr,function(data){
            // res.status(200).json(data);
            if (data.affectedRows) {
                return res.status(200).json({
                    code: 0,
                    message: "已成功取消收藏该商家！"
            })
            }else{
                return res.status(500).json({
                    code: -1,
                    message: "取消收藏失败！"
            })
        }
    })
})
//查询收藏商家信息
router.post('/ChaxunStarStore',function(req,res){
    var username = req.body.username
    var arr = [username]
    var sql =$sql.shouCang.selectByUsername
    // console.log(sql)
    shoucangApi.ChaxunStarStore(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//向 收藏商品表中添加信息
router.post('/starGoods',function(req,res){
    var username = req.body.username
    var goodsID = req.body.goodsID
    var arr = [username,goodsID]
    var sql = $sql.shouCang.addToStarGoods
    // console.log(sql)
    shoucangApi.addTOShoucang(sql,arr,function(data){
        if (data.affectedRows) {
            return res.status(200).json({
                code: 0,
                message: "已成功收藏该商品！"
            });
        }else{
            return res.status(500).json({
                code: -1,
                message: "收藏该商品失败！"
            })
        }
    })
})
//判断该商品是否已经被收藏过
router.post('/PDstarsGoods',function(req,res){
    var username = req.body.username
    var goodsID = req.body.goodsID
    var arr = [username,goodsID]
    var sql = $sql.shouCang.PDstarsGoods
    // console.log(sql)
    shoucangApi.selectByuserAnStoresID(sql,arr,function(data){
            res.status(200).json(data);
    })
})
//取消收藏商品
router.post('/QXStarGoods',function(req,res){
    var username = req.body.username
    var goodsID = req.body.goodsID
    var arr = [username,goodsID]
    var sql = $sql.shouCang.QXStarGoods
    shoucangApi.QXStarStores(sql,arr,function(data){
            // res.status(200).json(data);
            if (data.affectedRows) {
                return res.status(200).json({
                    code: 0,
                    message: "已取消对该商品的收藏！"
            })
            }else{
                return res.status(500).json({
                    code: -1,
                    message: "取消收藏失败！"
            })
        }
    })
})
//查询收藏商品信息
router.post('/selectStarsGoods',function(req,res){
    var username = req.body.username
    var arr = [username]
    var sql = $sql.shouCang.selectStarsGoods
    // console.log(sql)
    shoucangApi.ChaxunStarStore(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//向浏览记录表中添加信息
router.post('/addToThroughGoods',function(req,res){
    var username = req.body.username
    var goodsID  = req.body.goodsID
    var storesID = req.body.storesID
    var throughTime = req.body.throughTime
    var arr = [username,goodsID,storesID,throughTime]
    var sql = $sql.throughGoods.addToThroughGoods
    // console.log(sql)
    throughGoodsApi.addToThroughGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//查找浏览记录中的商品信息
router.post('/selectThroughGoods/:offset/:pageSize',function(req,res){
    var username = req.body.username
    var offset  = req.params.offset
    var pageSize = req.params.pageSize
    var arr = [username]
    var sql = $sql.throughGoods.selectThroughGoods +" limit "+offset+","+pageSize+" "
    throughGoodsApi.selectThroughGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//清空浏览记录中的商品信息
router.delete('/deleteThroughGoods',function(req,res){
    var username = req.body.username
    var arr = [username]
    var sql = $sql.throughGoods.deleteThroughGoods
    // console.log(sql)
    throughGoodsApi.deleteThroughGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//添加到意见反馈表中
router.post('/addToYJFK',function(req,res){
    var username = req.body.username
    var yjfkContent = req.body.yjfkContent
    var yjfkTime = req.body.yjfkTime
    var arr = [username,yjfkContent,yjfkTime]
    var sql = $sql.YJFK.addToYJFK
    console.log(sql)
    yjfkApi.addToYJFK(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//添加收货地址
router.post('/addToAddress',function(req,res){
    var username     = req.body.username
    var shouhuoren   = req.body.shouhuoren
    var province     = req.body.province
    var   city       = req.body.city
    var district     = req.body.district
    var address      = req.body.address
    var shouhuoTel   = req.body.shouhuoTel
    var morenAddress = req.body.morenAddress
    var arr = [username,shouhuoren,province,city,district,address,shouhuoTel,morenAddress]
    var sql = $sql.ShouHuoDiZhi.addToAddress
    addressApi.addToAddress(sql,arr,function(data){
          res.status(200).json(data)
    })
})
//获取收货地址
router.post('/selectAddress',function(req,res){
    var username  = req.body.username
    var arr = [username]
    var sql = $sql.ShouHuoDiZhi.selectAddress
    // console.log(sql)
    addressApi.selectAddress(sql,arr,function(data){
          res.status(200).json(data)
    })
})
//修改收货地址
router.put('/UpdataAddress',function(req,res){
    var shouhuoren= req.body.shouhuoren
    var province  = req.body.province
    var   city    = req.body.city
    var district  = req.body.district
    var address   = req.body.address
    var shouhuoTel= req.body.shouhuoTel
    var AddressID = req.body.AddressID
    var arr = [shouhuoren,province,city,district,address,shouhuoTel,AddressID]
    var sql = $sql.ShouHuoDiZhi.UpdataAddress
    addressApi.UpdataAddress(sql,arr,function(data){
          res.status(200).json(data)
    })
})
//修改收货地址(morenAddress)的状态 改为1
router.post('/UpdataAddress1',function(req,res){
    var AddressID = req.body.AddressID
    var arr = [AddressID]
    var sql = $sql.ShouHuoDiZhi.UpdatamorenAddress1   //改为1
    addressApi.UpdataMorenAddress(sql,arr,function(data){
          res.status(200).json(data)
    })
})
//修改收货地址(morenAddress)的状态 改为0
router.post('/UpdataAddress0',function(req,res){
    var AddressID = req.body.AddressID
    var arr = [AddressID]
    var sql = $sql.ShouHuoDiZhi.UpdatamorenAddress0   //改为0
    addressApi.UpdataMorenAddress(sql,arr,function(data){
          res.status(200).json(data)
    })
})
//账户管理---修改真实姓名
router.put('/UpdataName',function(req,res){
    var Newusername = req.body.Newusername
    var username    = req.body.username
    var arr =[Newusername,username]
    var sql = $sql.Zhanghuguanli.UpdateName
    zhanghuguanliApi.UpdateName(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//账户管理---修改手机号码
router.put('/UpdataTel',function(req,res){
    var NewTel    = req.body.NewTel
    var username  = req.body.username
    var arr =[NewTel,username]
    var sql = $sql.Zhanghuguanli.UpdateTel
    zhanghuguanliApi.UpdateTel(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//账户管理---修改固定手机号码
router.put('/UpdataGuHua',function(req,res){
    var NewGuhua  = req.body.NewGuhua
    var username  = req.body.username
    var arr =[NewGuhua,username]
    var sql = $sql.Zhanghuguanli.UpdataGuHua
    zhanghuguanliApi.UpdataGuHua(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//账户管理---修改QQ号码
router.put('/UpdataQQ',function(req,res){
    var NewQQ  = req.body.NewQQ
    var username  = req.body.username
    var arr =[NewQQ,username]
    var sql = $sql.Zhanghuguanli.UpdataQQ
    // console.log(sql)
    zhanghuguanliApi.UpdataQQ(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//账户管理---修改密码
router.put('/UpdataPwd',function(req,res){
    var Newpassword = req.body.Newpassword
    var  username   = req.body.username
    var  password   = req.body.password
    var arr =[Newpassword,username,password]
    var sql = $sql.Zhanghuguanli.UpdataPwd
    // console.log(sql)
    zhanghuguanliApi.UpdataPwd(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---提交订单
router.post('/addToOrder',function(req,res){
    var  orderBianhao =req.body.orderBianhao
    var  username  = req.body.username
    var  goodsID   = req.body.goodsID
    var  goodsName = req.body.goodsName
    var  storesID  = req.body.storesID
    var  storesName= req.body.storesName
    var  goodsCount   = req.body.goodsCount
    var  goodsAmount = req.body.goodsAmount
    var  AddressID    = req.body.AddressID
    var  orderStatus = req.body.orderStatus
    var  orderTime   = req.body.orderTime
    var arr =[orderBianhao,username,goodsID,goodsName,storesID,storesName,goodsCount,goodsAmount,AddressID,orderStatus,orderTime]
    var sql = $sql.Order.addToOrder
    // console.log(sql)
    orderApi.addToOrder(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取状态为待付款的订单数据
router.post('/selectDaifukuan',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectDaifukuan
    orderApi.selectDaifukuan(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态所有均未完成的数据
router.post('/selectDiscompleted',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectDiscompleted
    // console.log(sql)
    orderApi.selectDiscompleted(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---修改账户余额
router.put('/updateMoney',function(req,res){
    var money = req.body.money
    var username  = req.body.username
    var arr =[money,username]
    var sql = $sql.Order.updateMoney
    orderApi.updateMoney(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取状态为待发货的订单数据
router.post('/selectDaifahuo',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectDaifahuo
    // console.log(sql)
    orderApi.selectDiscompleted(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---将订单状态修改为 待发货
router.put('/updateOrderStatus',function(req,res){
    var  orderID  = req.body.orderID
    var arr =[orderID]
    var sql = $sql.Order.updateOrderStatus
    // console.log(sql)
    orderApi.updateOrderStatus(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取状态为待收货的订单数据
router.post('/selectDaiShouhuo',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectDaiShouhuo
    // console.log(sql)
    orderApi.selectDaiShouhuo(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//卖了换钱
router.post('/MaiLeHuanQian',function(req,res){
    var  orderID   = req.body.orderID
    var  username  = req.body.username
    var arr =[orderID,username]
    var sql = $sql.Order.MaiLeHuanQian
    // console.log(sql)
    orderApi.MaiLeHuanQian(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取状态为待评价的订单数据  
router.post('/selectDaiPingJia',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectDaiPingJia
    // console.log(sql)
    orderApi.selectDaiPingJia(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---将订单状态修改为 待评价 (orderstatus=4)
router.put('/updateOrderDaiPingJia',function(req,res){
    var  orderID  = req.body.orderID
    var arr =[orderID]
    var sql = $sql.Order.updateOrderDaiPingJia
    // console.log(sql)
    orderApi.updateOrderDaiPingJia(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---立即评价 
router.post('/addToGoodsPJ',function(req,res){
    var  username  = req.body.username
    var  goodsID   = req.body.goodsID
    var  PJcontent = req.body.PJcontent
    var  PJtime    = req.body.PJtime
    var  storesID  = req.body.storesID
    var arr =[username,goodsID,PJcontent,PJtime,storesID]
    var sql = $sql.goodsPJ.addToGoodsPJ
    // console.log(sql)
    orderApi.addToGoodsPJ(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取状态为待评价的订单数据  
router.post('/selectYiWanCheng',function(req,res){
    var  username  = req.body.username
    var arr =[username]
    var sql = $sql.Order.selectYiWanCheng
    // console.log(sql)
    orderApi.selectYiWanCheng(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//将订单状态修改为 已完成 (orderstatus=5)
router.put('/updateOrderYiWancheng',function(req,res){
    var orderID  = req.body.orderID
    var arr =[orderID]
    var sql = $sql.Order.updateOrderYiWancheng
    // console.log(sql)
    orderApi.updateOrderYiWancheng(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//取消对应订单
router.post('/deleteOrder',function(req,res){
    var orderID  = req.body.orderID
    var arr =[orderID]
    var sql = $sql.Order.deleteOrderbyOrderID
    orderApi.deleteOrderbyOrderID(sql,arr,function(data){
        res.status(200).json(data)
    })
})

//获取所有健康资讯数据
router.get('/selectHealthsData/:offset/:pageSize',function (req,res) {
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.healthDatas.selectHealthsData + " limit "+offset+","+pageSize+" "
    console.log(sql)
    healthApi.readhealthData(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//获取详细健康资讯数据
router.get('/selectXXHealthsData/:healthdatasID',function (req,res) {
    var healthdatasID = req.params.healthdatasID
    var sql = $sql.healthDatas.selectXXHealthsData + " where healthdatasID = '"+healthdatasID+"' "
    // console.log(sql)
    healthApi.readXXhealthData(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//添加操作日志
router.post('/addToRecord',function(req,res){
    var  username   = req.body.username
    var  recordtype = req.body.recordtype
    var  recordtime = req.body.recordtime
    var arr =[username,recordtype,recordtime]
    var sql = $sql.Record.addToRecord
    // console.log(sql)
    recordApi.addToRecord(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//获取九九包邮模块数据
router.get('/selectJiuJiu/:offset/:pageSize',function (req,res) {
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.jiujiuBaoyou.selectJiuJiu + " limit "+offset+","+pageSize+" "
    // console.log(sql)
    jiujiuApi.selectJiuJiu(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//获取当季必备模块数据
router.get('/selectDangjibiei/:seasontypeEng',function (req,res) {
    var seasontypeEng = req.params.seasontypeEng
    var sql = $sql.dangjibibei.selectDangjibiei + " where seasontypeEng = '"+seasontypeEng+"' "
    dangjibibeiApi.selectDangjibiei(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//获取当季推荐商品数据
router.get('/selectDangjibieiRecommanGoods/:seasontype',function (req,res) {
    var seasontype = req.params.seasontype
    var sql = $sql.dangjibibei.selectDangjibieiRecommanGoods + " where seasontype = '"+seasontype+"' "
    console.log(sql)
    dangjibibeiApi.selectDangjibieiRecommanGoods(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//获取商家入驻数据  来判断当前用户是否是入驻商家
router.post('/GetStoresInfo',function(req,res){
    var  danbaoren  = req.body.danbaoren
    var arr =[danbaoren]
    var sql = $sql.StoresRuZhu.GetStoresInfo
    storesruzhuApi.GetStoresInfo(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//判断商家ID是否被占用 
router.post('/isStoreID',function(req,res){
    var storesID = req.body.storesID
    var arr = [storesID]
    var sql = $sql.StoresRuZhu.isStoreID
    storesruzhuApi.isStoreID(sql,arr,function(data){
        if (data.length!=0) {
            res.send({
                code:-1,
                message:'该商家ID已被占用！'
            })
        }else{
            res.send({
                code:0,
                message:'可用的商家ID'
            })
        }
    })
 })
//申请商家入驻(添加商家)
router.post('/addStores',function(req,res){
    var   storesID   = req.body.storesID
    var storesName   = req.body.storesName
    var   haoping    = req.body.haoping
    var imagesurl    = req.body.imagesurl
    var storeStatus  = req.body.storeStatus
    var    juli      = req.body.juli
    var   yunfei     = req.body.yunfei
    var storeAddress = req.body.storeAddress
    var   fahuoTime  = req.body.fahuoTime
    var   danbaoren  = req.body.danbaoren
    var     arr      = [storesID,storesName,haoping,imagesurl,storeStatus,juli,yunfei,storeAddress,fahuoTime,danbaoren]
    var     sql      = $sql.StoresRuZhu.addStores
    storesruzhuApi.addStores(sql,arr,function(data){
        res.status(200).json(data)
    })
 })

module.exports = router;