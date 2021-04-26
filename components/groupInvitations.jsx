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
      .get(`http://localhost:8000/users/${this.props.currentUser.id}/invites`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
        },
      }) // done
      .then((invitation) => {
        console.log(invitation.data);
        this.setState({ invitations: invitation.data.invites });
        console.log(this.state, invitation.data.invites);
      });
  }
  render() {
    const invites =
      this.state.invitations.length > 0 ? (
        <React.Fragment>
          {this.state.invitations.map((item) => (
            <Invitation key={item.id} groupId={item.id} />
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>There are no pending invitations</React.Fragment>
      );
    return <Container>{invites}</Container>;
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(GroupInvitations);
