import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import profileWorkerAction from '../redux/actions/profileWorker';

import Card from '../components/HomeCardWorker';

export default function HomeWorker({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profileWorker = useSelector((state) => state.profileWorker);

  useEffect(() => {
    dispatch(profileWorkerAction.getProfile(auth.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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

  function getRecruiterDetail() {
    navigation.navigate('DetailRecruiter');
  }

  return (
    <Container style={styles.parent}>
      {profileWorker.profileData && (
        <View style={[styles.header, styles.padding]}>
          <View>
            <Text style={styles.date}>
              {dayjs().format('ddd, D MMMM YYYY')}
            </Text>
            <Text style={styles.user}>
              Hai, {profileWorker.profileData.name}!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationWorker')}>
            <Icon name="bell" size={24} color="#ffff" />
          </TouchableOpacity>
        </View>
      )}
      <Content style={styles.padding}>
        <View>
          <Text style={styles.jobPosition}>Information and Technology</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity onPress={getRecruiterDetail}>
                <Card item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View>
          <Text style={styles.jobPosition}>Financial</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity onPress={getRecruiterDetail}>
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
