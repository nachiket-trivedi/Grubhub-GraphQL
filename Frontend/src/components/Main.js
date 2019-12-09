import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import HomeCust from './HomeCust/HomeCust';
import HomeRest from './HomeRest/HomeRest';
import Landing from './Landing/Landing';
import Signup from './Signup/Signup';
import ProfileRest from './ProfileRest/ProfileRest';
import ProfileCust from './ProfileCust/ProfileCust';
import UpdateProfileCust from './UpdateProfileCust/UpdateProfileCust';
import UpdateProfileRest from './UpdateProfileRest/UpdateProfileRest';
import MenuRest from './MenuRest/MenuRest';
import AddItem from './MenuRest/AddItem';
import ItemDetails from './MenuRest/ItemDetails';
import UpdateItem from './MenuRest/UpdateItem';
import BrowseRest from './BrowseRest/BrowseRest';
import UpcomingOrdersCust from './OrdersCust/UpcomingOrdersCust';
import PastOrdersCust from './OrdersCust/PastOrdersCust';
import PastOrdersRest from './HomeRest/PastOrdersRest';
import ShowMessagesCust from './ShowMessagesCust/ShowMessagesCust';
import ShowMessagesRest from './ShowMessagesRest/ShowMessagesRest';

import LandingImage from './Landing/LandingImage';


class Main extends Component {
    render(){
        return(
            <div>
                {/*self note --- Render Different Component based on Route*/}
                <Route path="/" component={Landing}/>
                <Route path="/landing_image" component={LandingImage}/>
                <Route path="/login" component={Login}/>
                <Route path="/home_cust" component={HomeCust}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/home_rest" component={HomeRest}/>
                <Route path="/profile_rest" component={ProfileRest}/>
                <Route path="/profile_cust" component={ProfileCust}/>
                <Route path="/update_cust" component={UpdateProfileCust}/>
                <Route path="/update_rest" component={UpdateProfileRest}/>
                <Route path="/menu_rest" component={MenuRest}/>
                <Route path="/add_item" component={AddItem}/>
                <Route path="/item_details" component={ItemDetails}/>
                <Route path="/update_item" component={UpdateItem}/>
                <Route path="/browse_rest" component={BrowseRest}/>
                <Route path="/upcoming_orders_cust" component={UpcomingOrdersCust}/>
                <Route path="/past_orders_cust" component={PastOrdersCust}/>
                <Route path="/past_orders_rest" component={PastOrdersRest}/>
                <Route path="/show_messages_cust" component={ShowMessagesCust}/>
                <Route path="/show_messages_rest" component={ShowMessagesRest}/>

            </div>
        )
    }
}
//self note --- Export The Main Component
export default Main;