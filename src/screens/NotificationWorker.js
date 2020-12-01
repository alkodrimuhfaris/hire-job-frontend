import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Body, Button, Title} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import NotifImg from '../assets/img/notifPict.svg';

const Notification = ({navigation}) => {
  return (
    <>
      <View>
        <View style={styles.header} transparent>
          <Button
            style={styles.back}
            transparent
            onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={30} />
          </Button>
          <Body>
            <Title style={styles.text}>Notifikasi</Title>
          </Body>
        </View>
      </View>
      <View style={styles.parent}>
        <NotifImg width={120} height={120} />
        <Text note>Belum ada notifikasi</Text>
      </View>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  back: {
    left: 20,
  },
  text: {
    color: '#000000',
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
