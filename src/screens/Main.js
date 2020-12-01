import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import screens
import Welcome from './Welcome';
import LoginWorker from './LoginWorker';
import LoginRecruiter from './LoginRecruiter';
import SignupRecruiter from './SignupRecruiter';
import SignupWorker from './SignupWorker';
import Forgot from './ForgotPassword';
import Reset from './ResetPassword';
import Notif from './Notification';
import Search from './Search';
import Chat from './Chat';
import Profile from './Profile';
import Home from './Home';
import ResultSearch from './ResultSearch';
import ListChat from './ListChat'
// import navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Tab Button Navigation
import BottomNavigation from '../components/BottomTab';
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chat" component={ListChat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default function Main() {
  const isLogin = true;

  return (
    <NavigationContainer>
      {!isLogin ? (
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
            name="Reset"
            component={Reset}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupRecruiter"
            component={SignupRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupWorker"
            component={SignupWorker}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notif"
            component={Notif}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResultSearch"
            component={ResultSearch}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
