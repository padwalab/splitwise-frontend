import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import Signin from "./components/signin";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Route path="/signin" component={Signin} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(App);
