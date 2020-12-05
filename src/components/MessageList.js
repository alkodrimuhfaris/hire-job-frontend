import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

// import assets
import worker from '../assets/img/profile.png';
import recruiter from '../assets/img/company.png';
import {API_URL_IMAGE} from '@env';

// import action
import messageAction from '../redux/actions/message';

export default function RenderItem({item, navigation}) {
  const dispatch = useDispatch();
  const selfId = useSelector((state) => state.auth.id);
  const isWorker = useSelector((state) => state.auth.isWorker);
  const avatar = isWorker ? recruiter : worker;
  const data = item;
  console.log(data);
  let {RecipientDetails, SenderDetails, sender, unread, createdAt} = data;

  const colluctorProfile =
    selfId === SenderDetails.id ? RecipientDetails : SenderDetails;

  const {id, name, photo, company} = colluctorProfile;
  const displayName = !isWorker ? name : company;

  const goToRoomChat = () => {
    dispatch(messageAction.clearMsg());
    navigation.navigate('ChatRoom', {id});
  };

  const unreadChat = selfId !== sender && unread;

  const messageTime = moment(createdAt);

  const yesterday = moment().subtract(1, 'days');

  const lastWeek = moment().subtract(7, 'days');

  let time = moment(createdAt).format('h:mm A');

  if (messageTime.isBefore(yesterday)) {
    time = moment(createdAt).format('dddd');
  } else if (messageTime.isBefore(lastWeek)) {
    time = moment(createdAt).format('MM. DD');
  }
  return (
    <TouchableOpacity onPress={() => goToRoomChat()}>
      <View style={styles.imgParent}>
        <Image
          source={photo ? {uri: API_URL_IMAGE + photo} : avatar}
          style={styles.image}
        />
        <View style={styles.parentList}>
          <View style={styles.list}>
            <Text style={[styles.listName, unreadChat ? styles.unread : null]}>
              {displayName}
            </Text>
            <Text style={styles.listTime}>{time}</Text>
          </View>
          <View style={styles.chatWrapper}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.message, unreadChat ? styles.unread : null]}>
              {data.message}
            </Text>
            <View style={styles.indicator}>
              {selfId !== sender ? (
                unread ? (
                  <View style={styles.dot}>
                    <Text>&nbsp;</Text>
                  </View>
                ) : null
              ) : (
                <Text style={styles.unreadIndicator}>
                  {unread ? '(send)' : '(read)'}
                </Text>
              )}
              <Text />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 37,
    marginTop: 20,
  },
  imgParent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    height: 46,
    width: 46,
    marginRight: 16,
    borderRadius: 40,
  },
  parentList: {
    height: '100%',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
  },
  listTime: {
    fontSize: 14,
    color: '#9EA0A5',
    marginRight: 10,
  },
  message: {
    fontSize: 14,
    color: '#9EA0A5',
    width: '80%',
    textAlign: 'right',
  },
  unread: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    color: '#9EA0A5',
    fontWeight: '600',
  },
  null: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  indicator: {
    flexDirection: 'row',
    width: '20%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#5E50A1',
  },
  unreadIndicator: {
    fontSize: 12,
    color: '#9EA0A5',
  },
});
