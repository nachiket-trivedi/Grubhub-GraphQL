import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import * as action from "../redux-files/CustomerActions/CustomerActions"

let img_src=null;
//create the Landing Component
class ProfileCust extends Component {
    constructor(props){
        super(props);
        this.state={email:"",name:"",phone:"", zip:"",address:"",img:null};
    }

    componentWillMount=()=>
    {
        let emailid=localStorage.getItem('email');
        let token=localStorage.getItem('bearer-token');
        console.log('dsg',token)
        let data={'email':emailid};
        img_src=hostedAddress+':3001/'+localStorage.getItem('idGeneric')+'.jpg'
        console.log('ayaa1');
        this.props.showCustProfile(data,token);
        //axios calls in action

    }

    render(){
        let redirectVar = null;
        if(localStorage.getItem('cookie')!='customer'){
            redirectVar = <Redirect to="/login"/>
        }
        console.log('ayaa');
        let image=<img src={img_src} style={{borderRadius:'5%'}}width="180" height="230" alt='(Please Insert Your Profile Pic)'/>
        return(
            <div class='container'>
                {redirectVar}
                <h1 class='h1'>Your Profile</h1> 
                <table class='table'>
                {image}
                    <tbody>
                        <tr>
                            <td><b>Name</b></td>
                            <td>{this.props.cust_name}</td>
                        </tr>
                        <tr>
                            <td><b>Email</b></td>
                            <td>{this.props.cust_email}</td>
                        </tr>
                        <tr>
                            <td><b>Phone</b></td>
                            <td>{this.props.cust_phone}</td>
                        </tr>
                        <tr>
                            <td><b>Zipcode</b></td>
                            <td>{this.props.cust_zip}</td>
                        </tr>
                        <tr>
                            <td><b>Address</b></td>
                            <td>{this.props.cust_address}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                <a href='/update_cust' class="btn btn-primary" style={{background:  '#ED2E38',borderColor: '#ED2E38',color: 'white'}}>Update</a>
              </div>
            </div>
        )
    }
}

const mapStateToProps=(store)=>{
    if(store!=undefined){
    console.log('store',store)
    return{
        cust_email:store.cust_email,
        cust_name:store.cust_name,
        cust_phone:store.cust_phone,
        cust_zip:store.cust_zipcode,
        cust_address:store.cust_address
    }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        showCustProfile:(data,token)=>dispatch(action.showCustProfile(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileCust);