import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
import EditUserListScreen from '../screens/EditUserListScreen';
import AddUserList from '../screens/AddUserList';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserListScreen" component={UserListScreen} />
      <Stack.Screen name="EditUserListScreen" component={EditUserListScreen} />
      <Stack.Screen name="AddUserList" component={AddUserList} />
    </Stack.Navigator>
  );
};

export default AuthStack;
