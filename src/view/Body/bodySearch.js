import React, { useEffect, useState } from "react";
import { Col, Row, Card, Collapse, Button } from "react-bootstrap";
import "./styles.css";
import axios from "../../API/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSearch } from "../../Context/context";

function Search() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [deskrip, setDeskrip] = useState("");
  const userSearch = UserSearch();
  const { dataSearch } = userSearch;
  console.log(dataSearch);

  useEffect(() => {
    setData(dataSearch);
    setName(dataSearch[0].breeds[0].name);
    setDeskrip(dataSearch[0].breeds[0].description);
  }, []);

  console.log("test", name);
  return (
    <div className="conBody">
      <Row className="row-cols-4 d-flex justify-content-center">
        {dataSearch.map((item, index) => (
          <Col style={{ marginBottom: 10 }} key={index}>
            <Card>
              <Card.Img variant="top" src={item.url} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  Detail
                </Button>
                <Card.Text>
                  <Collapse in={open}>
                    <span>{deskrip}</span>
                  </Collapse>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Search;
