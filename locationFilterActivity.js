import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  TouchableNativeFeedback,
  Platform,
    BackHandler,
    TextInput
} from 'react-native';
import CheckBox from 'react-native-check-box'

import App from './App.js'
//import LoginActivity from './loginActivity'
import { Button , SearchBar} from 'react-native-elements';
import SearchActivity from './searchActivity'
import ResultActivity from './resultActivity'
import FilterActivity from './filterActivity'
import './global.js'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
const database=require('./database.json')
const states = require('./states.json')
var selectedLocations = new Set()
var selectedLocationsArray = []

export default class LocationFilterActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: '',
    checked: true,
    isLoading: true,
    showSuggestions: false
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'filterPage'})
        return true
    });

    setTimeout(
      () => { this.setState({isLoading: false})},
      500
    );

    //Alert.alert(JSON.stringify(database.colleges.length))
  }

  addLocations = (value) =>{
    if(selectedLocations.has(value)){
      selectedLocations.delete(value)
    }else{
      selectedLocations.add(value)
    }
    //Alert.alert(JSON.stringify(selectedLocations.has('Haryana')))
    global.selectedLocationsArray = Array.from(selectedLocations)
    this.setState({text: ''})
  }
  returnSuggestions = ()=>{
    
    var sugg = []
    for(let i = 0; i<states.length;i++){
        if(states[i].includes(this.state.text) ){
            sugg.push(
              <TouchableWithoutFeedback onPress={this.addLocations.bind(this, states[i])} key={i}>
                <View style={{backgroundColor: colors.statusBarDark, width: w-16, height: 50, marginTop: 0, borderRadius: 0, alignItems:'center',flexDirection: 'row' }} key={i}>
                  <Text style={{marginLeft: 16, color: 'white'}}>{states[i]}</Text>
                  <Image style={{tintColor: (selectedLocations.has(states[i]))?colors.accentBright:colors.primary, height: 20, width: 20, right: 16, position: 'absolute'}} source={(selectedLocations.has(states[i]))?require('./icons/tick.png'):require('./icons/add.png')}/>
                </View>
              </TouchableWithoutFeedback>
            )
        }
    }
    return sugg
  }
  
  
  render(){
    if(this.state.Home === 'this'){
        if(!this.state.isLoading){
          return (
            <View style={styles.container}>
              <StatusBar
                  backgroundColor={colors.statusBarDark}
                  barStyle="light-content"
                />
              <View style = {styles.statusBarIosDark}/>
              <View style={[styles.navBar, {justifyContent: 'center'}]}>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'filterPage'})}} >
                       <View style={styles.navButton}>
                        <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                       </View>           
                    </TouchableWithoutFeedback>
                    <Text style={{fontFamily: 'Montserrat-Medium', left: 56, color: colors.primary, fontSize: 18}}>Location</Text>
                </View> 

              <SearchBar
                containerStyle={{backgroundColor: colors.accent, width: w}}
                inputStyle={{backgroundColor: colors.statusBarDark}}
                placeholder="Type here to search"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <View style={{height: 2, backgroundColor: colors.accent, width: w, marginBottom: 0, position: 'absolute', top: 56}}/>

              

              {(true )?<View style={{backgroundColor: colors.statusBarDark, position: 'absolute', height:h-56-56-56+40,width: w, height:(Platform.OS == 'android')?h-56-56-56+40:h-56-56-56+40+10,width: w, top: (Platform.OS == 'android')?56+56:56+56+10, elevation: 0}}>
                <ScrollView>
                  {this.returnSuggestions()}
                </ScrollView>

              </View>:<View/>}
            
            </View>
          )}else{
            return (
            <View style={styles.container}>
              <StatusBar
                  backgroundColor={colors.statusBarDark}
                  barStyle="light-content"
                />
              <View style = {styles.statusBarIosDark}/>
              <View style={[styles.navBar, {justifyContent: 'center'}]}>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'filterPage'})}} >
                       <View style={styles.navButton}>
                        <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                       </View>           
                    </TouchableWithoutFeedback>
                    <Text style={{fontFamily: 'Montserrat-Medium', left: 56, color: colors.primary, fontSize: 18}}>Location</Text>
                </View> 

              <SearchBar
                containerStyle={{backgroundColor: colors.accent, width: w}}
                inputStyle={{backgroundColor: colors.statusBarDark}}
                placeholder="Type here to search"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <View style={{height: 2, backgroundColor: colors.accent, width: w, marginBottom: 0, position: 'absolute', top: 56}}/>

              

              {(true )?<View style={{backgroundColor: colors.statusBarDark, position: 'absolute', height:(Platform.OS == 'android')?h-56-56-56+40:h-56-56-56+40+10,width: w, top: (Platform.OS == 'android')?56+56:56+56+10, elevation: 0, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.accentBright}/>
              </View>:<View/>}
            
            </View>
          )
          }
    }else{
      switch(this.state.Home){
        case 'filterPage':
          return <FilterActivity checked={this.props.checked}/>

        
      }
    }

  }
}



