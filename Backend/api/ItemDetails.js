var Food = require('../models/Food');
var kafka = require('../kafka/client');

itemDetails=(req,res,conn)=>{
  console.log("Inside item details");
  kafka.make_request('item_details',req.body, function(err,results){
    if (err) {
      console.log("error", err);
      res.send("error");
    } else {
      console.log("success");
      console.log("results", results);
      res.end(JSON.stringify(results));
    }  })

  // w/o mongo
  // var queryString =
  //   "select item_name, item_price, item_section, item_description, item_image from Food where item_name =(?) and rest_id=(?);";
  // conn.query(queryString, [req.body.name, req.body.rest_email], function(
  //   error,
  //   results
  // ) {
  //   if (error) {
  //     console.log("error", error);
  //     res.send("error");
  //   } else {
  //     console.log("success");
  //     console.log("results", results);
  //     res.end(JSON.stringify(results));
  //     // res.send(results);
  //   }
  // });
    }
exports.itemDetails=itemDetails;