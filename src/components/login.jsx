import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { logInUser } from "../redux/actions/action-helper";
import axios from "axios";
import Home from "./home";
import { Redirect } from "react-router";

class Login extends Component {
  state = {
    email: "a@g.com",
    password: "a",
    warning: false,
  };

  handleEmail = (email) => {
    this.setState({ email });
  };
  handlePassword = (password) => {
    this.setState({ password });
  };
  handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", { ...this.state })
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 200) {
          this.props.logInUser(res.data[0]);
        }
      })
      .catch((error) => this.setState({ warning: true }));

    this.setState({ email: "", password: "", warning: false });
  };
  render() {
    let logInForm;
    logInForm = (
      <Form onSubmit={(e) => this.handleLogin(e)}>
        {this.state.warning ? (
          <Alert variant="danger">Invalid User creadentials</Alert>
        ) : null}
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
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            onChange={(e) => this.handlePassword(e.target.value)}
            type="password"
            value={this.state.password}
            required
          ></Form.Control>
        </Form.Group>
        <Button varient="primary" type="submit">
          Log in
        </Button>
      </Form>
    );
    return (
      <Container className="container w-25">
        {this.warning}
        {this.props.isLoggedIn ? <Redirect to="/home/dashboard" /> : logInForm}
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logInUser })(Login);
