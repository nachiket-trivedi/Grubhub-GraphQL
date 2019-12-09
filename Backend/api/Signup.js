var Customer = require('../models/Customer');
var Restaurant = require('../models/Restaurant');
const GlobalVar = require("../GlobalVar");
var jwt = require('jsonwebtoken');

signup=(req, res, conn, bcrypt,saltRounds)=> {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let roleObject = req.body.role;
  let role = roleObject.value;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let name = req.body.name;
  if (role == "Customer") {  
    //---------------w/ mongobd
    let cust_id="";
    var cust = Customer({
      cust_name: name,
      cust_email: username,
      cust_phone: phone,
      cust_zipcode:zipcode
    });
    Customer.find({}, function(err, results) {
      if (err) throw err;
      let cust_data = results;
      let flag = 0;
      cust_data.forEach(element => {
        if (username == element.cust_email) {
          flag = 1;
        }
        cust_id = element.cust_id;
        console.log("in customer signup with cust id:", cust_id);
      });
      cust_id++;
      if (flag == 1) {
        console.log("customer id exists");
        res.send("exists");
      } else {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          cust.cust_password=hash;
          cust.save(function(err) {
            if (err) throw err;
          
            console.log('User saved successfully!');
            console.log("cookie time");
                  res.cookie("cookie", "customer", {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("email", username, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("name", name, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("cust_id", cust_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("idGeneric", "c_" + cust_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  let token=jwt.sign({email: username},GlobalVar['secret']);
                  token="Bearer "+token;
                  console.log('token is----',token);
                  res.setHeader("Access-Control-Expose-Headers", "Authorization");
                  res.header({"Authorization": token})
                  let cookieObj={cookie:"customer", email:username, name:name, cust_id:cust_id, idGeneric:"c_" + cust_id}
                  res.send(cookieObj);
                  res.end("Successful Account Creation");
          });
      // object of all the users
      console.log('custs',results);
      
    });
  }});
////---------------w/o mongodb
    // var queryString = "select * from Customer";
    // let cust_id = 0;
    // conn.query(queryString, function(error, results) {
    //   if (error) {
    //     console.log("nvt001");
    //     res.send("error");
    //   } else {
    //     let cust_data = results;
    //     let flag = 0;
    //     cust_data.forEach(element => {
    //       if (username == element.cust_email) {
    //         flag = 1;
    //       }
    //       cust_id = element.cust_id;
    //       console.log("first here----", cust_id);
    //     });
    //     cust_id++;
    //     if (flag == 1) {
    //       console.log("here");
    //       res.send("exists");
    //     } else {
    //       bcrypt.hash(password, saltRounds, function(err, hash) {
    //         var queryString1 =
    //           "INSERT INTO Customer (cust_name,cust_email,cust_password,cust_phone,cust_zipcode) VALUES (?,?,?,?,?)";
    //         conn.query(
    //           queryString1,
    //           [name, username, hash, phone, zipcode],
    //           function(error, results) {
    //             if (error) {
    //               console.log("error here----", error);
    //               res.send("error");
    //             } else {
    //               console.log("cookie timeeeeee");
    //               res.cookie("cookie", "customer", {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("email", username, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("name", name, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("cust_id", cust_id, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.cookie("idGeneric", "c_" + cust_id, {
    //                 maxAge: 900000,
    //                 httpOnly: false,
    //                 path: "/"
    //               });
    //               res.writeHead(200, {
    //                 "Content-Type": "text/plain"
    //               });
    //               res.end("Successful Account Creation");
    //             }
    //           }
    //         );
    //       });
    //     }
    //   }
    // });
  } else if (role == "Restaurant") {
    let rest_id = "";
    //---------------w/ mongobd
    var rest = Restaurant({
      rest_name: name,
      rest_email: username,
      rest_phone: phone,
      rest_zipcode:zipcode
    });
    Restaurant.find({}, function(err, results) {
      if (err) throw err;
      let rest_data = results;
      let flag = 0;
      rest_data.forEach(element => {
        if (username == element.rest_email) {
          flag = 1;
        }
        rest_id = element.rest_id;
        console.log("in restaurant signup with rest id:", rest_id);
      });
      rest_id++;
      if (flag == 1) {
        console.log("restaurant id exists");
        res.send("exists");
      } else {
        bcrypt.hash(password, saltRounds, function(err, hash) {
          rest.rest_password=hash;
          rest.save(function(err) {
            if (err) throw err;
          
            console.log('User saved successfully!');
            console.log("cookie time");
                  res.cookie("cookie", "restaurant", {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("email", username, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("name", name, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("rest_id", rest_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  res.cookie("idGeneric", "r_" + rest_id, {
                    maxAge: 900000,
                    httpOnly: false,
                    path: "/"
                  });
                  let token=jwt.sign({email: username},GlobalVar['secret']);
                  token="Bearer "+token;
                  console.log('token is----',token);
                  res.setHeader("Access-Control-Expose-Headers", "Authorization");
                  res.header({"Authorization": token});
                  let cookieObj={cookie:"restaurant", email:username, name:name, rest_id:rest_id, idGeneric:"r_" + rest_id}
                  res.send(cookieObj);
                  res.end("Successful Account Creation");
          });
      // object of all the users
      console.log('rest',results);
      
    });
  }});
////---------------w/o mongodb
  //   var queryString = "select * from Restaurant";
  //   conn.query(queryString, function(error, results) {
  //     if (error) {
  //       res.send("error");
  //     } else {
  //       let rest_data = results;
  //       let flag = 0;
  //       rest_data.forEach(element => {
  //         if (username == element.rest_email) {
  //           flag = 1;
  //         }
  //         rest_id = element.rest_id;
  //       });
  //       rest_id++;
  //       if (flag == 1) {
  //         res.send("exists");
  //       } else {
  //         bcrypt.hash(password, saltRounds, function(err, hash) {
  //           var queryString1 =
  //             "INSERT INTO Restaurant (rest_name,rest_email,rest_password,rest_phone,rest_zipcode) VALUES (?,?,?,?,?)";
  //           conn.query(
  //             queryString1,
  //             [name, username, hash, phone, zipcode],
  //             function(error, results) {
  //               if (error) {
  //                 console.log("nvt0-");
  //                 res.send("error");
  //               } else {
  //                 res.cookie("cookie", "restaurant", {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("email", username, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("name", name, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("rest_id", rest_id, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.cookie("idGeneric", "r_" + rest_id, {
  //                   maxAge: 900000,
  //                   httpOnly: false,
  //                   path: "/"
  //                 });
  //                 res.writeHead(201, {
  //                   "Content-Type": "text/plain"
  //                 });
  //                 res.end("Successful Account Creation");
  //               }
  //             }
  //           );
  //         });
  //       }
  //     }
  //   });
  }
}
exports.signup=signup;