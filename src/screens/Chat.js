import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Chat = () => {
  return (
    <View style={styles.parent}>
      <Text>Chat Screen</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
