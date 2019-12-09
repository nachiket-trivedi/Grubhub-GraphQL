var Food = require('../models/Food');
var kafka = require('../kafka/client');

filterCuisine=(req,res,conn)=>{
  searchText = req.body.search;
  cuisine = req.body.cuisine;
  console.log("searchText", searchText);
  console.log("cuisine", cuisine);
  kafka.make_request('filter_cuisine',req.body, function(err,results){

  // Food.find({item_name:searchText, rest_cuisine:cuisine},function(err,results){
    if(err)
      throw err;
    else
    {
      console.log('results',results);
      res.end(JSON.stringify(results));
    }
  });


  // var queryString =
  //   "select rest_id, rest_email, rest_name, rest_cuisine, rest_image from Restaurant Natural Join Food where item_name like (?) and rest_cuisine=(?);";
  // conn.query(queryString, [searchText, cuisine], function(error, results) {
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
    exports.filterCuisine=filterCuisine;