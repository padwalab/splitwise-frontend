import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class RecentActivity extends Component {
  state = {};
  render() {
    let recentActivityView = (
      <Container fluid className="border-bottom">
        <Row className="border-bottom mx-auto m-2">
          <Col className="float-left" xs={6}>
            <h2 className="font-weight-light">Recent Activity</h2>
          </Col>
        </Row>
        <Row className="border-bottom m-2">
          <Col key="type-icon">Icon</Col>
          <Col xs={9} key="expense-details">
            <Row>User Added "name_of_the_expense" in "name_of_the_group"</Row>
            <Row>You "owe/lent" "$_amount"</Row>
          </Col>
        </Row>
        <Row className="border-bottom m-2">
          <Col key="type-icon">Icon</Col>
          <Col xs={9} key="expense-details">
            <Row>User Added "name_of_the_expense" in "name_of_the_group"</Row>
            <Row>You "owe/lent" "$_amount"</Row>
          </Col>
        </Row>
        <Row className="border-bottom m-2">
          <Col key="type-icon">Icon</Col>
          <Col xs={9} key="expense-details">
            <Row>User Added "name_of_the_expense" in "name_of_the_group"</Row>
            <Row>You "owe/lent" "$_amount"</Row>
          </Col>
        </Row>
      </Container>
    );
    return (
      <React.Fragment>
        {this.props.isLoggedIn ? recentActivityView : <Redirect to="/login" />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(RecentActivity);
