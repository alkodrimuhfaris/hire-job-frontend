import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import Card from '../components/HomeCardWorker';
import Icon from 'react-native-vector-icons/FontAwesome';
import sectionConditioner from '../helpers/sectionConditioner';

const dataCompany = [
  {
    id: 3,
    name: 'PT. eSea Indonesia',
    field: null,
    city: null,
    photo: null,
    authorId: 2,
    createdAt: '2020-12-02T09:34:30.000Z',
    updatedAt: '2020-12-02T09:34:30.000Z',
  },
  {
    id: 1,
    name: 'Tuku Bae',
    field: 'Ecommerce',
    city: 'Jakarta',
    photo: null,
    authorId: 1,
    createdAt: '2020-12-02T06:20:34.000Z',
    updatedAt: '2020-12-02T06:20:34.000Z',
  },
  {
    id: 2,
    name: 'Send Bae',
    field: 'Comunication',
    city: 'Jakarta',
    photo: null,
    authorId: 1,
    createdAt: '2020-12-02T06:20:34.000Z',
    updatedAt: '2020-12-02T06:20:34.000Z',
  },
];

// const FlatListItemSeparator = () => {
//   return (
//     //Item Separator
//     <View style={styles.listItemSeparatorStyle} />
//   );
// };

export default function ResultSearch({navigation}) {
  const data = dataCompany;
  const renderItem = sectionConditioner.byCity(data);

  return (
    <Container style={styles.parent}>
      <View style={styles.btnBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={35} />
        </TouchableOpacity>
      </View>
      <Content style={styles.content}>
        <View style={styles.flatList}>
          <FlatList
            data={renderItem}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <>
                  {item.title && <Text style={styles.title}>{item.title}</Text>}
                  <View style={styles.flatListWrapper}>
                    <FlatList
                      data={item.data}
                      numColumns={2}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                        return <Card />;
                      }}
                    />
                  </View>
                </>
              );
            }}
          />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F6F7F8',
  },
  btnBack: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 28,
  },
  content: {
    marginLeft: 16,
  },
  flatList: {
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 18,
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  flatListWrapper: {
    height: 'auto',
    marginBottom: 10,
  },
});
