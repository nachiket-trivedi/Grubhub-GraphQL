import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from "axios";
import { INSPECT_MAX_BYTES } from 'buffer';
import AddItem from './AddItem';
import ItemDetails from './ItemDetails';
import {hostedAddress} from "../../GlobalVar"
import { graphql } from 'react-apollo';
import { getMenuMutation } from '../../mutation/mutations';
import {flowRight as compose} from 'lodash';

let details=null;
let result=null;
let redirectAdd=null;
let redirectDets=null;
let secName=null;
let foodName=null;

//create the Landing Component
let delFlag=false;
class MenuRest extends Component {
    constructor(props){
        super(props);
        this.addNew = this.addNew.bind(this);
        this.state={
        result:[],
        }
    }
    itemDetails=(value)=>{
        console.log('reached in item details');
        foodName=value;
        this.setState({});
    }
    addNew=(value)=>{
        console.log('value', value)
        secName=value;
        this.setState({});
    }
    componentWillMount(){
        let data1={email:localStorage.getItem('email')}
        console.log('inside menu restau')
        let token=localStorage.getItem('bearer-token');

        let {data} =   this.props.getMenuMutation({
            variables: {
                rest_email:localStorage.getItem('email')
            },
        });
        if(data['getMenu']==null)
        {
          alert('Invalid');
        }
        else
        {
          console.log(data['getMenu']);
          this.setState({
            result : this.state.result.concat(data['getMenu']) 
        });
        }
    //     axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    //     axios.post(hostedAddress+':3001/getMenu',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
    //             .then((response) => {
    //             console.log('---get---',response.data);
    //             this.setState({
    //                 result : this.state.result.concat(response.data) 
    //             });
    // })
}
    deleteSection=(value)=>{
        let data={
            section:value,
            rest_email:localStorage.getItem('email')
          }
        //   if(value=='Breakfast')
        //   {
        //       this.sec1.value=''
        //   }
          console.log('data11', data)
          let token=localStorage.getItem('bearer-token');
          axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
          axios.post(hostedAddress+':3001/deleteAll',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
          .then((response) => {
            delFlag=true;
            this.setState({})
          })
          .catch=()=>{console.log("error")}}
    render(){
        if(delFlag)
        {
          redirectVar=window.location.reload();
          delFlag=false;
        }
        if(secName!=null)
        {
            redirectAdd=<AddItem key='additem' section={secName}></AddItem>;
            secName=null;
        }
        else
        {           
            redirectAdd=null;
        }   
        if(foodName!=null)
        {
            redirectDets=<ItemDetails key='itemdets' foodName={foodName}></ItemDetails>;
            foodName=null;
        }
        else
        {           
            redirectDets=null;
        }  
        let sectionMap=new Map();
             details = this.state.result.map(result1 => { 
                if(sectionMap.has(result1['item_section']))
                {
                    var myList = sectionMap.get(result1['item_section'])
                    myList.push([result1['item_name'],result1['item_price']])
                    console.log(myList);
                    sectionMap.set(result1['item_section'],myList);
                }
                else
                {
                    sectionMap.set(result1['item_section'],[[result1['item_name'],result1['item_price']]])
                }
        })
        console.log("sectionmap--",sectionMap);
        let breakfast=null
        let lunch=null
        let dinner=null
        if(sectionMap.has('Breakfast'))
        {
            let br_arr=sectionMap.get("Breakfast")
            console.log('br_arr', br_arr)
            breakfast = br_arr.map(item => {  
            return(
            <tr>
                {/* the first one is name while second is price */}
                <td><a onClick={this.itemDetails.bind(this,item[0])}>{item[0]}</a></td> 
                <td>{item[1]}</td>
            </tr>)})
            console.log('breakfast', breakfast)
        }

        if(sectionMap.has('Lunch'))
        {
            let ln_arr=sectionMap.get("Lunch")
            console.log('ln_arr', ln_arr)
            lunch = ln_arr.map(item => {  
            return(
            <tr>
                {/* the first one is name while second is price */}
                <td><a onClick={this.itemDetails.bind(this,item[0])}>{item[0]}</a></td> 
                <td>{item[1]}</td>
            </tr>)})
            console.log('lunch', lunch)
        }
        if(sectionMap.has('Dinner'))
        {
            let dn_arr=sectionMap.get("Dinner")
            console.log('dn_arr', dn_arr)
            dinner = dn_arr.map(item => {  
            return(
            <tr>
                {/* the first one is name while second is price */}
                <td><a onClick={this.itemDetails.bind(this,item[0])}>{item[0]}</a></td> 
                <td>{item[1]}</td>
            </tr>)})
            console.log('dinner', dinner)
        }
        
        let redirectVar = null;
        if(localStorage.getItem('cookie')!='restaurant'){
            redirectVar = <Redirect to= "/login"/>
        }
        else{redirectVar = null;}
        return(
            <div>
                {redirectVar}
                {console.log('ye')}
                {redirectDets}
                {redirectAdd}
                <div class="container menu">
                    <h1 class='h1'>{localStorage.getItem('name')}</h1>
                        <table class="table">
                            <thead><h2 class='h2'ref={ref => (this.sec1 = ref)}>Breakfast</h2>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th><a onClick={this.deleteSection.bind(this,'Breakfast')}><img width='25' height='25' class="img-responsive" src='https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png'></img></a></th>
                                </tr>
                            </thead>
                            <tbody>
                                {breakfast}
                                {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
                                <td><button onClick={this.addNew.bind(this,'Breakfast')} class="btn btn-primary">Add New</button></td>
                            </tbody>
                            <br/>
                            <br/>
                            <thead><h2 class='h2'>Lunch</h2>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th><a onClick={this.deleteSection.bind(this,'Lunch')}><img width='25' height='25' class="img-responsive" src='https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png'></img></a></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lunch}
                                {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
                                <td><button onClick={this.addNew.bind(this,'Lunch')} style={{ }} class="btn btn-primary">Add New</button></td>
                            </tbody>
                            <br/>
                            <br/>
                            <thead><h2 class='h2'>Snacks</h2>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th><a onClick={this.deleteSection.bind(this,'Dinner')}><img width='25' height='25' class="img-responsive" src='https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png'></img></a></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dinner}
                                {/* <td><input type='text'></input></td>
                                <td><input type='text'></input></td> */}
                                <td><button onClick={this.addNew.bind(this,'Dinner')} style={{ }} class="btn btn-primary">Add New</button></td>
                            </tbody>
                        </table>
                </div> 
            </div> 
        )
    }
}

export default compose(
    graphql(getMenuMutation, { name: "getMenuMutation" })
  )(MenuRest);