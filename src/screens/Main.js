import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import Welcome from './Welcome';
import LoginWorker from './LoginWorker';
import LoginRecruiter from './LoginRecruiter';
import SignupRecruiter from './SignupRecruiter';
import Forgot from './ForgotPassword';

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
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginWorker"
            component={LoginWorker}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginRecruiter"
            component={LoginRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forgot"
            component={Forgot}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupRecruiter"
            component={SignupRecruiter}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
