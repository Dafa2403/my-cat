import React, { useEffect, useState } from "react";
import { Col, Row, Card, Collapse, Button, Accordion } from "react-bootstrap";
import "./styles.css";
import axios from "../../API/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSearch } from "../../Context/context";

function Body() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const userSearch = UserSearch();
  const { dataSearch } = userSearch;

  const api_key =
    "live_MA3BQI7c6Uz03lYO6wmN4WwRk4Pa63o092vNbLRGEnfYLxq3tWHR3Q3KzVyHw0Zg";

  useEffect(() => {
    setData(dataSearch);
    axios.get(`breeds?limit=${limit}&api_key=${api_key}`).then((res) => {
      setData(res.data);
    });
  }, []);

  const moreData = () => {
    setTimeout(() => {
      setLimit(limit + 10);
      axios.get(`breeds?limit=${limit}&api_key=${api_key}`).then((res) => {
        setData(res.data);
      });
    }, 1500);
  };
  return (
    <div className="conBody">
      <InfiniteScroll
        dataLength={limit}
        next={moreData}
        hasMore={true}
        loader={<h3>Loading...</h3>}
      >
        <Row className="row-cols-4 d-flex justify-content-center">
          {data.map((item, index) => (
            <Col style={{ marginBottom: 5 }} key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={item.image?.url}
                  style={{ objectFit: "contain", width: "100%", height: 300 }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <Accordion>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>Detail</Accordion.Header>
                        <Accordion.Body>
                          <span>{item.description}</span>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
}

export default Body;
