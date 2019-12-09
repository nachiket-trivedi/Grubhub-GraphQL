//package imports
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var mysql = require("mysql");
var corsPrefetch = require("cors-prefetch-middleware");
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var kafka = require('./kafka/client');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
//api declarations
var Database=require('../Backend/Database');
var Login=require('./api/Login');
var Signup=require('./api/Signup');
var ShowCustProfile=require('./api/ShowCustProfile');
var ShowRestProfile=require('./api/ShowRestProfile');
var UpdateCust=require('./api/UpdateCust');
var UpdateRest=require('./api/UpdateRest');
var GetMenu=require('./api/GetMenu');
var AddToMenu=require('./api/AddToMenu');
var ItemDetails=require('./api/ItemDetails');
var DeleteItems=require('./api/DeleteItems');
var UpdateItem=require('./api/UpdateItem');
var DeleteAll=require('./api/DeleteAll');
var Search=require('./api/Search');
var GetMenuByCust=require('./api/GetMenuByCust');
var PlaceOrder=require('./api/PlaceOrder');
var ShowUpcomingOrdersCust=require('./api/ShowUpcomingOrdersCust');
var ShowUpcomingOrdersRest=require('./api/ShowUpcomingOrdersRest');
var ChangeStatus=require('./api/ChangeStatus');
var FilterCuisine=require('./api/FilterCuisine');
var PostMessage=require('./api/PostMessage');
var ImageUploadProfile=require('./api/ImageUploadProfile');
var ShowMessagesCust=require('./api/ShowMessagesCust.js');
var ShowMessagesRest=require('./api/ShowMessagesRest.js');

//few constants declarations
const GlobalVar = require("../Backend/GlobalVar");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//mongodb model declaration for passport jwt
var Customer = require('../Backend/models/Customer');
var Restaurant = require('../Backend/models/Restaurant');

//express delcarations
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(__dirname + "/images"));
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors({origin: GlobalVar['hostedAddress'] + ":3000", credentials:true})); //self note-use cors to allow cross origin resource sharing
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);//self note-we use express session to maintain session data
app.use(bodyParser.json());
app.use("/graphql",graphqlHTTP({
  schema,
  graphiql: true
}));
// DB settings-MySQL-uncommented because conn is pased to the apis
var conn = mysql.createPool({
  host: "database-grubhub-app.cdmfb2s2rc6z.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "Kaiser1914",
  database: "Grubhub_db"
});

// The passport JWT strategy
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = GlobalVar['secret'];
var custStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Customer.find({cust_email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
var restStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Restaurant.find({rest_email : jwt_payload.email}, 
    function (res) {
      console.log('user authenticated', jwt_payload);
      next(null,jwt_payload);
  }, function (err) {
    console.log('user NOT authenticate', jwt_payload);
      next(null, false);
  });
});
passport.use('custAuth',custStrategy);
passport.use('restAuth',restStrategy);


//all the api calls
app.post("/login", function(req, res) {
  Login.login(req,res,conn,bcrypt)
});

app.post("/signup", function(req, res) {
  Signup.signup(req,res,conn,bcrypt,saltRounds)
});

app.post("/showCustProfile", passport.authenticate('custAuth', { session: false }), function(req, res) {
  ShowCustProfile.showCustProfile(req,res,conn)
});

app.post("/showRestProfile", passport.authenticate('restAuth', { session: false }), function(req, res) {
  ShowRestProfile.showRestProfile(req,res,conn)
});

app.post("/updateCust", passport.authenticate('custAuth', { session: false }), function(req, res) {
  UpdateCust.updateCust(req,res,conn)
});

app.post("/updateRest", passport.authenticate('restAuth', { session: false }), function(req, res) {
  UpdateRest.updateRest(req,res,conn)
});

app.post("/getMenu", passport.authenticate('restAuth', { session: false }), function(req, res) {
    GetMenu.getMenu(req,res,conn)
});
app.post("/addToMenu", passport.authenticate('restAuth', { session: false }), function(req, res) {
  AddToMenu.addToMenu(req,res,conn)
});

app.post("/itemDetails", passport.authenticate('restAuth', { session: false }), function(req, res) {
  ItemDetails.itemDetails(req,res,conn)
});

app.post("/deleteItem", passport.authenticate('restAuth', { session: false }), function(req, res) {
  DeleteItems.deleteItems(req,res,conn)
});

app.post("/updateItem", passport.authenticate('restAuth', { session: false }), function(req, res) {
  UpdateItem.updateItem(req,res,conn)
});

app.post("/deleteAll", passport.authenticate('restAuth', { session: false }), function(req, res) {
  DeleteAll.deleteAll(req,res,conn)
});

app.post("/search", passport.authenticate('custAuth', { session: false }), function(req, res) {
  Search.search(req,res,conn)
});

app.post("/getMenuByCust", passport.authenticate('custAuth', { session: false }), function(req, res) {
  GetMenuByCust.getMenuByCust(req,res,conn)
});

app.post("/placeOrder", passport.authenticate('custAuth', { session: false }), function(req, res) {
  PlaceOrder.placeOrder(req,res,conn)
});

app.post("/showUpcomingOrdersCust", passport.authenticate('custAuth', { session: false }), function(req, res) {
  ShowUpcomingOrdersCust.showUpcomingOrdersCust(req,res,conn)
});

app.post("/showUpcomingOrdersRest", passport.authenticate('restAuth', { session: false }), function(req, res) {
  ShowUpcomingOrdersRest.showUpcomingOrdersRest(req,res,conn)
});

app.post("/changeStatus", passport.authenticate('restAuth', { session: false }), function(req, res) {
  ChangeStatus.changeStatus(req,res,conn)
});

app.post("/filterCuisine", passport.authenticate('custAuth', { session: false }), function(req, res) {
  FilterCuisine.filterCuisine(req,res,conn)
});

app.post("/postMessage", function(req, res) {
  PostMessage.postMessage(req,res,conn)
});

app.post("/showMessagesCust", passport.authenticate('custAuth', { session: false }), function(req, res) {
  ShowMessagesCust.showMessagesCust(req,res,conn)
});

app.post("/showMessagesRest", passport.authenticate('restAuth', { session: false }), function(req, res) {
  ShowMessagesRest.showMessagesRest(req,res,conn)
});

app.post("/imageUpload", function(req, res) {
  ImageUploadProfile.imageUploadProfile(req,res,conn)
});

app.listen(3001);
console.log("Server Listening on port 3001");
