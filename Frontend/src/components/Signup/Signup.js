import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { connect } from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import { graphql } from 'react-apollo';
import { signupMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

let redirectVar = null;

const options = ["Customer", "Restaurant"];

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      role: ""
    };
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
  }
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  roleChangeHandler = value => {
    this.setState({
      role: value
    });
    this.role.value = { value };
  };

  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };
  async submitSignup (e) {
    var headers = new Headers();
    e.preventDefault();

    const data1 = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      name: this.name.value,
      phone: this.phone.value,
      zipcode: this.zipcode.value
    };

    console.log('signup state',this.state);
    console.log('ownername',this.owner_name.value)
    // alert()
      let {data} = await  this.props.signupMutation({
            variables: {
                name: this.name.value,
                email: this.state.username,
                password:this.state.password,
                phone: this.phone.value,
                role:this.state.role.value,
                zipcode:this.zipcode.value,
                owner_name:this.owner_name.value,
                rest_cuisine:this.rest_cuisine.value
            },
        });
        if(data['signup']==null)
        {
          alert('Invalid');
        }
        else
        {
          console.log(data['signup']['name']);
          localStorage.setItem('cookie',this.state.role.value.toLowerCase());
          localStorage.setItem('email',this.state.username);
          localStorage.setItem('name',this.name.value);
          localStorage.setItem('owner_name',this.owner_name.value);
          localStorage.setItem('zipcode',this.zipcode.value);
          localStorage.setItem('rest_cuisine',this.rest_cuisine.value);
          localStorage.setItem('phone',this.phone.value);

        }
        this.setState({})

    // ----axios call logic below----
    // axios.defaults.withCredentials = true;//very imp
    // axios.post(hostedAddress+":3001/signup", data)
    // .then(response => {   
    //     console.log("Status Code : ", response);
    //     if (response.status === 200 && response.data!="exists" && response.data!="error") {
    //       console.log("new customer created-");
    //       // console.log(localStorage.getItem('new1'));
    //       localStorage.setItem('cookie',response.data['cookie']);
    //       localStorage.setItem('email',response.data['email']);
    //       localStorage.setItem('name',response.data['name']);
    //       localStorage.setItem('bearer-token',response.headers.authorization)
    //       this.setState({
    //         authFlag: true
    //       });
    //     } else if (response.status === 201 && response.data!="exists" && response.data!="error") {
    //       console.log("new restaurant created-");
    //       // console.log(localStorage.getItem('cookie'));
    //       localStorage.setItem('cookie',response.data['cookie']);
    //       localStorage.setItem('email',response.data['email']);
    //       localStorage.setItem('name',response.data['name']);
    //       localStorage.setItem('bearer-token',response.headers.authorization)
    //       this.setState({
    //         authFlag: true
    //       });
    //     }
    //     else if(response.data=="exists")
    //     {
    //         alert("There's already an account associated with this email-id :(");
    //         this.setState({
    //         authFlag: false
    //     });
    //     }
    //     else
    //     {
    //         alert("Invalid");
    //     }
    // })
    // .catch (response => {
    //     alert("Invalid");
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // )
 
 
  };
  render() {
    if(!localStorage.getItem('cookie')){
        redirectVar = <Redirect to= "/signup"/>
    }
    else if(localStorage.getItem('cookie')=='customer')
    {
        redirectVar = <Redirect to= "/home_cust"/>
    }
    else if(localStorage.getItem('cookie')=='restaurant')
    {
        redirectVar = <Redirect to= "/home_rest"/>
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <div class="login-form">
          <form onSubmit={this.submitSignup}>
            <div class="main-div">
              <div class="panel">
                <h2>Grubhub Sign Up</h2>
                <p>You're in for a ride ;)</p>
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.name = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Name"
                  required
                />
              </div>

              <div class="form-group">
                <input
                  onChange={this.usernameChangeHandler}
                  type="email"
                  class="form-control"
                  name="username"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.phone = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="phone"
                  placeholder="Phone"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.zipcode = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="zipcode"
                  placeholder="Zipcode"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.owner_name = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="owner_name"
                  placeholder="Owner Name (For restaurants only)"
                />
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.rest_cuisine = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="cuisine"
                  placeholder="Cuisine (For restaurants only)"
                />
              </div>
              <div class="form-group">
                <Dropdown
                  ref={ref => (this.role = ref)}
                  options={options}
                  onChange={this.roleChangeHandler}
                  value={this.state.role}
                  placeholder="I'm a.."
                  required
                />
              </div>
              <div>
              <input
                  ref={ref => (this.submit = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="submit"
                  class="btn btn-primary"
                  value="Sign Up"
                />
                {/* <button onClick={this.submitLogin} class="btn btn-primary">
                  Sign Up
                </button> */}
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(signupMutation, { name: "signupMutation" })
)(Signup);
