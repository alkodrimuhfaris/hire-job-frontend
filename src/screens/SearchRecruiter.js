import React, {useState} from 'react';

import {StyleSheet, TouchableOpacity, Text, View, Modal} from 'react-native';
import {Container, Content, Form, Item, Input} from 'native-base';
import SearchIcon from '../assets/img/search.svg';
import ListIcon from '../assets/img/list.svg';

const Search = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  console.log('search 2',search,setSearch);
  const submitSearch = () => {
    navigation.navigate('ResultSearchRecruiter');
  };

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
                <Text>Sortir berdasarkan bidang</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.child}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Sortir berdasarkan lokasi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  padding: {
    paddingHorizontal: 16,
  },
});
