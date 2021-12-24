import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';

const AppStack = props => {
  const Stack = createNativeStackNavigator();
  console.log('prosp in app stack', props);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
