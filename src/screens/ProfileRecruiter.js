/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';
import companyAction from '../redux/actions/profileRecruiter';

import profile from '../assets/img/profile.png';

import {API_URL} from '@env';

const ProfileRecruiter = ({navigation}) => {
  const [field, setField] = React.useState('Financial');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.profileRecruiter);
  const {profileData} = profileState;
  const companyState = useSelector((state) => state.myCompany);
  const {companyData} = companyState;
  // console.log(companyData);

  React.useEffect(() => {
    dispatch(companyAction.getMyCompany(auth.token));
    setField(companyData[0].field);
  }, [dispatch]);

  function logout() {
    dispatch(authAction.logout());
  }

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image source={profile} style={styles.avatar} />
            <Text style={styles.name}>{profileData[0].company}</Text>

            {/* ambil dari table company yang field */}
            <Text style={styles.field}>{field}</Text>

            <View style={styles.location}>
              <Icon name="map-marker" size={24} color="#8e8e8e" />
              <Text style={styles.map}>{profileData[0].address}</Text>
            </View>
            <Text style={styles.desc}>{profileData[0].bio}</Text>
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
              <Text style={styles.email}>{profileData[0].email}</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="instagram" size={24} color="#8e8e8e" />
              <Text style={styles.email}>{profileData[0].instagram}</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={24} color="#8e8e8e" />
              <Text style={styles.email}>{profileData[0].github}</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="gitlab" size={20} color="#8e8e8e" />
              <Text style={styles.email}>{profileData[0].linkedin}</Text>
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
