import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Item,
  Container
} from "native-base";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "../components/LocationItem";
const API_KEY = "AIzaSyCMaoEDwHYWZ-eXOnTfg6SaSR8xSqrg_gM";

class SelectDestination extends React.Component {
  static navigationOptions = {
    title: "Search Destination",
    headerStyle:{
      backgroundColor: "lightskyblue"
    },
    headerTitleStyle:{
      fontSize: 15,
      color: "white",
      fontWeight: "normal",
      alignSelf: "center"
    }
    
  };
  render() {
    return (
    //   <Container>
    
    // </Container>
      <View style={styles.container}>
        <GoogleAutoComplete
          apiKey={API_KEY}
          debounce={500}
          minLength={3}
          components="country:ph"
        >
          {({
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            inputValue
          }) => (
            <React.Fragment>
              {console.log("locationResults", locationResults)}
              <View style={styles.inputWrapper}>
                <View style = {styles.search}>
                  <Icon name="ios-map" style={styles.map}/>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search..."
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
                </View>
              </View>
              {isSearching && <ActivityIndicator size="large" color="lightsteelblue" />}
              <ScrollView>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                   color="lightsteelblue"/>
                )) }
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
      </View>
    );
  }
}

export default SelectDestination;

const styles = StyleSheet.create({
  map:{
    color: "lightskyblue"
  },
  search:{
    alignItems: "center",
    flexDirection: "row"
  },
  container: {
    margin:15,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    width: Dimensions.get("window").width * 0.9
  },
  text: {
    fontSize: 30
  },
  textInput: {
    height: 40,
    width: 296,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderColor: "lightgrey",
    color: "lightsteelblue"
  },
  inputWrapper: {
    marginBottom: 15,
    flexDirection: "row"
  },
});
