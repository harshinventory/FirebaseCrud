import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MsgBar from '../components/Msgbar';

const ChatScreen = props => {
  const [currentMsg, setCurrentMsg] = useState('');
  const navigation = useNavigation();

  console.log('prosp in chatscreen', props);

  const onPressSend = () => {};
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.logoutBtn}>
        <Text>{auth().currentUser?.email}</Text>
        <Button
          title="Log Out"
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                navigation.navigate('LoginScreen');
              })
              .then(error => {
                console.log(error);
              });
          }}
        />
      </View>
      <KeyboardAvoidingView style={styles.bottom} behavior="padding">
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid={'transparent'}
            onChangeText={text => setCurrentMsg(text)}
            value={currentMsg}
            placeholder={'Type here..'}
          />
          <TouchableOpacity
            style={styles.sendIcon}
            onPress={() => {
              onPressSend();
            }}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1,

    borderRadius: 100,
    elevation: 2,

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

    padding: 8,
  },
});
