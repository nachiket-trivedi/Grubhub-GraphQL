// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var GivenOrderSchema = new Schema({
  cust_email: { type: String},
  rest_email: { type: String},
  order_status: { type: String},
  order_details: {type:Array},
  cust_address: {type:String},
  rest_name: {type:String},
  cust_name:{type:String}
},
{
    collection:"Order"
});

var Order = mongoose.model("Order", GivenOrderSchema,"Order");
// self note-the last parameter tells the mongodb server which collection to use ie GivenOrder here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Order;