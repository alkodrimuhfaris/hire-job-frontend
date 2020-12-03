import React from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';

// realtime chat
import io from 'socket.io-client';
import {API_URL} from '@env';
import messageAction from '../redux/actions/message';

import Card from '../components/HomeCardRecruiter';

export default function HomeRecruiter({navigation}) {
  const dispatch = useDispatch();
  const {id: selfId, token} = useSelector((state) => state.auth);
  React.useEffect(() => {
    const socket = io(API_URL);
    const readEvent = 'read ' + selfId;
    const sendEvent = 'send ' + selfId;
    dispatch(messageAction.getAllList(token));
    socket.on(sendEvent, ({sender, message}) => {
      console.log('theres an event');
      dispatch(messageAction.getAllList(token));
      dispatch(messageAction.getPrivate(token, sender));
    });
    socket.on(readEvent, ({reciever, read}) => {
      dispatch(messageAction.getAllList(token));
      dispatch(messageAction.getPrivate(token, reciever));
    });
    return () => {
      socket.close();
    };
  }, []);

  //dummy data
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  function getWorkerDetail() {
    navigation.navigate('DetailWorker');
  }

  return (
    <Container style={styles.parent}>
      <View style={[styles.header, styles.padding]}>
        <View>
          <Text style={styles.date}>Sen, 21 April 2020</Text>
          <Text style={styles.user}>Hai, Mohammad!</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationRecruiter')}>
          <Icon name="bell" size={24} color="#ffff" />
        </TouchableOpacity>
      </View>
      <Content style={styles.padding}>
        <View>
          <Text style={styles.jobPosition}>Web developer</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity onPress={getWorkerDetail}>
                <Card item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <Text style={styles.jobPosition}>Android developer</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity onPress={getWorkerDetail}>
                <Card item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.footer} />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F6F7F8',
  },
  padding: {
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#5E50A1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomRightRadius: 20,
  },
  date: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
  },
  user: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 35,
    fontWeight: '600',
  },
  jobPosition: {
    marginTop: 30,
    marginBottom: 18,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
    color: '#1F2A36',
  },
  footer: {
    marginBottom: 40,
  },
});
