var mongoose=require("mongoose")
var Schema=mongoose.Schema;

var productSchema=new Schema({
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "checked":String,
  "productNum":Number,
  "productUrl":String,
  "productType":String
});

module.exports=mongoose.model('Good',productSchema);
