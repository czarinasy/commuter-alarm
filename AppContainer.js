import { StyleSheet } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./screens/HomeScreen";
import SelectDestination from "./screens/SelectDestination";
import Sidebar from "./screens/Sidebar";
import SetWarnDistance from "./screens/SetWarnDistance";
import MyFavorites from "./screens/MyFavorites";
import Settings from "./screens/Settings";
import Tracker from "./screens/Tracker";

// This is a directory of all the screens
const NavigationStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  SelectDestination: { screen: SelectDestination },
  SetWarnDistance: { screen: SetWarnDistance },
  Sidebar: { screen: Sidebar },
  MyFavorites: { screen: MyFavorites },
  Settings: { screen: Settings },
  Tracker: { screen: Tracker }
});

// This is the container for the app
// You can think of it as the "main" work area
// All the screens get called from here
// Then this file gets passed on to App.js
const AppContainer = createAppContainer(NavigationStack);

//Always export the name of the file
export default AppContainer;

// This is essentially CSS in JSON format
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
