import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import Expense from "./expense";
import MemberList from "./memberList";

class Group extends Component {
  state = {
    id: 0,
    name: "",
    expenseItems: [],
    users: [],
  };
  componentDidMount() {
    fetch(`http://localhost:8000/api/group/${this.props.id}`)
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          id: result.id,
          name: result.name,
          expenseItems: result.expenseItems,
          users: result.users,
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      fetch(`http://localhost:8000/api/group/${this.props.id}`)
        .then((res) => res.json())
        .then((result) =>
          this.setState({
            id: result.id,
            name: result.name,
            expenseItems: result.expenseItems,
            users: result.users,
          })
        );
    }
  }
  exitGroup = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/groups/${this.state.id}/exit`, {
        userId: this.props.currentUser.id,
      })
      .then((result) => <Redirect to="/home/dashboard" />)
      .catch((error) => console.log(error));
  };
  render() {
    const { id, name, expenseItems, users } = this.state;
    const expenses = (
      <React.Fragment>
        {expenseItems
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <Expense key={item.id} expenseItem={item} />
          ))}
      </React.Fragment>
    );
    const members = (
      <React.Fragment>
        {users.map((item) => (
          <MemberList groupId={this.props.id} member={item} />
        ))}
      </React.Fragment>
    );
    let groupView = (
      <Container fluid>
        <Col className="border-right">
          <Row className="border-bottom mx-auto m-2">
            <Col xs={1}>
              <Link to={`/home/groups/${name}/${id}/exit`}>
                <Button
                  variant="outline-danger"
                  onClick={(e) => this.exitGroup(e)}
                >
                  Exit
                </Button>
              </Link>
            </Col>
            <Col className="float-left" xs={5}>
              <h2 className="font-weight-light">{name.toUpperCase()}</h2>
            </Col>
            <Col>
              <Row className="float-right">
                <Col>
                  <Link to={`/home/addMember/${name}/${id}`}>
                    <Button variant="outline-primary">AddMember</Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={`/home/addExpense/${name}/${id}`}>
                    <Button variant="outline-primary">AddExpense</Button>
                  </Link>
                </Col>
                <Col>
                  <Link to={`/home/settle/${name}/${id}`}>
                    <Button variant="outline-primary">SettleUp</Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Col xs={9} className="float-left border-right">
            <Row className="border-bottom m-2">{expenses}</Row>
          </Col>
          <Col className="border-right">{members}</Col>
        </Col>
      </Container>
    );
    return groupView;
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Group);
