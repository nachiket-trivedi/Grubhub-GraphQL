var Food = require('../models/Food');
var kafka = require('../kafka/client');

getMenuByCust=(req,res,conn)=>{
    console.log("Inside get menu for customer",req.body.rest_email);
    // Food.find({rest_email:req.body.rest_email},function(err,results){
      kafka.make_request('get_menu_by_cust',req.body, function(err,results){
      if(err)
        throw err;
      else
      {
        console.log('results',results);
        res.end(JSON.stringify(results));
      }
    });

    // let restId = req.body.restId;
    // var queryString =
    //   "select rest_id, rest_name, rest_cuisine, rest_image, item_name, item_price, item_section, item_description, item_image from Restaurant Natural Join Food where rest_id =(?);";
    // conn.query(queryString, [restId], function(error, results) {
    //   if (error) {
    //     res.send("error");
    //   } else {
    //     // console.log("sections : ",JSON.stringify(results))
    //     // let rest_id=(results[0])['rest_id'];
    //     // res.cookie('rest_id',rest_id,{maxAge: 900000, httpOnly: false, path : '/'});
    //     res.end(JSON.stringify(results));
    //     // res.send(results);
    //   }
    // });
}
exports.getMenuByCust=getMenuByCust;