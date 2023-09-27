import React, { useEffect, useState } from "react";
import { Col, Row, Card, Collapse, Button } from "react-bootstrap";
import "./styles.css";
import axios from "../../API/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSearch } from "../../Context/context";

function Search() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [itm, setItem] = useState([]);
  const userSearch = UserSearch();
  const { dataSearch } = userSearch;
  const [visible, setVisible] = useState("none");

  useEffect(() => {
    setData(dataSearch);
    for (let i = 0; i < dataSearch.length; i++) {
      const element = dataSearch[i];
      setItem(element.breeds);
    }
    if (dataSearch.length === 0) {
      setVisible("visible");
    } else {
      setVisible("hidden");
    }
  }, []);

  console.log(visible);

  return (
    <div className="conBody">
      <Row className="row-cols-4 d-flex justify-content-center">
        <span style={{ visibility: `${visible}`, position: "fixed" }}>
          item tidak ditemukan, search dengan ID
        </span>

        {dataSearch.map((item, index) => (
          <Col style={{ marginBottom: 10 }} key={index}>
            <Card>
              <Card.Img variant="top" src={item?.url} />
              <Card.Body>
                <Card.Title>{item.breeds[index]?.name}</Card.Title>
                <Button
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  Detail
                </Button>
                <Card.Text>
                  <Collapse in={open}>
                    <span>{item.breeds[index]?.description}</span>
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
