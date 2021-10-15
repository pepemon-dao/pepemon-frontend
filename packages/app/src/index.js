import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    ReactDOM.render(<App />, document.getElementById("root"));
  }
}
