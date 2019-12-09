var Food=require('../models/Food');
var kafka = require('../kafka/client');

addToMenu=(req,res,conn)=>{
console.log("Inside add to menu");
  console.log(req.body);
  kafka.make_request('add_to_menu',req.body, function(err,results){
        if (err) console.log(err);
        else{
          console.log("food item added");
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      res.end("Successful Account Creation");
        }
      })
      // })
      

  // w/o mongodb
  // var queryString1 =
  //   "INSERT INTO Food (item_name,rest_email,item_price,item_section,item_description) VALUES (?,?,?,?,?)";
  // conn.query(
  //   queryString1,
  //   [
  //     req.body.name,
  //     req.body.rest_email,
  //     req.body.price,
  //     req.body.section,
  //     req.body.description
  //   ],
  //   function(error, results) {
  //     if (error) {
  //       console.log(error);
  //       res.send("error");
  //     } else {
  //       console.log("added");
  //       res.writeHead(200, {
  //         "Content-Type": "text/plain"
  //       });
  //     }
  //   }
  // );
}
exports.addToMenu=addToMenu;