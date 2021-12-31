import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('har@gmail.com');
  const [password, setPassword] = useState('1234567890');

  const onPressLogin = () => {
    if (email !== '' && password !== '') {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            auth()
              .signInWithEmailAndPassword(email, password)
              .then(res => {
                if (res.user.uid !== null && res.user?.email !== email) {
                  firebase.firestore().collection('user').add({
                    // email: res.user mn
                  });
                }
                console.log('LOGIN >>> ', res);
                navigation.navigate('GroupScreen');
              });
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
        });
    } else if (email === '') {
      console.warn('please enter email');
    } else if (password === '') {
      console.warn('please enter password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={email => setEmail(email)}
          value={email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => onPressLogin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});
