import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import avatar from '../assets/img/profile.png';
import Null from '../assets/img/bgChatNull.svg';

const DATA = [
  {
    id: 1,
    name: 'maman',
    message: 'helllooooooo',
    time: '21 april 2021',
  },
  {
    id: 1,
    name: 'maman',
    message: 'helllooooooo',
    time: '21 april 2021',
  },
];

const RenderItem = ({data}) => {
  console.log('ini props', data);
  return (
    <TouchableOpacity>
      <View style={styles.imgParent}>
        <Image source={avatar} style={styles.image} />
        <View style={styles.parentList}>
          <View style={styles.list}>
            <Text style={styles.listName}>{data.name}</Text>
            <Text style={styles.listTime}>{data.time}</Text>
          </View>
          <View style={styles.listMessage}>
            <Text style={styles.message}>{data.message}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
class ListChat extends Component {
  render() {
    console.log(DATA);
    return (
      <View style={styles.parent}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 16,
              color: '#9EA0A5',
              fontWeight: '600',
            }}>
            Utama
          </Text>
        </View>
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => <RenderItem data={item} />}
          />
        </View>
      </View>
    );
  }
}

export default ListChat;

const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: '#ffff'},
  title: {marginLeft: 16, marginBottom: 37, marginTop: 70},
  imgParent: {flexDirection: 'row', alignItems: 'center'},
  image: {
    backgroundColor: '#ffffff',
    height: 70,
    width: 70,
    marginRight: 10,
    marginLeft: 20,
    borderRadius: 40,
  },
  parentList: {
    height: '100%',
    borderBottomWidth: 0.25,
    flexGrow: 1,
    paddingVertical: 25,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {fontSize: 16, fontWeight: '600'},
  listTime: {fontSize: 14, color: '#9EA0A5', marginRight: 10},
  listMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {fontSize: 14, color: '#9EA0A5'},
});
