'use strict';
import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

var React = require('react-native');
var colors = require('./Colors.js');
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: "Montserrat-Medium"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontFamily: "Montserrat-Regular"
  },
  mainCircle: {
  	//position: "absolute",
  	//top: 0,
  	//left: Dimensions.get('window').width/3,
  	//height: Dimensions.get('window').width/3,
  	//width: Dimensions.get('window').width/3,
  	flex: 1,
  	borderRadius: Dimensions.get('window').width/3,
  	backgroundColor: colors.accent,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  main_search: {
  	fontSize: 20,
    //textAlign: 'center',
    fontFamily: "Montserrat-Medium",
    color: colors.accent

  },
  statusBarIos: {
    height: (Platform.OS === 'ios') ? 20 : 0, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
    backgroundColor: colors.statusBar,
    width: Dimensions.get('window').width,
  },
  statusBarIosDark: {
    height: (Platform.OS === 'ios') ? 20 : 0, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)
    backgroundColor: colors.accent,
    width: Dimensions.get('window').width,
  },
  vertical_separator: {
  	height:(h-48-w-49)/2,
  	width: 1,
  	backgroundColor:colors.statusBar
  },
  tabIcon: {
    
    height: 24,
    width: 24,
  },

  navBar:{
    height: 56,
    backgroundColor: colors.accent,
    width: w
  },
  navButton: {
    position: 'absolute',
    left:0,
    top:0,
    backgroundColor: colors.teal,
    width:56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonRight: {
    position: 'absolute',
    right:0,
    top:0,
    backgroundColor: colors.teal,
    width:56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarTitle: {
  	fontFamily: 'Montserrat-Medium',
  	fontSize: 36,
  	marginLeft: 16,
  	color: colors.primary
  },
  collegeCard: {
    width: w-16,
    borderRadius: 8,
    elevation: 4,
    height: 150,
    backgroundColor: colors.primary,
    marginTop: 8,
    shadowColor: colors.input,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    flexDirection: 'row',
    justifyContent:'center'
  },
  cardImage: {
    height: 150, width: 100, backgroundColor: 'transparent', justifyContent:'center', alignItems: 'center'
  },
  cardContent: {
    height: 150, width: w-16-100, backgroundColor:'transparent',
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center'
  },
  cardCollegeName: {
    fontFamily: 'Montserrat-Medium',
    color:colors.accent
  },
  cardCollegeState: {
    fontFamily: 'Montserrat-Regular',
    color:colors.input,
    marginTop:4,
    fontSize: 12
  },
  cardCollegePrograms: {
    fontFamily: 'Montserrat-Medium',
    color:colors.accentBright,
    marginTop: 3,
    fontSize: 12
  },
});

module.exports = styles;