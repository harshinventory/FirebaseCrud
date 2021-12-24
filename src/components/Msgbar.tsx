import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../theme/colors';

export default class MsgBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
    
    );
  }

  onSend = () => {
    // if (this.state.text.trim() === '') return;
    // const {conversationKey} = this.props;
    // this.props.Chat.sendMessage(conversationKey, this.state.text.trim());
    // this.setState({text: ''});
  };
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 100,
    elevation: 2,
    backgroundColor: colors.white,
    margin: 8,
  },
  textInput: {
    flexGrow: 1,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  sendIcon: {
    margin: 4,
    borderRadius: 100,
    backgroundColor: colors.primary,
    padding: 8,
  },
});
