var express  = require('express');
var router = express.Router();
var userInfoApi = require('../Api/Api-Admin/userInfoApi.js')  			//用户Api
var recordApi = require('../Api/Api-Admin/recordApi.js')    			//操作日志Api
var qiantaigoodsApi = require('../Api/Api-Admin/qiantaigoodsApi.js')    //前台展示商品Api
var healthApi = require('../Api/Api-Admin/healthApi.js')    			//健康资讯Api
var dingdanApi = require('../Api/Api-Admin/dingdanApi.js')    			//订单管理Api
var yjfkApi = require('../Api/Api-Admin/yjfkApi.js')    				//操作日志Api
var storesApi = require('../Api/Api-Admin/storesApi.js')    		    //商家管理Api
var userPingjiaApi = require('../Api/Api-Admin/userPingjiaApi.js')      //用户评论Api

const jwt = require('jsonwebtoken')

var $sql = require('../sql/sqlMap-Admin.js');  //关于后台Admin的sql

const header = {
  "alg": "HS256", 
  "typ": "JWT"
}
// Token 数据
const payload = {
  name: '309药膳坊后台管理系统',
  // admin: true
}

// 密钥
const secret = 'i was a crown!'
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

//获取所有平台用户信息(分页)
router.get('/getAlluserinfo/:offset/:pageSize',function(req,res){
    var offset = req.params.offset
    var pageSize = req.params.pageSize
	var sql =  $sql.user.readAlluser + " limit "+offset+","+pageSize+" "
	userInfoApi.readAlluser(sql,function(data){
        res.status(200).json(data)
    })
})
//模糊查找 用户信息（userList页面）  ----分页
router.post('/selectByusername/:offset/:pageSize',function(req,res){
    var searchvalue = req.body.searchvalue
    var arr = [searchvalue]
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.user.selectByusername +" where username like  '%"+searchvalue+"%'  or tel like '%"+searchvalue+"%' "
    + " or QQ like '%"+searchvalue+"%'  or guhua like '%"+searchvalue+"%'  or address like '%"+searchvalue+"%' limit "
    + " "+offset+","+pageSize+" "
    // console.log(sql)
    userInfoApi.selectByusername(sql,arr,function (data) { 
        res.status(200).json(data)
     })
})
//获取所有模糊查询的数据
router.post('/getAllmohuser',function(req,res){
    var searchvalue = req.body.searchvalue
    var arr = [searchvalue]
    var sql = $sql.user.selectByusername +" where username like  '%"+searchvalue+"%'  or tel like '%"+searchvalue+"%' "
    + " or QQ like '%"+searchvalue+"%'  or guhua like '%"+searchvalue+"%'  or address like '%"+searchvalue+"%' "
    userInfoApi.selectByusername(sql,arr,function (data) { 
        res.status(200).json(data)
     })
})
//获取所有平台用户信息
router.get('/getAlluserinfo',function(req,res){
    var sql =  $sql.user.readAlluser 
    userInfoApi.readAlluser(sql,function(data){
        res.status(200).json(data)
    })
})
//获取所有平台用户的商品评论(分页)
router.get('/GetUserPingJia/:offset/:pageSize',function(req,res){
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql =  $sql.userpingjia.GetUserPingJia + " limit "+offset+","+pageSize+" "
    userPingjiaApi.GetUserPingJia(sql,function(data){
        res.status(200).json(data)
    })
})
//根据（用户名、商品ID、商品名、商家ID、商家名）模糊查找 获取用户评论 的数据（分页）
router.post('/GetMohuUserPingJia/:offset/:pageSize',function(req,res){
    var searchvalue = req.body.searchvalue
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var arr = [searchvalue]
    var sql =  $sql.userpingjia.GetUserPingJia + " where username like '%"+searchvalue+"%' or goodsinfo.goodsID like "
    + " '%"+searchvalue+"%' or goodsinfo.goodsName like '%"+searchvalue+"%' or goodsinfo.storesID like '%"+searchvalue+"%' "
    + " or stores.storesName like '%"+searchvalue+"%' limit "+offset+","+pageSize+" "
    userPingjiaApi.GetMohuUserPingJia(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//根据（用户名、商品ID、商品名、商家ID、商家名）模糊查找 获取用户评论 的数据（不分页） 让total等于数据总长度
router.post('/GetMohuUserPingJia',function(req,res){
    var searchvalue = req.body.searchvalue
    var arr = [searchvalue]
    var sql =  $sql.userpingjia.GetUserPingJia + " where username like '%"+searchvalue+"%' or goodsinfo.goodsID like "
    + " '%"+searchvalue+"%' or goodsinfo.goodsName like '%"+searchvalue+"%' or goodsinfo.storesID like '%"+searchvalue+"%' "
    + " or stores.storesName like '%"+searchvalue+"%'  "
    userPingjiaApi.GetMohuUserPingJia(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//删除用户的商品评论
router.post('/DeleteUserPingJia',function(req,res){
    var PJID = req.body.PJID
    var arr = [PJID]
    var sql =  $sql.userpingjia.DeleteUserPingJia 
    userPingjiaApi.DeleteUserPingJia(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//获取所有用户的商品评论
router.get('/GetUserPingJia',function(req,res){
    var sql =  $sql.userpingjia.GetUserPingJia 
    userPingjiaApi.GetUserPingJia(sql,function(data){
        res.status(200).json(data)
    })
})

//登录请求
router.post('/login', function(req, res) {
    var username = req.body.username
    var password = req.body.password
    var arr = [username,password]
    var sql = $sql.user.login
    console.log(sql)
    userInfoApi.login(sql, arr, function(data) {
        if (data.length!=0) {
    	  	res.status(200).json({
            code:0,
            userInfo:data,
            admintoken:token,
        })
        }else{
            res.send({
                code:'-1',
                message:'error'
            })
        }
    })
}),
//修改用户信息
router.put('/UpdateInfo', function(req, res) {
    var   tel   = req.body.tel
    var address = req.body.address
    var    QQ   = req.body.QQ
    var  guhua  = req.body.guhua
    var  money  = req.body.money
    var   id    = req.body.id
    var   arr   = [tel,address,QQ,guhua,money,id]
    var   sql   = $sql.user.updateInfo
    console.log(sql)
    userInfoApi.UpdateInfo(sql, arr, function(data) {
			res.status(200).json(data)
    })
}),
//删除用户信息
router.post('/DeleteInfo',function(req,res){
    var userID = req.body.userID
    var arr = [userID]
	var sql = $sql.user.deleteInfo
	console.log(sql)
	userInfoApi.deleteInfo(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//充值金额
router.put('/updateMoney', function(req, res) {
    var  money  = req.body.money
    var  userID = req.body.userID
    var   arr   = [money,userID]
    var   sql   = $sql.user.updateMoney
    console.log(sql)
    userInfoApi.updateMoney(sql, arr, function(data) {
			res.status(200).json(data)
    })
}),


//获取前台所有展示的数据
router.get('/getqiantaiGoods',function(req,res){
	var sql = $sql.qiantaigoods.selectqianTai
	qiantaigoodsApi.getqiantaigoods(sql,function(data){
		res.status(200).json(data)
	})

})
//重新描述商品信息
router.put('/miaoshuAgain', function(req, res) {
    var   goodsName   = req.body.goodsName
    var goodsmiaoshu1 = req.body.goodsmiaoshu1
    var goodsmiaoshu2 = req.body.goodsmiaoshu2
    var goodsimageurl = req.body.goodsimageurl
    var  goodsways    = req.body.goodsways
    var  goodsprice   = req.body.goodsprice
    var   goodsID     = req.body.goodsID
    var   arr   = [goodsName,goodsmiaoshu1,goodsmiaoshu2,goodsimageurl,goodsways,goodsprice,goodsID]
    var   sql   = $sql.qiantaigoods.miaoshuAgain
    console.log(sql)
    qiantaigoodsApi.miaoshuAgain(sql, arr, function(data) {
			res.status(200).json(data)
    })
}),


//获取用户意见反馈信息数据(分页)
router.get('/getAllyjfk/:offset/:pageSize',function(req,res){
	var offset = req.params.offset
	var pageSize = req.params.pageSize
	var sql = $sql.FanKuiXinxi.getallYJFK + " limit "+offset+","+pageSize+" "
	yjfkApi.readAllyjfk(sql,function(data){
		res.status(200).json(data)
	})
})
//获取用户意见反馈所有信息数据
router.get('/GetAllyjfk',function(req,res){
	var sql = $sql.FanKuiXinxi.getallYJFK 
	yjfkApi.readAllyjfk(sql,function(data){
		res.status(200).json(data)
	})
})
//根据姓名模糊查找意见反馈信息（分页）
router.post('/getAllYJFK/:offset/:pageSize',function(req,res){
    var username = req.body.username
    var arr = [username]
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.FanKuiXinxi.getAllYJFK+" where username like  '%"+username+"%'  limit "+offset+","+pageSize+" "
	yjfkApi.getAllYJFK(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//根据姓名模糊查找意见反馈信息（不分页）  让total获得数据的长度
router.post('/getAllYJFK',function(req,res){
    var username = req.body.username
    var arr = [username]
    var sql = $sql.FanKuiXinxi.getAllYJFK+" where username like  '%"+username+"%'  "
	yjfkApi.getAllYJFK(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//根据时间段模糊查找意见反馈信息（不分页）  让total获得数据的长度
router.post('/getAllyjfkBytime',function(req,res){
    var time1 = req.body.time1
    var time2 = req.body.time2
    var arr = [time1,time2]
    var sql = $sql.FanKuiXinxi.getAllYJFK+" where yjfkTime between  '"+time1+"' and '"+time2+"' "
	yjfkApi.getAllYJFK(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//根据时间段模糊查找意见反馈信息（分页）  
router.post('/getAllyjfkBytime/:offset/:pageSize',function(req,res){
    var offset   = req.params.offset
    var pageSize = req.params.pageSize
    var time1 = req.body.time1
    var time2 = req.body.time2
    var arr = [time1,time2]
    var sql = $sql.FanKuiXinxi.getAllYJFK+" where yjfkTime between '"+time1+"' and '"+time2+"' limit "+offset+","+pageSize+" "
	yjfkApi.getAllYJFK(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//删除用户意见反馈信息
router.post('/Deleteyjfk',function(req,res){
    var yjfkID = req.body.yjfkID
    var arr = [yjfkID]
	var sql = $sql.FanKuiXinxi.deleteYJFK
	yjfkApi.Deleteyjfk(sql,arr,function(data){
		res.status(200).json(data)
	})
})
//获取所有商家信息
router.get('/GetAllStores',function(req,res){
    var sql = $sql.Stores.GetDoneStores 
    storesApi.GetDoneStores(sql,function(data){
        res.status(200).json(data)
    })
})
//获取已过审核商家所有信息数据
router.get('/GetAllStores/:offset/:pageSize',function(req,res){
    var  offset  = req.params.offset
    var pageSize = req.params.pageSize
	var sql = $sql.Stores.GetDoneStores +" limit "+offset+","+pageSize+" "
	storesApi.GetDoneStores(sql,function(data){
		res.status(200).json(data)
	})
})
//获取已过审核商家所有信息数据(不分页)  简单的让 total 等于数据总长度
router.get('/GetAllStores',function(req,res){
	var sql = $sql.Stores.GetDoneStores
	storesApi.GetDoneStores(sql,function(data){
		res.status(200).json(data)
	})
})
//获取待审核商家所有信息数据
router.get('/GetWaitStores/:offset/:pageSize',function(req,res){
    var  offset  = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.Stores.GetWaitStores +" limit "+offset+","+pageSize+" "
    storesApi.GetWaitStores(sql,function(data){
        res.status(200).json(data)
    })
}) 
//获取待审核商家所有信息数据(不分页)  简单的让 total 等于数据总长度
router.get('/GetWaitStores',function(req,res){
    var sql = $sql.Stores.GetWaitStores
    storesApi.GetWaitStores(sql,function(data){
        res.status(200).json(data)
    })
}) 
//获取已审核商家所有商品
router.post('/GetAllStoresGoods',function(req,res){
    var storesID = req.body.storesID
    var arr = [storesID]
    var sql = $sql.Stores.GetAllStoresGoods
    storesApi.GetAllStoresGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//获取已审核商家所有商品(分页)
router.post('/GetAllStoresGoods/:offset/:pageSize',function(req,res){
    var storesID = req.body.storesID
    var  offset  = req.params.offset
    var pageSize = req.params.pageSize
    var arr = [storesID]
    var sql = $sql.Stores.GetAllStoresGoods +" limit "+offset+","+pageSize+" "
    storesApi.GetAllStoresGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})  
//将待审核商家修改为已通过审核 将storeStatus从0改为1
router.put('/UpdatestoreStatusDone',function(req,res){
    var storesID = req.body.storesID
    var arr = [storesID]
    var sql = $sql.Stores.UpdatestoreStatusDone 
    storesApi.UpdatestoreStatus(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//将已审核商家修改为待通过审核 将storeStatus从1改为0
router.put('/UpdatestoreStatusDai',function(req,res){
    var storesID = req.body.storesID
    var arr = [storesID]
    var sql = $sql.Stores.UpdatestoreStatusDai 
    storesApi.UpdatestoreStatus(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//下架商品
router.post('/xiajiaGoods',function(req,res){
    var goodsID = req.body.goodsID
    var arr = [goodsID]
    var sql = $sql.Stores.xiajiaGoods 
    storesApi.xiajiaGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//判断goodsID是否已经存在
router.post('/isgoodsID',function(req,res){
    var goodsID = req.body.goodsID
    var arr = [goodsID]
    var sql = $sql.Stores.isgoodsID 
    storesApi.isgoodsID(sql,arr,function(data){
         if (data.length!=0) {
            res.send({
                code:-1,
                message:'该商品ID已被占用！'
            })
        }else{
            res.send({
                code:0,
                message:'可用的商品ID'
            })
        }
    })
})
//发布商品
router.post('/FaBuGoods',function(req,res){
    var   goodsID       = req.body.goodsID
    var  goodsEname     = req.body.goodsEname
    var  goodsName      = req.body.goodsName
    var  goodstype      = req.body.goodstype
    var  goodsWenhao    = req.body.goodsWenhao
    var  goodsimageurl  = req.body.goodsimageurl
    var  goodsprice     = req.body.goodsprice
    var  goodszz        = req.body.goodszz
    var  goodsways      = req.body.goodsways
    var  goodsrules     = req.body.goodsrules
    var  goodszhucang   = req.body.goodszhucang
    var  goodsmiaoshu1  = req.body.goodsmiaoshu1
    var  goodsmiaoshu2  = req.body.goodsmiaoshu2
    var  qiantaitype    = req.body.qiantaitype
    var     kucun       = req.body.kucun
    var  recommand      = req.body.recommand
    var  seasontype     = req.body.seasontype
    var  storesID       = req.body.storesID
    var arr =  [goodsID,goodsEname,goodsName,goodstype,goodsWenhao,goodsimageurl,
                goodsprice,goodszz,goodsways,goodsrules,goodszhucang,goodsmiaoshu1,
                goodsmiaoshu2,qiantaitype,kucun,recommand,seasontype,storesID]
    var sql = $sql.Stores.FaBuGoods 
    storesApi.FaBuGoods(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//编辑商家信息
router.put('/BJstoreInfo',function (req,res) {
    var storesName   = req.body.storesName
    var     juli     = req.body.juli
    var fahuoTime    = req.body.fahuoTime
    var storeAddress = req.body.storeAddress
    var     storesID  = req.body.storesID
    var arr = [storesName,juli,fahuoTime,storeAddress,storesID]
    var sql = $sql.Stores.BJstoreInfo
    console.log(sql)
    storesApi.BJstoreInfo(sql,arr,function(data) {
        res.status(200).json(data)
    })   
}),

//获取所有健康资讯数据
router.get('/getHealthsData',function (req,res) {
    var sql = $sql.healthDatas.selectHealthsData
    healthApi.readhealthData(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//获取详细健康资讯数据
router.get('/getXXHealthsData/:healthdatasID',function (req,res) {
    var healthdatasID = req.params.healthdatasID
    var sql = $sql.healthDatas.selectXXHealthsData + " where healthdatasID = '"+healthdatasID+"' "
    healthApi.readXXhealthData(sql,function(data) {
        res.status(200).json(data)
    })   
}),
//发布健康资讯
router.post('/addHealthData',function(req,res){
    var    title   = req.body.title
    var  imagesurl = req.body.imagesurl
    var  content   = req.body.content
    var    time    = req.body.time
    var  laiyuan   = req.body.laiyuan
    var    arr     = [title,imagesurl,content,time,laiyuan]
    var    sql     = $sql.healthDatas.addHeathData
    console.log(sql)
    healthApi.addHeathData(sql,arr,function(data){
    	res.status(200).json(data)
    })
})

//订单---获取订单状态所有均未完成的数据
router.get('/GetDiscompleted',function(req,res){
    var sql = $sql.Order.GetDiscompleted
    dingdanApi.GetDiscompleted(sql,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态待发货(商家)的数据
router.get('/GetDaifahuo',function(req,res){
    var sql = $sql.Order.GetDaifahuo
    dingdanApi.GetDaifahuo(sql,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态待收货的数据
router.get('/GetDaiShouhuo',function(req,res){
    var sql = $sql.Order.GetDaiShouhuo
    dingdanApi.GetDaiShouhuo(sql,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态待评价的数据
router.get('/GetDaiPingJia',function(req,res){
    var sql = $sql.Order.GetDaiPingJia 
    dingdanApi.GetDaiPingJia(sql,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态已完成的数据
router.get('/GetYiWanCheng/:offset/:pageSize',function(req,res){
    var offset = req.params.offset
    var pageSize = req.params.pageSize
    var sql = $sql.Order.GetYiWanCheng + " limit "+offset+","+pageSize+" "
    dingdanApi.GetYiWanCheng(sql,function(data){
        res.status(200).json(data)
    })
})
//将订单状态修改为 待收获 (orderstatus=3)
router.put('/updateOrderDaiShouHuo',function(req,res){
    var orderID  = req.body.orderID
    var arr =[orderID]
    var sql = $sql.Order.updateOrderDaiShouHuo
    console.log(sql)
    dingdanApi.updateOrderDaiShouHuo(sql,arr,function(data){
        res.status(200).json(data)
    })
})
//订单---获取订单状态已完成的数据
router.get('/GetZongLiRun',function(req,res){
    var sql = $sql.Order.GetZongLiRun 
    dingdanApi.GetYiWanCheng(sql,function(data){
        res.status(200).json(data)
    })
})

//获取操作日志数据
router.get('/getAllrecord/:offset/:pageSize',function(req,res){
    var offset = req.params.offset
    var pageSize = req.params.pageSize
	var sql = $sql.record.readAllrecord + " limit "+offset+","+pageSize+" "
	recordApi.readAllrecord(sql,function(data){
		res.status(200).json(data)
	})
})
//获取操作日志数据
router.get('/GetAllrecord',function(req,res){
	var sql = $sql.record.readAllrecord 
	recordApi.readAllrecord(sql,function(data){
		res.status(200).json(data)
	})
})
//删除操作日志
router.post('/Deleterecord',function(req,res){
    var recordID = req.body.recordID
    var arr = [recordID]
	var sql = $sql.record.Deleterecord
	recordApi.Deleterecord(sql,arr,function(data){
		res.status(200).json(data)
	})
})
// 获取所有根据用户， 日志类型模糊查找后的日志信息（分页）
router.post('/getAllrecordByValue/:offset/:pageSize',function(req,res){
    var searchvalue = req.body.searchvalue
    var offset    = req.params.offset
    var pageSize  = req.params.pageSize
    var arr = [searchvalue]
	var sql = $sql.record.readAllrecord + " where username like '%"+searchvalue+"%'  or recordtype like '%"+searchvalue+"%' limit "+offset+","+pageSize+" "
	recordApi.getAllrecord(sql,arr,function(data){
		res.status(200).json(data)
	})
})
// 获取所有根据用户， 日志类型模糊查找后的日志信息（不分页）
router.post('/getAllrecordByValue',function(req,res){
    var searchvalue = req.body.searchvalue
    var arr = [searchvalue]
	var sql = $sql.record.readAllrecord + " where username like '%"+searchvalue+"%'  or recordtype like '%"+searchvalue+"%' "
	console.log(sql)
    recordApi.getAllrecord(sql,arr,function(data){
		res.status(200).json(data)
	})
})
module.exports = router;