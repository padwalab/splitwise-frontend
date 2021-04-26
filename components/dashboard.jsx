import axios from "axios";
import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function ButtonToggle() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "as list", value: 1 },
    { name: "chart", value: 2 },
  ];
  return (
    <>
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            size="sm"
            variant="outline-secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
}
class DashBoard extends Component {
  state = {
    balance: 0,
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/users/${this.props.currentUser.id}/groups`, {
        headers: {
          Authorization: `Bearer ${this.props.currentUser.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        res.data.groups.forEach((group) => {
          group.members.forEach((member) => {
            member.member === this.props.currentUser.id
              ? this.setState({ balance: this.state.balance + member.share })
              : this.setState({ balance: this.state.balance });
          });
        });
        // this.setState({
        //   balance: res.data,
        // });
      });
  }
  render() {
    let dashBoardView = (
      <Container fluid className="border-bottom">
        <Row className="border-bottom mx-auto m-2">
          <Col className="float-left" xs={6}>
            <h2 className="font-weight-light">Dashboard</h2>
          </Col>
          <Col>
            {/* <Button>Add expense</Button> */}
            <Popup
              trigger={<Button className="float-right">Settle up</Button>}
              modal
            >
              <div>Popup content here !!</div>
            </Popup>
          </Col>
        </Row>
        <Row className="border-bottom m-2">
          <Col className="text-center border-right mx-auto m-2">
            <Row className="justify-content-md-center">Total balance</Row>
            <Row className="justify-content-md-center">
              {this.state.balance > 0
                ? "$" + this.state.balance
                : "- $" + -this.state.balance}
            </Row>
          </Col>
          <Col className="text-center mx-auto m-2">
            <Row className="justify-content-md-center">you owe</Row>
            <Row className="justify-content-md-center text-danger">
              {this.state.balance > 0 ? "$0.00" : "$" + -this.state.balance}
            </Row>
          </Col>
          <Col className="text-center border-left mx-auto m-2">
            <Row className="justify-content-md-center">you are owed</Row>
            <Row className="justify-content-md-center text-success">
              {this.state.balance > 0 ? "$" + this.state.balance : "$0.00"}
            </Row>
          </Col>
        </Row>
        <Row className="m-2">
          <Col className="text-center mx-auto m-2">YOU OWE</Col>
          <Col className="text-center mx-auto m-2">
            <ButtonToggle />
          </Col>
          <Col className="text-center mx-auto m-2">YOU ARE OWED</Col>
        </Row>
      </Container>
    );
    return (
      <React.Fragment>
        {this.props.isLoggedIn ? dashBoardView : <Redirect to="/login" />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, null)(DashBoard);
