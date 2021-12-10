import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
interface Props {}

const UserListScreen = (props: Props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getColllectionData = async () => {
      const user = await firestore().collection('users').doc('test2').get();
      console.log(user);
      setData(user);
    };
    getColllectionData();
    return () => {};
  }, []);

  return (
    <View>
      <Text>{data?._data?.email}</Text>
      <Button
        title="Go to Edit"
        onPress={() => props.navigation.navigate('EditUserListScreen')}
      />
      <Button
        title="Go to Add"
        onPress={() => props.navigation.navigate('AddUserList')}
      />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({});
