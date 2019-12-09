import React,{Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';
import Dropdown from "react-dropdown";
import {hostedAddress} from "../../GlobalVar"
import { connect } from 'react-redux';
import * as action from "../redux-files/RestaurantActions/RestaurantActions";
import ReactPaginate from 'react-paginate';


//create the Landing Component
let finalOrder, wholeOrder, allOrders=null;
let options=['New','Preparing','Ready','On Way','Delivered','Cancelled']
class HomeRest extends Component {
    constructor(props){
        super(props);
            super(props);
            finalOrder=[];
            wholeOrder=[];
            this.state={msg:""};
            let token=localStorage.getItem('bearer-token');
            let data={rest_email:localStorage.getItem('email')};
            this.props.showOrdersRest(data,token);
    }
    statusChangeHandler=(order_id,e)=>{//must to keep e at the end
        let status=e.value;
        console.log(status)
        console.log(order_id)
        let token=localStorage.getItem('bearer-token');
        let data={order_id:order_id, status:status};
            axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
            axios.post(hostedAddress+':3001/changeStatus',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
                    .then((response) => {
                        window.location.reload();
                    })
    }
    onChangeMessage=(e)=>{
        let msg=e.target.value;
        this.setState({'msg':msg})
    }
    sendMessage=(order_id, order_rest)=>{
        let token=localStorage.getItem('bearer-token');
        let data={msg:this.state.msg, order_id:order_id, cust_email:localStorage.getItem('email'), rest_name:order_rest, sender:localStorage.getItem('name')}
        axios.defaults.withCredentials = true;//very imp
        axios.post(hostedAddress+":3001/postMessage", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then(response => {   
            window.location.reload();
        })
        .catch()
        }
    render(){
        allOrders=this.props.OrdersRest;
        if(allOrders!=undefined && allOrders!=null)
        {
                        let orderMap=new Map();
                        finalOrder=[], wholeOrder=[]
                        orderMap.clear();
                        console.log('allorders', allOrders)
                        let details = allOrders.map(entry => { 
                            console.log('cust address---',entry['cust_address'])
                            if(entry['order_status']!='Delivered' && entry['order_status']!='Cancelled')
                            {
                            let orderDetails=entry['order_details']
                            let orders=orderDetails.map(oEntry=>{
                            console.log('oEntry',oEntry);
                            if(orderMap.has(entry['_id']))
                            {
                                var myList = orderMap.get(entry['_id'])
                                myList.push([entry['order_status'],entry['cust_name'], oEntry[0],oEntry[1],oEntry[2],entry['cust_address']])
                                // console.log('sirf ye dekh',myList);
                                orderMap.set(entry['_id'],myList);
                            }
                            else
                            {
                                orderMap.set(entry['_id'],[[entry['order_status'],entry['cust_name'],oEntry[0],oEntry[1],oEntry[2],entry['cust_address']]])
                            }
                        }
                        )   
                            }
                        })
                    console.log('ordermap',orderMap)
                    for(let orderId of orderMap)
                    {
                    let eachOrder=[]
                    // console.log('ooo',orderId)
                    let order_id=orderId[0]
                    let order_status=((orderMap.get(orderId[0]))[0])[0]
                    let order_cust=((orderMap.get(orderId[0]))[0])[1]
                    let cust_address=((orderMap.get(orderId[0]))[0])[5]
                    console.log('ye dekhoo',order_id, order_status, order_cust,cust_address)
                    finalOrder.push((<div><br/><br/></div>));
                    finalOrder.push(<div class='h_order'><h4>Order ID: {order_id}</h4>
                    <h4>Customer: {order_cust}</h4>
                    <h4>Customer Address: {cust_address}</h4>
                    </div>)
                    eachOrder.push([<tr>
                        <th class='th_order'>Item Name</th>
                        <th class='th_order'>Item Price</th>
                        <th class='th_order'>Item Quantity</th>
                    </tr>])
                    let finalPrice=0;
                    console.log('hardiii',orderMap.get(orderId[0]))
                    let orderDetails = (orderMap.get(orderId[0])).map(item => {  
                        finalPrice+=item[3]*item[4];
                        console.log('nachii',item)
                        return(
                            <tr>
                                <td class='t_order'>{item[2]}</td>
                                <td class='t_order'>{item[3]}</td>
                                <td class='t_order'>{item[4]}</td>
                            </tr>
                        )})
                        eachOrder.push(orderDetails);
                        // eachOrder.push(<div class='h1_new'>Final Price: ${finalPrice}</div>)
                        wholeOrder=(<div><table class='table_order'>{eachOrder}</table></div>)
                        finalOrder.push(wholeOrder);
                        finalOrder.push(<div><div class='h1_new_left'><h4>Order Status: <font color='green' face='Arial'><b>{order_status}</b></font></h4></div><div class='h1_new_left'>Total Price: ${finalPrice}</div>
                        {/* <input type='submit' onClick={this.changeStatus} class='btn btn-primary' value='Change Status'></input> */}
                        <div >
                            <Dropdown
                            ref={ref => (this.status = ref)}
                            options={options}
                            class='dropdown1'
                            // value={this.state.status}
                            onChange={this.statusChangeHandler.bind(this,order_id)}
                            placeholder="Change Order Status"
                            />
                        </div>
                        <textarea id="msg" onChange={this.onChangeMessage}></textarea><br/>
            <button type="submit" class="btn btn-primary" value="Send" onClick={this.sendMessage.bind(this,order_id, order_cust)}>Send Message</button><hr/></div>)
        }    
    }
        let redirectVar = null;
        if(localStorage.getItem('cookie')!='restaurant'){
            redirectVar = <Redirect to="/login"/>
        }

        return(
            <div class='maincust' style={{textAlign:"center", width: '200', height:'200'}}>
                {redirectVar}
            <h1 class='h1' style={{textAlign:"center"}}>Your upcoming orders  <span style={{fontSize:40}}>&#127827;</span></h1><br/><br/><br/>
            <table class='table'>
                {finalOrder}
            </table>
            <div class='container'>
                        <ReactPaginate 
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={4}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
    </div>
        )
}
}

const mapStateToProps=(store)=>{
    if(store!=undefined){
    console.log('store',store)
    return{
        OrdersRest:store.OrdersRest,
    }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        showOrdersRest:(data,token)=>dispatch(action.showOrdersRest(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeRest);