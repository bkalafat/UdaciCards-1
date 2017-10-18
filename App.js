import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { TabNavigator, StackNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { Constants } from 'expo'

import {clearDB} from './utils/api'
import { setLocalNotification } from './utils/notifications'

import Decks from './components/Decks'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import DeckInfo from './components/DeckInfo'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

import {charcoal, white, black} from './utils/colors'

function FlashCardsStatusBar({ backgroundColor, ...props }){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? charcoal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : charcoal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
   }
  }
})


const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  },
  DeckInfo:{
    screen: DeckInfo,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    //clearDB()
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <FlashCardsStatusBar backgroundColor={charcoal} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
