var Customer = require('../models/Customer');
var kafka = require('../kafka/client');
showCustProfile=(req,res,conn)=>{
  console.log("Inside show cust profile");
  kafka.make_request('show_cust_profile',req.body, function(err,results){
  // Customer.find({ cust_email: req.body.email }, function(err, results) {
    if (err) throw err;
    else {
      res.send(results);
    }
  });

// w/o mongo
// var queryString =
// "select cust_name,cust_email,cust_phone,cust_zipcode, cust_address, cust_image from Customer where cust_email =(?);";
// conn.query(queryString, [req.body.email], function(error, results) {
// if (error) {
//   res.send("error");
// } else {
//   // console.log(results);
//   res.send(results);
// }
// });
// console.log("User data : ",JSON.stringify(data));
// res.end(JSON.stringify(data));
}
exports.showCustProfile=showCustProfile;