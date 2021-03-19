import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import invitation from "./invitation";
import Invitation from "./invitation";

class GroupInvitations extends Component {
  state = {
    invitations: [],
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/groups/${this.props.currentUser.id}/invitations`
      )
      .then((invitation) => {
        this.setState({ invitations: invitation.data });
        console.log(this.state, invitation.data);
      });
  }
  render() {
    const invites = (
      <React.Fragment>
        {this.state.invitations.map((item) => (
          <Invitation groupId={item.groupId} />
        ))}
      </React.Fragment>
    );
    return (
      <Container>
        {this.state.invitations.length < 1 ? (
          <React.Fragment>There are no pending invitations</React.Fragment>
        ) : (
          invites
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(GroupInvitations);
