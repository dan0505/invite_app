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
import AddEviteFriend from "../pages/AddEventFriend"

export default (
  <React.Fragment>
    <Router>
      <Landing path="/" />
      <AddEvite path="/add-evite" />
      <AddEviteFriend path="event-add-friend/:event_id" />
    </Router>
  </React.Fragment>
);
