import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const configure = () => {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },

    requestPermissions: Platform.OS === 'ios',
  });
};

const localNotifications = (title, message) => {
  PushNotification.localNotification({
    title: title, // (optional)
    message: message, // (required)
  });
};

export {configure, localNotifications};
