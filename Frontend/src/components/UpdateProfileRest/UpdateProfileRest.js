import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {hostedAddress} from "../../GlobalVar"
import { graphql } from 'react-apollo';
import { updateRestMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

let isUpdated=false;
//create the Landing Component
class UpdateProfileRest extends Component {
    constructor(props){
        super(props);
        // this.onDrop = this.onDrop.bind(this);
        this.state={selectedFile: null,pictures: [],email:"",name:"",phone:"", zip:"", address:"", cuisine:"", owner_name:"", img:null};
        let emailid=localStorage.getItem('email');
        let data={'email':emailid};
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/showRestProfile',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
                .then((response) => {
                  localStorage.setItem('address',response.data[0].rest_address);
                  localStorage.setItem('cuisine',response.data[0].rest_cuisine);
                    this.setState({
                        email:response.data[0].rest_email,
                        name:response.data[0].rest_name,
                        phone:response.data[0].rest_phone,
                        zip:response.data[0].rest_zipcode,
                        img:response.data[0].rest_img,
                        address:response.data[0].rest_address,
                        cuisine:response.data[0].rest_cuisine,
                        owner_name:response.data[0].owner_name
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
        let newOwnerName=(this.owner_name.value=='')?this.state.owner_name:this.owner_name.value;
        let newCuisine=(this.cuisine.value=='')?this.state.cuisine:this.cuisine.value;
        let newAddress=(this.address.value=='')?this.state.address:this.address.value;
        let newImage=null;
        const data1 = {
          oldEmail: oldEmail,
          name: newName,
          email: newEmail,
          phone: newPhone,
          zip: newZip,
          address: newAddress,
          cuisine: newCuisine,
          owner_name: newOwnerName,
          image:newImage
        };
        isUpdated=true;
        axios.defaults.withCredentials = true;
        let token=localStorage.getItem('bearer-token');
        let {data} =   this.props.updateRestMutation({
          variables: {
            oldEmail: oldEmail,
            name: newName,
            email: newEmail,
            phone: newPhone,
            zip: newZip,
            image:newImage,
            address:newAddress,
            cuisine: newCuisine,
            owner_name: newOwnerName,
          },
      });
      if(data['updateRest']==null)
      {
        alert('Invalid');
      }
      else
      {
        console.log(data['updateRest']);
        alert('Profile Successfully Updated')
      }
      this.setState({})

        //make a post request with the user data
        // axios.post(hostedAddress+":3001/updateRest", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        // .then(response => {   
        //     console.log("Status Code : ", response);
        //     if (response.status === 200 && response.data!="exists" && response.data!="error") {
        //       console.log("updated customer-");
        //       console.log(localStorage.getItem('cookie'));
        //       this.setState({
        //         authFlag: true
        //       });
        //     }
        //     else if(response.data=="exists")
        //   {
        //       alert("There's already an account associated with this email-id :(");
        //       this.setState({
        //       authFlag: false
        //   });
        //   }
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
        // this.props.updateRest(data);
        // The above statement is redux, do like login and signup here also
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
      axios.post(hostedAddress+":3001/imageUpload", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then(res => { // then print response status
          console.log(res.statusText)
          window.location.reload()
        })
  }
    render(){
        let redirectVar = null;
        if(isUpdated){
          redirectVar = <Redirect to="/profile_rest"/>
          isUpdated=false;
        }
        else{
          redirectVar=null 
        }
        if(localStorage.getItem('cookie')!='restaurant'){
          redirectVar = <Redirect to="/login"/>
      }
        console.log('iska bohot hua');
        let img_src=hostedAddress+':3001/'+localStorage.getItem('idGeneric')+'.jpg'
        return(
            <div class='container'>
              {redirectVar}
                <h1 class='h1'>Update Profile</h1> 
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
                            <td><b>Owner Name</b></td>
                            <td><input
                            ref={ref => (this.owner_name = ref)}
                            type="text"
                            name="owner_name"
                          //   value={this.state.phone}
                            placeholder={this.state.owner_name}
                          /></td>
                        </tr>
                        <tr>
                            <td><b>Cuisine</b></td>
                            <td><input
                            ref={ref => (this.cuisine = ref)}
                            type="text"
                            name="cuisine"
                          //   value={this.state.phone}
                            placeholder={this.state.cuisine}
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
                            type="text"
                            name="address"
                          //   value={this.state.phone}
                            placeholder={this.state.address}
                          /></td>
                        </tr>
                        
                    </tbody>
                </table>
                
                <div>
                {/* <ImagesUploader
                url="http://18.208.219.249:3001/imgUpload"
                optimisticPreviews
                multiple={false}
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload a picture"
                /> */}
                <input
                  ref={ref => (this.update = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="submit"
                  class="btn btn-primary"
                  value="Update"
                  onClick={this.updateProfile}
                  style={{background:  '#ED2E38',borderColor: '#ED2E38',color: 'white'}}
                />
              </div>
            </div>
        )
    }
}
// function mapStateToProps(state) {
//     return {
//       propdata: state.data
//     };
//   }
//   function mapDispatchToProps(dispatch) {
//     return {
//       updateRest: data => dispatch(updateRest(data))
//     };
//   }

export default compose(
  graphql(updateRestMutation, { name: "updateRestMutation" })
)(UpdateProfileRest);
  