import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Loader from "./Loader";
import axios from "axios";
import { useHistory } from "react-router";
import styled from "styled-components"

const StyledListGroup = styled(ListGroup)`
    overflow: auto;
    margin-top: 5em;
    margin-left: 25%;
    margin-right: 25%;
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

  return err ? (
    <>Could not load videos</>
  ) : names ? (
    <StyledListGroup horizontal>
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
    </StyledListGroup>
  ) : (
    <Loader />
  );
};
