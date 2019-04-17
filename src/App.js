import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./App.css";

class App extends Component {
  render() {
    return <FormattedMessage id="hello_world" defaultMessage="Hello world!" />;
  }
}

export default App;
