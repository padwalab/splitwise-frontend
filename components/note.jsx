import React, { Component } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

class Note extends Component {
  state = { notes: [] };
  render() {
    const note = this.props.noteItem ? (
      <Container fluid>
        <Col xs={5}></Col>
        <Col xs={5} className="float-right border">
          <Row className="border-bottom">
            {this.props.noteItem.createdBy.name} (
            {new Date(this.props.noteItem.createdAt).toDateString()})
          </Row>
          <Row>{this.props.noteItem.note}</Row>
        </Col>
      </Container>
    ) : null;
    return note;
  }
}

export default Note;
