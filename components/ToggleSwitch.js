import React, {Component} from 'react';
import{View, Switch, StyleSheet} from 'react-native';

//copying from here https://www.tutorialspoint.com/react_native/react_native_switch.htm
export default ToggleSwitch = (props) =>{
    return(
        <View style = {styles.container}>
            <Switch onValueChange = {props.toggleSwitch1}
            value = {props.switch1Value}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginTop: 22,
        //marginRight:100,
        //borderBottomWidth:1,
        //borderBottomColor:"lightsteelblue"
    }
})

