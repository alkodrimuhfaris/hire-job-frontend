import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Text, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL_IMAGE} from '@env';

// import actions
import portfolioAction from '../redux/actions/portfolio';

import ModalLoading from '../components/ModalLoading';

const FirstRoute = ({token, navigation}) => {
  const dispatch = useDispatch();
  const {portfolioData, isDelete, deleteIsLoading} = useSelector(
    (state) => state.portfolio,
  );
  const {userDetailsData} = useSelector((state) => state.home);
  console.log(userDetailsData.Portofolios);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);
  const [id, setId] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [github, setGithub] = useState('');

  function setData(_img, _name, _type, _description, _company, _link, _github) {
    setModalVisible(true);
    setImg(_img);
    setName(_name);
    setType(_type ? 'Aplikasi web' : 'Aplikasi mobile');
    setDescription(_description);
    setCompany(_company);
    setLink(_link);
    setGithub(_github);
  }

  function setAction(_id) {
    setActionVisible(true);
    setId(_id);
  }

  async function deletePortfolio(_id) {
    await dispatch(portfolioAction.deletePortfolio(token, _id));
    setActionVisible(false);
  }

  function updatePortfolio(_id) {
    setActionVisible(false);
    dispatch(portfolioAction.clearAlert());
    navigation.navigate('EditPortfolio', {id: _id});
  }

  useEffect(() => {
    if (token) {
      dispatch(portfolioAction.getPortfolioList(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isDelete) {
      dispatch(portfolioAction.clearAlert());
      dispatch(portfolioAction.getPortfolioList(token));
    }
  });

  return (
    <>
      <View style={styles.portofolioContainer}>
        <FlatList
          data={token ? portfolioData : userDetailsData.Portofolios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.space}
              onPress={() =>
                setData(
                  item.photo,
                  item.name,
                  item.type,
                  item.description,
                  item.company,
                  item.publicLink,
                  item.repoLink,
                )
              }
              onLongPress={token && (() => setAction(item.id))}>
              <Image
                source={{uri: `${API_URL_IMAGE}${item.photo}`}}
                style={styles.portofolio}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{uri: `${API_URL_IMAGE}${img}`}}
              style={styles.portofolio}
            />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.apps}>{type}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.sosmed}>
              <Icon name="map-marker" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>{company}</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="globe" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>{link}</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>{github}</Text>
            </View>
            <Button
              block
              style={styles.btnPrimary}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textBtnPrimary}>Close</Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={actionVisible}
        onRequestClose={() => setActionVisible(false)}>
        <View style={styles.modalParent}>
          <View style={styles.list}>
            <View style={styles.child}>
              <TouchableOpacity onPress={() => updatePortfolio(id)}>
                <Text>Edit Portofolio</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity onPress={() => deletePortfolio(id)}>
                <Text>Hapus Portofolio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ModalLoading modalOpen={deleteIsLoading} />
    </>
  );
};

export default FirstRoute;

const styles = StyleSheet.create({
  portofolioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  portofolio: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  space: {
    marginBottom: 20,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: '#5E50A1',
    marginTop: 32,
  },
  textBtnPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  sosmed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sosmedText: {
    color: '#9EA0A5',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  apps: {
    fontSize: 14,
    color: '#1F2A36',
    fontWeight: '400',
    marginBottom: 10,
  },
  description: {
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
