import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import sectionConditioner from '../helpers/sectionConditioner';
import {useDispatch, useSelector} from 'react-redux';
import searchCompanyAction from '../redux/actions/searchCompany';
import SearchCompanyCard from '../components/SearchCompanyCard';
import homeAction from '../redux/actions/home';

export default function ResultSearch({navigation}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchCompany.searchResult);
  const pageInfo = useSelector((state) => state.searchCompany.pageInfo);
  const search = useSelector((state) => state.searchCompany.searchQuery);
  const sortBy = useSelector((state) => state.searchCompany.sortBy);
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
        const item = sectionConditioner.byField(data);
        setRenderItem(item);
      } else if (sortBy === 3) {
        const item = sectionConditioner.byCity(data);
        setRenderItem(item);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const doRefresh = () => {
    setLoading(true);
    dispatch(searchCompanyAction.search(token, search));
    setLoading(false);
  };

  const goNextPage = () => {
    const nextPage = pageInfo.nextLink ? pageInfo.nextLink.slice(28) : null;
    if (nextPage) {
      dispatch(searchCompanyAction.scrollSearch(token, nextPage));
    }
  };

  async function getRecruiterDetail(id) {
    await dispatch(homeAction.getDetailsUser(token, id));
    navigation.navigate('DetailRecruiter');
  }

  return (
    <View style={styles.parent}>
      <View style={styles.btnBack}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
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
                onEndReached={goNextPage}
                onEndReachedThreshold={0.5}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => getRecruiterDetail(item.id)}
                      style={[
                        styles.cardWrapper,
                        index > renderItem.length - 2
                          ? styles.cardWrapperEnd
                          : null,
                      ]}>
                      <SearchCompanyCard item={item} />
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
              onEndReached={goNextPage}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
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
                        renderItem={({item: itemDetail, index}) => {
                          return (
                            <TouchableOpacity
                              onPress={() => getRecruiterDetail(itemDetail.id)}
                              style={[
                                styles.cardWrapper,
                                index > renderItem.length - 2
                                  ? styles.cardWrapperEnd
                                  : null,
                              ]}>
                              <SearchCompanyCard item={itemDetail} />
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F6F7F8',
    flex: 1,
  },
  btnBack: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 28,
    backgroundColor: '#F6F7F8',
  },
  btnWrapper: {
    backgroundColor: '#F6F7F8',
  },
  flatlistParent: {
    height: '100%',
    alignItems: 'center',
  },
  cardWrapper: {
    marginVertical: 3,
  },
  cardWrapperEnd: {
    marginTop: 3,
    marginBottom: 20,
  },
  content: {
    marginLeft: 16,
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  flatList: {
    flex: 1,
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
