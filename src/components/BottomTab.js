import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

//import assets icons
import Home from '../assets/img/menu.svg';
import HomeActive from '../assets/img/menuActive.svg';
import Search from '../assets/img/search.svg';
import SearchActive from '../assets/img/searchActive.svg';
import Chat from '../assets/img/chat.svg';
import ChatActive from '../assets/img/chatActive.svg';
import Profile from '../assets/img/profile.svg';
import ProfileActive from '../assets/img/profileActive.svg';

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = () => {
          if (label === 'HomeWorker' || label === 'HomeRecruiter') {
            return isFocused ? <HomeActive /> : <Home />;
          }
          if (label === 'SearchWorker' || label === 'SearchRecruiter') {
            return isFocused ? <SearchActive /> : <Search />;
          }
          if (label === 'Chat') {
            return isFocused ? <ChatActive /> : <Chat />;
          }
          if (label === 'ProfileWorker' || label === 'ProfileRecruiter') {
            return isFocused ? <ProfileActive /> : <Profile />;
          }
          return <Home />;
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.iconTab}>
            <Icon />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
  },
  iconTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
