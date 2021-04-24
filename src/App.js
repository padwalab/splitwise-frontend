import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import NavBar from "./components/navbar";
import Profile from "./components/profile";
import Signin from "./components/signin";
import NewGroup from "./components/newgroup";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/* <Route path="/" component={LandingPage} /> */}
        <Route path="/signin" component={Signin} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/groups/new" component={NewGroup} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(App);
