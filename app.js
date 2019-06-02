var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')

var routerClient = require('./routes/router-Client.js')
var routerAdmin = require('./routes/router-Admin.js')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
// for parsing application/json

// 转化参数格式
app.use(bodyParser.urlencoded({
	extended: true   // for parsing application/x-www-form-urlencoded
}));
//配置diskStorage来控制文件存储的位置以及文件名字等
var storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb){
    cb(null, './public/images/uploadImage')
  },
// ![](http://images2017.cnblogs.com/blog/1283058/201802/1283058-20180201154342296-515041615.png)
  //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function (req, file, cb){
    cb(null, Date.now()+file.originalname)
  }
});
//生成的专门处理上传的一个工具，可以传入storage、limits等配置
var upload = multer({storage: storage});
//接收上传图片请求的接口
app.post('/upload', upload.single('file'), function (req, res, next) {
  //图片已经被放入到服务器里,且req也已经被upload中间件给处理好了（加上了file等信息）
  //线上的也就是服务器中的图片的绝对地址
  var url = '/images/uploadImage/' + req.file.filename
  res.json({
    code : 200,
    data : url
  })
});
/**
 *
 * form-data:表单提交的格式
 * x-www-form-urlencoded:ajax提交数据格式
 * 
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);   //跳转到服务器首页下
// app.use('/users', usersRouter); 
app.use('/',routerClient);
app.use('/admin',routerAdmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
