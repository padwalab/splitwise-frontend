import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import DashBoard from "./dashboard";
import SideBar from "./sidebar";

class Home extends Component {
  render() {
    let homeContent = (
      <Row className="md-auto">
        <Col>
          <SideBar />
        </Col>
        <Col xs={7}>
          <DashBoard />
        </Col>
        <Col>This is right sidebar col</Col>
      </Row>
    );
    return (
      <Container fluid className="w-75">
        {this.props.isLoggedIn ? homeContent : null}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Home);
