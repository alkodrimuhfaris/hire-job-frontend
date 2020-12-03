import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

// import assets
import avatar from '../assets/img/profile.png';
import Null from '../assets/img/bgChatNull.svg';

export default function ListChat({navigation}) {
  // dummy data
  const DATA = [
    {
      id: 1,
      name: 'maman',
      message: 'helllooooooo ',
      time: '21 Apr',
    },
    {
      id: 2,
      name: 'maman',
      message: 'Lorem ipsum dolor sit amet, consectetur adasdada',
      time: '21 Apr',
    },
  ];

  const RenderItem = ({data}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChatRoom')}>
        <View style={styles.imgParent}>
          <Image source={avatar} style={styles.image} />
          <View style={styles.parentList}>
            <View style={styles.list}>
              <Text style={styles.listName}>{data.name}</Text>
              <Text style={styles.listTime}>{data.time}</Text>
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>
              {data.message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <View style={styles.title}>
        <Text style={styles.header}>Utama</Text>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({item}) => <RenderItem data={item} />}
          keyExtractor={(index) => index.id.toString()}
        />
      </View>

      {/* rendering if no message list */}
      {/* <View style={styles.null}>
          <Null />
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 37,
    marginTop: 20,
  },
  imgParent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    height: 46,
    width: 46,
    marginRight: 16,
    borderRadius: 40,
  },
  parentList: {
    height: '100%',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
  },
  listTime: {
    fontSize: 14,
    color: '#9EA0A5',
    marginRight: 10,
  },
  message: {
    fontSize: 14,
    color: '#9EA0A5',
  },
  header: {
    fontSize: 16,
    color: '#9EA0A5',
    fontWeight: '600',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
