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
  state = {};

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
            Total balance
          </Col>
          <Col className="text-center mx-auto m-2">you owe</Col>
          <Col className="text-center border-left mx-auto m-2">
            you are owed
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
