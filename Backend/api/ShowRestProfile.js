var Restaurant = require('../models/Restaurant');
var kafka = require('../kafka/client');
showRestProfile=(req,res,conn)=>{
  console.log("Inside show rest profile");
  kafka.make_request('show_rest_profile',req.body, function(err,results){
  // Restaurant.find({ rest_email: req.body.email }, function(err, results) {
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
exports.showRestProfile=showRestProfile;