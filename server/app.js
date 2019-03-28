var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var adminRouter = require('./routes/admin');
var multipart=require('connect-multiparty');
var app = express();
app.use(multipart({uploadDir:'./static'})); //设置文件上传地址
// var session = require("express-session");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'this is the secret for cookie',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(function (req, res, next) {
//   var url = req.originalUrl;
//   if (url != "/" && undefined == req.session.userId) {
//     res.send('<script>top.location.href="/";</script>');　　　　　　//解决内嵌iframe时session拦截问题
//     return;
//   }
//   next();
// });

app.use((req,res,next)=>{
  if(req.cookies.userId){
    if(req.path.indexOf('/admin')){
      if(req.cookies.userId=='100000077'){
        next();
      }else{
        res.json({
          status:"808",
          msg:"未授权操作",
          result:""
        })
      }
    }else{
      next();
    }
  }else{
    if(req.originalUrl=='/users/login'||req.originalUrl=='/users/logout'||req.path=="/goods/list"||req.path=='/users/checkRegUserName'||req.path=='/users/register'){
      next();
    }else{
      res.json({
        status:"10001",
        msg:"当前未登陆",
        result:""
      })
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
app.use('/admin',adminRouter);

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
