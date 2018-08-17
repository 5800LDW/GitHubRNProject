/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainView from './View/MainView';
import NavigatorIOSApp from './LDW_iOS/Views/NavigatorIOSApp';
import App from './LDW_iOS/test2/Application';
import MyScreen from './LDW_iOS/Views/MyScreen';
import Demo from './LDW/Demo';
import CardPicDemo from './LDW_iOS/Views/ImageCard/demo/CardPicDemo';


export default class News extends Component {
  render() {
    return (
        // console.log("wo"),
      <MyScreen />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('News', () => News);



//下面是原来的
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
//
// import MainView from './View/MainView';
//
// export default class News extends Component {
//     render() {
//         return (
//             <MainView />
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });
//
// AppRegistry.registerComponent('News', () => News);
