import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StatusBar
} from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container
} from "native-base";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import LocationItem from "../components/LocationItem";
const API_KEY = "AIzaSyCMaoEDwHYWZ-eXOnTfg6SaSR8xSqrg_gM";

class SelectDestination extends React.Component {
  static navigationOptions = {
    drawerLabel: ()=>null
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedDestination: null //location object from the selected child prop gets passed here
    };
  };

  //handles the setting of state from child(ListItem) to parent(this file)
  setDestinationFromChild = dataFromChild => {
    this.setState({ selectedDestination: dataFromChild });

    //for testing
    console.log(
      "\n\n-------------------THE CHOSEN LOCATION:-------------------"
    );
    console.log(
      this.state.selectedDestination.locationObject.address_components[0]
        .long_name
    );
  };

  printSelectedDestination() {
    if (this.state.selectedDestination == null) {
      return "None selected";
    } else {
      return this.state.selectedDestination.locationObject.address_components[0]
        .long_name;
    }
  }

  render() {
    return (
      <Container>
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={ () => this.props.navigation.navigate("HomeScreen") }>
          <Icon name="ios-arrow-round-back"/>
          </Button>
        </Left>

        <Body style={{ flex: 1 }}>
          <Text style={styles.text}>Destination</Text>
        </Body>

        <Right style={{ flex: 1 }}>
        </Right>
      </Header>
      <View style={styles.container}>
        <Text style={styles.status}>Selected Destination: {this.printSelectedDestination()}</Text>

        {/*GOOGLE PLACES API*/}
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

              {/*prints out all location options*/}
              <View style={styles.inputWrapper}>
                {/*search box*/}
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
              <Button
                  title="Select"
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.navigate("Tracker", {
                      destinationName: this.state.selectedDestination
                        .locationObject.address_components[0].long_name
                    });
                  }} 
                >
                  <Text style={styles.txt}>Confirm</Text>
                  </Button>
              {isSearching && <ActivityIndicator size="large" color="lightsteelblue" style={{marginTop:10}}  />}

              <ScrollView>
                {locationResults.map(el => (
                  //each location item
                  <LocationItem
                    //API props
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                    //custom props. calls the function on this file
                    setDestinationFromChild={this.setDestinationFromChild}
                  />
                ))}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
      </View>
      </Container>
    );
  }
}

export default SelectDestination;

const styles = StyleSheet.create({
  button:{
    marginLeft: 5,
    alignSelf: "center",
    backgroundColor: "lightskyblue",
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    height: 35
  },
  txt:{
    color: "white",
    fontSize: 15
  },
  status:{
    marginBottom:10,
    color: "lightsteelblue"
  },
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
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    alignSelf:"center",
    color: "white",
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: "bold"
  },
    header: {
      paddingRight: 15,
      paddingLeft: 15,
      height: 70,
      //marginTop: StatusBar.currentHeight,
      backgroundColor: "lightskyblue",
      paddingTop: 14
  }
});
