var express = require('express');
var router = express.Router();
var User=require("../models/user");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('test');
});

//登陆接口
router.post('/login',(req,res,next)=>{
  let param={
    userName:req.body.userName,
    userPwd:req.body.userPwd
  };
  User.findOne(param,(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        // req.session.user=doc;
        res.json({
          status:"0",
          msg:"",
          result:{
            userName:doc.userName,
          }
        })
      }else{
        res.json({
          status:"1",
          msg:"用户名或密码不正确"
        })
      }
    }
  })
});

//登出接口
router.post("/logout",(req,res,next)=>{
  res.cookie("userId","",{
    path:"/",
    maxAge:0
  })
  res.json({
    status:"0",
    msg:"",
    result:""
  })
});

//获取用户名
router.get("/checkLogin",(req,res,next)=>{
    res.json({
      status:"0",
      msg:"",
      result:{
        userName:req.cookies.userName
      }
    })
})

//查询当前用户的购物车
router.get("/cartList",(req,res,next)=>{
  var userId=req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.mesage,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:"0",
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
});

module.exports = router;