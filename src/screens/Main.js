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
import Search from './Search';
import ResultSearch from './ResultSearch';

// import recruiter screen
import HomeRecruiter from './HomeRecruiter';
import DetailWorker from './DetailWorker';
import NotificationRecruiter from './NotificationRecruiter';
import ProfileRecruiter from './ProfileRecruiter';
import EditProfileRecruiter from './EditProfileRecruiter';

// import worker screen
import HomeWorker from './HomeWorker';
import DetailRecruiter from './DetailRecruiter';
import NotificationWorker from './NotificationWorker';
import ProfileWorker from './ProfileWorker';
import EditProfileWorker from './EditProfileWorker';

//chat screen
import ChatRoom from './ChatRoom';
import ListChat from './ListChat';

// import navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Tab Button Navigation
import BottomNavigation from '../components/BottomTab';
const MainAppWorker = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="HomeWorker" component={HomeWorker} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chat" component={ListChat} />
      <Tab.Screen name="ProfileWorker" component={ProfileWorker} />
    </Tab.Navigator>
  );
};

const MainAppRecruiter = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
      <Tab.Screen name="HomeRecruiter" component={HomeRecruiter} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Chat" component={ListChat} />
      <Tab.Screen name="ProfileRecruiter" component={ProfileRecruiter} />
    </Tab.Navigator>
  );
};

export default function Main() {
  const isLogin = true;
  const isWorker = true;

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
      ) : isWorker ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainAppWorker"
            component={MainAppWorker}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailRecruiter"
            component={DetailRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationWorker"
            component={NotificationWorker}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfileWorker"
            component={EditProfileWorker}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="MainAppRecruiter"
            component={MainAppRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailWorker"
            component={DetailWorker}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NotificationRecruiter"
            component={NotificationRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfileRecruiter"
            component={EditProfileRecruiter}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResultSearch"
            component={ResultSearch}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
