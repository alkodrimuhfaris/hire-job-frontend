import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import screens
import Welcome from './Welcome';
import SignupWorker from './SignupWorker'

// import navigator
const Stack = createStackNavigator();

export default function Main() {
  const isLogin = false;

  return (
    <NavigationContainer>
      {!isLogin && (
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupWorker"
            component={SignupWorker}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
