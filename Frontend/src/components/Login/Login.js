import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { connect } from 'react-redux';
import { setTimeout } from "timers";
import {hostedAddress} from "../../GlobalVar"
import { loginMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';
import { graphql } from 'react-apollo';

let redirectVar = null;

const options = ["Customer", "Restaurant"];

class Login extends Component {
  
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
    this.submitLogin = this.submitLogin.bind(this);
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
  async submitLogin  (e) {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data1 = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.role
    };
    let {data} = await  this.props.loginMutation({
      variables: {
          email: this.state.username,
          password:this.state.password,
          role:this.state.role.value,
      },
  });
  console.log('data',data)
  if(data['login']==null)
  {
    alert('Invalid');
  }
  else
  {
    localStorage.setItem('cookie',this.state.role.value.toLowerCase());
    localStorage.setItem('email',this.state.username);    
    localStorage.setItem('name',this.state.username);    
  }
  this.setState({})
    // axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    // axios.post(hostedAddress+":3001/login", data)
    // .then(response => {   
    //     console.log("Status Code : ", response);
    //     if (response.status === 200 && response.data!="error") {
    //       console.log("welcome customer-");
    //       localStorage.setItem('cookie',response.data['cookie']);
    //       localStorage.setItem('email',response.data['email']);
    //       localStorage.setItem('name',response.data['name']);
    //       localStorage.setItem('cust_address',response.data['cust_address']);
    //       localStorage.setItem('bearer-token',response.headers.authorization)
    //       this.setState({
    //         authFlag: true
    //       });
    //     } else if (response.status === 201 && response.data!="error") {
    //       console.log("welcome restaurant-");
    //       localStorage.setItem('cookie',response.data['cookie']);
    //       localStorage.setItem('email',response.data['email']);
    //       localStorage.setItem('name',response.data['name']);
    //       localStorage.setItem('cuisine',response.data['cuisine']);
    //       localStorage.setItem('rest_address',response.data['rest_address']);
    //       localStorage.setItem('bearer-token',response.headers.authorization)
    //       this.setState({
    //         authFlag: true
    //       });
    //     }
    //     else if(response.data=="error")
    //     {
    //         alert("Invalid credentials");
    //         this.setState({
    //         authFlag: false
    //     });
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
        redirectVar = <Redirect to= "/login"/>
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
          <form onSubmit={this.submitLogin}>
            <div class="main-div">
              <div class="panel">
                <h2 >Grubhub Login</h2>
                <p>Please enter your email-id and password</p>
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
                  value="Login"
                />
                {/* <button onClick={this.submitLogin} class="btn btn-primary">
                  Login
                </button> */}
              </div>
              <br></br>
              <div>First time here? <a href="/signup">Sign up!</a></div>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(loginMutation, { name: "loginMutation" })
)(Login);