import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import ItemDetails from './ItemDetails';
import {hostedAddress} from "../../GlobalVar"

let redirectVar=null;
let menuFlag=false, updateFlag=false;
export class UpdateItem extends Component {
     constructor(props){
    super(props);
    this.backToMenu = this.backToMenu.bind(this);
    this.state=({section:"", price:"", description:""},{flag:'1'})
     }
  backToMenu()
  {
      menuFlag=true;
    //   this.setState({flag:'2'});
    console.log('yes' )
    this.setState({});
  } 

    updateDetails=()=>
    {
        let data={
            section:this.section.value,
            name:this.name.value,
            price:this.price.value,
            description:this.description.value,
            rest_email:localStorage.getItem('email'),
            oldName:this.props.name
        }
        console.log('data', data)
        let token=localStorage.getItem('bearer-token');
        axios.defaults.withCredentials = true;//very imp, sets credentials so that backend can load cookies
        axios.post(hostedAddress+':3001/updateItem',data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}})
        .then((response) => {
          updateFlag=true;
          this.setState({});
        })
        .catch(console.log("error"));

    }
    render() { 
    if(menuFlag)
    {
        redirectVar=window.location.reload();
        menuFlag=false;
        console.log(redirectVar);
    }
    else
    {
        redirectVar=null;
    }
    if(updateFlag)
    {
        redirectVar=window.location.reload();
    }
    if(localStorage.getItem('cookie')!='restaurant'){
      redirectVar = <Redirect to="/login"/>}
    return (
    <div>
        {redirectVar}
        <div class="container additem" >
          <div class="login-form" >
            <div class="main-div-1">
              <div class="panel">
                <h2>Update Your {this.props.section} Item</h2>
              </div>
              <div class="form-group">
                
                <input
                  ref={ref => (this.section = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="section"
	    	  placeholder={"Section Name ("+this.props.section+")"}
	          defaultValue={this.props.section}
                  required
                />
              </div>

              <div class="form-group">
                <input
                //   onChange={this.usernameChangeHandler}
                  ref={ref => (this.name = ref)}
                  type="text"
                  class="form-control"
                  name="name"
                  placeholder={"Item Name ("+this.props.name+")"}
                  defaultValue={this.props.name}
	    	  required
                />
              </div>
              <div class="form-group">
                <input
                //   onChange={this.passwordChangeHandler}
                  type="test"
                  ref={ref => (this.price = ref)}
                  class="form-control"
                  name="price"
                  placeholder={"Item Price ("+this.props.price+")"}
                  defaultValue={this.props.price}
	    	  required
                />
              </div>
              <div class="form-group">
                <textarea
                  ref={ref => (this.description = ref)}
                //   onChange={this.usernameChangeHandler}
                  type="textarea"
                  class="form-control"
                  name="description"
                  placeholder={"Item Description ("+this.props.description+")"}
                  defaultValue={this.props.description}
	    	  required
                />
                <br/><br/><br/><br/>
                <b>Image</b>
                    <input
                    ref={ref => (this.image = ref)}
                    type="file"
                    name="postImage"
                    id='postImage'
                    onChange={this.onImageChangeHandler}
                    placeholder={this.state.image}
                    />
                    <button type="button" class="btn btn-success" onClick={this.onUploadClickHandler}>Upload</button> 
              </div>
              <button ref={ref => (this.backToMenu = ref)} onClick={this.backToMenu} className="btn btn-primary1">Leave it</button>
              {/* <input type='submit' ref={ref => (this.update = ref)} className="btn btn-primary1" value="Update"/> */}
              <button ref={ref => (this.update = ref)} onClick={this.updateDetails} className="btn btn-primary1">Update</button>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default UpdateItem
