var mongoose = require("mongoose")
var userSchema=new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":[
    {
      "orderId": String,
      "orderTotal": Number,
      "addressInfo": {
        "addressId":String,
        "userName":String,
        "streetName":String,
        "postCode":Number,
        "tel":Number,
        "isDefault":Boolean
      },
      "goodsList": [{
        "productId":String,
        "productName":String,
        "salePrice":Number,
        "checked":String,
        "productNum":Number,
        "productImage":String,
        "productUrl":String
      }],
      "orderStatus": String,
      "createData": String
    }
  ],
  "cartList":[
    {
    "productId": String,
    "productName": String,
    "salePrice":String,
    "productImage":String,
    "checked":String,
    "productNum":String
    }
  ],
  "addressList":[
    {
      "addressId":String,
      "userName":String,
      "streetName":String,
      "postCode":Number,
      "tel":Number,
      "isDefault":Boolean
    }
  ]
})
module.exports=mongoose.model("User",userSchema)
