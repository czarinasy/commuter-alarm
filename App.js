import React from "react";
import AppContainer from "./AppContainer";

// This is the base of the entire program
// This calls the container that has all the screens connected to it
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
