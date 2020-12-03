import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {Button, Card, Body, Header, Right, Text, Textarea} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import MessageBubble from '../components/bubbleChat';
import profile from '../assets/img/profile.png';

const ChatRoom = () => {
  const navigation = useNavigation();
  // data dummy
  const [data, setData] = useState([
    {
      message: 'hai',
      mine: 'mine',
    },
    {
      message: 'halo',
    },
    {
      message: 'whats upp ??',
      mine: 'mine',
    },
    {
      message: 'good',
    },
  ]);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('DetailWorker')}>
        <Header style={styles.header} transparent>
          <StatusBar backgroundColor={'#5E50A1'} />
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} color="#000000" />
          </Button>
          <Image style={styles.avatar} source={profile} />
          <View style={styles.identitiy}>
            <Text style={styles.name}>Louis tamlison</Text>
            <Text style={styles.status}>Frelencer</Text>
          </View>
          <Right />
        </Header>
      </TouchableOpacity>
      <View style={styles.parrent}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <MessageBubble mine={item.mine} text={item.message} />
          )}
          inverted
        />
      </View>
      <Card style={styles.inputChat} transparent>
        <Body style={styles.write}>
          <Textarea style={styles.textInput} placeholder="Pesan" />
          <TouchableOpacity transparent>
            <Icon
              name="paper-plane"
              color="#5E50A1"
              style={{marginLeft: 40}}
              size={25}
            />
          </TouchableOpacity>
        </Body>
      </Card>
    </>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F6F7F8',
    alignItems: 'center',
    height: 110,
  },
  parrent: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    paddingBottom: 50,
  },
  title: {
    fontSize: 25,
    marginLeft: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#000000',
    borderRadius: 50,
    marginLeft: 20,
  },
  identitiy: {
    marginLeft: 10,
  },
  name: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: '#000000',
  },
  inputChat: {
    flexDirection: 'row',
    position: 'absolute',
    padding: 10,
    bottom: -4,
    height: 50,
    width: 359,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowColor: '#000000',
    elevation: 4,
  },
  textInput: {
    width: 240,
    height: 50,
    fontSize: 18,
    marginLeft: 8,
    paddingTop: 15,
  },
  write: {
    flexDirection: 'row',
  },
});
