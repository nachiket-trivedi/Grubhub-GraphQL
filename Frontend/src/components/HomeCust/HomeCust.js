import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import SearchField from "react-search-field";
import axios from "axios";
import SearchResult from "./SearchResult.js";
import { relative } from "path";
import Dropdown from "react-dropdown";
import { hostedAddress } from "../../GlobalVar";

let doneSearchFlag = false,
  searchVal = null;
//create the Landing Component
class HomeCust extends Component {
  constructor(props) {
    super(props);
    this.getSearchResult = this.getSearchResult.bind(this);
    this.state = { searchResponse: [], searchVal: "" };
  }
  searchChangeHandler = e => {
    this.setState({
      searchVal: e.target.value
    });
  };
  getSearchResult = () => {
    // console.log(this.search.state.value);
    searchVal = this.state.searchVal;
    let data = { search: searchVal};
    let token=localStorage.getItem('bearer-token');
    axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    axios.post(hostedAddress + ":3001/search", data, {params:{},headers:{'Authorization':token, 'Accept':'application/json','Content-Type':'application/json'}}).then(response => {
      this.setState({ searchResponse: response.data });
      // console.log(doneSearchFlag);
    });
    doneSearchFlag = true;
  };
  // searchFunction = () => {
  //   // console.log(this.search.state.value);
  //   searchVal = this.search.state.value;
  //   let data = { search: searchVal };
  //   axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
  //   axios.post(hostedAddress + ":3001/search", data).then(response => {
  //     this.setState({ searchResponse: response.data });
  //     // console.log(doneSearchFlag);
  //   });
  //   doneSearchFlag = true;
  // };

  render() {
    let redirectVar = <Redirect to="/home_cust" />;
    let redirectSearchResult = null;
    if (doneSearchFlag) {
      console.log('search response',this.state.searchResponse);
      doneSearchFlag = false;
      redirectSearchResult = (
        <SearchResult
          key="searchResult"
          food={this.state.value}
          searchResponse={this.state.searchResponse}
          search={searchVal}
        ></SearchResult>
      );
    } else {
      redirectSearchResult = null;
    }
    //if Cookie is set render Logout Button
    if (localStorage.getItem("cookie") != "customer") {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div
        class="maincust"
        style={{ textAlign: "center", width: "200", height: "200" }}
      >
        {redirectVar}
        {redirectSearchResult}
        <h1 class="h1" style={{ textAlign: "center" }}>
          Hello {localStorage.getItem("name")}! Hungry?{" "}
          <span style={{ fontSize: 40 }}>&#127827;</span>
        </h1>

        <div class="">
          <div class="">
            {/* <SearchField
                ref={ref => (this.search = ref)}
                placeholder="Search Food..."
                onSearchClick={this.searchFunction}
                classNames="test-class"/> */}
            <input
              type="text"
              onChange={this.searchChangeHandler}
              placeholder="Type your favourite food..."
              class="test-class1"
            />
            <button class="btn btn-primary2" onClick={this.getSearchResult}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCust;