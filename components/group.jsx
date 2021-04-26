import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Expense from "./expense";
import MemberList from "./memberList";

class Group extends Component {
  state = {
    id: 0,
    name: "",
    expenseItems: [],
    users: [],
    balance: 0,
    membershipId: "",
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/groups/${this.props.id}`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
        },
      }) //done
      .then((res) => res.data)
      .then((result) => {
        this.setState({
          id: result.id,
          name: result.name,
          expenseItems: result.expenses,
          users: result.members, // users: result.users,
        });
        this.state.users.forEach((item) =>
          item.member === this.props.currentUser.id
            ? this.setState({ balance: item.share, membershipId: item.id })
            : this.setState({ balance: this.state.balance })
        );
        console.log(this.state);
        // axios
        //   .post(`http://localhost:8000/api/groups/userbalance`, {
        //     userId: this.props.currentUser.id,
        //     groupId: this.state.id,
        //   })
        //   .then((result) => this.setState({ balance: result.data.share }));
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      axios
        .get(`http://localhost:8000/groups/${this.props.id}`, {
          headers: {
            Authorization: `Bearer ${this.props.currentUser.token}`,
          },
        }) // done
        .then((res) => res.data)
        .then((result) =>
          this.setState({
            id: result.id,
            name: result.name,
            expenseItems: result.expenses,
            users: result.members,
          })
        );
    }
  }
  exitGroup = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/membership/${this.state.membershipId}/exit`,
        {
          //done
          userId: this.props.currentUser.id,
          groupId: this.state.id,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.currentUser.token}`,
          },
        }
      )
      .then((result) => <Redirect to="/home/dashboard" />)
      .catch((error) => console.log(error));
  };
  render() {
    const { id, name, expenseItems, users, membershipId } = this.state;
    const expenses = expenseItems ? (
      <React.Fragment>
        {expenseItems
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <Expense key={item.id} expenseItem={item} />
          ))}
      </React.Fragment>
    ) : (
      <h3>No recent expenses!!</h3>
    );
    const members = users ? (
      <React.Fragment>
        {users.map((item) => (
          <MemberList groupId={this.props.id} member={item} />
        ))}
      </React.Fragment>
    ) : (
      console.log("No Users")
    );
    let groupView = (
      <Container fluid>
        <Col className="border-right">
          <Row className="border-bottom mx-auto m-2">
            <Col xs={1}>
              <Link to={`/home/groups/${name}/${id}/exit`}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => this.exitGroup(e)}
                  disabled={this.state.balance === 0 ? false : true}
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
                <Col xs={4}>
                  <Link to={`/home/addMember/${name}/${id}`}>
                    <Button variant="outline-primary" size="sm">
                      AddMember
                    </Button>
                  </Link>
                </Col>
                <Col xs={4}>
                  <Link to={`/home/addExpense/${name}/${id}`}>
                    <Button variant="outline-primary" size="sm">
                      AddExpense
                    </Button>
                  </Link>
                </Col>
                <Col xs={4}>
                  <Link to={`/home/settle/${name}/${id}/${membershipId}`}>
                    <Button variant="outline-primary" size="sm">
                      SettleUp
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={9} className="float-left border-right">
              <Row className="border-bottom m-2">{expenses}</Row>
            </Col>
            <Col className="border-right">{members}</Col>
          </Row>
        </Col>
      </Container>
    );
    return groupView;
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Group);
