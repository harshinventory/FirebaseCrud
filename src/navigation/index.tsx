import React, {useState} from 'react';

import AuthStack from './AuthStack';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStack from './AppStack';
import auth from '@react-native-firebase/auth';
const Stack = createNativeStackNavigator();

const AppNavContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth().onAuthStateChanged(function (user) {
    if (user) {
      setIsLoggedIn(true);
    }
  });

  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{headerShown: false}}
            initialParams={{isLoggedIn: true}}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator> */}
      <AuthStack />
      {/* <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false}}
          /> */}
    </NavigationContainer>
  );
};

export default AppNavContainer;
