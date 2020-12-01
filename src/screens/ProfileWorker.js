import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import profile from '../assets/img/profile.png';

import FirstRoute from '../components/Portofolio';
import SecondRoute from '../components/Experience';

const ProfileWorker = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Portofolio'},
    {key: 'second', title: 'Pengalaman Kerja'},
  ]);

  const renderScene = SceneMap({
    indicatorStyle: {backgroundColor: 'pink'},
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image source={profile} style={styles.avatar} />
            <Text style={styles.name}>Louis Tamlison</Text>
            <Text>Web developer</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={25} color="#8e8e8e" />
              <Text style={styles.map}>Purwokerto, Jawa Tengah</Text>
            </View>
            <Text style={styles.map}>Freelancer</Text>
            <Text style={styles.desc}>
              You asked, Font Awesome delivers with 41 shiny new icons in
              version 4.7. Want to request new icons? Here's how. Need vectors
              or want to use on the desktop? Check the cheatsheet.
            </Text>
            <Button block style={styles.btnHire}>
              <Text>Edit</Text>
            </Button>
          </View>
          <View style={styles.div}>
            <Text style={styles.tag}>Skill</Text>
            <View style={styles.skillContainer}>
              <Text style={styles.skill}> SKILL </Text>
              <Text style={styles.skill}> SKILL </Text>
              <Text style={styles.skill}> SKILL </Text>
              <Text style={styles.skill}> SKILL </Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="envelope-o" size={24} color="#8e8e8e" />
              <Text style={styles.email}>LouisVutton@mail.com</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="instagram" size={27} color="#8e8e8e" />
              <Text style={styles.email}>@Louis91</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={27} color="#8e8e8e" />
              <Text style={styles.email}>@LouisVutton21</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="gitlab" size={23} color="#8e8e8e" />
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
    marginTop: 50,
    borderRadius: 100,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  map: {
    marginLeft: 15,
    color: '#8e8e8e',
  },
  desc: {
    textAlign: 'center',
    color: '#8e8e8e',
    padding: 25,
  },
  btnHire: {
    margin: 20,
    backgroundColor: '#5E50A1',
  },
  div: {
    margin: 20,
    paddingBottom: 35,
  },
  tag: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  skillContainer: {
    marginBottom: 40,
    flexDirection: 'row',
  },
  skill: {
    backgroundColor: '#FBB017',
    margin: 10,
    width: 45,
    height: 20,
    color: '#ffffff',
  },
  sosmed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  email: {
    color: '#8e8e8e',
    marginLeft: 25,
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
  },
});
