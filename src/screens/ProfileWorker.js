import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabView, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL_IMAGE} from '@env';

// import actions
import authAction from '../redux/actions/auth';
import homeAction from '../redux/actions/home';
import messageAction from '../redux/actions/message';
import profileRecruiterAction from '../redux/actions/profileRecruiter';
import profileWorkerAction from '../redux/actions/profileWorker';
import portfolioAction from '../redux/actions/portfolio';

import profile from '../assets/img/profile.png';

import FirstRoute from '../components/Portofolio';
import SecondRoute from '../components/Experience';
import Modal from '../components/ModalLoading';

const ProfileWorker = ({navigation}) => {
  const profileWorker = useSelector((state) => state.profileWorker);
  const skill = useSelector((state) => state.skill);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Portofolio'},
    {key: 'second', title: 'Pengalaman kerja'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute token={auth.token} navigation={navigation} />;
      case 'second':
        return <SecondRoute token={auth.token} navigation={navigation}/>;
      default:
        return null;
    }
  };

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
        {profileWorker.profileIsLoading && <Modal />}
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={
                profileWorker.profileData.photo
                  ? {uri: API_URL_IMAGE + profileWorker.profileData.photo}
                  : profile
              }
              style={styles.avatar}
            />
            {profileWorker.profileData.photo === null ? (
              <View style={styles.warningWrapper}>
                <Text style={[styles.warning, styles.centerWarning]}>
                  Tambahkan foto profile anda, semua orang ingin melihat foto
                  profile anda
                </Text>
              </View>
            ) : null}
            <Text style={styles.name}>{profileWorker.profileData.name}</Text>
            {profileWorker.profileData.jobTitle && (
              <Text style={styles.field}>
                {profileWorker.profileData.jobTitle || ''}
              </Text>
            )}
            {profileWorker.profileData.address && (
              <View style={styles.location}>
                <Icon name="map-marker" size={24} color="#8e8e8e" />
                <Text style={styles.map}>
                  {profileWorker.profileData.address || ''}
                </Text>
              </View>
            )}
            {/* <Text style={styles.map}>Freelancer</Text> */}
            {profileWorker.profileData.bio && (
              <Text style={styles.desc}>
                {profileWorker.profileData.bio || ''}
              </Text>
            )}
            {profileWorker.profileData.address === null &&
            profileWorker.profileData.bio === null ? (
              <View style={styles.warningWrapper}>
                <Text style={[styles.warning, styles.centerWarning]}>
                  Lengkapi profil data diri anda agar kesempatan mendapatkan
                  pekerjaan yang berkualitas menjadi lebih tinggi
                </Text>
              </View>
            ) : null}
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
              {!skill.listSkillIsLoading &&
                !skill.listSkillIsError &&
                skill.listSkillData.map((item) => (
                  <View style={styles.skill} key={item.id}>
                    <Text style={styles.skillText}>{item.Skill.name}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.sosmed}>
              <Icon name="envelope-o" size={20} color="#8e8e8e" />
              <Text style={styles.email}>
                {profileWorker.profileData.email}
              </Text>
            </View>
            {profileWorker.profileData.instagram && (
              <View style={styles.sosmed}>
                <Icon name="instagram" size={24} color="#8e8e8e" />
                <Text style={styles.email}>
                  {profileWorker.profileData.instagram
                    ? profileWorker.profileData.instagram
                        .slice(26, profileWorker.profileData.instagram.length)
                        .slice(0, -1)
                    : ''}
                </Text>
              </View>
            )}
            {profileWorker.profileData.github && (
              <View style={styles.sosmed}>
                <Icon name="github" size={24} color="#8e8e8e" />
                <Text style={styles.email}>
                  {profileWorker.profileData.github
                    ? profileWorker.profileData.github.slice(
                        19,
                        profileWorker.profileData.github.length,
                      )
                    : ''}
                </Text>
              </View>
            )}
            {profileWorker.profileData.linkedin && (
              <View style={styles.sosmed}>
                <Icon name="linkedin" size={20} color="#8e8e8e" />
                <Text style={styles.email}>
                  {profileWorker.profileData.linkedin
                    ? profileWorker.profileData.linkedin
                        .slice(28, profileWorker.profileData.linkedin.length)
                        .slice(0, -1)
                    : ''}
                </Text>
              </View>
            )}
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
  warningWrapper: {
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    fontSize: 12,
    color: '#FBB017',
  },
  centerWarning: {
    textAlign: 'center',
  },
  buttonWarning: {
    textAlign: 'center',
    width: '90%',
  },
});
