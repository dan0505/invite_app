import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">EVITE</h1>
        <p className="lead">
          A place to share your favorite things with your favorite people!
        </p>
        <hr className="my-4" />
        <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button"
        >
          Add Evite
        </Link>
        <Link
          to="/recipes"
          className="ml-3"
          role="button"
        >
          Find Your Evites
        </Link>
      </div>
    </div>
  </div>
);