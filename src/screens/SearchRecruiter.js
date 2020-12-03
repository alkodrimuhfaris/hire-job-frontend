import React, {useState} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ModalLoading from '../components/ModalLoading';
import ModalCenter from '../components/ModalCenter';
import {Container, Content, Form, Item, Input} from 'native-base';
import SearchIcon from '../assets/img/search.svg';
import ListIcon from '../assets/img/list.svg';
import {useDispatch, useSelector} from 'react-redux';
import searchCompanyAction from '../redux/actions/searchCompany';

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.searchCompany.sortBy);
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.searchCompany.isLoading);
  const isError = useSelector((state) => state.searchCompany.isError);
  const isSuccess = useSelector((state) => state.searchCompany.isSuccess);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [modalError, setModalError] = useState(false);
  const [load, setLoad] = useState(false);

  const submitSearch = () => {
    dispatch(searchCompanyAction.addSearch(search));
    dispatch(searchCompanyAction.search(token, search));
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigation.navigate('ResultSearchRecruiter');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  React.useEffect(() => {
    if (isError) {
      setModalError(true);
    }
  }, [isError]);

  React.useEffect(() => {
    setLoad(isLoading);
    console.log(isLoading);
  }, [isLoading]);

  const changeSort = (n) => {
    setModalVisible(false);
    dispatch(searchCompanyAction.sortBy(n));
  };

  React.useEffect(() => {
    console.log(sortBy);
  }, [sortBy]);

  React.useEffect(() => {
    console.log(isLoading);
    console.log(isSuccess);
  }, [isLoading, isSuccess]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalParent}>
          <View style={styles.list}>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  changeSort(1);
                }}>
                <Text style={sortBy === 1 ? styles.choosen : null}>
                  Sortir berdasarkan nama
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  changeSort(2);
                }}>
                <Text style={sortBy === 2 ? styles.choosen : null}>
                  Sortir berdasarkan bidang
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  changeSort(3);
                }}>
                <Text style={sortBy === 3 ? styles.choosen : null}>
                  Sortir berdasarkan lokasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* modal loading */}
      <ModalLoading
        modalOpen={load}
        modalContent={
          <ActivityIndicator visible={load} size="large" color="#5E50A1" />
        }
      />

      {/* modal center */}
      <ModalCenter
        modalOpen={modalError}
        setModalOpen={setModalError}
        modalContent={
          <View style={styles.contentError}>
            <Text style={styles.txtContentErr}>Search Not Found</Text>
          </View>
        }
      />

      <Container style={styles.parent}>
        <Content style={styles.padding}>
          <Form style={styles.form}>
            <Item regular style={styles.searcInput}>
              <View style={styles.searchIcon}>
                <SearchIcon />
              </View>
              <Input
                style={styles.placeholder}
                value={search}
                onChangeText={(e) => setSearch(e)}
                placeholder="Search"
                placeholderTextColor="#9EA0A5"
                onSubmitEditing={submitSearch}
              />
            </Item>
            <Item regular style={styles.filter}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <ListIcon style={styles.listIcon} />
              </TouchableOpacity>
            </Item>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F6F7F8',
    position: 'relative',
  },
  form: {
    flexDirection: 'row',
  },
  searcInput: {
    position: 'relative',
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: '#ffff',
  },
  placeholder: {
    paddingLeft: 47,
    color: '#9EA0A5',
    fontSize: 14,
  },
  contentError: {
    padding: 28,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  txtContentErr: {
    color: '#5E50A1',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filter: {
    width: '20%',
    height: 50,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#ffff',
  },
  searchIcon: {
    position: 'absolute',
    marginLeft: 10,
  },
  listIcon: {
    marginLeft: 13,
    width: 24,
    height: 24,
  },
  modalParent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: 258,
    backgroundColor: '#ffff',
  },
  child: {
    borderBottomColor: 'gray',
    width: '100%',
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
  choosen: {
    color: '#5E50A1',
    fontWeight: 'bold',
  },
  padding: {
    paddingHorizontal: 16,
  },
});
