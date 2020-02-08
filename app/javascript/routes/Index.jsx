import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Landing from "../pages/Landing";
import AddEvite from "../pages/AddEvite";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/add-evite" exact component={AddEvite} />
      {/* <PrivateRoute path='/add-evite' component={AddEvite} /> */}
    </Switch>
  </Router>
);
