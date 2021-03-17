import React, { Component } from "react";
import {
  InputGroup,
  Form,
  FormControl,
  Col,
  Container,
  Row,
  Button,
} from "react-bootstrap";
import { FacebookIcon, TwitterIcon } from "react-share";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SideBar extends Component {
  render() {
    const groupsa = (
      <React.Fragment>
        {this.props.currentUser.groups.map((item) => (
          <Row className="border-bottom m-1 " key={item.id}>
            <Link to={`/home/group/${item.id}`}>{item.name.toUpperCase()}</Link>
          </Row>
        ))}
      </React.Fragment>
    );
    return (
      <Container fluid className="border-right">
        <Row className="border-bottom m-2">
          <Link to="/home/dashboard">Dashboard</Link>
        </Row>
        <Row className="border-bottom m-2">
          <Link to="/home/activity">Recent Activity</Link>
        </Row>
        <Row className="border-bottom m-2">
          <Form inline>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="search-thumb">~</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Filter by name" aria-label="Username" />
            </InputGroup>
          </Form>
        </Row>
        <Row className="border-bottom m-2">
          <Link to="/home/activity">:= All Expenses</Link>
        </Row>
        <Row className="border-bottom m-2">
          <Col>Groups</Col>
          <Col>
            <Link to="/groups/new">
              <Button size="sm">+add</Button>
            </Link>
          </Col>
        </Row>
        {groupsa}
        <Row className="border-bottom m-2">
          <Col>Friends</Col>
          <Col>
            <Link to="/groups/new">
              <Button size="sm">+add</Button>
            </Link>
          </Col>
        </Row>
        <Row className="border-bottom m-2">Invite Friends</Row>
        <Row className="m-2">
          <Col>
            <FacebookIcon size={32} round={true} />
          </Col>
          <Col>
            <TwitterIcon size={32} round={true} />
          </Col>
        </Row>
        {/* </Row> */}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SideBar);
