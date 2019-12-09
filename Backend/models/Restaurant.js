// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var RestaurantSchema = new Schema({
  rest_id: String,
  rest_name: { type: String, required: true },
  rest_email: { type: String, required: true, unique: true },
  rest_password: { type: String, required: true },
  rest_phone:{type: Number},
  rest_zipcode:{type: Number},
  rest_address:{type: String},
  rest_cuisine:{type: String},
  owner_name:{type: String}
},
{
    collection:"Restaurant"
});

// the schema is useless so far
// we need to create a model using it
var Restaurant = mongoose.model("Restaurant", RestaurantSchema, "Restaurant");

// make this available to our users in our Node applications
module.exports = Restaurant;