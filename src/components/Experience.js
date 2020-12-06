import React, {useEffect} from 'react';
import {Image, StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL_IMAGE} from '@env';

// import actions
import profileAction from '../redux/actions/profileWorker';

// import assets
import Avatar from '../assets/img/company.png';

class Item extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <Image
          source={
            this.props.photo
              ? {uri: `${API_URL_IMAGE}${this.props.photo}`}
              : Avatar
          }
          style={styles.profile}
        />
        <View style={styles.desc}>
          <Text style={styles.position}>{this.props.position}</Text>
          <Text style={styles.company}>{this.props.company}</Text>
          <Text style={styles.dueTime}>
            {this.props.start}{' '}
            {this.props.finish
              ? 's/d' + this.props.finish
              : ' - sampai sekarang'}
          </Text>
          <Text style={styles.jobdesk}>{this.props.desc}</Text>
        </View>
      </View>
    );
  }
}

const SecondRoute = () => {
  const dispatch = useDispatch();
  const {isWorker, token} = useSelector((state) => state.auth);
  const dataExperience = useSelector(
    (state) => state.profileWorker.dataExperienceWorker,
  );
  const profileDataWorker = useSelector(
    (state) => state.profileWorker.profileExperience,
  );
  const profileDataForRecruiter = useSelector(
    (state) => state.home.userDetailsData.WorkExperiences,
  );
  useEffect(() => {
    if (isWorker) {
      dispatch(profileAction.getWorkerExp(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const nextPage = async () => {
    if (isWorker) {
      if (dataExperience.pageInfo.pages > dataExperience.pageInfo.currentPage) {
        dispatch(
          profileAction.getWorkerExp(
            token,
            dataExperience.pageInfo.currentPage + 1,
          ),
        );
      }
    }
  };

  const profileDataRender = profileDataForRecruiter
    ? profileDataForRecruiter
    : profileDataWorker;

  return (
    <>
      <ScrollView>
        <FlatList
          data={profileDataRender}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Item
              position={item.position}
              company={item.Company.name}
              start={item.startAt}
              finish={item.finishAt}
              desc={item.description}
              photo={item.Company.photo}
            />
          )}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
        />
      </ScrollView>
    </>
  );
};

export default SecondRoute;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 20,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    paddingBottom: 20,
  },
  profile: {
    height: 38,
    width: 38,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  desc: {
    marginLeft: 20,
    flex: 1,
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
