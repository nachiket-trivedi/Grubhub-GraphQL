import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from "react-dropdown";
import {hostedAddress} from "../../GlobalVar"

let redirectVar=null, headerPrint=null,redirectToRestaurant=null, redirectRest=false;
let table1=null, table2=null;
let options=['Chinese', 'Indian', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'American','Italian']

export class SearchResult extends Component {

    constructor(props){
        super(props);
        this.state={searchResponse:this.props.searchResponse,redirectToRestaurant:null}
         table1=this.props.searchResponse.map(item=>{
            console.log('item only---------------------', item['rest_email'])
            headerPrint=(<div><div class='dropdown2'>
            <Dropdown
                ref={ref => (this.dropdown = ref)}
                options={options}
                onChange={this.cuisineChangeHandler.bind(this)}
                placeholder="Cuisine Filter"/>   
            </div> 
            {/* <h4 className='h_1' ><label></label>Yay! These peeps do offer {this.props.food} <span style={{fontSize:19}}>&#128525;</span></h4> */}
            <br/></div>);                        
            return(<tr class='td1'>
                <td class='td1'><a onClick={this.restDetails.bind(this,item['rest_email'],item['rest_name'])}>{item['rest_name']}</a></td>
                <td class='td2'>{item['rest_cuisine']}</td>
                </tr>)
        }) 
    }
    cuisineChangeHandler=(e)=>{
        let cuisine=e.value;
        table1=[]
        let data={cust_id:localStorage.getItem('cust_id'), cuisine:cuisine, search:this.props.search};
        console.log('data---',data)
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/filterCuisine',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then((response) => {
            let resp=response.data
            console.log('resp--',resp)
            table1=resp.map(item=>{ 
                console.log('item--',item)                                    
                return(<tr class='td1'>
                    <td class='td1'><a onClick={this.restDetails.bind(this,item['rest_email'],item['rest_name'])}>{item['rest_name']}</a></td>
                    <td class='td2'>{item['rest_cuisine']}</td>
                    </tr>)
            }) 
            this.setState({});
        })
    }
    restDetails=(rest_email, restName)=>
    {
        redirectRest=true;
        this.setState({rest_email:rest_email, restName:restName})
    }

    render() { 
        console.log('yaha ayaa')
        if(redirectRest)
        {
            redirectRest=false;
            redirectToRestaurant= <Redirect to={{
                pathname: '/browse_rest',
                state: { rest_email: this.state.rest_email, restName:this.state.restName}        
            }}/>
        }
        else
        {
            redirectToRestaurant=null
        }
        if(localStorage.getItem('cookie')!='customer'){
            redirectToRestaurant = <Redirect to="/login"/>
        }
        console.log(this.props.searchResponse)
        return (
        <div >
        {redirectToRestaurant}
        <div class="main-div-2 searchResp" >
          <div>
            <table class='table table1'> 
            {headerPrint}
                <thead>
                    <tr>
                        <th style={{color:'#555555'}} class='td'>Restaurant</th>
                        <th style={{color:'#555555'}} class='td2'>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {table1}
                </tbody>
            </table>
          </div>
        </div>
      </div>
        )
    }
}

export default SearchResult