var Food = require('../models/Food');
var kafka = require('../kafka/client');

deleteAll=(req,res,conn)=>{
    console.log("Delete all items in a section");
    kafka.make_request('delete_all',req.body, function(err,results){
      if (err) {
        console.log("error", err);
        res.send("error");
      } else {
        console.log("success");
        console.log("results", results)
        res.send(results);
      }  })

    

// w/o mongo
// deleteAll=(req,res,conn)=>{
//     console.log("delete all from a section");
//     var queryString = "delete from Food where item_section =(?) and rest_id=(?);";
//     conn.query(queryString, [req.body.section, req.body.rest_id], function(
//       error,
//       results
//     ) {
//       if (error) {
//         console.log("error", error);
//         res.send("error");
//       } else {
//         console.log("success");
//         console.log("results", results);
//         res.end(JSON.stringify(results));
//         // res.send(results);
//       }
//     });
}
exports.deleteAll=deleteAll;