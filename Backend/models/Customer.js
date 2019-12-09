// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var CustomerSchema = new Schema({
  cust_id: String,
  cust_name: { type: String, required: true },
  cust_email: { type: String, required: true, unique: true },
  cust_password: { type: String, required: true },
  cust_phone:{type: Number},
  cust_zipcode:{type: Number},
  cust_address:{type: String}
},
{
    collection:"Customer"
});

var Customer = mongoose.model("Customer", CustomerSchema,"Customer");
// self note-the last parameter tells the mongodb server which collection to use ie Customer here
// it is actually redundant here as we've already specified it in the scehma above, so to write
// at one of the two places.
module.exports = Customer;