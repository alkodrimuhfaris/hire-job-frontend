import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import {API_URL_IMAGE} from '@env';

import Avatar from '../assets/img/company.png';

export default function HomeCardWorker({item}) {
  return (
    <View style={styles.card}>
      <Image
        source={item.photo ? {uri: `${API_URL_IMAGE}${item.photo}`} : Avatar}
        style={styles.avatar}
      />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
        {item.Company.name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.position}>
        {item.Company.city}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: 160,
    height: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    lineHeight: 19,
    color: '#1F2A36',
    fontWeight: '600',
  },
  position: {
    color: '#9EA0A5',
    fontSize: 12,
    fontWeight: '400',
  },
  avatar: {
    marginBottom: 12,
    resizeMode: 'cover',
    width: 72,
    height: 72,
    borderRadius: 8,
  },
});
