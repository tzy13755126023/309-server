var sqlMap = {
	//用户管理
	user:{
		//获取所有平台用户信息
		readAlluser: 'select * from userinfo',
		//登录
		login:'select * from  sysadmin where adminname = ? and adminpwd = ?',
		//修改用户信息
		updateInfo:'update userinfo set tel = ?,address = ?,QQ= ?,guhua= ?,money= ? where id = ?',
		// 删除用户
		deleteInfo:'delete from userinfo where id = ?',
		//充值金额
		updateMoney:'update userinfo set money = ? where id = ?',
		//模糊查询
		selectByusername:'select * from userinfo'
	},
	//前台商品
	qiantaigoods:{
		//获取前台展示的商品信息
		selectqianTai:"SELECT goodsID,goodsEname,goodsName,goodsimageurl,goodsmiaoshu1,goodsmiaoshu2,storesID,"
		+" goodsways,goodsprice FROM `goodsinfo` where qiantaitype = 'line1' or  qiantaitype = 'line2' "
		+" or qiantaitype='line3' or goodstype = 'JXSP' and storesID = 'SJ1' ",
		//重新描述商品信息
		miaoshuAgain:"update goodsinfo set goodsName = ?,goodsmiaoshu1 = ?,goodsmiaoshu2 = ?,goodsimageurl = ?,"
		+" goodsways= ?,goodsprice = ? where goodsID = ? "
	},
	//商家管理
	Stores:{
		//获取所有商家
		GetAllStores:" select * from stores ",
		//获取已过审核的商家
		GetDoneStores:" select * from stores where storeStatus = '1' ",
		//获取待审核的商家
		GetWaitStores:" select * from stores where storeStatus = '0' ",
		//获取已审核商家所有商品
		GetAllStoresGoods:" select goodsinfo.* from goodsinfo where storesID = ?",
		//获取已审核商家所有商品(分页)
		GetAllStoresGoods:" select goodsinfo.*,stores.storesName from goodsinfo join stores on "
		+ " goodsinfo.storesID = stores.storesID where goodsinfo.storesID = ?",
		//将待审核商家修改为已通过审核 将storeStatus从0改为1
		UpdatestoreStatusDone:" update stores set storeStatus = '1' where storesID = ? ",
		//将已审核商家修改为待通过审核 将storeStatus从1改为0
		UpdatestoreStatusDai:" update stores set storeStatus = '0' where storesID = ? ",
		//下架商品
		xiajiaGoods:"delete from goodsinfo where goodsID = ?" ,
		//发布商品
		FaBuGoods:" insert into goodsinfo(goodsID,goodsEname,goodsName,goodstype,goodsWenhao,"
		+ " goodsimageurl,goodsprice,goodszz,goodsways,goodsrules,goodszhucang,goodsmiaoshu1,goodsmiaoshu2,"
		+ " qiantaitype,kucun,recommand,seasontype,storesID) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
		//判断goodsID是否已经存在
		isgoodsID:" select * from goodsinfo where goodsID = ? ",
		//编辑商家信息
		BJstoreInfo:'update stores set storesName = ?,juli = ? ,fahuoTime = ?,storeAddress = ? where storesID = ?',
	},
    //健康资讯模块
    healthDatas:{
        //获取所有健康资讯
        selectHealthsData:"select * from healthdatas",
        //获取详细健康资讯
        selectXXHealthsData:"select * from healthdatas ",
        //发布健康资讯
        addHeathData:"insert into healthdatas(title,imagesurl,content,time,laiyuan) values (?,?,?,?,?)"
    },
    //订单管理
    Order:{
    	//获取订单状态所有均未完成的数据      
        GetDiscompleted:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus from goodsinfo inner join dingdan"
            +" on goodsinfo.goodsID = dingdan.goodsID  where orderStatus !='5' ",
        //获取状态为待发货的订单数据  
        GetDaifahuo:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan."
        +" storesName, dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores."
        +" yunfei,address.shouhuoren,address.address,address.shouhuoTel,address.morenAddress from (goodsinfo" 
        +" join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on goodsinfo.storesID =stores."
        +" storesID  join address on address.AddressID = dingdan.AddressID where orderStatus ='2' " ,
        //获取状态为待收货的订单数据  
        GetDaiShouhuo:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='3' " , 
        //获取状态为待评价的订单数据  
        GetDaiPingJia:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='4' " ,   
        //获取状态为已完成的订单数据 
        GetYiWanCheng:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='5' order by orderID asc" , 
         //将订单状态修改为 待收获 (orderstatus=3)
        updateOrderDaiShouHuo:" update dingdan set orderStatus = '3' where orderID = ?",
         //获取已完成订单总利润
        GetZongLiRun:"select * from dingdan where orderStatus = '5' ",
    },
    //用户评论
    userpingjia:{
    	//获取所有用户评论数据
    	GetUserPingJia:" SELECT goodspj.*,goodsinfo.goodsName,stores.storesName from "
    	+ " (goodspj join goodsinfo on goodspj.goodsID = goodsinfo.goodsID) join stores"
    	+ " on goodspj.storesID =stores.storesID ",
    	//删除用户评论数据
    	DeleteUserPingJia:" delete from goodspj where PJID = ?"

    },
	//反馈信息
	FanKuiXinxi:{
		getallYJFK:"select * from useryjfk",
		// 删除反馈信息
		deleteYJFK:'delete from useryjfk where yjfkID = ?',
		//根据姓名模糊查找意见反馈信息
		getAllYJFK:'select * from useryjfk ',
	},

	//操作日志
	record:{
		// 获取日志信息(时间倒序)
		// readAllrecord:'select * from record order by recordtime desc',
		// 获取日志信息
		// 获取所有根据用户， 日志类型模糊查找后的日志信息（分页）
		readAllrecord:'select * from record',
		// 删除日志
		Deleterecord:'delete from record where recordID = ?',
	}


}
module.exports = sqlMap;