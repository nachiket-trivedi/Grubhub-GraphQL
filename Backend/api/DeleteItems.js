var Food = require('../models/Food');
var kafka = require('../kafka/client');

deleteItems=(req,res,conn)=>{
    console.log("Delete item details");
      kafka.make_request('delete_items',req.body, function(err,results){
      if (err) {
        console.log("error", err);
        res.send("error");
      } else {
        console.log("success");
        console.log("results", results)
        res.send(results);
      }  })


    
    // w/o mongo
    // var queryString = "delete from Food where item_name =(?) and rest_id=(?);";
    // conn.query(queryString, [req.body.name, req.body.rest_id], function(
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
exports.deleteItems=deleteItems;