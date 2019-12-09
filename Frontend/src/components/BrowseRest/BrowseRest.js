import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import CartDetails from "./CartDetails.js";
import { hostedAddress } from "../../GlobalVar";
import { graphql } from 'react-apollo';
import { getMenuByCustMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

//create the Landing Component
let itemQ = [],
  cartArr = [],
  redirectToCart = null,
  showCart = false;
class BrowseRest extends Component {
  constructor(props) {
    super(props);
    (itemQ = []), (cartArr = []);
    this.goBack = this.goBack.bind(this); //
    this.state = {
      result: []
    };
  }
  itemDetails(value) {}
  componentWillMount() {
    let data1 = { rest_email: this.props.location.state.rest_email };
    let token=localStorage.getItem('bearer-token');
    console.log('data in browse rest',data);
    (itemQ = []), (cartArr = []);
    let {data} =   this.props.getMenuByCustMutation({
      variables: {
          rest_email:this.props.location.state.rest_email
      },
  });
  if(data['getMenuByCust']==null)
  {
    alert('Invalid');
  }
  else
  {
    console.log(data['getMenuByCust']);
    this.setState({
      result : this.state.result.concat(data['getMenuByCust']) 
  });
  }
    // axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    // axios.post(hostedAddress + ":3001/getMenuByCust", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}}).then(response => {
    //   // console.log("resp-",response.data);
    //   this.setState({
    //     result: this.state.result.concat(response.data)
    //   });
    // });
    // console.log(this.state.result)
  }
  viewCart = () => {
    console.log("cart in parent--", cartArr);
    showCart = true;
    redirectToCart = (
      <CartDetails
        key="cartDets"
        cartArray={cartArr}
        rest_email={this.props.location.state.rest_email}
        rest_name={this.props.location.state.restName}
      ></CartDetails>
    );
    this.setState({});
  };
  goBack() {
    // this.props.history.goBack();
  }

  setQuantity = (name, price, e) => {
    itemQ[name] = e.target.value;
    console.log("name", name);
    console.log("price", price);
    console.log(itemQ[name]);
    let itemArr = [name, price, itemQ[name]];
    cartArr.push(itemArr);
  };
  render() {
    if (showCart) {
      showCart = false;
    } else {
      redirectToCart = null;
    }
    let sectionMap = new Map();
    let details = this.state.result.map(result1 => {
      if (sectionMap.has(result1["item_section"])) {
        var myList = sectionMap.get(result1["item_section"]);
        myList.push([result1["item_name"], result1["item_price"]]);
        console.log("ye-", myList);
        sectionMap.set(result1["item_section"], myList);
      } else {
        sectionMap.set(result1["item_section"], [
          [result1["item_name"], result1["item_price"]]
        ]);
      }
    });
    console.log("sec-map", sectionMap);
    let breakfast = null;
    let lunch = null;
    let dinner = null;
    if (sectionMap.has("Breakfast")) {
      let br_arr = sectionMap.get("Breakfast");
      console.log("br_arr", br_arr);
      breakfast = br_arr.map(item => {
        return (
          <tr>
            {/* the first one is name while second is price */}
            <td>{item[0]}</td>
            <td class="td3">{item[1]}</td>
            <td class="td3">
              <input
                class="input1"
                type="number"
                placeholder="0"
                min="0"
                onChange={this.setQuantity.bind(this, item[0], item[1])}
                ref={ref => (this.quantity = ref)}
              ></input>
            </td>
            {/* <td><a onmouseover="" style={{cursor: "pointer"}} onClick={this.addBtn.bind(this,item[0],item[1])}><img class="img-responsive" width='28' height='28' src='https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/addthis-512.png' ></img></a></td> */}
          </tr>
        );
      });
      console.log("breakfast", breakfast);
    }

    if (sectionMap.has("Lunch")) {
      let ln_arr = sectionMap.get("Lunch");
      console.log("ln_arr", ln_arr);
      lunch = ln_arr.map(item => {
        return (
          <tr>
            {/* the first one is name while second is price */}
            <td>{item[0]}</td>
            <td class="td3">{item[1]}</td>
            <td class="td3">
              <input
                class="input1"
                type="number"
                min="0"
                placeholder="0"
                onChange={this.setQuantity.bind(this, item[0], item[1])}
                ref={ref => (this.quantity = ref)}
              ></input>
            </td>
            {/* <td><img class="img-responsive" width='28' height='28' src='https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/addthis-512.png' ></img></td> */}
          </tr>
        );
      });
      console.log("lunch", lunch);
    }
    if (sectionMap.has("Dinner")) {
      let dn_arr = sectionMap.get("Dinner");
      console.log("dn_arr", dn_arr);
      dinner = dn_arr.map(item => {
        return (
          <tr>
            {/* the first one is name while second is price */}
            <td>{item[0]}</td>
            <td class="td3">{item[1]}</td>
            <td class="td3">
              <input
                class="input1"
                type="number"
                min="0"
                placeholder="0"
                onChange={this.setQuantity.bind(this, item[0], item[1])}
                ref={ref => (this.quantity = ref)}
              ></input>
            </td>
            {/* <td><img class="img-responsive" width='28' height='28' src='https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/addthis-512.png' ></img></td> */}
          </tr>
        );
      });
      console.log("dinner", dinner);
    }
    let redirectVar = null;
    if (localStorage.getItem("cookie") != "customer") {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        {/* <h1 class='h_1'>{this.props.location.state.nameRest} Home Page</h1>  */}
        <div class="container menu">
          {/* <button onClick={this.goBack}>Go Back</button> */}
          <h1 class="h1">{this.props.location.state.restName}</h1>
          <br />
          <table class="table">
            <thead>
              <h2 class="h2" style={{ color: "#666666" }}>
                Breakfast
              </h2>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {breakfast}
              {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
            </tbody>
            <br />
            <br />
            <thead>
              <h2 class="h2" style={{ color: "#666666" }}>
                Lunch
              </h2>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {lunch}
              {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
            </tbody>
            <br />
            <br />
            <thead>
              <h2 class="h2" style={{ color: "#666666" }}>
                Snacks
              </h2>
              <tr>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {dinner}
              {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
            </tbody>
            <br />
            <input
              ref={ref => (this.submit = ref)}
              //   onChange={this.usernameChangeHandler}
              onClick={this.viewCart}
              class="btn btn-primary in1"
              value="View Cart"
            />
            <br />
            <br />
            <br />
          </table>
        </div>
        {redirectToCart}
      </div>
    );
  }
}
export default compose(
  graphql(getMenuByCustMutation, { name: "getMenuByCustMutation" })
)(BrowseRest);