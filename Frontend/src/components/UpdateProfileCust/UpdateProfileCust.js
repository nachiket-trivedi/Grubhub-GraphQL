import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import { graphql } from 'react-apollo';
import { updateCustMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

var isUpdated=false;
//create the Landing Component
class UpdateProfileCust extends Component {
    constructor(props){
        super(props);
        this.state={email:"",name:"",phone:"", zip:"", address:"", img:null,imageUrl: 'https://placeimg.com/320/320/animals'};
        let emailid=localStorage.getItem('email');
        let data={'email':emailid};
        this.updateProfile = this.updateProfile.bind(this);
        let token=localStorage.getItem('bearer-token');

        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/showCustProfile',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
                .then((response) => {
                  localStorage.setItem('cust_address',response.data[0].cust_address);
                    this.setState({
                        email:response.data[0].cust_email,
                        name:response.data[0].cust_name,
                        phone:response.data[0].cust_phone,
                        zip:response.data[0].cust_zipcode,
                        address:response.data[0].cust_address,
                        img:response.data[0].cust_img
                    });
            });
    }
    

    updateProfile=()=>
    {
        let oldEmail=this.state.email;
        let newName=(this.name.value=='')?this.state.name:this.name.value;
        let newEmail=(this.email.value=='')?this.state.email:this.email.value;
        let newPhone=(this.phone.value=='')?this.state.phone:this.phone.value;
        let newZip=(this.zip.value=='')?this.state.zip:this.zip.value;
        let newAddress=(this.address.value=='')?this.state.address:this.address.value;

        let newImage=null;
        const data1 = {
          oldEmail: oldEmail,
          name: newName,
          email: newEmail,
          phone: newPhone,
          zip: newZip,
          image:newImage,
          address:newAddress
        };
        isUpdated=true;
        let token=localStorage.getItem('bearer-token');
        let {data} =   this.props.updateCustMutation({
          variables: {
            oldEmail: oldEmail,
            name: newName,
            email: newEmail,
            phone: newPhone,
            zip: newZip,
            image:newImage,
            address:newAddress
          },
      });
      if(data['updateCust']==null)
      {
        alert('Invalid');
      }
      else
      {
        console.log(data['updateCust']);
        alert('Profile Successfully Updated')
      }
      this.setState({})

      //   axios.defaults.withCredentials = true;
      //   axios.post(hostedAddress+":3001/updateCust", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      //   .then(response => {            
      //     console.log("Status Code : ", response);
      //     if (response.status === 200 && response.data!="exists" && response.data!="error") {
      //       console.log("updated customer-");
      //       console.log(localStorage.getItem('cookie'));
      //     } else if (response.status === 201 && response.data!="exists" && response.data!="error") {
      //       console.log("updated restaurant-");
      //       console.log(localStorage.getItem('cookie'));
      //     }
      //     else if(response.data=="exists")
      //     {
      //         alert("There's already an account associated with this email-id :(");
      //     }
      //     else if(response.data=="error")
      //     {
      //         alert("Invalid credentials");
      //     }
      //     isUpdated=true;
      //     console.log('isupd',isUpdated)
      //     this.setState({});
      // })
      // .catch (response => {
      //     console.log ("Invalid");
      //   }

      // )
      isUpdated=true;

        // this.props.updateCust(data);
        // The above statement is for redux, do the needful like login and signup
    }
    onImageChangeHandler=event=>{
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
    onClickHandler = () => {
      const data = new FormData() 
      data.append('postImage', this.state.selectedFile)
      let token=localStorage.getItem('bearer-token');
      axios.defaults.withCredentials = true;
      axios.post(hostedAddress+":3001/imageUpload", data,{params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then(res => { // then print response status
          console.log(res.statusText)
          window.location.reload()
        })
  }
    render(){
        let redirectVar = null;
        if(isUpdated){
          isUpdated=false;
          redirectVar = <Redirect to="/profile_cust"/>
        }
        else
        {
          redirectVar=null
        }
        if(localStorage.getItem('cookie')!='customer')
          {redirectVar = <Redirect to="/login"/>}
        let img_src=hostedAddress+':3001/'+localStorage.getItem('idGeneric')+'.jpg'
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Update Profile</h1> 
                <div>
                <table class='table'>
                <br/><img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/><br/>
                    <tbody>
                    <tr>
                            <td><b>Image</b></td>
                          <td>
                            <input
                            ref={ref => (this.image = ref)}
                            type="file"
                            name="postImage"
                            id='postImage'
                            onChange={this.onImageChangeHandler}
                            placeholder={this.state.image}
                            />
                             <button type="button" class="btn btn-success" onClick={this.onClickHandler}>Upload</button> 
                          </td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td><input
                            ref={ref => (this.name = ref)}
                            type="text"
                            name="name"
                          //   value={this.state.name}
                            placeholder={this.state.name}
                          /></td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td><input
                            ref={ref => (this.email = ref)}
                            type="email"
                            name="email"
                          //   value={this.state.email}
                            placeholder={this.state.email}
                          /></td>
                        </tr>
                        <tr>
                            <td><b>Phone</b></td>
                            <td><input
                            ref={ref => (this.phone = ref)}
                            type="text"
                            name="phone"
                          //   value={this.state.phone}
                            placeholder={this.state.phone}
                          /></td>
                        </tr>
                        <tr>
                            <td><b>Zipcode</b></td>
                            <td><input
                            ref={ref => (this.zip = ref)}
                            type="text"
                            name="zip"
                          //   value={this.state.phone}
                            placeholder={this.state.zip}
                          /></td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td><textarea
                            ref={ref => (this.address = ref)}
                            type="text-area"
                            name="address"
                          //   value={this.state.phone}
                            placeholder={this.state.address}
                          /></td>
                        </tr>
                    </tbody>
                </table>
            <div >
              <input
                  ref={ref => (this.update = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="button"
                  class="btn btn-primary"
                  value="Update"
                  onClick={this.updateProfile}
                  style={{background:'#ED2E38',borderRadius:'10px', borderColor: '#ED2E38',color: 'white'}}
                /></div>
              </div>
              </div>
        )
    }
}

export default compose(
  graphql(updateCustMutation, { name: "updateCustMutation" })
)(UpdateProfileCust);
