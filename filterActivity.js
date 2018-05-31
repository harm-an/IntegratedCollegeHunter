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
import LocationFilterActivity from './locationFilterActivity'
import BranchFilterActivity from './branchFilterActivity'
import RankFilterActivity from './rankFilterActivity'
import './global.js'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
const database=require('./database.json')
const states = require('./states.json')

export default class FilterActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: '',
    checked: true,
    isLoading: true,
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'resultPage'})
        return true
    });

    global.filters = {
      state:global.selectedLocationsArray,
      branch:global.selectedBranchesArray,
      rank: global.selectedRanks
    }

    //Alert.alert(JSON.stringify(global.selectedRanks))
  }

  componentDidUpdate(){
    global.filters = {
      state:global.selectedLocationsArray,
      branch:global.selectedBranchesArray,
      rank: global.selectedRanks
    }

  }

  returnSuggestions = ()=>{
    
    var sugg = []
    for(let i = 0; i<states.length;i++){
        if(states[i].includes(this.state.text) ){
            sugg.push(
              <View style={{backgroundColor: colors.input, width: w-16, height: 150, marginTop: 8, borderRadius: 6}} key={i}>
                <Text style={{marginRight: 70}}>{states[i]}</Text>
              </View>
            )
        }
    }
    return sugg
  }
  
  updateClicked = () => {

    global.filters = {
      state:global.selectedLocationsArray,
      branch:global.selectedBranchesArray,
      rank: global.selectedRanks
    }

    this.setState({Home: 'resultPage'})
  }
  
  render(){
    if(this.state.Home === 'this'){
        return (
          <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBarDark}
                barStyle="light-content"
              />
            <View style = {styles.statusBarIosDark}/>
            <View style={styles.navBar}>
                  <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'resultPage'})}} >
                     <View style={styles.navButton}>
                      <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                     </View>           
                  </TouchableWithoutFeedback>
              </View>  
            <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
                <Text style={styles.navBarTitle}>Filter</Text>
            </View>
            <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'branchFilterPage'})}}>
              <View style={{backgroundColor: colors.primary, width: w, height: 116, flexDirection: 'row'}}>
                <View style={{backgroundColor: colors.primary, height: 100, width: w-16, marginTop: 8, marginLeft: 8, elevation: 4, borderRadius: 4, shadowColor: colors.input,
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowRadius: 2,
                  shadowOpacity: 0.7, justifyContent: 'center', padding: 8}}>
                  <ImageBackground source = {require('./icons/courseFilter.png')}  style={{height: 72, width: 72, position: 'absolute', left: 14}}/>
                  <Text style={{fontFamily: 'Montserrat-Medium', color: colors.accent, fontSize: 20, left: 100}}>Course</Text>
                  <Text style={{fontFamily: 'Montserrat-Regular', color: colors.accentBright, fontSize: 14, left: 100}}>{global.selectedBranchesArray.length} Filters Applied</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'rankFilterPage'})}}>
              <View style={{backgroundColor: colors.primary, width: w, height: 116, flexDirection: 'row'}}>
                <View style={{backgroundColor: colors.primary, height: 100, width: w-16, marginTop: 8, marginLeft: 8, elevation: 4, borderRadius: 4, shadowColor: colors.input,
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowRadius: 2,
                  shadowOpacity: 0.7, justifyContent: 'center', padding: 8}}>
                  <ImageBackground source = {require('./icons/rankFilter.png')}  style={{height: 72, width: 72, position: 'absolute', left: 14}}/>
                  <Text style={{fontFamily: 'Montserrat-Medium', color: colors.accent, fontSize: 20, left: 100}}>Rank</Text>
                  <Text style={{fontFamily: 'Montserrat-Regular', color: colors.accentBright, fontSize: 14, left: 100}}>{global.selectedRanks.length} Filters Applied</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'locationFilterPage'})}}>
              <View style={{backgroundColor: colors.primary, width: w, height: 116, flexDirection: 'row'}}>
                <View style={{backgroundColor: colors.primary, height: 100, width: w-16, marginTop: 8, marginLeft: 8, elevation: 4, borderRadius: 4, shadowColor: colors.input,
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowRadius: 2,
                  shadowOpacity: 0.7, justifyContent: 'center', padding: 8}}>
                  <ImageBackground source = {require('./icons/locationFilter.png')}  style={{height: 72, width: 72, position: 'absolute', left: 14}}/>
                  <Text style={{fontFamily: 'Montserrat-Medium', color: colors.accent, fontSize: 20, left: 100}}>Location</Text>
                  <Text style={{fontFamily: 'Montserrat-Regular', color: colors.accentBright, fontSize: 14, left: 100}}>{global.selectedLocationsArray.length} Filters Applied</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            
            <Button
              title="Update" 
              onPress = {this.updateClicked}
              containerViewStyle={{position: "absolute", bottom:0, width: w}} borderRadius={0} backgroundColor={colors.accentBright} color={colors.primary} textStyle={{fontFamily: 'Montserrat-Medium'}} underlayColor={colors.primary}/>
          </View>
        )
    }else{
      switch(this.state.Home){
        case 'resultPage':
          return <ResultActivity checked={this.props.checked}/>
          break
        case 'locationFilterPage':
          return <LocationFilterActivity checked={this.props.checked}/>
          break
        case 'branchFilterPage':
          return <BranchFilterActivity checked={this.props.checked}/>
          break
        case 'rankFilterPage':
          return <RankFilterActivity checked={this.props.checked}/>
          break

        
      }
    }

  }
}



