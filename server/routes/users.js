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
  let userId=req.cookies.userId;
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

//购物车删除
router.post('/cartDel',(req,res,next)=>{
  let userId=req.cookies.userId;
  let productId=req.body.productId;
  User.update({
    userId:userId},{
      $pull:{
        'cartList':{
          'productId':productId
        }
      }
    },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:'suc'
      })
    }
  });
});

//商品数量修改
router.post("/cartEdit",(req,res,next)=>{
  let userId=req.cookies.userId;
  let productId=req.body.productId;
  let productNum=req.body.productNum;
  let checked=req.body.checked;
  User.update({"userId":userId,'cartList.productId':productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:'suc'
      })
    }
  })
});

//全选或全不选
router.post("/cartEditCheckAll",(req,res,next)=>{
  let userId=req.cookies.userId;
  let checkAll=req.body.checkAll?'1':'0';
  User.findOne({userId:userId},(err,user)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      if(user){
        user.cartList.forEach((item)=>{
          item.checked=checkAll;
        })
        user.save((err1,doc)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:"0",
              msg:'',
              result:'suc'
            })
          }
        })
      }
    }
  })
})

//查询用户地址接口
router.get("/addressList",(req,res,next)=>{
  var userId=req.cookies.userId;
  User.findOne({userId:userId},(err,user)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:user.addressList
      })
    }
  })
})

//设置默认地址接kkkk
router.post("/setDefault",(req,res,next)=>{
  var userId=req.cookies.userId;
  var addressId=req.body.addressId;
  if(!addressId){
    res.json({
      status:"1003",
      msg:"addressId is null",
      result:''
    })
  }else
  {
    User.findOne({userId:userId},(err,user)=>{
      if(err){
        res.json({
          status:"1",
          msg:err.message,
          result:''
        })
      }else{
        var addressList=user.addressList;
        addressList.forEach((item)=>{
          if(item.addressId==addressId){
            item.isDefault=true;
          }else{
            item.isDefault=false;
          }
        });
        user.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:"1",
              msg:err.message,
              result:''
            })
          }else{
            res.json({
              status:"0",
              msg:'',
              result:'suc'
            })
          }
        })

      }
    })
  }
})

//删除地址接口
router.post("/delAddress",(req,res,next)=>{
  var userId=req.cookies.userId;
  var addressId=req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        addressId:addressId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
})

//增加地址接口
router.post("/addAddress",(req,res,next)=>{
  var userId=req.cookies.userId;
  var addressId=req.body.addressId;
  var userName=req.body.userName;
  var streetName=req.body.streetName;
  var postCode=req.body.postCode;
  var tel=req.body.tel;
  User.update({
    userId:userId
  },{
    $push:{
      addressList:{
        addressId:addressId,
        userName:userName,
        streetName:streetName,
        postCode:postCode,
        tel:tel
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      })
    }
  })
});

module.exports = router;
