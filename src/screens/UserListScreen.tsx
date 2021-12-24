// import React, {useEffect, useState} from 'react';
// import {Button, StyleSheet, Text, View} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// interface Props {}

// const UserListScreen = (props: Props) => {
//   const [data, setData] = useState([]);

//   const getColllectionData = async () => {

//     const user = await firestore().collection('users').doc('test2').get();
//     setData(user);
//     firestore()
//       .collection('users')
//       .doc('test2')
//       .set({
//         name: 'rishabhj this',
//         age: 80,
//       })
//       .then(() => {
//         console.log('User added!');
//       });
//   };

//   return (
//     <View>
//       <Text>{data?._data?.name}</Text>
//       <Button
//         title="Go to Edit"
//         onPress={() => props.navigation.navigate('EditUserListScreen')}
//       />
//       <Button
//         title="Go to Add"
//         onPress={() => {
//           getColllectionData();
//         }}
//       />
//     </View>
//   );
// };

// export default UserListScreen;

// const styles = StyleSheet.create({});
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');

  auth()
    .createUserWithEmailAndPassword(user, 'harsh@123')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default App;
