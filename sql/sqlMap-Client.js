var sqlMap = {
    user:{
        read: 'select * from userinfo',
        login: 'select * from userinfo where username = ? and password = ?',
        readbyUsername: 'select * from userinfo where username = ?',
        create:'insert into userinfo(username,password,tel,address,money) values (?,?,?,?,?)',
        getUserMoney:'select money from userinfo where username = ?'
    },
    showqiantai:{
    	select1:'select * from goodsinfo where qiantaitype = "line1" ',
    	select2:'select * from goodsinfo where qiantaitype = "line2" ',
    	select3:'select * from goodsinfo where qiantaitype = "line3" ',
    },
    //精选商品
    jxsp:{
    	selectjxsp:'select * from goodsinfo where goodstype = "JXSP" limit 6',
    },
    stores:{
        selectall:"select * from stores  where storeStatus = '1' limit 0,3  ", //页面限制显示数量(找药页面)
        selectYunfei:'select yunfei from stores where storesID = ',
        selectAllStores:"select * from stores  where storeStatus = '1'  ",   //获取所有已审核的商家
    },
    storesGoods:{
        //根据点击的goodsEname获取商家和该商品的详细信息
        selectBygoodsName:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID  where stores.storeStatus='1' and GoodsEname =",
        //  selectBygoodsName:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.haoping,stores.imagesurl,stores.storeAddress,stores.fahuoTime"
        // +" from goodsinfo inner join stores on  goodsinfo.storesID = stores.storesID "
        //根据storeID获取商家及商品信息
        selectBystoresID:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID where stores.storeStatus='1' and stores.storesID =",
        //获取对应商家所有商品信息
        getallstoresGoods:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID where stores.storeStatus='1' and stores.storesID =",
        //获取对应商家的推荐商品
        StoreRecommandGoods:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on  goodsinfo.storesID = stores.storesID where recommand ='true' and stores.storeStatus='1' and stores.storesID =" , 
        //获取商家分类商品信息
        StoreFenleiGoods:" SELECT goodsinfo.*,stores.storesName,stores.juli,stores.haoping,stores.imagesurl,stores.storeAddress,stores.fahuoTime"
         +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID",
    },
    zhaoYaofenlei:{
        //找药分类中的根据goodstype查询数据
        selectBygoodstype:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID where stores.storeStatus='1' and goodstype ="
    },
    gaofaJibing:{
        //根据高发疾病获取相应商品数据
        selectBygaofaJibing:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.storeStatus,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID where stores.storeStatus='1' and goodszz ="
    },
    //找药页面的商品模糊搜索(全部商品)
    searchList:{
        serach:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID "
    },
    //根据goodsID商品详情
    Goodsxiangqing:{
        Goodsxiangqing:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime"
        +" from goodsinfo inner join stores on goodsinfo.storesID = stores.storesID "
    },
    //商品评论
    goodsPJ:{
        //获取评论数据
        goodsPJ:" select * from goodspj",
        //添加评论
        addToGoodsPJ:"insert into goodspj(username,goodsID,PJcontent,PJtime,storesID) values (?,?,?,?,?)",

    },
    //关于收藏
    shouCang:{
        //收藏商家相关sql语句
        //用户收藏商家
        addToStarStores:"insert into starstores(username,storesID,storesName) values (?,?,?)",
        //根据查询到的信息判断用户是否已经收藏该商家
        selectByuserAnStoresID:"select * from starstores where username = ? and storesID = ? ",
        //取消商家收藏
        QXStarStores:"delete from starstores where username = ? and storesID = ? ",
        //内连接数据(stores表 + starstores表)  查询当前用户收藏商家的信息
        selectByUsername:"SELECT stores.*,starstores.username,starstores.starstoresID from starstores join" 
        + " stores on stores.storesID = starstores.storesID where username = ? ",

        //商品相关sql语句
        //收藏商品
        addToStarGoods:"insert into stargoods(username,goodsID) values (?,?)",
        //根据查询到的信息判断用户是否已经收藏该商品
        PDstarsGoods:"select * from stargoods where username = ? and goodsID = ? ",
        //取消商品收藏
        QXStarGoods:"delete from stargoods where username = ? and goodsID = ? ",
        //内连接数据(goodsinfo表 + stargoods表 + stores表)  查询当前用户收藏商品的信息
        selectStarsGoods:"SELECT goodsinfo.*,stargoods.username,stargoods.stargoodsID,stores.* "
        + " from (stargoods join goodsinfo on goodsinfo.goodsID = stargoods.goodsID) join stores "
        + "on goodsinfo.storesID =stores.storesID where username = ?  order by stargoodsID desc"
    },
   //关于商品浏览
    throughGoods:{
         //商品浏览后添加到浏览记录表
        addToThroughGoods:"insert into historygoods(username,goodsID,storesID,throughTime) values (?,?,?,?)",
        //查找浏览记录中的商品信息(时间倒序)
        selectThroughGoods:"SELECT goodsinfo.goodsID,goodsinfo.goodsName,goodsinfo.goodsimageurl,goodsinfo.storesID,"
        +" goodsinfo.goodsrules,goodsinfo.goodsprice,historygoods.username,historygoods.historyGoodsID,"
        +" historygoods.throughTime,stores.storesName from (historygoods join goodsinfo on goodsinfo.goodsID" 
        +" = historygoods.goodsID) join stores on goodsinfo.storesID =stores.storesID  where username = ? "
        +" order by throughTime desc",
        //清空浏览记录
        deleteThroughGoods:" delete from historygoods where username = ?"
    },
    //意见反馈
    YJFK:{
        //添加到意见反馈表中
        addToYJFK:"insert into useryjfk(username,yjfkContent,yjfkTime) values (?,?,?)",
    },
    //收货地址
    ShouHuoDiZhi:{
        //添加收货地址
        addToAddress:'insert into Address(username,shouhuoren,province,city,district,address,shouhuoTel,morenAddress) values (?,?,?,?,?,?,?,?)',
        //获取收货地址
        selectAddress:'select * from Address where username = ?',
        //修改收货地址
        UpdataAddress:'update Address set shouhuoren = ?,province = ?,city= ?,district= ?,address= ?,shouhuoTel= ? where AddressID = ?',
        //将选中为默认地址的morenAddress的状态改为1
        UpdatamorenAddress1:" update Address set morenAddress = '1' where AddressID = ?",
        //将选中为默认地址的其他地址信息的morenAddress状态改为0
        UpdatamorenAddress0:" update Address set morenAddress = '0' where AddressID != ?",
    },
    //账户管理
    Zhanghuguanli:{
        //修改真实姓名
        UpdateName:"update userinfo set username = ? where username = ?",
        //修改电话号码
        UpdateTel:"update userinfo set tel = ? where username = ?",
        //修改固定电话号码
        UpdataGuHua:"update userinfo set guhua = ? where username = ?",
        //修改QQ
        UpdataQQ:"update userinfo set QQ = ? where username = ?",
        //修改密码
        UpdataPwd:"update userinfo set password = ? where username = ? and password = ?",
    },
    //订单order
    Order:{
        //提交订单
        addToOrder:"insert into dingdan(orderBianhao,username,goodsID,goodsName,storesID,storesName,goodsCount,goodsAmount,AddressID,orderStatus,orderTime) values (?,?,?,?,?,?,?,?,?,?,?)",
        //修改账户余额
        updateMoney:"update userinfo set money = ? where username = ?",
        //获取状态为待付款的订单数据
        selectDaifukuan:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='1' and username = ? order by orderTime desc" ,
        //获取订单状态所有均未完成的数据      
        selectDiscompleted:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus from goodsinfo inner join dingdan"
            +" on goodsinfo.goodsID = dingdan.goodsID  where orderStatus !='5' and username = ?",
        //获取状态为待发货的订单数据  
        selectDaifahuo:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='2' and username = ? order by orderTime desc" , 
         //获取状态为待收货的订单数据  
        selectDaiShouhuo:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='3' and username = ? order by orderTime desc" , 
         //获取状态为待评价的订单数据  
        selectDaiPingJia:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='4' and username = ? order by orderTime desc" , 
        //获取状态为已完成的订单数据 (时间倒序)  
        selectYiWanCheng:"select goodsinfo.*,dingdan.orderID,dingdan.orderBianhao,dingdan.username,dingdan.storesName,"
            +" dingdan.goodsCount,dingdan.goodsAmount,dingdan.orderStatus,dingdan.orderTime,stores.yunfei from"
            +" (goodsinfo join dingdan on goodsinfo.goodsID = dingdan.goodsID) join stores on" 
            +"  goodsinfo.storesID =stores.storesID  where orderStatus ='5' and username = ? order by orderTime desc" , 
        //将订单状态修改为 待发货 (orderstatus=2)
        updateOrderStatus:"update dingdan set orderStatus = '2' where orderID = ?",
        //卖了换钱
        MaiLeHuanQian:"delete from dingdan where orderID = ? and username = ?",
        //将订单状态修改为 待评价 (orderstatus=4)
        updateOrderDaiPingJia:"update dingdan set orderStatus = '4' where orderID = ?",
        //将订单状态修改为 已完成 (orderstatus=5)
        updateOrderYiWancheng:"update dingdan set orderStatus = '5' where orderID = ?",
        //取消对应订单
        deleteOrderbyOrderID:" delete from dingdan where orderID = ?"
    },
    //健康资讯模块
    healthDatas:{
        //获取所有健康资讯
        selectHealthsData:"select * from healthdatas",
        //获取详细健康资讯
        selectXXHealthsData:"select * from healthdatas ",
    },
    //九九包邮
    jiujiuBaoyou:{
        selectJiuJiu:"SELECT goodsinfo.*,stores.storesName,stores.juli,stores.haoping,stores.imagesurl,stores.yunfei,stores.storeAddress,stores.fahuoTime from goodsinfo "
        + " inner join stores on goodsinfo.storesID = stores.storesID  where goodsinfo.goodsprice = 9.9 ",
    },
    //当季必备
    dangjibibei:{
        selectDangjibiei:" select * from dangjibibei ",
        //当季推荐商品
        selectDangjibieiRecommanGoods:'select * from goodsinfo',
    },
    //登录登出注册日志
    Record:{
        //添加日志
        addToRecord:"insert into record(username,recordtype,recordtime) values (?,?,?)",
    },
    //商家入驻
    StoresRuZhu:{
        //获取商家入驻数据  来判断当前用户是否是入驻商家
        GetStoresInfo:'select * from stores where danbaoren = ?',
        //判断商家ID是否被占用  
        isStoreID:" select * from stores where storesID = ?",
        //申请商家入驻(添加商家)
        addStores:"insert into stores(storesID,storesName,haoping,imagesurl,storeStatus,juli,yunfei,storeAddress,fahuoTime,danbaoren) values (?,?,?,?,?,?,?,?,?,?)"
    }
    
}
module.exports = sqlMap;
