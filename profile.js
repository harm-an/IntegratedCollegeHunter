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
  TouchableNativeFeedback,
  ImageBackground,
  Platform,
    BackHandler
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import App from './App.js'
import { Button } from 'react-native-elements';
import SearchActivity from './searchActivity'
import LoginActivity from './loginActivity'
import SavedCollegesActivity from './savedCollegesActivity'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

//var GoogleSignin = require('react-native-google-signin').default
//var GoogleSigninButton = require('react-native-google-signin').default

const user = GoogleSignin.currentUser()
export default class Profile extends Component{
  
  state = {
    Home: 'this',
    user: null
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'searchPage'})
        return true
    });

      //Alert.alert(JSON.stringify(this.props.user))
    
  }

  

  signOut = () => {
     //Alert.alert('Hello')
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
      this.setState({Home: 'loginPage'})
    })
    .catch((err) => {

    });
  }
  
	render(){
    if(this.state.Home == 'this'){
      return (
        <View style={[styles.container, {alignItems: 'flex-start'}]}>
          <StatusBar
              backgroundColor={colors.statusBar}
              barStyle="dark-content"
            />
          
          <View style = {styles.statusBarIosDark}/>
          <View style={[styles.navBar, {backgroundColor: colors.primary}]}>
              <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'searchPage'})}} >
                 <View style={styles.navButton}>
                  <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: colors.accent}]}/>
                 </View>           
              </TouchableWithoutFeedback>
              
              
          </View>  
         <ImageBackground source={{uri: this.props.user.photo}} style={{height: w/4, width: w/4, borderRadius: w, overflow: 'hidden', margin: 16, backgroundColor: 'black'}}/>
         <View style={{backgroundColor: colors.primary, width: w-w/4-16, height: w/4, position: 'absolute', top: 56+16, left: 16+w/4, justifyContent: 'center', padding: 16}}>
          <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 20, color: colors.accent}}>{this.props.user.name}</Text>
          <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: colors.accent}}>{this.props.user.email}</Text>
         </View>
         <View style={{backgroundColor: colors.statusBar, height: 2, width:w}}/>
         <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'savedCollegePage'})}}>
           <View style={{backgroundColor: 'transparent', width: w, height: 72, flexDirection: 'row', alignItems: 'center'}}>
                    <Image source = {require('./icons/ic_save.png')}  style={[styles.tabIcon, {tintColor: colors.accent, marginLeft: 16}]}/>
                    <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 20, marginLeft: 16, color: colors.accent}}>Saved Colleges</Text>
                    <Image source = {require('./icons/arrow.png')}  style={[styles.tabIcon, {tintColor: colors.accent, marginLeft: 16, right: 8, position: 'absolute'}]}/>
           </View>
          </TouchableWithoutFeedback>
         <View style={{backgroundColor: colors.statusBar, height: 2, width:w}}/>
         <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.googleButtonDark, false)} useForeground={true} onPress={this.signOut.bind(this)}>
            <View style={[styles.navBar, {backgroundColor: colors.googleButton, position:'absolute', bottom: 0, height: 50}]}>
              <View style={{position: 'absolute', height: 50, width: 50, backgroundColor: colors.googleButtonDark, alignItems: 'center', justifyContent: 'center'}}>
                <Image source = {require('./icons/google-plus.png')}  style={[styles.tabIcon, {tintColor: colors.primary}]}/>
              </View>
              <View style={{position: 'absolute', left: 50, height: 50, width: w-100, backgroundColor: colors.googleButton, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: colors.primary, fontFamily: 'Montserrat-Medium'}}>Logout</Text>
              </View>
            </View> 
          </TouchableNativeFeedback>
        </View>
      )
    }else{
        switch(this.state.Home){
          case 'searchPage': 
            return (<SearchActivity />)
          case 'loginPage':
            return (<LoginActivity />)
          case 'savedCollegePage':
            return <SavedCollegesActivity user={this.props.user}/>
        }
    }

	}
}



