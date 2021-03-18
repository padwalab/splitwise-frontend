import axios from "axios";
import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

class MemberList extends Component {
  state = {
    userName: this.props.member.name,
    balance: 0,
  };
  componentDidMount() {
    axios
      .post(`http://localhost:8000/api/groups/userbalance`, {
        userId: this.props.member.id,
        groupId: this.props.groupId,
      })
      .then((result) => this.setState({ balance: result.data.share }));
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.groupId !== prevProps.groupId ||
      this.props.member.id !== prevProps.member.id
    )
      axios
        .post(`http://localhost:8000/api/groups/userbalance`, {
          userId: this.props.member.id,
          groupId: this.props.groupId,
        })
        .then((result) => this.setState({ balance: result.data.share }));
  }

  render() {
    return (
      <Container>
        <Row key={this.props.member.id}>{this.props.member.name}</Row>
        <React.Fragment>
          {this.state.balance > 0 ? (
            <Row>gets back {this.state.balance}</Row>
          ) : (
            <Row>owes {this.state.balance}</Row>
          )}
        </React.Fragment>
      </Container>
    );
  }
}

export default MemberList;
