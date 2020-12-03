import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';

import profile from '../assets/img/profile.png';

import FirstRoute from '../components/Portofolio';
import SecondRoute from '../components/Experience';

const ProfileWorker = ({navigation}) => {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Portofolio'},
    {key: 'second', title: 'Pengalaman kerja'},
  ]);

  const renderScene = SceneMap({
    indicatorStyle: {backgroundColor: 'pink'},
    first: FirstRoute,
    second: SecondRoute,
  });

  function logout() {
    dispatch(authAction.logout());
  }

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image source={profile} style={styles.avatar} />
            <Text style={styles.name}>Louis Tamlison</Text>
            <Text style={styles.field}>Web developer</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={24} color="#8e8e8e" />
              <Text style={styles.map}>Purwokerto, Jawa Tengah</Text>
            </View>
            <Text style={styles.map}>Freelancer</Text>
            <Text style={styles.desc}>
              You asked, Font Awesome delivers with 41 shiny new icons in
              version 4.7. Want to request new icons? Here's how. Need vectors
              or want to use on the desktop? Check the cheatsheet.
            </Text>
            <Button
              block
              style={styles.btnHire}
              onPress={() => navigation.navigate('EditProfileWorker')}>
              <Text style={styles.textBtn}>Edit Profile</Text>
            </Button>
          </View>
          <View style={styles.div}>
            <Text style={styles.tag}>Skill</Text>
            <View style={styles.skillContainer}>
              <View style={styles.skill}>
                <Text style={styles.skillText}>Python</Text>
              </View>
              <View style={styles.skill}>
                <Text style={styles.skillText}>Laravel</Text>
              </View>
              <View style={styles.skill}>
                <Text style={styles.skillText}>Golang</Text>
              </View>
              <View style={styles.skill}>
                <Text style={styles.skillText}>Javascript</Text>
              </View>
              <View style={styles.skill}>
                <Text style={styles.skillText}>HTML</Text>
              </View>
            </View>
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
        <Card style={styles.cardBottom} transparent>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBackground}
                renderLabel={({route}) => (
                  <Text style={styles.txtTabView}>{route.title}</Text>
                )}
              />
            )}
          />
        </Card>
        <Card style={styles.cardBottom} transparent>
          <Button block style={styles.btnHire} onPress={logout}>
            <Icon name="sign-out" size={24} color="#ffffff" />
            <Text style={styles.textBtn}>Logout</Text>
          </Button>
        </Card>
      </ScrollView>
    </>
  );
};

export default ProfileWorker;

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
  btnHire: {
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
  tag: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  skillContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#FBB017',
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  skillText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
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
  cardBottom: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  indicatorStyle: {
    backgroundColor: '#5E50A1',
  },
  tabBackground: {
    backgroundColor: 'white',
  },
  txtTabView: {
    color: '#000000',
    margin: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  field: {
    fontSize: 14,
    color: '#1F2A36',
    fontWeight: '400',
  },
});
