var Order = require('../models/Order');
var kafka = require('../kafka/client');

placeOrder=(req,res,conn)=>{
  console.log("Inside place order:",req.body.cust_email);
  kafka.make_request('place_order',req.body, function(err,results){
    if (err) {
      res.send("error");
    } else {
      console.log('-->',JSON.stringify(results))
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
    res.end();
    }
  })
  //



  // w/o mongo
  // let queryString = "select rest_id from Restaurant where rest_name=?";
  // conn.query(queryString, [rest_name], function(error, results) {
  //   if (error) {
  //   } else {
  //     console.log("ress--", results[0]["rest_id"]);
  //     rest_id = results[0]["rest_id"];

  //     let queryString1 =
  //       "INSERT INTO Grubhub_db.`Given Order` (cust_id,rest_id,order_status) VALUES (?,?,'New')";
  //     conn.query(queryString1, [cust_id, rest_id], function(error, results) {
  //       if (error) {
  //         res.send("error");
  //         console.log("error aya");
  //       } else {
  //         console.log("ho gaya");
  //         let order_id = results["insertId"];
  //         console.log("cart", cart);
  //         let updatedCart = [];
  //         for (item of cart) {
  //           let arr1 = [order_id];
  //           for (item1 of item) arr1.push(item1);
  //           updatedCart.push(arr1);
  //         }
  //         console.log("updatedCart", updatedCart);
  //         let queryString3 =
  //           "INSERT INTO Grubhub_db.`Order Details` (order_id, item_name, item_price, item_quantity) VALUES ?";
  //         conn.query(queryString3, [updatedCart], function(error, results) {
  //           if (error) {
  //             res.send("error");
  //             console.log(error);
  //           } else {
  //             console.log("ho gaya ye bhi");
  //             res.end();
  //           }
  //         });
  //         res.writeHead(200, {
  //           "Content-Type": "text/plain"
  //         });
  //       }
  //     });
  //   }
  // });
}
exports.placeOrder=placeOrder;