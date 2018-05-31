/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { Button } from 'react-native-elements';
import SearchActivity from './searchActivity'

//var Button = require('react-native-material-button');
var styles = require('./Styles.js');
var colors = require('./Colors.js');

const h = Dimensions.get('window').height
const w = Dimensions.get('window').width
const separator_height = (h-48-w-49-24)/2

const width = Dimensions.get('window').width;


export default class App extends Component<{}> {
  state={
    Home: true,
  }

  componentDidMount(){
    global.checked = {jeeMain: false,
      jeeAdv: false}
    global.jeeMainRank = ''
    global.jeeAdvRank = ''
  }
  render() {
    if(this.state.Home){
      return (

          <View style={styles.container}>
            <StatusBar
              backgroundColor={colors.statusBar}
              barStyle="dark-content"
            />

            <View style={{backgroundColor: colors.primary, position: "absolute", top:24, width: Dimensions.get('window').width, height: Dimensions.get('window').width/3, flexDirection: 'row'}}>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.main_search}>Search</Text>
              </View>
              <View style={styles.mainCircle}>
                <Image source={require('./icons/search.png')} style = {{height: width/3-64, width: width/3-64}}/>
              </View>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}/>  
            </View>

            <View style={{height:separator_height,
                          width: 2,
                          backgroundColor:colors.statusBar,
                          position: 'absolute',
                          top:24 + width/3 }} />

            <View style={{backgroundColor: colors.primary, position: "absolute", top:24 + width/3 + separator_height, width: Dimensions.get('window').width, height: Dimensions.get('window').width/3, flexDirection: 'row'}}>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                
              </View>
              <View style={styles.mainCircle}>
                <Image source={require('./icons/filter.png')} style = {{height: width/3-64, width: width/3-64}}/>
              </View>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.main_search}>Refine</Text>
              </View>  
            </View>

            <View style={{height:separator_height,
                          width: 2,
                          backgroundColor:colors.statusBar,
                          position: 'absolute',
                          top:24 + width/3 + width/3 + separator_height }} />

            <View style={{backgroundColor: colors.primary, position: "absolute", top:24 + width/3 + width/3 + separator_height*2, width: Dimensions.get('window').width, height: Dimensions.get('window').width/3, flexDirection: 'row'}}>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.main_search}>Decide</Text>
              </View>
              <View style={styles.mainCircle}>
                <Image source={require('./icons/university.png')} style = {{height: width/3-64, width: width/3-64}}/>
              </View>
              <View style={{backgroundColor: colors.primary, flex:1, alignItems: 'center', justifyContent: 'center'}}/> 
            </View>

            <Button
              title="Let's Begin" 
              onPress = {()=>this.setState({Home:false})}
              containerViewStyle={{position: "absolute", bottom:0, width: width}} borderRadius={0} backgroundColor={colors.accentBright} color={colors.primary} textStyle={{fontFamily: 'Montserrat-Medium'}} underlayColor={colors.primary}/>
            
          </View>
        );
      }else{

      return (<SearchActivity />)
    }
    }
}


