import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect
// } from "react-router-dom";
import { Router, navigate } from "@reach/router";
import Landing from "../pages/Landing";
import AddEvite from "../pages/AddEvite";
import 'antd/dist/antd.css';

export default (
  <React.Fragment>
    <Router>
      <Landing path="/" />
      <AddEvite path="/add-evite" />
    </Router>
  </React.Fragment>
);
