import {BROWSE_REST,SHOW_ORDERS_REST,SHOW_REST_PROFILE, SHOW_MESSAGES_REST} from "../constants";
import axios from 'axios';
import {hostedAddress} from "../../../GlobalVar"

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

  export function showOrdersRest(data,token) {
    console.log("show orders restaurant 'action' input data", data)
    return dispatch=>{
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/showUpcomingOrdersRest',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
              .then((response) => {
                  console.log('this is the show order response---', response.data);
                  dispatch({
                    type:SHOW_ORDERS_REST,
                    payload:response.data
                  })
              })
              .catch(()=>{console.log("errororororor")})
    }
  }

  export function showRestProfile(data,token) {
    console.log("showrestprofile 'action' input data", data)
    return dispatch=>{
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/showRestProfile',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
      .then((response) => {
        console.log('axios response',response.data[0])
        dispatch({
          type:SHOW_REST_PROFILE,
          payload:response.data[0]})  
      })
      .catch(()=>{console.log("error")});
    }
  }

  export function showMessagesRest(data,token) {
    console.log("show messages restaurant 'action' input data", data)
    return dispatch=>{
      axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
      axios.post(hostedAddress+':3001/showMessagesRest',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
              .then((response) => {
                  console.log('this is the show msg rest response---', response.data);
                  dispatch({
                    type:SHOW_MESSAGES_REST,
                    payload:response.data
                  })
              })
              .catch(()=>{console.log("errororororor")})
    }
  }
  //