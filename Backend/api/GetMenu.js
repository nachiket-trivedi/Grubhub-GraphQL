var Food = require('../models/Food');
var kafka = require('../kafka/client');

getMenu=(req,res,conn)=>{
    console.log("Inside get menu");
    kafka.make_request('get_menu',req.body, function(err,results){
      // Food.find({rest_email:req.body.email},function(err,results){
      if (err) {
        res.send("error");
      } else {
        console.log('-->',JSON.stringify(results))
        res.send(JSON.stringify(results));
      }
    });
    // w/o mongo
    // var queryString =
    //   "select rest_name, rest_cuisine, rest_image, item_name, item_price, item_section, item_description, item_image from Restaurant Natural Join Food where rest_email =(?);";
    // conn.query(queryString, [email], function(error, results) {
    //   if (error) {
    //     res.send("error");
    //   } else {
    //     console.log("bhaiiii", JSON.stringify(results));
    //     // console.log("sections : ",JSON.stringify(results))
    //     // let rest_id=(results[0])['rest_id'];
    //     // res.cookie('rest_id',rest_id,{maxAge: 900000, httpOnly: false, path : '/'});
    //     res.send(JSON.stringify(results));
    //     // res.send(results);
    //   }
    // });
    }
    exports.getMenu=getMenu;