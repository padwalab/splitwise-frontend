import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, useParams } from "react-router";
import DashBoard from "./dashboard";
import RecentActivity from "./recentActivity";
import SideBar from "./sidebar";
import Login from "./login";
import AddExpense from "./addExpense";
import AllExpenses from "./allExpenses";
import Group from "./group";
import AddMember from "./addMember";
import GroupInvitations from "./groupInvitations";
import SettleUp from "./settleUp";

class Home extends Component {
  render() {
    let homeContent = (
      <Row>
        <Col xs={3}>
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
          <Route path="/home/addMember/:groupName/:id">
            <GroupAddMember />
          </Route>
          <Route path="/home/expenses/all" component={AllExpenses} />
          <Route path="/home/invitations" component={GroupInvitations} />
          <Route path="/home/settle/:groupName/:id/:membershipId">
            <SettleUpExpense />
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

export function GroupAddMember() {
  let { groupName, id } = useParams();
  return <AddMember groupId={id} groupName={groupName} />;
}

export function SettleUpExpense() {
  let { groupName, id, membershipId } = useParams();
  return (
    <SettleUp groupId={id} groupName={groupName} membershipId={membershipId} />
  );
}
