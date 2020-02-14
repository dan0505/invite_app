import React from "react";
import { Router, navigate } from "@reach/router";
import "antd/dist/antd.css";
import "./notification.css"

import { notification } from "antd";

// pages
import Landing from "pages/Landing";
import Dashboard from "pages/Dashboard"
import AddEvite from "pages/AddEvite";
import AddEviteFriend from "pages/AddEventFriend"

const openNotification = (message, type) => {
  notification[type]({
    message: type,
    description: message,
  });
};

window.flash = function (message, type = "success") {
  openNotification(message, type);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // let auth = JSON.parse(sessionStorage.getItem("auth"));
    this.state = {
      user: null
    };
    this.userHandler = this.userHandler.bind(this);
  }

  userHandler(user) {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Landing path="/" />
          <Dashboard path="dashboard" userHandler={this.userUpdated} user={this.state.user}>
            <AddEvite path="add-evite" />
            <AddEviteFriend path="event-add-friend/:event_id" />
          </Dashboard>

        </Router>
      </React.Fragment>
    )
  }
};


