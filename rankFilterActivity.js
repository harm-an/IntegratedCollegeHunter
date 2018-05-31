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

export default class RankFilterActivity extends Component{
  
  state = {
    Home: 'this',
    loggedIn: false,
    text: '',
    isLoading: true,
    showSuggestions: false,
    checked: global.checked,
    mainRank:'',
    advRank: '',
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

  doneClicked = () =>{
   // Alert.alert('hello')
    global.checked = this.state.checked
    global.selectedRanks = []
    if(this.state.checked.jeeMain){
      val = {examType: 'JEE Main', rankAchieved: this.state.mainRank}
      global.selectedRanks.push(val)
    }
    if(this.state.checked.jeeAdv){
      //Alert.alert('hello')
      val = {examType: 'JEE Advanced', rankAchieved: this.state.advRank}
      //Alert.alert(this.state.advRank)
      global.selectedRanks.push(val)
    }
    //Alert.alert(JSON.stringify(global.selectedRanks))
    global.jeeMainRank = this.state.mainRank
    global.jeeAdvRank = this.state.advRank
    this.setState({Home: 'filterPage'})
  }

  jeeMainRank = (value)=>{
    //global.jeeMainRank = value
    this.setState({mainRank: value})
    

  }

  jeeAdvRank = (value)=>{
    //global.jeeAdvRank = value
    this.setState({advRank: value})
    
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
              <View style={[styles.navBar, {justifyContent: 'center'}]}>
                    <TouchableWithoutFeedback onPress={()=>{this.setState({Home: 'filterPage'})}} >
                       <View style={styles.navButton}>
                        <Image source = {require('./icons/ic_arrow_back.png')}  style={[styles.tabIcon, {tintColor: '#ffffff'}]}/>
                       </View>           
                    </TouchableWithoutFeedback>
                    <Text style={{fontFamily: 'Montserrat-Medium', left: 56, color: colors.primary, fontSize: 18}}>Rank</Text>
                </View> 

              <ScrollView>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color:colors.input, marginLeft: 0, marginTop:16}}>JEE Main Rank (optional)</Text>
            <View style={{height: 56, width: w-32, backgroundColor: colors.statusBar, marginTop: 4, justifyContent: 'center'}}>
              <TextInput
                style={{height: 56, paddingLeft: 16, fontFamily: 'Montserrat-Medium', color: colors.input, fontSize: 20}}
                placeholder="Type here.."
                onChangeText={(text)=>this.jeeMainRank(text)}
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
              />
              
            </View>
            <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 14, color:colors.input, marginLeft: 0, marginTop:16}}>JEE Advanced Rank (optional)</Text>
            <View style={{height: 56, width: w-32, backgroundColor: colors.statusBar, marginTop: 4, justifyContent: 'center'}}>
              <TextInput
                style={{height: 56, paddingLeft: 16, fontFamily: 'Montserrat-Medium', color: colors.input, fontSize: 20}}
                placeholder="Type here.."
                onChangeText={(text)=>this.jeeAdvRank(text)}
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
              />
              
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
              title="Done" 
              onPress = {this.doneClicked}
              containerViewStyle={{position: "absolute", bottom:0, width: w}} borderRadius={0} backgroundColor={colors.accentBright} color={colors.primary} textStyle={{fontFamily: 'Montserrat-Medium'}} underlayColor={colors.primary}/>
            
            </View>
          )
    }else{
      switch(this.state.Home){
        case 'filterPage':
          return <FilterActivity checked={this.state.checked}/>

        
      }
    }

  }
}



