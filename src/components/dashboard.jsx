import React, { Component, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

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
    return (
      <Container fluid>
        <Row className="m-2">
          <Col xs={6}>Dashboard</Col>
          <Col>
            <Button>Add expense</Button>
            <Button>Settle up</Button>
          </Col>
        </Row>
        <Row>
          <Col>Total balance</Col>
          <Col>you owe</Col>
          <Col>you are owed</Col>
        </Row>
        <Row>
          <Col>YOU OWE</Col>
          <Col>
            <ButtonToggle />
          </Col>
          <Col>YOU ARE OWED</Col>
        </Row>
      </Container>
    );
  }
}

export default DashBoard;
