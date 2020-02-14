import React from "react";
import axios from "axios";
import { Redirect } from "@reach/router";
import {
  Icon,
  Input,
  Button,
  Checkbox,
  Avatar,
  Popover,
  Tabs,
  Spin,
  Row
} from "antd";

export default class AddEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: "",
      event_created: false,
      event_id: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      event_name: e.target.value
    });
  }

  handleSubmit(e) {
    let _this = this
    axios
      .post("/api/events", {
        event_name: this.state.event_name
      })
      .then(function (response) {
        console.log(response);
        const data = response.data
        console.log(data);
        window.flash("Event Created!")
        _this.setState({
          event_created: true,
          event_id: data.event.id
        });
      })
      .catch(function (error) {
        console.log(error)
        window.flash(`error! ${error.error}`);
      });
  }

  render() {
    if (this.state.event_created) {
      return <Redirect to={`dashboard/event-add-friend/${this.state.event_id}`}/>;
    } else {
      return (
        <div>
          <Row>
            <Input
              addonBefore="Name"
              size="large"
              placeholder="Name of the Event"
              onChange={this.handleChange}
              value={this.state.event_name}
            />
          </Row>
          <Row type="flex" justify="center">
            <Button
              shape="round"
              type="primary"
              size="large"
              style={{ marginTop: "20px" }}
              onClick={this.handleSubmit}
            >
              Next
              <Icon type="caret-right" />
            </Button>
          </Row>
        </div>
      );
    }
  }
}
