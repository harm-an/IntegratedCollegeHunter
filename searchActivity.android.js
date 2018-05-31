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
  TextInput,
  Platform,
    BackHandler
} from 'react-native';

import CheckBox from 'react-native-check-box'
import ResultActivity from './resultActivity'

import App from './App.js'
import LoginActivity from './loginActivity'
import { Button } from 'react-native-elements';
import Profile from './profile'
//import AutoComplete from 'react-native-autocomplete-select'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class SearchActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: 'Enter',
    checked:global.checked,
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'landingPage'})
        return true
    });

    GoogleSignin.currentUserAsync().then((user) => {
        console.log('USER', user);
        //Alert.alert(JSON.stringify(user))
        if(user){
          //Alert.alert(JSON.stringify(user.email))
          this.setState({loggedIn: true})
        }
        this.setState({user: user});
      }).done();
    global.selectedLocationsArray = []
     global.selectedBranchesArray = []
     global.selectedRanks = []


  }

  checkPressed=(value)=>{
    //Alert.alert(value)
    switch(value){
      case 'jeeMain':
        
        if(this.state.checked.jeeMain){
          c = {
            jeeMain: false,
            jeeAdv: this.state.checked.jeeAdv
          }
          this.setState({checked: c})
        }else{
          c = {
            jeeMain: true,
            jeeAdv: this.state.checked.jeeAdv
          }
          this.setState({checked: c})
        }
        //Alert.alert(JSON.stringify(this.state.checked.jeeMain))
        break
      case 'jeeAdv':
        
        if(this.state.checked.jeeAdv){
          c = {
            jeeMain: this.state.checked.jeeMain,
            jeeAdv: false
          }
          this.setState({checked: c})
        }else{
          c = {
            jeeMain: this.state.checked.jeeMain,
            jeeAdv: true
          }
          this.setState({checked: c})
        }
        //Alert.alert(JSON.stringify(this.state.checked.jeeAdv))
        break
    }
  }

  searchClicked=()=>{
    global.checked = this.state.checked

    global.checked = this.state.checked
    global.selectedRanks = []
    if(this.state.checked.jeeMain){
      val = {examType: 'JEE Main', rankAchieved: ''}
      global.selectedRanks.push(val)
    }
    if(this.state.checked.jeeAdv){
      val = {examType: 'JEE Advanced', rankAchieved: ''}
      global.selectedRanks.push(val)
    }
    if(this.state.checked.jeeMain || this.state.checked.jeeAdv){
      this.setState({Home:'resultPage'})
    }else{
      Alert.alert('Please select atleast on Exam Type')
    }
    global.filters = {
      state:global.selectedLocationsArray,
      branch:global.selectedBranchesArray,
      rank: global.selectedRanks
    }
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
              <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'landingPage'})}} >
                 <View style={styles.navButton}>
                  <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                 </View>           
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={(this.state.loggedIn)?()=>{this.setState({Home: 'profilePage'})}:()=>{this.setState({Home: 'loginPage'})} }>
                 <View style={styles.navButtonRight}>
                  <Image source = {require('./icons/ic_person.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                 </View>           
              </TouchableWithoutFeedback>
          </View>  
          <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
            <Text style={styles.navBarTitle}>Search</Text>
          </View>

          <ScrollView>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color:colors.input, marginLeft: 0, marginTop:16}}>Field of Education</Text>
            <View style={{height: 56, width: w-32, backgroundColor: colors.statusBar, marginTop: 4, justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 20, color:colors.input, marginLeft: 16}}>Engineering</Text>
              
            </View>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color:colors.input, marginLeft: 0, marginTop:16}}>Exam Type</Text>
           { /*<View style={{ height: 56, width: w-32, backgroundColor: colors.statusBar, marginTop: 4, justifyContent: 'center', paddingLeft:16, paddingRight:16}}>
              <TextInput
                style={{height: 56, borderColor: 'gray', borderWidth: 0, paddingLeft: 0, fontSize: 20, fontFamily: 'Montserrat-Medium', color: colors.input}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                selectionColor={ colors.accentBright}
              />
              
            </View>*/}
            <View style={{backgroundColor: colors.statusBar, marginTop: 4}}>
              <CheckBox
                  style={{height: 56, width: w-32, marginTop: 0, padding: 16, backgroundColor: colors.statusBar, justifyContent: 'center'}}
                  onClick={this.checkPressed.bind(this,'jeeMain')}
                  isChecked={this.state.checked.jeeMain}
                  leftTextStyle={{color:colors.input, fontFamily: 'Montserrat-Medium', fontSize: 20}}
                  leftText={'JEE Main'}
                  checkBoxColor={colors.accent}
              />
            <CheckBox
                  style={{height: 56, width: w-32, marginTop: 0, padding: 16, backgroundColor: colors.statusBar, justifyContent: 'center'}}
                  onClick={this.checkPressed.bind(this,'jeeAdv')}
                  isChecked={this.state.checked.jeeAdv}
                  leftTextStyle={{color:colors.input, fontFamily: 'Montserrat-Medium', fontSize: 20}}
                  leftText={'JEE Advanced'}
                  checkBoxColor={colors.accent}
              />
            </View>
          </ScrollView>

         
          <Button
              title="Go" 
              onPress = {this.searchClicked}
              containerViewStyle={{position: "absolute", bottom:0, width: w}} borderRadius={0} backgroundColor={colors.accentBright} color={colors.primary} textStyle={{fontFamily: 'Montserrat-Medium'}} underlayColor={colors.primary}/>
        </View>
      )
    }else{
      switch(this.state.Home){
        case 'landingPage':
          return <App/>

        case 'loginPage':
          return <LoginActivity/>

        case 'profilePage':
          return <Profile user = {this.state.user}/>
        case 'resultPage':
          return <ResultActivity checked={this.state.checked}/>
      }
    }

	}
}



