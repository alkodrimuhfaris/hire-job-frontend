import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Text, Button, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';
import homeAction from '../redux/actions/home';
import messageAction from '../redux/actions/message';
import profileRecruiterAction from '../redux/actions/profileRecruiter';
import profileWorkerAction from '../redux/actions/profileWorker';
import portfolioAction from '../redux/actions/portfolio';
import companyAction from '../redux/actions/profileRecruiter';

import profile from '../assets/img/company.png';
import {API_URL_IMAGE} from '@env';

const ProfileRecruiter = ({navigation}) => {
  const [field, setField] = React.useState('Financial');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.profileRecruiter);
  const profileData = useSelector(
    (state) => state.profileRecruiter.profileData,
  );
  const companyState = useSelector((state) => state.myCompany);
  const companyData = useSelector((state) => state.myCompany.companyData);

  const updateProfileState = useSelector(
    (state) => state.updateProfileRecruiter,
  );
  const updateCompanyState = useSelector((state) => state.updateCompany);

  React.useEffect(() => {
    dispatch(companyAction.getMyCompany(auth.token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function logout() {
    dispatch(authAction.logout());
    dispatch(homeAction.destroy());
    dispatch(messageAction.destroy());
    dispatch(profileRecruiterAction.destroy());
    dispatch(profileWorkerAction.destroy());
    dispatch(portfolioAction.destroy());
  }

  const profileKey = profileData.length
    ? Object.keys(profileData[0]).length
    : null;

  const profileValue = profileData.length
    ? Object.values(profileData[0]).filter((item) => item).length
    : null;

  const profileUncomplete = profileKey > profileValue;

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={
                profileData.length && profileData[0].photo !== null
                  ? {uri: `${API_URL_IMAGE}${profileData[0].photo}`}
                  : profile
              }
              style={styles.avatar}
            />
            {profileData.length && profileData[0].photo === null ? (
              <View style={styles.warningWrapper}>
                <Text style={[styles.warning, styles.centerWarning]}>
                  Tambahkan logo perusahaan anda, semua orang ingin melihat logo
                  perusahaan anda
                </Text>
              </View>
            ) : null}
            <Text style={styles.name}>
              {profileData.length && profileData[0].company}
            </Text>

            {/* ambil dari table company yang field */}
            <Text style={styles.field}>
              {(companyData.length && companyData[0].field) || ''}
            </Text>

            {profileData.length && profileData[0].address !== null ? (
              <View style={styles.location}>
                <Icon name="map-marker" size={24} color="#8e8e8e" />
                <Text style={styles.map}>{profileData[0].address}</Text>
              </View>
            ) : (
              <Text>&nbsp;</Text>
            )}
            {profileData.length && profileData[0].bio !== null ? (
              <Text style={styles.desc}>{profileData[0].bio}</Text>
            ) : (
              <Text>&nbsp;</Text>
            )}

            {profileData.length &&
            profileData[0].bio === null &&
            profileData[0].address === null ? (
              <Text style={[styles.warning, styles.buttonWarning]}>
                Lengkapi profil perusahaan anda agar kesempatan mendapatkan
                pekerja yang berkualitas menjadi lebih tinggi
              </Text>
            ) : null}
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
              <Text style={styles.email}>
                {profileData.length && profileData[0].email}
              </Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="instagram" size={24} color="#8e8e8e" />
              <Text style={styles.email}>
                {profileData.length &&
                  profileData[0].instagram &&
                  profileData[0].instagram
                    .slice(26, profileData[0].instagram.length)
                    .slice(0, -1)}
              </Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={24} color="#8e8e8e" />
              <Text style={styles.email}>
                {profileData.length &&
                  profileData[0].github &&
                  profileData[0].github.slice(19, profileData[0].github.length)}
              </Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="linkedin" size={20} color="#8e8e8e" />
              <Text style={styles.email}>
                {profileData.length &&
                  profileData[0].linkedin &&
                  profileData[0].linkedin
                    .slice(28, profileData[0].linkedin.length)
                    .slice(0, -1)}
              </Text>
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
