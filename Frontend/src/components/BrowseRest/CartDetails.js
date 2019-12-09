import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {hostedAddress} from "../../GlobalVar"

let grid=null, finalPrice=0, redirectUpcoming=null;
let placedOrderFlag=false;

export class CartDetails extends Component {

    constructor(props){
        super(props)
        this.getCart = this.getCart.bind(this); 
    }
    getCart=()=>{
        finalPrice=0;
        console.log('grid');
        grid=(this.props.cartArray.map(entry=>{
            finalPrice+=(entry[1]*entry[2]);
            return(
                <tr>
                    <td>{entry[0]}</td>
                    <td>{entry[1]}</td>
                    <td>{entry[2]}</td>
                </tr>
            )
        }))
        console.log('grid',grid);
    }

    placeOrder=()=>{
        console.log("yelooo");
        let token=localStorage.getItem('bearer-token');
        let data={cart:this.props.cartArray,cust_email:localStorage.getItem('email'), rest_email:this.props.rest_email, rest_name:this.props.rest_name, cust_name:localStorage.getItem('name'), cust_address:localStorage.getItem('cust_address')};
        console.log(data)
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/placeOrder',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
                .then((response) => {
                    console.log('yadayada')
                    redirectUpcoming=<Redirect to={{
                        pathname: '/upcoming_orders_cust',
                        state: {rest_email:this.props.rest_email,finalPrice:finalPrice, rest_name:this.props.rest_name}        
                    }}/>
                    placedOrderFlag=true;
                    this.setState({});
                })
                .catch(()=>{console.log("errororororor")})
    }

    render() { 
        if(placedOrderFlag)
        {
            placedOrderFlag=false;
        }
        else
        {
            redirectUpcoming=null;
        }
        if(localStorage.getItem('cookie')!='customer'){
            redirectUpcoming = <Redirect to="/login"/>
        }
        console.log('cart-', this.props.cartArray);
        this.getCart()
        return (
        <div class='container'>
            {redirectUpcoming}
            <h1 class='h1'>Review your order...</h1>
            <table class="table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {grid}    
            </tbody>    
            </table>
            <div><h2 class='h2' style={{color:'#666666'}}>Your Total: <b>${finalPrice}</b></h2></div>
            <input
            ref={ref => (this.placeOrder = ref)}
              onChange={this.placeOrder}
            onClick={this.placeOrder}
            class="btn in2"
            value="Place Order"
            />
            <br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/>
        </div>
        )
    }
}

export default CartDetails