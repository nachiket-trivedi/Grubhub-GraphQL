var Food = require('../models/Food');
var kafka = require('../kafka/client');

updateItem=(req,res,conn)=>{
    console.log("In update item details");
    kafka.make_request('update_item',req.body, function(err,results){
      if (err) {
        res.send("error");
      } else {
        console.log('-->',JSON.stringify(results))
        res.send(JSON.stringify(results));
      }
    });


  // var queryString =
  //   "update Food set item_name=(?),item_price=(?),item_section=(?),item_description=(?) where rest_id=(?) and item_name=(?);";
  // conn.query(
  //   queryString,
  //   [
  //     req.body.name,
  //     req.body.price,
  //     req.body.section,
  //     req.body.description,
  //     req.body.rest_id,
  //     req.body.oldName
  //   ],
  //   function(error, results) {
  //     if (error) {
  //       console.log("error", error);
  //       res.send("error");
  //     } else {
  //       console.log("success");
  //       console.log("results", results);
  //       res.end(JSON.stringify(results));
  //       // res.send(results);
  //     }
  //   }
  // );
}
exports.updateItem=updateItem;