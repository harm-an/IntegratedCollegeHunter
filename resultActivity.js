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
    BackHandler
} from 'react-native';
import CheckBox from 'react-native-check-box'

import App from './App.js'
//import LoginActivity from './loginActivity'
import { Button } from 'react-native-elements';
import SearchActivity from './searchActivity'
import FilterActivity from './filterActivity'
import CollegeDetailActivity from './collegeDetailActivity'
var styles = require('./Styles.js');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
const databaseFetched=require('./database.json')
var database = {}

export default class ResultActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: 'Enter',
    checked: true,
    isLoading: true,
    _id: null,
  }


 

  
  componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', ()=>{

        this.setState({Home: 'searchPage'})
        return true
    });


    //Alert.alert(JSON.stringify(global.filters))
    //Alert.alert(JSON.stringify(global.filters))

    fetch('http://192.168.43.54:8000/polls/fetchAllBasedOnType', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(global.filters)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        database = responseJson
        //Alert.alert(JSON.stringify(database.colleges.length))
        this.setState({isLoading: false})
      })
      .catch((error) => {
        Alert.alert("Please Check you Network Connection")
        //this.setState({isLoading: false})
      });
    
  }

  collegeCardPressed=(_id)=>{
    //Alert.alert(_id)
    this.setState({Home: 'collegeDetailPage', _id: _id})
  }

  returnCards = () => {
    var cards_adv = [];
    if(this.props.checked.jeeAdv){
      cards_adv.push(
        <View key = {94} style={{marginTop: 16}}>
          <Text style={{fontSize: 20, fontFamily:'Montserrat-Medium', color:colors.input}}>JEE Advanced</Text>
          <View style={{width: w-16, height: 2, backgroundColor: colors.statusBar}}/>
        </View>
      )
      if(database.colleges.length == 0){
        cards_adv.push(
          <View style={{backgroundColor: 'transparent', width: w, height: 100, alignItems: 'center', justifyContent: 'center'}} key={'1234'}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color: colors.input}}>No results match your search</Text>
          </View>
        )
      }
      for(let i = 0; i<database.colleges.length; i++){
        if(database.colleges[i].examType == 'JEE Advanced'){
          cards_adv.push(
             <TouchableWithoutFeedback key={i} onPress={this.collegeCardPressed.bind(this,database.colleges[i]._id)}> 
              <View style={styles.collegeCard} >
                <View style={styles.cardImage} >
                  <Image style={{width: 100, height: 100}}source={require('./icons/college.png')}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardCollegeName}>{database.colleges[i].name}</Text>
                  <Text style={styles.cardCollegeState}>{database.colleges[i].state}</Text>
                  <Text style={styles.cardCollegePrograms}>{database.colleges[i].examType + ' | ' + database.colleges[i].totalPrograms + ' Programs'}</Text>
                </View>
              </View>
             </TouchableWithoutFeedback> 
          )
        }
      }
    }
    var cards_main = [];
    if(this.props.checked.jeeMain){
      cards_main.push(
        <View key = {94} style={{marginTop: 16}}>
          <Text style={{fontSize: 20, fontFamily:'Montserrat-Medium', color:colors.input}}>JEE Main</Text>
          <View style={{width: w-16, height: 2, backgroundColor: colors.statusBar}}/>
        </View>
      )
      if(database.colleges.length == 0){
        cards_main.push(
          <View style={{backgroundColor: 'transparent', width: w, height: 100, alignItems: 'center', justifyContent: 'center'}} key={'12345'}>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color: colors.input}}>No results match your search</Text>
          </View>
        )
      }
      for(let i = 0; i<database.colleges.length; i++){
        if(database.colleges[i].examType == 'JEE Main'){
          cards_main.push(
            <TouchableWithoutFeedback key={i} onPress={this.collegeCardPressed.bind(this,database.colleges[i]._id)}> 
              <View style={styles.collegeCard} >
                <View style={styles.cardImage} >
                  <Image style={{width: 100, height: 100}}source={require('./icons/college.png')}/>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardCollegeName}>{database.colleges[i].name}</Text>
                  <Text style={styles.cardCollegeState}>{database.colleges[i].state}</Text>
                  <Text style={styles.cardCollegePrograms}>{database.colleges[i].examType + ' | ' + database.colleges[i].totalPrograms + ' Programs'}</Text>
                </View>
              </View>
             </TouchableWithoutFeedback> 
          )
        }
      }
    }
    var cards=[];
    cards.push(cards_main);
    cards.push(cards_adv);
    return cards;
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
            <View style={styles.navBar}>
                  <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'searchPage'})}} >
                     <View style={styles.navButton}>
                      <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                     </View>           
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>{this.setState({Home:'filterPage'})} }>
                     <View style={styles.navButtonRight}>
                      <Image source = {require('./icons/filter.png')}  style={[styles.tabIcon, {tintColor: '#ffffff', height: 16, width: 16}]}/>
                     </View>           
                  </TouchableWithoutFeedback>
              </View>  
            <ScrollView contentContainerStyle={{alignItems: 'center', paddingBottom: 8}}>
              
              <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
                <Text style={styles.navBarTitle}>Results</Text>
              </View>
              
              {this.returnCards()}

            </ScrollView>

          </View>
        )
      }else{
        return(
            <View style={styles.container}>
            <StatusBar
                backgroundColor={colors.statusBarDark}
                barStyle="light-content"
              />
            <View style = {styles.statusBarIosDark}/>
            <View style={styles.navBar}>
                  <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'searchPage'})}} >
                     <View style={styles.navButton}>
                      <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                     </View>           
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>{this.setState({Home:'filterPage'})} }>
                     <View style={styles.navButtonRight}>
                      <Image source = {require('./icons/filter.png')}  style={[styles.tabIcon, {tintColor: '#ffffff', height: 16, width: 16}]}/>
                     </View>           
                  </TouchableWithoutFeedback>
              </View>  
              
              <View style={{backgroundColor: colors.accent, height: 72, width: w, elevation: 0, justifyContent: 'center'}}>
                <Text style={styles.navBarTitle}>Results</Text>
              </View>
              
              <View style={{backgroundColor: 'transparent', height: h-56-72, width: w, justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.accentBright}/>
              </View>

           

          </View>
        )
      }
    }else{
      switch(this.state.Home){
        case 'searchPage':
          return <SearchActivity/>
        case 'filterPage':
          return <FilterActivity checked={this.props.checked}/>
        case 'collegeDetailPage':
          return <CollegeDetailActivity _id = {this.state._id} checked={this.props.checked} from={'resultPage'}/>
        
      }
    }

  }
}



