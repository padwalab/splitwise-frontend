import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, useParams } from "react-router";
import DashBoard from "./dashboard";
import RecentActivity from "./recentActivity";
import SideBar from "./sidebar";
import Login from "./login";
import AddExpense from "./addExpense";
import Group from "./group";

class Home extends Component {
  render() {
    let homeContent = (
      <Row className="md-auto">
        <Col>
          <SideBar />
        </Col>
        <Col xs={9}>
          <Route path="/home/dashboard" component={DashBoard} />
          <Route path="/home/activity" component={RecentActivity} />
          <Route path="/home/group/:id">
            <GroupDetails />
          </Route>
          <Route path="/home/addExpense/:groupName/:id">
            <CreateExpense />
          </Route>
        </Col>
      </Row>
    );
    return (
      <Container fluid className="w-75">
        {this.props.isLoggedIn ? homeContent : <Login />}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(Home);

export function CreateExpense() {
  let { groupName, id } = useParams();
  return <AddExpense groupId={id} groupName={groupName} />;
}

export function GroupDetails() {
  let { id } = useParams();
  return <Group id={id} />;
}
