import React, { Component } from "react";
import { Container } from "react-bootstrap";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <h1 className="font-weight-light my-auto text-center">
          Welcome to Splitwise
        </h1>{" "}
      </Container>
    );
  }
}

export default LandingPage;
