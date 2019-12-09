import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';
import {hostedAddress} from "../../GlobalVar"
import * as action from "../redux-files/CustomerActions/CustomerActions"

let doneSearchFlag=false, allOrders=null;
let finalOrder, wholeOrder
//create the Landing Component
class ShowMessagesCust extends Component {
    constructor(props){
    super(props);
    finalOrder=[];
    wholeOrder=[];
    // this.searchFunction = this.searchFunction.bind(this);
    this.state={msg:""}
    let data={cust_email:localStorage.getItem('email'), rest_email:this.props.rest_email, rest_name:this.props.rest_name};
    console.log('data---',data)
    let token=localStorage.getItem('bearer-token');
    this.props.showMessagesCust(data,token);
    }
    render(){
    allOrders=this.props.OrdersCust;
    if(allOrders!=undefined)
    { 
        let orderMap=new Map();
        finalOrder=[], wholeOrder=[]
        orderMap.clear();
        console.log('allorders', allOrders)
        let details = allOrders.map(entry => { //inside an order
        let eachOrder=[]
        let orderMessages=entry['message']
        let order_id=entry['_id']
        let order_status=entry['order_status']
        let order_rest=entry['rest_name']
        let msgs=orderMessages.map(oEntry=>{// inside a msg
            console.log('oEntry',oEntry);
            return(
                <tr>
                    <td class='t_order'>{oEntry['sender']}</td>
                    <td class='t_order'>{oEntry['msg']}</td>
                </tr>
            )
        }) 
        finalOrder.push((<div><br/><br/></div>));
        finalOrder.push(<div class='h_order'><h4>Order ID: {order_id}</h4>
        <h4>Restaurant: {order_rest}</h4>
        </div>)
        eachOrder.push([<tr>
            <th class='th_order'>Sender</th>
            <th class='th_order'>Message</th>
        </tr>])
        eachOrder.push(msgs)
        wholeOrder=(<div><table class='table_order'>{eachOrder}</table></div>)
        finalOrder.push(wholeOrder);
        finalOrder.push(<div><br/><hr/></div>)                    

    })
    }
        console.log('rendered')
        let redirectVar=null
        if(localStorage.getItem('cookie')!='customer'){
            redirectVar = <Redirect to="/login"/>}
        return(
            <div class='maincust' style={{textAlign:"center", width: '200', height:'200'}}>
                {redirectVar}
                <h1 class='h1' style={{textAlign:"center"}}>{localStorage.getItem('name')}! Here are your Messages <span style={{fontSize:40}}>&#127827;</span></h1>
                <table class='table'>
                    {finalOrder}
                </table>
        </div>
        )
    }
}

const mapStateToProps=(store)=>{
    if(store!=undefined){
    console.log('store',store)
    return{
        OrdersCust:store.OrdersCust,
    }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        showMessagesCust:(data,token)=>dispatch(action.showMessagesCust(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowMessagesCust);