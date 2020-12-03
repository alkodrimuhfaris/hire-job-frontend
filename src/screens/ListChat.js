/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import Null from '../assets/img/bgChatNull.svg'
import {useSelector, useDispatch} from 'react-redux';
import messageAction from '../redux/actions/message';
import RenderItem from '../components/MessageList';

// import assets

export default function ListChat({navigation}) {
  const dispatch = useDispatch();

  const {token, id: selfId} = useSelector((state) => state.auth);
  const chatList = useSelector((state) => state.message.listAllChat);
  const pageInfo = useSelector((state) => state.message.allChatPageInfo);
  const isLoading = useSelector((state) => state.message.isLoading);
  const [loading, setLoading] = React.useState(false);
  console.log(chatList.length)
  React.useEffect(() => {
    dispatch(messageAction.getAllList(token));
  }, []);

  React.useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  const doRefresh = () => {
    setLoading(true);
    dispatch(messageAction.getAllList(token));
    setLoading(false);
  };

  const nextPage = () => {
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(messageAction.allListScroll(token, pageInfo.currentPage + 1));
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.title}>
        <Text style={styles.header}>Utama</Text>
      </View>
      {chatList.length === 0 ? (
        <View style={styles.null}>
        <Null />
      </View>
      ):(
        <View>
        <FlatList
          data={chatList}
          onRefresh={doRefresh}
          refreshing={loading}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(index) => index.id.toString()}
        />
      </View>
      )

      }
      
    </View>
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
});
