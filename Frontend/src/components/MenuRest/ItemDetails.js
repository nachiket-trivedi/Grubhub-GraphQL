import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import UpdateItem from './UpdateItem';
import MenuRest from './MenuRest';
import {hostedAddress} from "../../GlobalVar"

let redirectVar=null;
let redirectUpdate=null;
let updateFlag=false, viewFlag=false;
let delFlag=false, img_src=null;
let section='',price='',description=''
 class ItemDetails extends Component {
  constructor(props){
    super(props);
    this.state=({section:"", price:"", description:""})
    img_src=hostedAddress+':3001/r_5.jpg'
  }
  getView=()=>{
    if(delFlag==false){
    let data={
      name:this.props.foodName,
      rest_email:localStorage.getItem('email')
    }
    console.log("heheheheheheheh");
  // console.log('data00', data)
  viewFlag=true;
  let token=localStorage.getItem('bearer-token');
  axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
  axios.post(hostedAddress+':3001/itemDetails',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
  .then((response) => {
    console.log('get view');
      this.setState({
          section:(response.data[0])['item_section'],
          price:(response.data[0])['item_price'],
          description:(response.data[0])['item_description']});
      })
  .catch=()=>{console.log("error1")}
   }}
  deleteItem=()=>{
    let data={
      name:this.props.foodName,
      rest_email:localStorage.getItem('email')
    }
    let token=localStorage.getItem('bearer-token');
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/deleteItem',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
    .then((response) => {
      delFlag=true;
      this.setState({});
    })
    .catch=()=>{console.log("error")}
    }
  updateItem=()=>{
    updateFlag=true;
    this.setState({});
    }
    
  render() { 
    console.log('render of details')
    if(delFlag)
    {
      redirectVar=window.location.reload();
      delFlag=false;
    }
    if(updateFlag)
    {
      updateFlag=false;
      redirectUpdate=<UpdateItem key='itemupdt' name={this.props.foodName} section={this.state.section} price={this.state.price} description={this.state.description} ></UpdateItem>;
    }
    else if(!updateFlag && !delFlag && !viewFlag)
    {
      redirectUpdate=null;
      redirectVar=null;
      this.getView()
    }
    if(localStorage.getItem('cookie')!='restaurant'){
      redirectVar = <Redirect to="/login"/>}
    else
    redirectVar=null;
    return (
    <div>
      {redirectVar}
        <div class="container additem " >
          <div class="login-form menu" >
            <div class="main-div-1">
              <div class="panel">
                <h2>Your {this.props.foodName} Details</h2>
              </div>
              <div class="form-group">
                <table class='table3'>
                  <tbody>
                  <tr>                  
                    <td><img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Item Pic)'/></td>
                  </tr>
                  <tr>
                  <td>Name: </td>
                  <td>{this.props.foodName}</td>
                  </tr>
                 
                  <tr>
                  <td>Section: </td>
                  <td>{this.state.section}</td>
                  </tr>
                  
                  <tr>
                  <td>Price: </td>
                  <td>{this.state.price}</td>
                  </tr>
                  
                  <tr>
                  <td>Description: </td>
                  <td>{this.state.description}</td>
                  </tr>

                  </tbody>
                  </table>
              </div>
              <div>
              <button ref={ref => (this.update = ref)} onClick={this.updateItem} className="btn btn-primary1">Update</button>
              {/* <input type='submit' ref={ref => (this.update = ref)} className="btn btn-primary1" value="Update"/> */}
              <button ref={ref => (this.delete = ref)} onClick={this.deleteItem} className="btn btn-primary1">Delete</button>
              </div>
            </div>
          </div>
        </div>
        {redirectUpdate}
      </div>
        )
    }
}

export default ItemDetails
