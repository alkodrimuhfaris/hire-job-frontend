import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL_IMAGE} from '@env';
import ModalLoading from '../components/ModalLoading';
import dayjs from 'dayjs';

// import modal alert for delete
import ModalAlert from '../components/ModalAlert';

// import actions
import profileAction from '../redux/actions/profileWorker';
import workerExpAction from '../redux/actions/workExperience';

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
            {dayjs(this.props.start).format('MMM YYYY')}{' '}
            {this.props.finish
              ? '- ' + dayjs(this.props.finish).format('MMM YYYY')
              : '- Sekarang'}
          </Text>
          <Text style={styles.jobdesk}>{this.props.desc}</Text>
        </View>
      </View>
    );
  }
}

const SecondRoute = ({token, navigation}) => {
  console.log(navigation);
  const dispatch = useDispatch();
  const {isWorker} = useSelector((state) => state.auth);
  const [actionVisible, setActionVisible] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [profileDataRender, setProfileDataRender] = React.useState([]);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);

  const profileIsLoading = useSelector(
    (state) => state.profileWorker.profileIsLoading,
  );

  const dataExperience = useSelector(
    (state) => state.profileWorker.dataExperienceWorker,
  );
  const profileDataWorker = useSelector(
    (state) => state.profileWorker.profileExperience,
  );
  const profileDataForRecruiter = useSelector(
    (state) => state.home.userDetailsData.WorkExperiences,
  );
  const isDelete = useSelector((state) => state.workExperience.isDelete);
  const expDetail = useSelector((state) => state.workExperience.expDetail);
  const deleteIsLoading = useSelector(
    (state) => state.workExperience.deleteIsLoading,
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

  function setAction(_id) {
    setActionVisible(true);
    setId(_id);
  }

  async function deleteWorkExp() {
    await dispatch(workerExpAction.deleteExp(token, id));
    setActionVisible(false);
  }

  function updateExperience() {
    setActionVisible(false);
    navigation.navigate('EditExperience', {id: id});
    console.log(id);
  }

  React.useEffect(() => {
    console.log(isDelete);
    if (isDelete) {
      dispatch(profileAction.getWorkerExp(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete]);

  React.useEffect(() => {
    if (isWorker) {
      setProfileDataRender(profileDataWorker);
    } else {
      setProfileDataRender(profileDataForRecruiter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileDataWorker, profileDataForRecruiter]);

  React.useEffect(() => {
    if (id) {
      dispatch(workerExpAction.getWorkerExpById(token, id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <ScrollView>
        <FlatList
          data={profileDataRender}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={isWorker && token ? () => setAction(item.id) : () => {}}>
              <Item
                position={item.position}
                company={item.Company.name}
                start={item.startAt}
                finish={item.finishAt}
                desc={item.description}
                photo={item.Company.photo}
              />
            </TouchableOpacity>
          )}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={actionVisible}
        onRequestClose={() => setActionVisible(false)}>
        <View style={styles.modalParent}>
          <View style={styles.list}>
            <View style={styles.child}>
              <TouchableOpacity onPress={() => updateExperience()}>
                <Text>Sunting Pengalaman Kerja</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity onPress={() => setDeleteConfirm(true)}>
                <Text>Hapus Pengalaman Kerja</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ModalAlert
        content="Anda yakin untuk menghapus pengalaman pekerjaan ini?"
        okText="Hapus"
        cancelText="Batal"
        setOk={() => deleteWorkExp()}
        setModalOpen={setDeleteConfirm}
        modalOpen={deleteConfirm}
      />

      <ModalLoading modalOpen={deleteIsLoading || profileIsLoading} />
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
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  list: {
    width: '65%',
    backgroundColor: '#ffff',
  },
  child: {
    borderBottomColor: 'gray',
    width: '100%',
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
