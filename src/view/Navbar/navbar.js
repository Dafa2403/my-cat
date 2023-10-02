import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Nav, Navbar, Alert } from "react-bootstrap";
import { UserSearch } from "../../Context/context";
import axios from "../../API/axios";
import { Navigate, useNavigate } from "react-router-dom";

function Navigation() {
  const searchUser = UserSearch();
  const navigate = useNavigate();
  const { dataSearch, setDataSearch } = searchUser;
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const api_key =
    "live_MA3BQI7c6Uz03lYO6wmN4WwRk4Pa63o092vNbLRGEnfYLxq3tWHR3Q3KzVyHw0Zg";
  useEffect(() => {
    axios.get(`breeds?&api_key=${api_key}`).then((res) => {
      setData(res.data);
    });
  }, []);

  const submitSearch = async (e) => {
    e.preventDefault();

    // const res = await axios.get(
    //   `images/search?breed_ids=${input}&api_key=${api_key}`
    // );

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (input.replace(/^./, input[0].toLowerCase()) === element.id) {
        setDataSearch(element);
      } else if (element.name === input.replace(/^./, input[0].toUpperCase())) {
        setDataSearch(element);
      } else {
        navigate("/");
      }
    }
    navigate("/Search");
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
        <Navbar.Brand href="/">My-Cat</Navbar.Brand>
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
              <Button onClick={submitSearch} type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
      {/* <Alert>Hasil tidak ditemukan</Alert> */}
    </div>
  );
}

export default Navigation;
