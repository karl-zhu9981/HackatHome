import React from 'react';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

const StyledRouter = styled(Router)`
  padding: 0.5em;
`

export default () => 
  <StyledRouter>
    <Header />
    <Switch>
      <Route exact path="/">
        <p>Placeholder</p>
      </Route>
      <Route>
        <p>404</p>
      </Route>
    </Switch>
    <Footer />
  </StyledRouter>
