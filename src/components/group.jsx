import React, { Component } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import Expense from "./expense";

class Group extends Component {
  state = {
    id: "",
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
  render() {
    const { id, name, expenseItems, users } = this.state;
    const expenses = (
      <React.Fragment>
        {expenseItems.map((item) => (
          <Expense key={item.id} expenseItem={item} />
        ))}
      </React.Fragment>
    );
    const members = (
      <React.Fragment>
        {users.map((item) => (
          <Row className="border-bottom m-1" key={item.id}>
            {item.name}
          </Row>
        ))}
      </React.Fragment>
    );
    let groupView = (
      <Container fluid>
        <Col className="border-right">
          <Row className="border-bottom mx-auto m-2">
            <Col className="float-left" xs={5}>
              <h2 className="font-weight-light">{name.toUpperCase()}</h2>
            </Col>
            <Col>
              <Row className="float-right">
                <Col>
                  <Link to={`/home/addExpense/${name}/${id}`}>
                    <Button>AddExpense</Button>
                  </Link>
                </Col>
                <Col>
                  <Popup trigger={<Button>Settle up</Button>} modal>
                    <div>Popup content here !!</div>
                  </Popup>
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
