var Customer = require('../models/Customer');
var kafka = require('../kafka/client');
updateCust=(req,res,conn)=>{
console.log("Inside update cust profile");

kafka.make_request('update_cust',req.body, function(err,results){
  if (err) {
    res.send("error");
  } else {
    console.log('-->',JSON.stringify(results))
    res.cookie("cust_address",results['key1']);
    res.send(JSON.stringify(results['key2']));
  }
})
//




  // w/o mongo
  // var queryString = "select * from Customer";
  // conn.query(queryString, function(error, results) {
  //   if (error) {
  //     console.log("nvt001");
  //     res.send("error");
  //   } else {
  //     let cust_data = results;
  //     let flag = 0;
  //     cust_data.forEach(element => {
  //       if (
  //         req.body.oldEmail != req.body.email &&
  //         req.body.email == element.cust_email
  //       ) {
  //         flag = 1;
  //         console.log("first here");
  //       }
  //     });
  //     if (flag == 1) {
  //       console.log("here");
  //       res.send("exists");
  //     } else {
  //       var queryString =
  //         "update Customer set cust_name=(?),cust_email=(?),cust_phone=(?),cust_zipcode=(?), cust_address=(?), cust_image=(?) where cust_email =(?);";
  //       conn.query(
  //         queryString,
  //         [
  //           req.body.name,
  //           req.body.email,
  //           req.body.phone,
  //           req.body.zip,
  //           req.body.address,
  //           req.body.image,
  //           req.body.oldEmail
  //         ],
  //         function(error, results) {
  //           if (error) {
  //             res.send("error");
  //           } else {
  //             console.log(results);
  //             res.send(results);
  //           }
  //         }
  //       );
  //       // console.log("User data : ",JSON.stringify(data));
  //       // res.end(JSON.stringify(data));
  //     }
  //   }
  // });
}
exports.updateCust=updateCust;