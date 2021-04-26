import axios from "axios";
// import {  } from "bootstrap";
// import { Button } from "bootstrap";
import React, { Component } from "react";
import { Container, Row, Button, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import Expense from "./expense";
import Payment from "./payment";

class AllExpenses extends Component {
  state = {
    expenses: [],
    payments: [],
    currentIndex: 0,
    num: 2,
    all: [],
    now: [],
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/users/${this.props.currentUser.id}/groups`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
        },
      }) // done
      // .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        result.data.groups.forEach((group) => {
          this.setState({
            expenses: [
              ...this.state.expenses,
              ...group.expenses,
              // ...group.payments, // take care of payments
            ],
            payments: [...this.state.payments, ...group.payments],
          });
        });
        this.setState({
          all: [
            ...this.state.all,
            ...this.state.payments,
            ...this.state.expenses,
          ],
        });

        console.log(this.state);
      });
  }
  render() {
    // let handleNoOfEntries = (num) => {
    //   this.setState({ num });
    //   console.log(this.state.num);
    // };
    const payments =
      this.state.payments.length > 0 || this.state.expenses.length > 0 ? (
        <React.Fragment>
          {this.state.now.map((item) =>
            item.name ? (
              <Expense key={item.id} expenseItem={item} />
            ) : (
              <Payment key={item.id} paymentItem={item} />
            )
          )}
        </React.Fragment>
      ) : null;
    return (
      <Container fluid>
        <Row className="md-auto m-2">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              No. of entris
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  this.setState({ now: this.state.all.slice(0, 2) });
                  console.log(this.state.num);
                }}
              >
                2
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  this.setState({ now: this.state.all.slice(0, 5) });
                  console.log(this.state.num);
                }}
              >
                5
              </Dropdown.Item>
              <Dropdown.Item
                onSelect={() => {
                  this.setState({ now: this.state.all.slice(0, 10) });
                  console.log(this.state.num);
                }}
              >
                10
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="m-2">first</Button>..
          <Button className="m-2">Previous</Button>
          <Button className="m-2">Next</Button>..
          <Button
            className="m-2"
            onClick={() => this.setState({ now: this.state.all.slice(-5) })}
          >
            Last
          </Button>
        </Row>

        {this.state.payments.length < 1 && this.state.expenses.length < 0 ? (
          <h1 className="font-weight-light">No Recent Activity to display!!</h1>
        ) : (
          payments
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AllExpenses);
