import React, { useEffect, useState } from "react";
import { Col, Row, Card, Accordion } from "react-bootstrap";
import "./styles.css";
import axios from "../../API/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSearch } from "../../Context/context";

function Search() {
  const [open, setOpen] = useState(false);
  const userSearch = UserSearch();
  const { dataSearch } = userSearch;
  const [visible, setVisible] = useState("none");

  useEffect(() => {
    if (dataSearch.length === 0) {
      setVisible("visible");
    } else {
      setVisible("hidden");
    }
  }, []);

  return (
    <div className="conBody">
      <Row className="row-cols-4 d-flex justify-content-center">
        <span style={{ visibility: `${visible}`, position: "fixed" }}>
          item tidak ditemukan, search dengan ID
        </span>

        {dataSearch.map((item, index) => (
          <Col style={{ marginBottom: 10 }} key={index}>
            <Card>
              <Card.Img
                variant="top"
                src={item?.url}
                style={{ objectFit: "contain", width: "100%", height: 300 }}
              />
              <Card.Body>
                <Card.Title>{item.breeds[index]?.name}</Card.Title>

                <Card.Text>
                  <Accordion>
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>Detail</Accordion.Header>
                      <Accordion.Body>
                        <span>{item.breeds[index]?.description}</span>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
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
