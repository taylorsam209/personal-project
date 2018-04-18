import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./registerServiceWorker";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import store from "./store.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const turqoiseGreen = "#e75f51",
  jet = "#264653",
  spanishViridian = "#264653";

const theme1 = getMuiTheme({
  fontFamily: '"Tienne", serif',
  palette: {
    primary1Color: turqoiseGreen,
    accent1Color: jet
  },
  appBar: {
    color: spanishViridian
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={theme1}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
unregister();
