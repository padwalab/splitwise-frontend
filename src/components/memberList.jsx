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
      .get(`http://localhost:8000/membership/${this.props.member.id}/balance`) //done
      .then((result) =>
        this.setState({
          userName: result.data.member.name,
          balance: result.data.share,
        })
      );
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.groupId !== prevProps.groupId ||
      this.props.member.id !== prevProps.member.id
    )
      axios
        .get(`http://localhost:8000/membership/${this.props.member.id}/balance`) //done
        .then((result) =>
          this.setState({
            userName: result.data.member.name,
            balance: result.data.share,
          })
        );
  }

  render() {
    return (
      <Container fluid>
        <Row key={this.props.member.id}>{this.state.userName}</Row>
        <React.Fragment>
          {this.state.balance > 0 ? (
            <Row className="text-success">gets back {this.state.balance}</Row>
          ) : (
            <Row className="text-danger">owes {this.state.balance}</Row>
          )}
        </React.Fragment>
      </Container>
    );
  }
}

export default MemberList;
