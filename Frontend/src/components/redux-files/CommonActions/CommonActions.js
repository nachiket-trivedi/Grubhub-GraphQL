import {LOGIN, SIGNUP,SHOW_CUST_PROFILE} from "./constants";
import axios from 'axios';
import {hostedAddress} from "../GlobalVar"

export function login(data) {
  console.log("login 'action'")
  return { type: LOGIN, data };
}
export function signup(data) {
  console.log("signup 'action'")
  return { type: SIGNUP, data };
}
export function updateRest(data) {
  console.log("update 'action'")
  return { type: UPDATEREST, data };
}
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

//-
