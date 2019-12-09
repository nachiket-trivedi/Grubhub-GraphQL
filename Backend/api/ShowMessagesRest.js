var kafka = require('../kafka/client');

showMessagesRest=(req,res,conn)=>{
    console.log("Inside show messages of restaurant");
  kafka.make_request('show_messages_rest',req.body, function(err,results){
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
exports.showMessagesRest=showMessagesRest;