var express = require('express');
var router = express.Router();
require('./../util/util');
var User=require("../models/user");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('test');
});

function getId(code){
  var platform=code;
  var r1=Math.floor(Math.random()*10);
  var r2=Math.floor(Math.random()*10);
  var sysDate=new Date().Format('yyyyMMddhhmmss');
  return platform+r1+sysDate+r2;
}

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
        // req.session.userId=doc.userId;
        // req.session.userName=doc.userName;
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

//获取用户名addAddress
router.get("/checkLogin",(req,res,next)=>{
    res.json({
      status:"0",
      msg:"",
      result:{
        userName:req.cookies.userName
        // userName:req.session.userName
      }
    })
});

//检测用户名是否存在
router.post("/checkRegUserName",(req,res,next)=>{
  let userName=req.body.userName;
  User.findOne({userName:userName},(err,user)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      if(user){
        res.json({
          status:'101',
          msg:"用户名已存在",
          result:''
        })
      }else{
        res.json({
          status:'0',
          msg:'',
          result:'suc'
        })
      }
    }
  })
})

//注册接口
router.post("/register",(req,res,next)=>{
  let userName=req.body.userName;
  let userPwd=req.body.userPwd;
  var platform='622';
  var r1=Math.floor(Math.random()*10);
  var r2=Math.floor(Math.random()*10);
  var sysDate=new Date().Format('yyyyMMddhhmmss');
  var userId=platform+r1+sysDate+r2;
  var content={
    userId:userId,
    userName:userName,
    userPwd:userPwd
  };
  var newUser=new User(content);
  newUser.save((err,doc)=>{
    if(err){
      res.json({
        status:'1',
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


//查询当前用户的购物车数量
router.get("/getCartCount",(req,res,next)=>{
  if(req.cookies && req.cookies.userId){
    var userId=req.cookies.userId;
    User.findOne({userId:userId},(err,user)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
        var cartList=user.cartList;
        var cartCount=0;
        cartList.map((item)=>{
          cartCount+=parseInt(item.productNum);
        })
        res.json({
          status:'0',
          msg:'',
          result:cartCount
        })
      }
    })
  }
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
        addressId:getId("433"),
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

//订单生成接口
router.post('/payMent',(req,res,next)=>{
  var userId=req.cookies.userId;
  var orderTotal=req.body.orderTotal;
  var addressId=req.body.addressId;
  User.findOne({userId:userId},(err,user)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      var address='',goodsList=[];
      //获取当前用户的地址信息
      user.addressList.forEach((item)=>{
        if(addressId==item.addressId){
          address=item;
        }
      });
      //获取用户购物车的购买商品
      user.cartList.filter((item)=>{
        if(item.checked=='1'){
          goodsList.push(item);
        }
      });
      var platform='622';
      var r1=Math.floor(Math.random()*10);
      var r2=Math.floor(Math.random()*10);

      var sysDate=new Date().Format('yyyyMMddhhmmss');
      var createDate=new Date().Format('yyyy-MM-dd hh:mm:ss');
      var orderId=platform+r1+sysDate+r2;
      var order={
        orderId:orderId,
        orderTotal:orderTotal,
        addressInfo:address,
        goodsList:goodsList,
        orderStatus:'1',
        createData:createDate
      };
      user.orderList.push(order);
      user.save((err1,doc1)=>{
        if(err1){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:order.orderId,
              orderTotal:order.orderTotal
            }
          })
        }
      });
    }
  })
})

//查询订单详情接口
router.get("/orderDetail",(req,res,next)=>{
  var userId=req.cookies.userId;
  var orderId=req.param("orderId");
  User.findOne({userId:userId},(err,userInfo)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      var orderList=userInfo.orderList;
      if(orderList.length>0){
        var orderTotal=0;
        orderList.forEach((item)=>{
          if(item.orderId==orderId){
            orderTotal=item.orderTotal;
          }
        });
        if(orderTotal){
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:orderId,
              orderTotal:orderTotal
            }
          })
        }else{
          res.json({
            status:'120002',
            msg:'无此订单',
            result:''
          })
        }
      }else{
        res.json({
          status:'120001',
          msg:"当前用户未创建订单",
          result:''
        })
      }
    }
  })
})


module.exports = router;
