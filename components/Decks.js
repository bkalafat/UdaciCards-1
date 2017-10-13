import React, {Component} from 'react'
import {View, Text, StyleSheet, Platform, FlatList, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../utils/api'
import {loadDecks} from '../actions'
import Deck from './Deck'
import {AppLoading} from 'expo'
import {white,halfGray} from '../utils/colors'

class Decks extends Component {

  state = {
    ready: false
  }

  componentDidMount() {
    const {loadDecks} = this.props
    getDecks().then((decks) => loadDecks(decks)).then(() => this.setState(() => ({ready: true})))
  }

  _keyExtractor = (item, index) => item.title;

  _onPressItem = (item) => {
    console.log("Item Pressed!", item)
  };

  _renderItem = ({item}) => {
    console.log("item ", item)
    return (
      <TouchableOpacity style={styles.item} onPress={() => this._onPressItem(item)}>
        <Deck id={item.title} title={item.title} questions={item.questions} onPressItem={this._onPressItem}/>
      </TouchableOpacity>
    )
  }

  render() {
    const {decks} = this.props
    const listOfDecks = Object.values(decks)
    
    if (!this.state.ready) {
      return (<AppLoading/>)
    }

    return (
      <FlatList
        data={listOfDecks}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />)
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    marginTop: 17,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: halfGray
  }
});

function mapStateToProps(decks) {
  return {decks}
}
export default connect(mapStateToProps, {loadDecks})(Decks)
