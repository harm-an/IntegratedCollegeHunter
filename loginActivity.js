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
  Platform,
    BackHandler
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Profile from './profile'

import App from './App.js'
import { Button } from 'react-native-elements';
import SearchActivity from './searchActivity'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

//var GoogleSignin = require('react-native-google-signin').default
//var GoogleSigninButton = require('react-native-google-signin').default


export default class LoginActivity extends Component{
  
  state = {
    Home: 'this',
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{
        this.setState({Home: 'searchPage'})
        return true
    });


      GoogleSignin.configure({
         // only for iOS
      })
      .then(() => {
        // you can now call currentUserAsync()
      });
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
          // play services are available. can now configure library
          //Alert.alert('Hello')
      })
      .catch((err) => {
        console.log("Play services error", err.code, err.message);
      })

      GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER', user);
        if(user){
          //Alert.alert(JSON.stringify(user.email))
        }
        this.setState({user: user});
      }).done();
  }

  _signIn = () => {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      //Alert.alert('Hello123')
      this.setState({user: user, Home: 'profilePage'});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
      //Alert.alert(JSON.stringify(err))
    })
    .done();
  }

  signOut= ()=>{
     Alert.alert('Hello')
    GoogleSignin.signOut()
    .then(() => {
      console.log('out');
    })
    .catch((err) => {

    });
  }
  
	render(){
    if(this.state.Home == 'this'){
      return (
        <View style={styles.container}>
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
          <View style={{alignItems: 'center', justifyContent: 'center', height: h-56-56-56-56, padding: 8}}>
            <Image source={require('./icons/signIn.png')} style={{height: w/2, width: w/2}}/>
            <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 32, color: colors.accent}}>Welcome</Text>
            <Text style={{fontFamily: 'Montserrat-Light', fontSize: 14, color: colors.accent}}>Please Sign in to get most out of the app</Text>
            
          </View>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.googleButtonDark, false)} useForeground={true} onPress={this._signIn.bind(this)}>
            <View style={[styles.navBar, {backgroundColor: colors.googleButton, position:'absolute', bottom: 0, height: 50}]}>
              <View style={{position: 'absolute', height: 50, width: 50, backgroundColor: colors.googleButtonDark, alignItems: 'center', justifyContent: 'center'}}>
                <Image source = {require('./icons/google-plus.png')}  style={[styles.tabIcon, {tintColor: colors.primary}]}/>
              </View>
              <View style={{position: 'absolute', left: 50, height: 50, width: w-100, backgroundColor: colors.googleButton, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: colors.primary, fontFamily: 'Montserrat-Medium'}}>Sign in with Google</Text>
              </View>
            </View> 
          </TouchableNativeFeedback>
        </View>
      )
    }else{
      switch(this.state.Home){
        case 'searchPage':
          return (<SearchActivity />)

        case 'profilePage':
          return (<Profile user = {this.state.user}/>)
      }
    }

	}
}



