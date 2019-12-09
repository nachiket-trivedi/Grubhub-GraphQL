var Order=require('../models/Order');
var kafka = require('../kafka/client');

changeStatus=(req,res,conn)=>{
  let order_id = req.body.order_id;
  let status = req.body.status;
  console.log("order_id", order_id);
  console.log("status", status);
  
  kafka.make_request('change_status',req.body, function(err,results){
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

  // var queryString =
  //   "UPDATE Grubhub_db.`Given Order` SET order_status =? WHERE order_id=?;";
  // conn.query(queryString, [status, order_id], function(error, results) {
  //   if (error) {
  //     res.send("error");
  //   } else {
  //     console.log("brooooo", JSON.stringify(results));
  //     res.end(JSON.stringify(results));
  //     // res.send(results);
  //   }
  // });
  }
  exports.changeStatus=changeStatus;