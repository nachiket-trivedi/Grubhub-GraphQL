// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var FoodSchema = new Schema({
  item_name: { type: String, required: true },
  rest_email: { type: String, required: true},
  item_price: { type: String, required: true },
  item_section:{type: String},
  item_description:{type: String},
  rest_name:{type: String}, 
  rest_cuisine:{type: String}, 
  rest_image:{type: String}
},
{
    collection:"Food"
});

// the schema is useless so far
// we need to create a model using it
var Food = mongoose.model("Food", FoodSchema,"Food");

// make this available to our users in our Node applications
module.exports = Food;