import React from "react";
import Routes from "../routes/Index";
import "antd/dist/antd.css";
import { notification } from "antd";


const openNotification = (message, type) => {
  notification[type]({
    message: type,
    description: message,
  });
};

const App = () => {
  return <div className="App">{Routes}</div>;
};

window.flash = function(message, type = "success") {
  openNotification(message, type);
};

export default App;
