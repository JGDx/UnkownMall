var express=require('express');
var router=express.Router();
var parse=require('csv-parse/lib/sync');
var fs=require('fs');

function ConvertToTable(data, callBack) {
  data = data.toString();
  var table = new Array();
  var rows = new Array();
  rows = data.split("\r\n");
  for (var i = 0; i < rows.length; i++) {
    table.push(rows[i].split(","));
  }
  callBack(table);
}
router.get('/',(req,res,next)=>{
  var iconv = require('iconv-lite');
  var fs = require('fs');
  var fileStr = fs.readFileSync('/VOLVO-DATA/84035_Motability_A4_Press_Ad_CS6_v2_146555_0.indd.csv', {encoding:'binary'});
  var buf = new Buffer(fileStr, 'binary');
  var str = iconv.decode(buf, 'UTF-8');
  var output='/out.txt';
  fs.writeFile(output,str,(err)=>{
    if(err)
      throw err;
  });
  // console.log(str);


  // const input=fs.readFileSync('/2019.3.29.csv');
  // const output='/out';
  // const records=parse(input,{
  //   columns:true,
  //   skip_empty_lines:true
  // });
  // fs.writeFile(output,records,(err)=>{
  //   if(err)
  //     throw err;
  // })
  // // console.log('ufeff'+records);



  // var output='/out';
  // fs.readFile('/2019.3.29.csv', function (err, data) {
  //
  //
  //   if (err) {
  //     console.log(err.stack);
  //     return;
  //   }
  //     ConvertToTable(data, function (table) {
  //       fs.writeFile(output,'ufeff'+table,(err)=>{
  //         if(err)
  //           throw err;
  //       })
  //       console.log(table);
  //     })
  //   });
  //
  //
  // console.log("程序执行完毕");
});






module.exports=router;
