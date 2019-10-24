import React, { Component } from "react";
import { StyleSheet, Text, AsyncStorage } from "react-native";
import createNavigator from "./routes";

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false
  };
  async componentDidMount() {
    const username = await AsyncStorage.getItem("@githuber:username");

    this.setState({
      userChecked: true,
      userLogged: !!username
    });
  }
  render() {
    const { userChecked, userLogged } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);
    return <Routes />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
