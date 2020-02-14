import React from "react";
import { Steps } from "antd";
const { Step } = Steps;
import "antd/dist/antd.css";

export default props => (
  <Steps current={props.step}>
    <Step
      title="Create Event"
      description="Add details to your event."
    />
    <Step
      title="Add Friends"
      description="Add your friend emails so we can sent them the Evite."
    />
    <Step title="Done!" description="That's it!." />
  </Steps>
)