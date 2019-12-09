import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import {hostedAddress} from "../../GlobalVar"
import * as action from "../redux-files/RestaurantActions/RestaurantActions"
import { connect } from 'react-redux';


let img_src=null, localFlag=true;
//create the Landing Component
class ProfileRest extends Component {
    constructor(props){
        super(props);
        this.state={email:"",name:"",phone:"", zip:"", address:"", cuisine:"", owner_name:"", img:null};
    }

    componentWillMount=()=>
    {
        let emailid=localStorage.getItem('email');
        let data={'email':emailid};
        let token=localStorage.getItem('bearer-token');
        img_src=hostedAddress+':3001/'+localStorage.getItem('idGeneric')+'.jpg'
        this.props.showRestProfile(data,token);
    }

    render(){
        let redirectVar = null;
        if(localStorage.getItem('cookie')!='restaurant')
        {
            redirectVar = <Redirect to="/login"/>
        }
        let image=<img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/>
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Your Profile</h1> 
                <table class='table'>
                {image}
                <br/>
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{this.props.rest_name}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>{this.props.rest_email}</td>
                        </tr>
                        <tr>
                            <td><b>Phone</b></td>
]                            <td>{this.props.rest_phone}</td>
                        </tr>
                        <tr>
                            <td><b>Owner Name</b></td>
                            <td>{this.props.owner_name}</td>
                        </tr>
                        <tr>
                            <td><b>Cuisine</b></td>
                            <td>{this.props.rest_cuisine}</td>
                        </tr>
                        <tr>
                            <td><b>Zipcode</b></td>
                            <td>{this.props.rest_zip}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>{this.props.rest_address}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                <a href='/update_rest' class="btn btn-primary" style={{background:  '#ED2E38',borderColor: '#ED2E38',color: 'white'}}>Update</a>
              </div>
            </div>
        )
    }
}
const mapStateToProps=(store)=>{
    if(store!=undefined){
    console.log('store',store)
    return{
        rest_email:store.rest_email,
        rest_name:store.rest_name,
        rest_cuisine:store.rest_cuisine,
        rest_zip:store.rest_zipcode,
        rest_address:store.rest_address,
        rest_phone:store.rest_phone,
        owner_name:store.owner_name
    }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        showRestProfile:(data,token)=>dispatch(action.showRestProfile(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileRest);  