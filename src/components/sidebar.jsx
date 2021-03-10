import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <Container fluid>
        <Row>Dashboard</Row>
        <Row>Recent Activity</Row>
        <Row>Filter by name</Row>
        <Row>Groups</Row>
        <Row>Friends</Row>
        <Row>Invite Friends</Row>
        <Row>
          <Col>
            <Button size="sm">Facebook</Button>
          </Col>
          <Col>
            <Button size="sm">Tweet</Button>
          </Col>
        </Row>
        {/* </Row> */}
      </Container>
    );
  }
}

export default SideBar;
