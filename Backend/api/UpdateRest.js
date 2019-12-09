var Restaurant = require('../models/Restaurant');
var Food = require('../models/Food');
var kafka = require('../kafka/client');

updateRest=(req,res,conn)=>{
  console.log("Inside update rest profile");

  kafka.make_request('update_rest',req.body, function(err,results){
    if (err) {
      res.send("error");
    } else {
      console.log('-->',JSON.stringify(results))
      res.cookie("cuisine",results['key1']);
      res.send(JSON.stringify(results['key2']));
    }
  });
  //
  // Food.findOneAndUpdate({ rest_email: req.body.oldEmail }, {
  //   rest_name: req.body.name,
  //   rest_email:req.body.email,
  //   rest_cuisine: req.body.cuisine,
  // }, function(err, results) {
  //   console.log('update time0')
  //   if (err) 
  //     console.log(error);
  //   else
  //   {
  //     res.cookie("cuisine", req.body.cuisine, {
  //       httpOnly: false,
  //       path: "/"
  //     });
  //   }
  // });
  // Restaurant.find({}, function(err, results) {
  //   if (err) throw err;
  //   else {
  //     let rest_data = results;
  //     let flag = 0;
  //     rest_data.forEach(element => {
  //       if (
  //         req.body.oldEmail != req.body.email &&
  //         req.body.email == element.rest_email
  //       ) {
  //         flag = 1;
  //       }
  //     });
  //     if (flag == 1) {
  //       console.log("email already exists");
  //       res.send("exists");
  //     } else {        
  //       Restaurant.findOneAndUpdate({ rest_email: req.body.oldEmail }, {
  //         rest_name: req.body.name,
  //         rest_email:req.body.email,
  //         rest_phone: req.body.phone,
  //         rest_zipcode: req.body.zip,
  //         owner_name: req.body.owner_name,
  //         rest_cuisine: req.body.cuisine,
  //         rest_address: req.body.address
  //       }, function(err, results) {
  //         console.log('update time0')
  //         if (err) 
  //           res.send("error");
  //         else
  //         {
  //           res.cookie("cuisine", req.body.cuisine, {
  //             httpOnly: false,
  //             path: "/"
  //           });
  //           console.log('update time')
  //           res.send(JSON.stringify(results));
  //         }
  //       });
  //     }
  //   }
  // });

  // w/o mongo
  // var queryString = "select * from Restaurant";
  // conn.query(queryString, function(error, results) {
  //   if (error) {
  //     console.log("nvt001");
  //     res.send("error");
  //   } else {
  //     let rest_data = results;
  //     let flag = 0;
  //     rest_data.forEach(element => {
  //       if (
  //         req.body.oldEmail != req.body.email &&
  //         req.body.email == element.rest_email
  //       ) {
  //         flag = 1;
  //         console.log("first here");
  //       }
  //     });
  //     if (flag == 1) {
  //       console.log("here");
  //       res.send("exists");
  //     } else {
  //       var queryString =
  //         "update Restaurant set rest_name=(?),rest_email=(?),rest_phone=(?),rest_zipcode=(?), rest_address=(?), rest_image=(?), rest_cuisine=(?), owner_name=(?) where rest_email =(?);";
  //       conn.query(
  //         queryString,
  //         [
  //           req.body.name,
  //           req.body.email,
  //           req.body.phone,
  //           req.body.zip,
  //           req.body.address,
  //           req.body.image,
  //           req.body.cuisine,
  //           req.body.owner_name,
  //           req.body.oldEmail
  //         ],
  //         function(error, results) {
  //           if (error) {
  //             res.send("error");
  //           } else {
  //             console.log(results);
  //             res.send(results);
  //           }
  //         }
  //       );
  //       // console.log("User data : ",JSON.stringify(data));
  //       // res.end(JSON.stringify(data));
  //     }
  //   }
  // });
  }
    exports.updateRest=updateRest;