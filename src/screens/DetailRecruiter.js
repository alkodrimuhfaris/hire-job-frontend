import * as React from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {Button} from 'native-base';
import {Text, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {API_URL_IMAGE} from '@env';
import ModalCenter from '../components/ModalCenter';

import profile from '../assets/img/company.png';

const DetailRecruiter = () => {
  const home = useSelector((state) => state.home);
  const [modalApply, openModalApply] = React.useState(false);

  const goApply = () => {
    openModalApply(true);
  };

  return (
    <>
      {/* modal for create cover letter */}
      <ModalCenter
        modalOpen={modalApply}
        setModalOpen={openModalApply}
        noTouchToBack={true}
      />

      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={
                home.userDetailsData.photo
                  ? {uri: API_URL_IMAGE + home.userDetailsData.photo}
                  : profile
              }
              style={styles.avatar}
            />
            <Text style={styles.name}>
              {home.userDetailsData.company || ''}
            </Text>
            <Text style={styles.field}>
              {home.userDetailsData.jobTitle || ''}
            </Text>
            {Object.keys(home.userDetailsData).length &&
            home.userDetailsData.address ? (
              <View style={styles.location}>
                <Icon name="map-marker" size={24} color="#8e8e8e" />
                <Text style={styles.map}>
                  {home.userDetailsData.address || ''}
                </Text>
              </View>
            ) : (
              <View style={styles.location}>
                <Text style={styles.noLocation}>
                  This company haven't specified their address yet
                </Text>
              </View>
            )}
            <Text style={styles.desc}>{home.userDetailsData.bio || ''}</Text>
            <Button block style={styles.btnApply} onPress={() => goApply()}>
              <Text style={styles.textBtn}>Apply</Text>
            </Button>
          </View>
          <View style={styles.div}>
            {Object.keys(home.userDetailsData).length &&
            home.userDetailsData.email ? (
              <View style={styles.sosmed}>
                <Icon name="envelope-o" size={20} color="#8e8e8e" />
                <Text style={styles.email}>{home.userDetailsData.email}</Text>
              </View>
            ) : null}
            {Object.keys(home.userDetailsData).length &&
            home.userDetailsData.instagram !== '-' &&
            home.userDetailsData.instagram ? (
              <View style={styles.sosmed}>
                <Icon name="instagram" size={24} color="#8e8e8e" />
                <Text style={styles.email}>
                  {home.userDetailsData.instagram}
                </Text>
              </View>
            ) : null}
            {Object.keys(home.userDetailsData).length &&
            home.userDetailsData.github !== '-' &&
            home.userDetailsData.github ? (
              <View style={styles.sosmed}>
                <Icon name="github" size={24} color="#8e8e8e" />
                <Text style={styles.email}>{home.userDetailsData.github}</Text>
              </View>
            ) : null}
            {Object.keys(home.userDetailsData).length &&
            home.userDetailsData.linkedin !== '-' &&
            home.userDetailsData.linkedin ? (
              <View style={styles.sosmed}>
                <Icon name="linkedin" size={20} color="#8e8e8e" />
                <Text style={styles.email}>
                  {home.userDetailsData.linkedin}
                </Text>
              </View>
            ) : null}
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default DetailRecruiter;

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
  noLocation: {
    width: '80%',
    textAlign: 'center',
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
  },
  map: {
    marginLeft: 15,
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
  },
  btnApply: {
    margin: 20,
    backgroundColor: '#5E50A1',
  },
  textBtn: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  desc: {
    textAlign: 'center',
    color: '#9EA0A5',
    padding: 20,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
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
