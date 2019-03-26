var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
var Goods=require("../models/goods");

//连接MongoDB数据库
mongoose.connect('mongodb://root:666666@127.0.0.1:27017/dumall')
mongoose.connection.on("connected",()=>{
  console.log("MongoDB connected success")
});
mongoose.connection.on("error",()=>{
  console.log("MongoDB connected fail")
});
mongoose.connection.on("disconnected",()=>{
  console.log("MongoDB connected disconnected")
});

//查询商品列表
router.get("/list",(req,res,next)=> {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param("sort");
  let searchContent=req.param("searchContent");
  let skip = (page - 1) * pageSize;
  let priceGte = parseInt(req.param("priceGte"));
  let priceLt = parseInt(req.param("priceLt"));
  let params = {};

  if (priceLt != 0 && priceLt != NaN) {
    params = {
      $and:[
        {
          salePrice: {
            $gte: priceGte,
            $lt: priceLt
          }
        },
        {
          productName: {$regex: searchContent}
        }
      ]
    };
  }else{
    params={
      productName:{$regex:searchContent}
    };
  }

  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  if (sort != 0) {
    goodsModel.sort({'salePrice': sort})
  }
  goodsModel.exec((err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:"",
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

//加入到购物车
router.post("/addCart",(req,res,next)=>{
  var userId=req.cookies.userId;
  var productId=req.body.productId;
  var User=require('./../models/user');
  User.findOne({userId:userId},(err,userDoc)=>{               //查找用户
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      })
    }else{
      if(userDoc){                                            //如果查询到用户
        let goodsItem="";
        userDoc.cartList.forEach((item)=>{                    //遍历用户购物车，查询商品是否存在
          if(item.productId==productId){
            goodsItem=item;
            item.productNum++;
          }
        });
        if(goodsItem){                                        //购物车里已存在该商品
          userDoc.save((err3,doc3)=>{
            if(err3){
              res.json({
                status:"1",
                msg:err3.message,
                result:''
              })
            }else{
              res.json({
                status:"0",
                msg:"",
                result:'suc'
              })
            }
          })
        }else{
          Goods.findOne({productId:productId},(err1,doc1)=>{      //查找商品
            if(err1){
              res.json({
                status:"1",
                msg:err1.message,
                result:''
              })
            }else{
              if(doc1){                                         //如果查询到要添加的商品信息
                doc1._doc.productNum=1;
                doc1._doc.checked=1;
                userDoc.cartList.push(doc1);
                userDoc.save((err2,doc2)=>{
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message,
                      result:''
                    })
                  }else{
                    res.json({
                      status:"0",
                      msg:"",
                      result:'suc'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})


module.exports=router;
