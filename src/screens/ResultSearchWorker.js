import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import Card from '../components/HomeCardRecruiter';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ResultSearch({navigation}) {
  const DATA = [
    {
      id: 1,
      name: 'asd',
      skill: 'web',
    },
    {
      id: 2,
      name: 'asd',
      skill: 'web',
    },
    {
      id: 3,
      name: 'asd',
      skill: 'web',
    },
  ];
  return (
    <Container style={styles.parent}>
      <View style={styles.btnBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={35} />
        </TouchableOpacity>
      </View>
      <Content style={styles.content}>
        <View style={styles.flatList}>
          <Text style={styles.title}>Web developer</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Card item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.flatList}>
          <Text style={styles.title}>Android developer</Text>
          <FlatList
            horizontal
            data={DATA}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Card item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#E5E5E5',
  },
  btnBack: {
    marginTop: 28,
    marginBottom: 28,
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
});
