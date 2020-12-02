import React, {useState,useEffect} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  List,
  ListItem,
} from 'native-base';
import SearchIcon from '../assets/img/search.svg';
import ListIcon from '../assets/img/list.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const data =[
  {
    name:'ardian'
  },
  {
    name:'mamat'
  }
]


const Search = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search,setSearch] = useState('');
  const [searchResult,setSearchResult] = useState([])

  const handleChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  // console.log(searchResult);
  useEffect(() => {
    console.log(data);
   const results = data.filter( (test) => test.name);
   setSearchResult(results)
  }, [search])
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalParent}>
          <View style={styles.list}>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan nama</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan Skill</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan Lokasi</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan freelance</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan fulltime</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Container style={styles.parent}>
        <Content>
          <Form style={styles.form}>
            <Item regular style={styles.searcInput}>
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => navigation.navigate('ResultSearch')}>
                <SearchIcon />
              </TouchableOpacity>
              <Input
                style={styles.placeholder}
                placeholder="Android developer"
                placeholderTextColor="#9EA0A5"
                value={search}
                onChangeText={() => handleChange()}
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
          {searchResult.map(item => (

          <Text>{item.name}</Text>
          ))
        }
        </Content>
      </Container>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#E5E5E5',
    position: 'relative',
  },
  form: {
    flexDirection: 'row',
  },
  searcInput: {
    position: 'relative',
    width: 280,
    height: 50,
    marginLeft: 26,
    marginTop: 70,
    borderRadius: 4,
    backgroundColor: '#ffff',
  },
  placeholder: {paddingLeft: 47, color: '#9EA0A5', fontSize: 14},
  filter: {
    width: 53,
    height: 50,
    marginTop: 70,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#ffff',
  },
  searchIcon: {position: 'absolute', marginLeft: 10},
  listIcon: {marginLeft: 13, width: 24, height: 24},
  modalParent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  list: {width: 258, height: 300, backgroundColor: '#ffff'},
  child: {
    borderBottomColor: 'gray',
    width: '100%',
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
