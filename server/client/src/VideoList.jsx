import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Loader from "./Loader";
import axios from "axios";
import { useHistory } from "react-router";
import styled from "styled-components";

const StyledVideoList = styled.div`
  overflow: auto;
  margin-top: 5em;
  margin-left: 25%;
  margin-right: 25%;

  .title {
    text-align: left;
  }
`;

const handleClick = (e, history) => {
  history.push("/doc/" + e.target.value);
};

export default () => {
  const [names, setNames] = useState(null);
  const [err, setErr] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNames((await axios.get("/videos")).data);
      } catch (ex) {
        setErr(true);
      }
    };
    fetchData();
  }, [err]);

  return (
    <StyledVideoList>
      <h4 className="title">Uploaded Videos:</h4>
      {err ? (
        <>Could not load videos</>
      ) : names ? (
        <ListGroup horizontal>
          {names.map((name) => (
            <ListGroup.Item
              key={name}
              action
              value={name}
              onClick={(evt) => handleClick(evt, history)}
            >
              {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Loader />
      )}{" "}
    </StyledVideoList>
  );
};
