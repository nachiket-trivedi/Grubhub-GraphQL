import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Landing Component
class LandingImage extends Component {
    
    render(){
        return(
            <body class="bg" >
            <img class="bg" src='https://wallpaperaccess.com/full/767277.jpg'/>
            {/* <img class="bg" src='https://wallpaperaccess.com/full/424516.jpg'/> */}
            {/* white one */}
            {/* <img class="bg" src='https://s1.1zoom.me/b4248/957/Fast_food_Pizza_Pepper_Tomatoes_Olive_White_515874_3840x2160.jpg'/> */}
            {/* <img class="bg" src='https://wallpapercave.com/wp/wp3724337.jpg'/> */}
            {/* <img class="bg" src='http://www.aljanh.net/data/archive/img/3878543511.jpeg'/> */}
            </body> 
        )
    }
}

export default LandingImage;