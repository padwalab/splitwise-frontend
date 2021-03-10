import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logInUser } from "../redux/actions/action-helper";

class Login extends Component {
  state = {
    email: "a@g.com",
    password: "a",
  };

  handleEmail = (email) => {
    this.setState({ email });
  };
  handlePassword = (password) => {
    this.setState({ password });
  };
  handleLogin = (e) => {
    e.preventDefault();
    this.props.logInUser(this.state);
    this.setState({ email: "", password: "" });
    <Redirect to="/home" />;
  };
  render() {
    let logInForm;
    logInForm = (
      <Form onSubmit={(e) => this.handleLogin(e)}>
        <Form.Label className="font-weight-bold mx-auto">
          WELCOME TO SPLITWISE
        </Form.Label>
        <Form.Group>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => this.handleEmail(e.target.value)}
            value={this.state.email}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => this.handlePassword(e.target.value)}
            type="password"
            value={this.state.password}
          ></Form.Control>
        </Form.Group>
        <Button varient="primary" type="submit">
          Log in
        </Button>
      </Form>
    );
    return (
      <Container className="container w-25">
        {this.props.isLoggedIn ? null : logInForm}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logInUser })(Login);
