import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';
import homeAction from '../redux/actions/home';
import messageAction from '../redux/actions/message';
import profileRecruiterAction from '../redux/actions/profileRecruiter';
import profileWorkerAction from '../redux/actions/profileWorker';
import portfolioAction from '../redux/actions/portfolio';

import profile from '../assets/img/profile.png';

const ProfileRecruiter = ({navigation}) => {
  const dispatch = useDispatch();

  function logout() {
    dispatch(authAction.logout());
    dispatch(homeAction.destroy());
    dispatch(messageAction.destroy());
    dispatch(profileRecruiterAction.destroy());
    dispatch(profileWorkerAction.destroy());
    dispatch(portfolioAction.destroy());
  }

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image source={profile} style={styles.avatar} />
            <Text style={styles.name}>PT. Martabat Jaya Abadi</Text>
            <Text style={styles.field}>Financial</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={24} color="#8e8e8e" />
              <Text style={styles.map}>Purwokerto, Jawa Tengah</Text>
            </View>
            <Text style={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum erat orci, mollis nec gravida sed, ornare quis urna.
              Curabitur eu lacus fringilla, vestibulum risus at.
            </Text>
            <Button
              block
              style={styles.btn}
              onPress={() => navigation.navigate('EditProfileRecruiter')}>
              <Text style={styles.textBtn}>Edit Profile</Text>
            </Button>
          </View>
          <View style={styles.div}>
            <View style={styles.sosmed}>
              <Icon name="envelope-o" size={20} color="#8e8e8e" />
              <Text style={styles.email}>LouisVutton@mail.com</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="instagram" size={24} color="#8e8e8e" />
              <Text style={styles.email}>@Louis91</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={24} color="#8e8e8e" />
              <Text style={styles.email}>@LouisVutton21</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="gitlab" size={20} color="#8e8e8e" />
              <Text style={styles.email}>@Vutton21</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.cardUp} transparent>
          <Button block style={styles.btn} onPress={logout}>
            <Icon name="sign-out" size={24} color="#ffffff" />
            <Text style={styles.textBtn}>Logout</Text>
          </Button>
        </Card>
      </ScrollView>
    </>
  );
};

export default ProfileRecruiter;

const styles = StyleSheet.create({
  cardUp: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 40,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 25,
    paddingBottom: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 8,
  },
  map: {
    marginLeft: 15,
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
  },
  desc: {
    textAlign: 'center',
    color: '#9EA0A5',
    padding: 20,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  btn: {
    margin: 20,
    backgroundColor: '#5E50A1',
  },
  textBtn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  div: {
    margin: 20,
    paddingBottom: 35,
  },
  sosmed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  email: {
    color: '#9EA0A5',
    marginLeft: 22,
    fontSize: 14,
    fontWeight: '400',
  },
  field: {
    fontSize: 14,
    color: '#1F2A36',
    fontWeight: '400',
  },
});
