import {LOGIN, SIGNUP, SHOW_CUST_PROFILE, BROWSE_REST, CART_DETAILS, SEARCH, FILTER_CUISINE, SHOW_ORDERS_CUST, SHOW_MESSAGES_CUST} from "../constants";
import axios from 'axios';
import {hostedAddress} from "../../../GlobalVar"

export function showCustProfile(data,token) {
  console.log("showcustprofile 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/showCustProfile',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
    .then((response) => {
      console.log('axios response',response.data[0])
      dispatch({
        type:SHOW_CUST_PROFILE,
        payload:response.data[0]})  
    })
    .catch(()=>{console.log("error")});
  }
}

export function browseRest(data,token) {
  console.log("browse rest 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress + ":3001/getMenuByCust", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
    .then(response => {
      dispatch({
        type:BROWSE_REST,
        payload:response.data
      }
      )
    })
    .catch(()=>{console.log("error")});
  }
}

export function cartDetails(data,token) {
  console.log("cart details 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/placeOrder',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
                .then((response) => {
                    dispatch({
                      type:CART_DETAILS
                    })
                    
                })
                .catch(()=>{console.log("errororororor")})
  }
}

export function search(data,token) {
  console.log("search 'action' input data", data)
  alert(data)
  return dispatch=>{
    axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress + ":3001/search", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then((response) => {
      dispatch({
        type:SEARCH,
        payload:response.data
      })
    })
    .catch(()=>{console.log("errororororor")})
  }
}

export function filterCuisine(data,token) {
  console.log("filter cuisine 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/filterCuisine',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
    .then((response) => {
      console.log('Data rec'+response.data)
        dispatch({
          type:FILTER_CUISINE,
          payload:response.data
        })
    })
    .catch(()=>{console.log("errororororor")})
  }
}

export function showOrdersCust(data,token) {
  console.log("show orders customer 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/showUpcomingOrdersCust',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then((response) => {
                console.log('this is the show order response---', response.data);
                dispatch({
                  type:SHOW_ORDERS_CUST,
                  payload:response.data
                })
            })
            .catch(()=>{console.log("errororororor")})
  }
}

export function showMessagesCust(data,token) {
  console.log("show messages customer 'action' input data", data)
  return dispatch=>{
    axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress+':3001/showMessagesCust',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
            .then((response) => {
                console.log('this is the show msg cust response---', response.data);
                dispatch({
                  type:SHOW_MESSAGES_CUST,
                  payload:response.data
                })
            })
            .catch(()=>{console.log("errororororor")})
  }
}
//-

