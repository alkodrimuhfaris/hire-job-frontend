import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import sectionConditioner from '../helpers/sectionConditioner';

// realtime chat
import io from 'socket.io-client';
import {API_URL} from '@env';
import messageAction from '../redux/actions/message';
import dayjs from 'dayjs';

// import actions
import profileRecruiterAction from '../redux/actions/profileRecruiter';
import homeAction from '../redux/actions/home';

import Card from '../components/HomeCardRecruiter';

export default function HomeRecruiter({navigation}) {
  // realtime
  const dispatch = useDispatch();
  const {id: selfId, token} = useSelector((state) => state.auth);
  const {homeData} = useSelector((state) => state.home);
  const data = sectionConditioner.byJobTitle(homeData);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = useSelector((state) => state.auth);
  const profileRecruiter = useSelector((state) => state.profileRecruiter);

  useEffect(() => {
    dispatch(profileRecruiterAction.getProfile(auth.token));
    dispatch(homeAction.getHome(auth.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function getWorkerDetail() {
    navigation.navigate('DetailWorker');
  }

  return (
    <Container style={styles.parent}>
      {profileRecruiter.profileData.length > 0 &&
        profileRecruiter.profileData.map((user) => {
          return (
            <View style={[styles.header, styles.padding]} key={user.id}>
              <View>
                <Text style={styles.date}>
                  {dayjs().format('ddd, D MMMM YYYY')}
                </Text>
                <Text style={styles.user}>Hai, {user.name}!</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationRecruiter')}>
                <Icon name="bell" size={24} color="#ffff" />
              </TouchableOpacity>
            </View>
          );
        })}
      <Content style={styles.padding}>
        <View>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <>
                  <Text style={styles.jobPosition}>
                    {item.title ? item.title : 'Worker'}
                  </Text>
                  <View>
                    <FlatList
                      horizontal
                      data={item.data}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => (
                        <TouchableOpacity onPress={getWorkerDetail}>
                          <Card item={item} />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
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
