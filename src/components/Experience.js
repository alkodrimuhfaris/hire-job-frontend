import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'native-base';

import company from '../assets/img/tokopedia.png';

const SecondRoute = () => (
  <>
    <View style={styles.card}>
      <Image source={company} style={styles.profile} />
      <View style={styles.desc}>
        <Text style={styles.position}>Engginer</Text>
        <Text>TokoPedia</Text>
        <Text style={styles.dueTime}>July 19 - January 20</Text>
        <Text style={styles.totalTime}>6 Mounth</Text>
        <Text>
          Material design themed tab bar. To customize the tab bar, you'd need
          to use the renderTabBar prop of TabView to render the TabBar and pass
          additional props. For example, to customize the{' '}
        </Text>
      </View>
    </View>
  </>
);

export default SecondRoute;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 30,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
    paddingBottom: 20,
  },
  profile: {
    height: 50,
    width: 45,
  },
  desc: {
    marginLeft: 20,
    marginRight: 50,
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dueTime: {
    color: '#8e8e8e',
  },
  totalTime: {
    color: '#8e8e8e',
    marginBottom: 15,
  },
});
