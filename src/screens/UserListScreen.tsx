import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
interface Props {}

const UserListScreen = (props: Props) => {
  const [data, setData] = useState([]);

  const getColllectionData = async () => {

    const user = await firestore().collection('users').doc('test2').get();
    setData(user);
    firestore()
      .collection('users')
      .doc('test2')
      .set({
        name: 'parmar this',
        age: 80,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View>
      <Text>{data?._data?.name}</Text>
      <Button
        title="Go to Edit"
        onPress={() => props.navigation.navigate('EditUserListScreen')}
      />
      <Button
        title="Go to Add"
        onPress={() => {
          getColllectionData();
        }}
      />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({});
