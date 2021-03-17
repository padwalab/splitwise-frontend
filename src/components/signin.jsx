import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { signInUser } from "../redux/actions/action-helper";
import axios from "axios";
import { Redirect } from "react-router";
class Signin extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  handleName = (name) => {
    this.setState({ name });
  };
  handleEmail = (email) => {
    this.setState({ email });
  };
  handlePassword = (password) => {
    this.setState({ password });
  };

  handleSignInUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signin", { ...this.state })
      .then((res) => {
        console.log("repsonse data: ", res.data);
        if (res.status === 200) {
          this.props.signInUser(res.data);
          <Redirect to="/home" />;
        }
      });

    this.setState({ name: "", email: "", password: "" });
  };
  render() {
    let signInForm;
    signInForm = (
      <Form onSubmit={this.handleSignInUser}>
        <Form.Label className="font-weight-bold mx-auto">
          INTRODUCE YOURSELF
        </Form.Label>
        <Form.Group>
          <Form.Label>Hi there! My name is</Form.Label>
          <Form.Control
            onChange={(e) => this.handleName(e.target.value)}
            type="text"
            value={this.state.name}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Here's my email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="jane@dow.com"
            onChange={(e) => this.handleEmail(e.target.value)}
            value={this.state.email}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>And here's my Password:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => this.handlePassword(e.target.value)}
            value={this.state.password}
            required
          ></Form.Control>
        </Form.Group>
        <Button varient="primary" type="submit">
          Sign me up!
        </Button>
      </Form>
    );
    return <Container className="container w-25">{signInForm}</Container>;
  }
}
export default connect(null, { signInUser })(Signin);
