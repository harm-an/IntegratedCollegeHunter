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
    ToastAndroid
} from 'react-native';
import CheckBox from 'react-native-check-box'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import App from './App.js'
//import LoginActivity from './loginActivity'
import { Button } from 'react-native-elements';
import SearchActivity from './searchActivity'
import FilterActivity from './filterActivity'
import ResultActivity from './resultActivity'
import SavedCollegesActivity from './savedCollegesActivity'
import Communications from 'react-native-communications';
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
const database=require('./database.json')
var selectedCollege



export default class CollegeDetailActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: 'Enter',
    checked: true,
    isLoading: true,
    isSaved: false,
  }
  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'resultPage'})
        return true
    });

    // setTimeout(
    //   () => { this.setState({isLoading: false})},
    //   500
    // );
    // Alert.alert(JSON.stringify(global.filters))

    //Alert.alert(JSON.stringify(database.colleges.length))
    

    //Alert.alert(JSON.stringify(Number(global.jeeMainRank)))
  }

  componentWillMount(){
    for(let i = 0; i<database.colleges.length; i++){
        if(database.colleges[i]._id == this.props._id){
          selectedCollege = database.colleges[i]
          selectedCollegeBranches = database.colleges[i].branches
          selectedCollegeBranches.sort()
        }
    }
  }
  
  returnParticularBranch = (name)=>{
    //Alert.alert(name)
    var quotas = []
    for(let i = 0; i<selectedCollege.branchWiseRank.length; i++){
      if(selectedCollege.branchWiseRank[i].name == name){
         for(let j = 0; j<selectedCollege.branchWiseRank[i].quota.length; j++){
            quotas.push(
              <Text key={j} style={{color: (this.checkEligibility(name))?colors.accent:colors.accentBright, fontFamily: 'Montserrat-Medium', fontSize: 12}}>{selectedCollege.branchWiseRank[i].quota[j].name} - Opening Rank: {selectedCollege.branchWiseRank[i].quota[j]['opening rank']} | Closing Rank: {selectedCollege.branchWiseRank[i].quota[j]['closing rank']}</Text>
            )
         }
      }
    }
    return quotas

  }

  checkEligibility = (name) => {
    var bool = false
    for(let i = 0; i<selectedCollege.branchWiseRank.length; i++){
      if(selectedCollege.branchWiseRank[i].name == name){
         for(let j = 0; j<selectedCollege.branchWiseRank[i].quota.length; j++){
            if(selectedCollege.examType == 'JEE Main'){
              if(global.jeeMainRank.length!=0){
                if(Number(global.jeeMainRank)<=Number(selectedCollege.branchWiseRank[i].quota[j]['closing rank'])){
                  bool = true
                }
              }
            }else{
              if(global.jeeAdvRank.length!=0){
                if(Number(global.jeeAdvRank)<=Number(selectedCollege.branchWiseRank[i].quota[j]['closing rank'])){
                  bool = true
                }
              }
            }
         }
      }
    }
    return bool
  }
  returnBranches = () => {
    var branches = []
    for(let i = 0; i<selectedCollegeBranches.length; i++){
        branches.push(
          <View style={{backgroundColor: (this.checkEligibility(selectedCollegeBranches[i]))?colors.accentBright:colors.primary, elevation: 2, marginTop: 8, width: w-32, height: 100, borderRadius: 8, padding: 8,shadowColor: colors.input,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowRadius: 2,
            shadowOpacity: 0.7, justifyContent: 'center',
            borderColor: (this.checkEligibility(selectedCollegeBranches[i]))?colors.accentBright:colors.accent, borderWidth: 0}} key={i}>
            <Text style={{fontFamily: 'Montserrat-Medium', color: (this.checkEligibility(selectedCollegeBranches[i]))?colors.primary:colors.input}}>{selectedCollegeBranches[i]}</Text>
            {this.returnParticularBranch(selectedCollegeBranches[i])}
          </View>


        )
    }
    return branches
  }

  saveCollege(){
    ToastAndroid.show('Saving..', ToastAndroid.SHORT);
    var user = GoogleSignin.currentUser();

    if(Object.keys(user).length == 0){
      Alert.alert('Please Sign in first.')
      return
    }
    userJSON = {email: user.email, id: selectedCollege._id}

    fetch('http://192.168.43.54:8000/polls/userProfileUpdate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userJSON)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        databaseFetched = responseJson
        ToastAndroid.show('Saved Successfully.', ToastAndroid.SHORT);
        this.setState({isSaved: true})
        
      })
      .catch((error) => {
        Alert.alert("Please Check you Network Connection")
        //this.setState({isLoading: false})
      });
  }
  
  render(){
    if(this.state.Home === 'this'){
        if(this.state.isSaved || this.props.from == 'savedCollegePage'){
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
                    <TouchableWithoutFeedback onPress={()=>this.saveCollege() }>
                       <View style={styles.navButtonRight}>
                        <Image source = {require('./icons/tick.png')}  style={[styles.tabIcon, {tintColor: (this.props.from == 'savedCollegePage')?colors.accent:colors.accentBright}]}/>
                       </View>           
                    </TouchableWithoutFeedback>
                </View>  
                 <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Montserrat-Medium', color: colors.primary, marginLeft: 16, marginRight: 16, fontSize: 16}}>{selectedCollege.name}</Text>
                </View>
              <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 8, width: w}}>
                <View style={{marginTop: 16, backgroundColor: 'transparent', width: w-32}}>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0}}>Address</Text>
                  <View style={{width: w-32, height: 2, backgroundColor: colors.statusBar}}/>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0, marginRight: 0}}>{selectedCollege.address}</Text>
                  <TouchableWithoutFeedback onPress={()=>Communications.email([selectedCollege.email], null, null, null, null)}>
                    <View>
                      <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.accentBright, marginLeft: 0, marginRight: 0}}>Email: {selectedCollege.email}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>Communications.web(selectedCollege.link)}>
                    <View>
                      <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.accent, marginLeft: 0, marginRight: 0}}>More Information</Text>
                    </View>
                 </TouchableWithoutFeedback>
                </View>
                <View style={{marginTop: 24, width: w-32}}>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0}}>Courses Available {'('+selectedCollegeBranches.length+')'}</Text>
                  <View style={{width: w-32, height: 2, backgroundColor: colors.statusBar}}/>
                </View>
                {this.returnBranches()}
              </ScrollView>

            </View>
          )
        }else{
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
                    <TouchableWithoutFeedback onPress={()=>this.saveCollege() }>
                       <View style={styles.navButtonRight}>
                        <Image source = {require('./icons/ic_save.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                       </View>           
                    </TouchableWithoutFeedback>
                </View>  
                 <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Montserrat-Medium', color: colors.primary, marginLeft: 16, marginRight: 16, fontSize: 16}}>{selectedCollege.name}</Text>
                </View>
              <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 8, width: w}}>
                <View style={{marginTop: 16, backgroundColor: 'transparent', width: w-32}}>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0}}>Address</Text>
                  <View style={{width: w-32, height: 2, backgroundColor: colors.statusBar}}/>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0, marginRight: 0}}>{selectedCollege.address}</Text>
                  <TouchableWithoutFeedback onPress={()=>Communications.email([selectedCollege.email], null, null, null, null)}>
                    <View>
                      <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.accentBright, marginLeft: 0, marginRight: 0}}>Email: {selectedCollege.email}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>Communications.web(selectedCollege.link)}>
                    <View>
                      <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.accent, marginLeft: 0, marginRight: 0}}>More Information</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{marginTop: 24, width: w-32}}>
                  <Text style={{fontSize: 16, fontFamily:'Montserrat-Medium', color:colors.input, marginLeft: 0}}>Courses Available {'('+selectedCollegeBranches.length+')'}</Text>
                  <View style={{width: w-32, height: 2, backgroundColor: colors.statusBar}}/>
                </View>
                {this.returnBranches()}
              </ScrollView>

            </View>
          )
        }
    }else{
      switch(this.state.Home){
        case 'resultPage':
          if(this.props.from == 'resultPage'){
            return <ResultActivity checked = {this.props.checked}/>
          }else{
            return <SavedCollegesActivity user={this.props.user}/>
          }
        case 'filterPage':
          return <FilterActivity checked={this.props.checked}/>
        
      }
    }

  }
}



