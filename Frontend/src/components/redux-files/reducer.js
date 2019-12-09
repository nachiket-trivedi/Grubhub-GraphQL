import { LOGIN, SIGNUP, SHOW_CUST_PROFILE, BROWSE_REST, CART_DETAILS ,SEARCH, FILTER_CUISINE, SHOW_ORDERS_CUST, SHOW_ORDERS_REST, SHOW_REST_PROFILE, SHOW_MESSAGES_CUST, SHOW_MESSAGES_REST} from "./constants";
import axios from "axios";
import cookie from "react-cookies";

const initialState = {
  data: [],
  cust_email:"",
  cust_name:"",
  cust_phone:"",
  cust_zipcode:"",
  cust_address:"",
  cust_img:"",
  rest_email:"",
  menuDetails:[],
  filterResponse:[],
  searchResponse:[],
  OrdersCust:[],
  OrdersRest:[],
  rest_name:"",
  rest_phone:"",
  rest_zipcode:"",
  rest_address:"",
  rest_cuisine:"",
  owner_name:"",
};

export default function (state = initialState, action) {
    if (action.type === LOGIN) {
      
    }

    if(action.type === SIGNUP) {
    return Object.assign({}, state, {
      data: state.data.concat(action.data)
    });
    }

    if(action.type===SHOW_CUST_PROFILE){
      console.log('inside show cust profile reducer', action.payload)
      const obj=Object.assign({},state,action.payload)
      return obj;
    }

    if(action.type===BROWSE_REST){
      console.log('inside browse restaurant reducer', action.payload)
      const obj=Object.assign({},state,{menuDetails:action.payload})
      return obj;
    }

    if(action.type===CART_DETAILS){
      console.log('inside cart details reducer', action.payload)
      return {}
    }

    if(action.type===SEARCH){
      console.log('inside search restaurant reducer', action.payload)
      // state.searchResponse=action.payload;
      // return {searchResponse:action.payload}
      const obj=Object.assign({},state,{searchResponse:action.payload})
      return obj;
    }

    if(action.type===FILTER_CUISINE){
      console.log('inside filter cuisine reducer', action.payload)
      const obj=Object.assign({},state,{filterResponse:action.payload})
      return obj;
    }

    if(action.type===SHOW_ORDERS_CUST){
      console.log('inside show upcmoing orders cust reducer', action.payload)
      const obj=Object.assign({},state,{OrdersCust:action.payload})
      return obj;
    }
    if(action.type===SHOW_ORDERS_REST){
      console.log('inside show upcmoing orders rest reducer', action.payload)
      const obj=Object.assign({},state,{OrdersRest:action.payload})
      return obj;
    }

    if(action.type===SHOW_REST_PROFILE){
      console.log('inside show rest profile reducer', action.payload)
      const obj=Object.assign({},state,action.payload)
      return obj;
    }

    if(action.type===SHOW_MESSAGES_CUST){
      console.log('inside show messages cust reducer', action.payload)
      const obj=Object.assign({},state,{OrdersCust:action.payload})
      return obj;
    }

    if(action.type===SHOW_MESSAGES_REST){
      console.log('inside show messages rest reducer', action.payload)
      const obj=Object.assign({},state,{OrdersRest:action.payload})
      return obj;
    }
  }
