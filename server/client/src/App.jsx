import React from 'react';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const StyledApp = styled.div`
  height: 100%;
  background-color: aquamarine;
  position: absolute;
  width: 100%;

  .contents {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%
  }

  .header {
    flex: 0;
  }

  .body {
    flex: 1;
  }

  .footer {
    flex: 0
  }

  text-align: center;
`

export default () => 
  <Router>
    <StyledApp>
      <div className="contents">
        <Header className="header" />
        <div className="body">
          <Switch>
            <Route exact path="/">
              <p>Placeholder</p>
            </Route>
            <Route>
              <p>404</p>
            </Route>
          </Switch>
        </div>
        <Footer className="footer" />
      </div>
    </StyledApp>
  </Router>
