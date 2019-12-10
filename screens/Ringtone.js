import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Container
} from "native-base";
  import ToggleSwitch from "../components/ToggleSwitch";

class Ringtone extends React.Component {
  constructor(){
    super();
    this.state = {
      switch1Value: false,
    }
  }
  toggleSwitch1 = (value) => {
    this.setState({switch1Value: value})
    console.log('Switch 1 is: ' + value)
  }
  static navigationOptions = {
    drawerLabel: ()=>null
  };
  render() {
    return (
      <Container>
      <Header style={styles.header}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={ () => this.props.navigation.navigate("Settings")}>
          <Icon name="ios-arrow-round-back"/>
          </Button>
        </Left>
  
        <Body style={{ flex: 1 }}>
          <Text style={styles.text}>Ringtone</Text>
        </Body>
  
        <Right style={{ flex: 1 }}>
        </Right>
      </Header>
      <View style={styles.container}>
      {/* <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed Vibration button");
          }}
        >
          <Text style={styles.buttontxt}>Vibration</Text>
        </Button> */}
       <View style={{flexDirection: 'row', width: Dimensions.get("window").width * 0.9,
         alignContent: "center", borderBottomColor:"lightsteelblue", borderBottomWidth: 1,
         height: 70}}>
         <Text style={styles.word}>Vibration</Text>
      <ToggleSwitch toggleSwitch1 = {this.toggleSwitch1}
      switch1Value = {this.state.switch1Value} />
     </View>
      <Button transparent
          style={styles.button}
          onPress={() => {
            console.log("pressed Current button")
          }}
        >
          <Text style={styles.buttontxt}>Current</Text>
        </Button>
      </View>
      </Container>
    );
  }
}

export default Ringtone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center"
  },
  button: {
    // position: "absolute",
    // zIndex: 10,
    width: Dimensions.get("window").width * 0.9,
    height:70,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor:"lightsteelblue",
    paddingLeft: 9
  },
  buttontxt: {
    color: "lightsteelblue",
    fontSize: 16
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
  },
  word: {
    fontSize: 16,
    marginTop: 23,
    flex: 1,
    marginLeft: 10,
    //textAlign: "center",
    // marginLeft:29,
    color: "lightsteelblue",
   // width: Dimensions.get("window").width * 0.9,
  },
  line: {
    fontSize: 16,
    lineHeight: 0,
    textAlign: "right",
    color: "lightsteelblue",
  }
});
