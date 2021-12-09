import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const UserListScreen = props => {
  return (
    <View>
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
