import React, { Component } from "react";
import { logOutUser } from "../redux/actions/action-helper";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Navbar,
  Form,
  Nav,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOutUser();
  };
  render() {
    let NavElems;
    if (!this.props.isLoggedIn) {
      NavElems = (
        <Form inline className="text-white">
          <Link to="/login">
            <Button className="m-2">Log in</Button>
          </Link>
          or
          <Link to="/signin">
            <Button className="m-2">Sign in</Button>
          </Link>
        </Form>
      );
    } else {
      NavElems = (
        <NavDropdown
          title={
            <span className="text-white">{this.props.currentUser.name}</span>
          }
          className="text-white m-2"
        >
          <NavDropdown.Item>
            <Link to="/profile">Your account</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/groups/new">Create a group</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>Fairness calculators</NavDropdown.Item>
          <NavDropdown.Item onClick={this.handleLogOut}>
            <Link to="/home">Log out</Link>
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    return (
      <Navbar bg="dark">
        <Container fluid className="w-75">
          <Navbar.Brand className="text-white font-weight-light">
            <Link className="text-white" to="/home/dashboard">
              Splitwise
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>{NavElems}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logOutUser })(NavBar);
