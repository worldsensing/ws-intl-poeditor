import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { IntlProvider, addLocaleData } from "react-intl";
import es from "react-intl/locale-data/es";

const loadJSON = (file, callback) => {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", file, true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(JSON.parse(xobj.responseText));
    }
  };
  xobj.send(null);
};

loadJSON(`translations.json`, data => {
  addLocaleData([...es]);

  ReactDOM.render(
    <IntlProvider locale="es" messages={data["es"]}>
      <App />
    </IntlProvider>,
    document.getElementById("root")
  );
});
