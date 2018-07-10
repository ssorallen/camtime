/* @flow */

import './App.css';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import Capture from './Capture';
import React from 'react';
import Review from './Review';

export default class App extends React.Component<{}> {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Navbar className="bg-primary" dark>
            <Nav className="text-center">
              <NavItem>
                <Link className="nav-link text-white" to="/">
                  Capture
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link text-white" to="/review">
                  Review
                </Link>
              </NavItem>
            </Nav>
          </Navbar>
          <Route component={Capture} exact path="/" />
          <Route component={Review} path="/review" />
        </React.Fragment>
      </Router>
    );
  }
}
