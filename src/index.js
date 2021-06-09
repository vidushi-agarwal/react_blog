import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(NavBar);

if (module.hot) {
  module.hot.accept("./components/navbar", () => {
    const NextApp = require("./components/navbar").default;
    render(NextApp);
  });
}
