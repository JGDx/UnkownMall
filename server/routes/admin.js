var express = require('express');
var router = express.Router();
require('./../util/util');

var Goods=require('./../models/goods');
var User=require("../models/user");

var multipart=require('connect-multiparty');
var multipartMiddleware=multipart();


//存放图片
router.post("/addImage",multipartMiddleware,(req,res,next)=>{
  console.log(req.body,req.files);
  console.log(req.files.img0.path);
  var path=req.files.img0.path;
  res.json({
    status:'0',
    msg:'',
    result:{
      productImage:path.substring(path.indexOf('\\')+1)
    }
  })
});

//增加商品
router.post("/addGoods",(req,res,next)=>{
  let productImage=req.body.productImage;
  let productName=req.body.productName;
  let salePrice=req.body.salePrice;
  let productType=req.body.productType;
  var platform='606';
  var r1=Math.floor(Math.random()*10);
  var r2=Math.floor(Math.random()*10);
  var sysDate=new Date().Format('yyyyMMddhhmmss');
  var productId=platform+r1+sysDate+r2;
  var content={
    productId:productId,
    productName:productName,
    salePrice:salePrice,
    productImage:productImage,
    productUrl:'',
    productType:productType
  };
  var newGoods=new Goods(content);
  newGoods.save((err,doc)=>{
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
});


//删除商品
router.post('/delProduct',(req,res,next)=>{
  let productId=req.body.productId;
  Goods.deleteOne({
    productId:productId
  },(err,doc)=>{
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
  });
});

//更改商品
router.post('/updateGoods',(req,res,next)=>{
  let productId=req.body.productId;
  let productName=req.body.productName;
  let salePrice=req.body.salePrice;
  let productType=req.body.productType;
  Goods.update({
    productId:productId
  },{
    $set:{
      productName:productName,
      salePrice:salePrice,
      productType:productType
      // $and:[
      //   {
      //     productName:productName
      //   },
      //   {
      //     salePrice:salePrice
      //   }
      // ]
    }
  },(err,doc)=>{
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
});

module.exports=router;
