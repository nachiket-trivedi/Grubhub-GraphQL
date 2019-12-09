var Food = require('../models/Food');
var kafka = require('../kafka/client');

search=(req,res,conn)=>{
  searchText = req.body.search;
  console.log('in search for-',searchText);
  // Food.find({item_name:searchText},function(err,results){
    kafka.make_request('search',req.body, function(err,results){
    if(err)
      throw err;
    else
    {
      console.log('results',results);
      res.end(JSON.stringify(results));
    }
  });

  // var queryString =
  //   "select rest_id, rest_email, rest_name, rest_cuisine, rest_image from Restaurant Natural Join Food where item_name like (?);";
  // conn.query(queryString, [searchText], function(error, results) {
  //   if (error) {
  //     res.send("error");
  //   } else {
  //     console.log("results : ", JSON.stringify(results));
  //     // let rest_id=(results[0])['rest_id'];
  //     // res.cookie('rest_id',rest_id,{maxAge: 900000, httpOnly: false, path : '/'});
  //     res.end(JSON.stringify(results));
  //     // res.send(results);
  //   }
  // });
}
exports.search=search;