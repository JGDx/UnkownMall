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

router.get("/",(req,res,next)=>{
  let page=parseInt(req.param("page"));
  let pageSize=parseInt(req.param("pageSize"));
  let sort=req.param("sort");
  let skip=(page-1)*pageSize;
  let priceGte=parseInt(req.param("priceGte"))
  let priceLt=parseInt(req.param("priceLt"));
  let params={};
  if(priceLt!=0&&priceLt!=NaN){
    params={
      salePrice:{
        $gte:priceGte,
        $lt:priceLt
      }
    }
  }


  let goodsModel= Goods.find(params).skip(skip).limit(pageSize);

  goodsModel.sort({'salePrice':sort})
  goodsModel.exec((err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
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

module.exports=router;
