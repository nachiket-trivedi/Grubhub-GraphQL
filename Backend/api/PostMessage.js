var Food = require('../models/Food');
var kafka = require('../kafka/client');

postMessage=(req,res,conn)=>{
    console.log("In post msg cust", req.body);
    kafka.make_request('post_message',req.body, function(err,results){
      if (err) {
        res.send("error");
      } else {
        console.log('-->',JSON.stringify(results))
        res.send(JSON.stringify(results));
      }
    });
}
exports.postMessage=postMessage;
