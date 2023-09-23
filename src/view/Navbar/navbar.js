import React, { useState } from "react";
import { Form, Row, Col, Button, Nav, Navbar } from "react-bootstrap";
import { UserSearch } from "../../Context/context";
import axios from "../../API/axios";
import { Navigate, useNavigate } from "react-router-dom";

function Navigation() {
  const searchUser = UserSearch();
  const navigate = useNavigate();
  const { setDataSearch } = searchUser;
  const [input, setInput] = useState("");
  const api_key =
    "live_MA3BQI7c6Uz03lYO6wmN4WwRk4Pa63o092vNbLRGEnfYLxq3tWHR3Q3KzVyHw0Zg";
  const submitSearch = () => {
    axios
      .get(`images/search?breed_ids=${input}&api_key=${api_key}`)
      .then((res) => {
        setDataSearch(res.data);
        navigate("/Search");
      });
  };
  return (
    <div>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
        style={{ padding: "1rem" }}
        fixed="top"
      >
        <Navbar.Brand href="#">My-Cat</Navbar.Brand>
        <Form inline>
          <Row>
            <Col style={{ display: "flex", flexDirection: "row" }} xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ marginRight: 5 }}
              />
              <Button onClick={submitSearch}>Search</Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  );
}

export default Navigation;
