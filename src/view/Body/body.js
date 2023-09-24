import React, { useEffect, useState } from "react";
import { Col, Row, Card, Collapse, Button } from "react-bootstrap";
import "./styles.css";
import axios from "../../API/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserSearch } from "../../Context/context";

function Body() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const userSearch = UserSearch();
  const { dataSearch } = userSearch;

  const arr = [];
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
    }, 1000);
  };
  console.log(data);
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
            <Col style={{ marginBottom: 10 }} key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={item.image.url}
                  style={{ objectFit: "contain", width: "100%", height: 200 }}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    Detail
                  </Button>
                  <Card.Text>
                    <Collapse in={open}>
                      <span>{item.description}</span>
                    </Collapse>
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
