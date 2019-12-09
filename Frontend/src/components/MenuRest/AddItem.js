import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {hostedAddress} from "../../GlobalVar"
import { graphql } from 'react-apollo';
import { addItemMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

let redirectVar=null, addFlag=false;
 class AddItem extends Component {
    addDetails=()=>
    {
        let data1={
            section:this.props.section,
            name:this.name.value,
            price:this.price.value,
            description:this.description.value,
            rest_email:localStorage.getItem('email'),
            rest_cuisine:localStorage.getItem('cuisine'),
            rest_name:localStorage.getItem('name')
            // rest_cuisine:
        }
        console.log('data--', data)
        let token=localStorage.getItem('bearer-token');
        let {data} = this.props.addItemMutation({
          variables: {
            section:this.props.section,
            name:this.name.value,
            price:this.price.value,
            description:this.description.value,
            rest_email:localStorage.getItem('email'),
            rest_cuisine:localStorage.getItem('cuisine'),
            rest_name:localStorage.getItem('name')
          },
      });
      if(data['addToMenu']==null)
      {
        alert('Invalid');
      }
      this.setState({})

        // axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        // axios.post(hostedAddress+':3001/addToMenu',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        // .then((response) => {
        //   addFlag=true
        //   // alert("noo")
        //   window.location.reload();
        // })
       // .catch(response => {
         // alert('Invalid');
          //this.setState({});
       // })
    }
      render() { 
      if(addFlag)
      {
        addFlag=false;
        redirectVar=<Redirect to='/menu_rest'/>
      }
      else
      {
        redirectVar=null
      }
      if(localStorage.getItem('cookie')!='restaurant'){
        redirectVar = <Redirect to="/login"/>}      
      return (
      <div>
        {redirectVar}
        <div class="container additem" >
          <div class="login-form" >
            <div class="main-div-1">
              <div class="panel">
                <h2>Add Your {this.props.section} Item Bruh</h2>
              </div>
              <div class="form-group">
                <input
                  ref={ref => (this.section = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="section"
                  value={this.props.section}
                  required
                />
              </div>

              <div class="form-group">
                <input
                //   onChange={this.usernameChangeHandler}
                  ref={ref => (this.name = ref)}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder="Item Name"
                  required
                />
              </div>
              <div class="form-group">
                <input
                //   onChange={this.passwordChangeHandler}
                  type="text"
                  ref={ref => (this.price = ref)}
                  class="form-control"
                  name="price"
                  placeholder="Item Price"
                  required
                />
              </div>
              <div class="form-group">
                <textarea
                  ref={ref => (this.description = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="textarea"
                  class="form-control"
                  name="description"
                  placeholder="Item Description (140 Characters)"
                  required
                />
              </div>
              <div>
              <button
                  ref={ref => (this.submit = ref)}
                //   onChange={this.usernameChangeHandler}
	          onClick={this.addDetails}
                  class="btn btn-primary"
                >Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default compose(
  graphql(addItemMutation, { name: "addItemMutation" })
)(AddItem);