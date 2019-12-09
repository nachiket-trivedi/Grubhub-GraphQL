var Order=require('../models/Order');
var kafka = require('../kafka/client');

showUpcomingOrdersCust=(req,res,conn)=>{
    console.log("Inside show upcoming orders of customer");
  let cust_email = req.body.cust_email;
  // let rest_email = req.body.rest_email;
  console.log('cust_email',cust_email);
  kafka.make_request('show_upcoming_orders_cust',req.body, function(err,results){
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

  // w/o mongo
  // var queryString =
  //   "select order_id, order_status, rest_name, item_name, item_price, item_quantity, rest_address from Grubhub_db.`Order Details` Natural Join Grubhub_db.`Given Order` Natural Join Restaurant where cust_id =(?);";
  // conn.query(queryString, [cust_id], function(error, results) {
  //   if (error) {
  //     res.send("error");
  //   } else {
  //     console.log("brooooo", JSON.stringify(results));
  //     // console.log("sections : ",JSON.stringify(results))
  //     // let rest_id=(results[0])['rest_id'];
  //     // res.cookie('rest_id',rest_id,{maxAge: 900000, httpOnly: false, path : '/'});
  //     res.end(JSON.stringify(results));
  //     // res.send(results);
  //   }
  // });
}
exports.showUpcomingOrdersCust=showUpcomingOrdersCust;