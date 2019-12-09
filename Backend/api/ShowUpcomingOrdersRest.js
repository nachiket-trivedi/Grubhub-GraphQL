var Order=require('../models/Order');
var kafka = require('../kafka/client');

showUpcomingOrdersRest=(req,res,conn)=>{
    console.log("Inside show upcoming orders of restaurant");
  let cust_email = req.body.cust_email;
  // let rest_email = req.body.rest_email;
  console.log('cust_email',cust_email);
  kafka.make_request('show_upcoming_orders_rest',req.body, function(err,results){
  // Order.find({cust_email:cust_email},function(err,results){
    if(err)
    {
        console.log(err);
        res.send(err);
    }
    else
    {
      console.log(results);
      res.end(JSON.stringify(results));
    }
  })
}
exports.showUpcomingOrdersRest=showUpcomingOrdersRest;
//

  // w/o mongo 
  // console.log("Inside show upcoming orders of restaurant");
  // let rest_id = req.body.rest_id;
  // var queryString =
  //   "select order_id, order_status, rest_name, cust_name, item_name, item_price, item_quantity, cust_address from Grubhub_db.`Order Details` Natural Join Grubhub_db.`Given Order` Natural Join Restaurant Natural Join Customer where rest_id =(?);";
  // conn.query(queryString, [rest_id], function(error, results) {
  //   if (error) {
  //     res.send("error");
  //   } else {
  //     console.log("brooooo", JSON.stringify(results));
  //     res.end(JSON.stringify(results));
  //     // res.send(results);
  //   }
  // });