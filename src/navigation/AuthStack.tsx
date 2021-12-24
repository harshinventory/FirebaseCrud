import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupScreen from '../screens/GroupScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
