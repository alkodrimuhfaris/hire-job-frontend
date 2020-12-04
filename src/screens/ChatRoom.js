/* eslint-disable react-hooks/exhaustive-deps */
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
import {useSelector, useDispatch} from 'react-redux';
import {API_URL_IMAGE, API_URL} from '@env';
import Null from '../assets/img/bgChatNull.svg';

import MessageBubble from '../components/bubbleChat';
import photoPlaceholder from '../assets/img/profile.png';
import messageAction from '../redux/actions/message';

const ChatRoom = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {id, message = ''} = route.params;
  const {isWorker, token, id: selfId} = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.message.profileColluctor);
  const data = useSelector((state) => state.message.privateChat);
  const pageInfo = useSelector((state) => state.message.privateChatPageInfo);
  const isLoading = useSelector((state) => state.message.isLoading);
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const urlImage = isWorker ? API_URL_IMAGE : API_URL;

  React.useEffect(() => {
    if (Object.keys(profile).length) {
      setName(isWorker ? profile.company : profile.name);
    }
  }, [profile]);

  React.useEffect(() => {
    console.log(data);
    dispatch(messageAction.getProfile(token, id));
    dispatch(messageAction.getAllList(token));
    dispatch(messageAction.readChat(token, id));
  }, [data]);

  React.useEffect(() => {
    console.log(id);
    dispatch(messageAction.getProfile(token, id));
    dispatch(messageAction.getPrivate(token, id));
    dispatch(messageAction.readChat(token, id));
  }, []);

  const doRefresh = () => {
    setLoading(true);
    dispatch(messageAction.getPrivate(token, id));
    setLoading(false);
  };

  const nextPage = () => {
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(
        messageAction.privateScroll(token, id, pageInfo.currentPage + 1),
      );
    }
  };

  const [textMessage, setTextMessage] = React.useState(message);

  const sendChat = () => {
    console.log(textMessage);
    dispatch(messageAction.sendChat(token, id, textMessage));
    setTextMessage('');
  };

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('DetailWorker')}>
        <Header style={styles.header} transparent>
          <StatusBar backgroundColor={'#5E50A1'} />
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={40} color="#000000" />
          </Button>
          <Image
            style={styles.avatar}
            source={
              profile.photo ? {uri: urlImage + profile.photo} : photoPlaceholder
            }
          />
          <View style={styles.identitiy}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.status}>{profile.jobTitle}</Text>
          </View>
          <Right />
        </Header>
      </TouchableOpacity>
      <View style={styles.parrent}>
        {
          <FlatList
            refreshing={loading}
            onRefresh={doRefresh}
            onEndReached={nextPage}
            onEndReachedThreshold={0.5}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <MessageBubble
                sender={item.sender}
                selfId={selfId}
                text={item.message}
              />
            )}
            inverted
          />
        }
      </View>
      <Card style={styles.inputChat} transparent>
        <Body style={styles.write}>
          <Textarea
            style={styles.textInput}
            placeholder="Pesan"
            value={textMessage}
            onChangeText={(e) => setTextMessage(e)}
          />
          <TouchableOpacity onPress={() => sendChat()} transparent>
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginLeft: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    aspectRatio: 1 / 1,
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
    width: '100%',
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
