import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, FlatList} from 'react-native';
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import company from '../assets/img/tokopedia.png';

import profileAction from '../redux/actions/profileWorker';

class Item extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.desc}>
          <Text style={styles.position}>{this.props.position}</Text>
          <Text style={styles.company}>{this.props.company}</Text>
          <Text style={styles.dueTime}>
            {this.props.start} s/d {this.props.finish}
          </Text>
          <Text style={styles.jobdesk}>{this.props.desc}</Text>
        </View>
      </View>
    );
  }
}

const SecondRoute = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileDataWorker = useSelector(
    (state) => state.profileWorker.profileExperience,
  );
  const profileDataForRecruiter = useSelector(
    (state) => state.home.userDetailsData.WorkExperiences,
  );
  useEffect(() => {
    dispatch(profileAction.getWorkerExp(token));
  }, [dispatch, token]);
  return (
    <>
      {profileDataForRecruiter ? (
        <FlatList
          data={profileDataForRecruiter}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Item
              position={item.position}
              company={item.Company.name}
              start={item.startAt}
              finish={item.finishAt}
              desc={item.description}
            />
          )}
        />
      ) : (
        <FlatList
          data={profileDataWorker}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Item
              position={item.position}
              company={item.Company.name}
              start={item.startAt}
              finish={item.finishAt}
              desc={item.description}
            />
          )}
        />
      )}
    </>
  );
};

export default SecondRoute;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 30,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    paddingBottom: 20,
  },
  profile: {
    height: 50,
    width: 45,
  },
  desc: {
    marginLeft: 20,
    marginRight: 50,
  },
  position: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2A36',
  },
  dueTime: {
    color: '#9EA0A5',
    fontSize: 16,
    fontWeight: '400',
  },
  totalTime: {
    color: '#9EA0A5',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 15,
  },
  company: {
    color: '#46505C',
    fontSize: 18,
    fontWeight: '400',
  },
  jobdesk: {
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});
