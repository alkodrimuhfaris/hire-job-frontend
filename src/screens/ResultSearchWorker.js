import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import sectionConditioner from '../helpers/sectionConditioner';
import {useDispatch, useSelector} from 'react-redux';
import searchWorkerAction from '../redux/actions/searchWorker';
import SearchWorkerCard from '../components/SearchWorkerCard';
import homeAction from '../redux/actions/home';

export default function ResultSearch({navigation}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchWorker.searchResult);
  const pageInfo = useSelector((state) => state.searchWorker.pageInfo);
  const search = useSelector((state) => state.searchWorker.searchQuery);
  const sortBy = useSelector((state) => state.searchWorker.sortBy);
  const token = useSelector((state) => state.auth.token);
  const [renderItem, setRenderItem] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (data.length) {
      console.log('this is here');
      console.log(sortBy);
      if (sortBy === 1) {
        setRenderItem(data);
      } else if (sortBy === 2) {
        const item = sectionConditioner.byCity(data);
        setRenderItem(item);
      } else if (sortBy === 3) {
        const item = sectionConditioner.bySkill(data);
        setRenderItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const doRefresh = () => {
    setLoading(true);
    dispatch(searchWorkerAction.search(token, search));
    setLoading(false);
  };

  async function getWorkerDetail(id) {
    await dispatch(homeAction.getDetailsUser(token, id));
    navigation.navigate('DetailWorker');
  }

  const nextPage = () => {
    if (pageInfo.pages > pageInfo.currentPage) {
      dispatch(
        searchWorkerAction.scrollSearch(
          token,
          search,
          pageInfo.currentPage + 1,
        ),
      );
    }
  };

  return (
    <Container style={styles.parent}>
      <View style={styles.btnBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={35} />
        </TouchableOpacity>
      </View>
      <Content style={styles.content}>
        {sortBy === 1 ? (
          <Text style={styles.title}>Berdasarkan Nama</Text>
        ) : null}
        <View style={styles.flatList}>
          {!renderItem.length ? null : sortBy === 1 ? (
            <View style={styles.flatlistParent}>
              <FlatList
                data={renderItem}
                onRefresh={doRefresh}
                refreshing={loading}
                onEndReached={nextPage}
                onEndReachedThreshold={0.5}
                numColumns={2}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => getWorkerDetail(item.id)}
                      style={styles.cardWrapper}>
                      <SearchWorkerCard item={item} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <FlatList
              data={renderItem}
              onRefresh={doRefresh}
              refreshing={loading}
              onEndReached={nextPage}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <>
                    {item.title && (
                      <Text style={styles.title}>{item.title}</Text>
                    )}
                    <View style={styles.flatListWrapper}>
                      <FlatList
                        data={item.data}
                        numColumns={2}
                        keyExtractor={(_item, index) => index.toString()}
                        renderItem={({item: itemDetail}) => {
                          return (
                            <TouchableOpacity
                              onPress={() => getWorkerDetail(itemDetail.id)}
                              style={styles.cardWrapper}>
                              <SearchWorkerCard item={itemDetail} />
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </>
                );
              }}
            />
          )}
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
  flatlistParent: {
    flex: 1,
    alignItems: 'center',
  },
  cardWrapper: {
    marginVertical: 3,
  },
  content: {
    marginLeft: 16,
  },
  flatList: {
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    marginVertical: 18,
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
