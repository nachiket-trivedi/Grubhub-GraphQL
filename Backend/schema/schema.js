const graphql = require("graphql");
const _ = require("lodash");
const Customer = require("../models/Customer");
const Restaurant=require('../models/Restaurant');
const Food=require('../models/Food');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      address: { type: GraphQLString },
      phone: { type: GraphQLString },
      zipcode: { type: GraphQLString },
      owner_name: { type: GraphQLString },
      rest_cuisine: { type: GraphQLString },
      oldEmail: { type: GraphQLString },
    })
  });

const FoodType=new GraphQLObjectType({
    name:"Food",
    fields:()=>({
        item_name: { type: GraphQLString },
        rest_email: { type: GraphQLString },
        rest_cuisine: { type: GraphQLString },
        item_price: { type: GraphQLString },
        item_section: { type: GraphQLString },
        item_description: { type: GraphQLString },
        rest_name: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString }
      },
      async resolve(parent, args) {
        let passwordInDb = null,
        user_name = null;
        console.log('login args', args)
          if(args.role=='Customer')
          {
            await Customer.find({ cust_email: args.email }, function(err, result, fields) {
                console.log('cust login',result);
                if (err) console.log('error',err);
                passwordInDb = result[0].cust_password;
                user_name = { name: result[0].cust_name };
              });
              await bcrypt.compare(args.password, passwordInDb, function(err, resp) {
                console.log('resp',resp);
                if (resp != true) {
                  user_name = null;
                }
              });
          }
          else if(args.role=='Restaurant')
          {
            await Restaurant.find({ rest_email: args.email }, function(err, result, fields) {
                console.log('rest login',result[0]);
                if (err) throw err;
                console.log(user_name);
                passwordInDb = result[0].password;
                user_name = { name: result[0].name };
              });
              await bcrypt.compare(args.password, passwordInDb, function(err, resp) {
                if (resp != true) {
                  user_name = null;
                }
                console.log(resp);
              });
          }
        return user_name;
      }
    },
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        phone: { type: GraphQLString },
        role:{type:GraphQLString},
        rest_cuisine:{type: GraphQLString},
        owner_name:{type: GraphQLString},
      },
      async resolve(parent, args) {
        console.log('args',args);
        console.log('parent',parent);
        if(args.role=='Customer')
        {
            var cust = Customer({
                cust_name: args.name,
                cust_email: args.email,
                cust_password: args.password,
                cust_zipcode: args.zipcode,
              });
              let result=await Customer.find({ cust_email: args.email })//, async function(err, result) {
                  console.log('res',result)
                if (result==null) 
                {
                    return null;
                }
                console.log(result);
                if (result.length != 0) 
                {
                  msg = "Email Already in Use!";
                  return null;
                } 
                else 
                {
                  console.log("hash");
                   let hash=await bcrypt.hash(args.password, saltRounds)//, function(err, hash) {
                    cust.cust_password = hash;
                    console.log(hash);
                    cust.save()
                    return {name:args.name};
                }
        }
        else if(args.role=='Restaurant')
        {
            var rest = Restaurant({
                rest_name: args.name,
                rest_email: args.email,
                rest_password: args.password,
                rest_zipcode: args.zipcode,
                owner_name:args.owner_name,
                rest_cuisine:args.rest_cuisine
              });
      
              let result=await Restaurant.find({ rest_email: args.email })//, async function(err, result) {
                if (result==null) {console.log('error',err);
              return null;
            }
              else  if (result.length != 0) {
                  msg = "Email Already in Use!";
                  console.log(msg)
                  return null;
                } 
                else {
                  console.log("hash");
                   let hash=await bcrypt.hash(args.password, saltRounds)//, function(err, hash) {
                    rest.rest_password = hash;
                    console.log(hash);
                    rest.save()
                    return {name:args.name};
                }
        }
      }
    },
    login: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          role: { type: GraphQLString }
        },
        async resolve(parent, args) {
          let passwordInDb = null,
          user_name = null;
          console.log('login args', args)
            if(args.role=='Customer')
            {
              let result= await Customer.find({ cust_email: args.email })//, function(err, result, fields) {
                  console.log('cust login',result);
                  if (result==null) {
                      console.log('error',err);
                        return null;
                    }
                  passwordInDb = result[0].cust_password;
                  user_name = { name: result[0].cust_name };
                let resp=await bcrypt.compare(args.password, passwordInDb)//, function(err, resp) {
                  console.log('resp',resp);
                  if (resp != true) {
                    user_name = null;
                  }
            }
            else if(args.role=='Restaurant')
            {
              let result=await Restaurant.find({ rest_email: args.email })//, function(err, result, fields) {
                  console.log('rest login',result[0]);
                  if (result==null) {
                      return null;
                    }
                  console.log(user_name);
                  passwordInDb = result[0].password;
                  user_name = { name: result[0].name };
                let resp=await bcrypt.compare(args.password, passwordInDb)//, function(err, resp) {
                  if (resp != true) {
                    user_name = null;
                  }
                  console.log(resp);
            }
          return user_name;
        }
      },
    updateCust:{
        type:UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            zipcode: { type: GraphQLString },
            phone: { type: GraphQLString },
            address: { type: GraphQLString },
            oldEmail: { type: GraphQLString },
          },
          async resolve(parent,args){
            console.log('args',args)
            let email = args['email'];
            let addressCookie="";
            Customer.find({}, function(err, results) {
                if (err) throw err;
                else {
                  let cust_data = results;
                  let flag = 0;
                  cust_data.forEach(element => {
                    if (
                        args.oldEmail != args.email &&
                        args.email == element.cust_email
                    ) {
                      flag = 1;
                    }
                  });
                  if (flag == 1) {
                    console.log("email already exists");
                    callback(null,"exists")
                  } else {        
                    Customer.findOneAndUpdate({ cust_email: args.oldEmail }, {
                      cust_name: args.name,
                      cust_email:args.email,
                      cust_phone: args.phone,
                      cust_zipcode: args.zipcode,
                      cust_address: args.address
                    }, function(err, results) {
                      console.log('update time0')
                      if (err) 
                      return (null)
                      else
                      {
                        addressCookie=args.address;
                        let obj={key1:addressCookie,key2:results}        
                        console.log('update time',obj)
                        return obj
                    }
                    });
                  }
                }
              });
          }
    },
    updateRest:{
        type:UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            zipcode: { type: GraphQLString },
            phone: { type: GraphQLString },
            address: { type: GraphQLString },
            oldEmail: { type: GraphQLString },
            rest_cuisine:{ type: GraphQLString },
            owner_name:{ type: GraphQLString },
          },
          async resolve(parent,args){
            console.log('args',args)
            let email = args['email'];
            let cuisineCookie="";
            console.log(email);
            console.log('Connected to mongodb');
            console.log('msg--',args)
            Food.updateMany({ rest_email: args.oldEmail }, {
                rest_name: args.name,
                rest_email:args.email,
                rest_cuisine: args.rest_cuisine,
              }, function(err, results) {
                console.log('update time0')
                if (err) 
                  console.log(error);
                else
                {
                  console.log('kkkkkkkkkkkkkkkk')
                    cuisineCookie=args.cuisine;
                }
              });
              Restaurant.find({}, function(err, results) {
                if (err) throw err;
                else {
                  let rest_data = results;
                  let flag = 0;
                  rest_data.forEach(element => {
                    if (
                        args.oldEmail != args.email &&
                        args.email == element.rest_email
                    ) {
                      flag = 1;
                    }
                  });
                  if (flag == 1) {
                    console.log("email already exists");
                    callback(null,'exists')
                  } else {        
                    Restaurant.findOneAndUpdate({ rest_email: args.oldEmail }, {
                      rest_name: args.name,
                      rest_email:args.email,
                      rest_phone: args.phone,
                      rest_zipcode: args.zipcode,
                      owner_name: args.owner_name,
                      rest_cuisine: args.rest_cuisine,
                      rest_address: args.address
                    }, function(err, results) {
                      console.log('update time0')
                      if (err) 
                        return null
                      else
                      {
                        cuisineCookie=args.cuisine;
                        console.log('update time')
                        let obj={key1:cuisineCookie,key2:results}
                        return obj
                      }
                    });
                  }
                }
              });
          }
    },
    addToMenu:{
        type:FoodType,
        args:{
            item_name: { type: GraphQLString },
            rest_email: { type: GraphQLString },
            rest_cuisine: { type: GraphQLString },
            item_price: { type: GraphQLString },
            item_section: { type: GraphQLString },
            item_description: { type: GraphQLString },
            rest_name: { type: GraphQLString },
        },
        async resolve(parent, args)
        {
            console.log('args',args)
            var food = Food({
                item_name: args.item_name,
                rest_email: args.rest_email,
                rest_cuisine: args.rest_cuisine,
                item_price: args.item_price,
                item_section: args.item_section,
                item_description: args.item_description,
                rest_name:args.rest_name
              });
                  food.save(function(err) {
                    if(err)
                    {
                        console.log('error-->');
                        return('error')
                    }  
                    else
                    {
                        console.log('succesfully added');
                        return('success')
                    }
                })
        }
    },
    getMenu:{
        type:GraphQLList(FoodType),
        args:{
            rest_email: { type: GraphQLString },
        },
        async resolve(parent, args)
        {
            console.log('args',args)
            let email = args['rest_email'];
            console.log(email);
            let foods = await Food.find({rest_email:email})
            if(foods == null ){
                return null;
            }else{
                console.log('results-->',JSON.stringify(foods));
                return foods;
            }
            
        }
    },
    getMenuByCust:{
        type:GraphQLList(FoodType),
        args:{
            rest_email:{ type: GraphQLString },
        },
        async resolve(parent,args)
        {
            console.log('args',args)
            let foods = await Food.find({rest_email:args.rest_email})
            console.log('foods',foods)
                if(foods==null)
                {
                    return null
                }  
                else
                {
                    console.log(foods)
                    return foods
                }
            } 
        }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});