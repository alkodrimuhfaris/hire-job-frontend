import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import portofolio from '../assets/img/portofolio.jpg';

const FirstRoute = () => (
  <>
    <View style={styles.portofolioContainer}>
      <Image source={portofolio} style={styles.portofolio} />
    </View>
  </>
);

export default FirstRoute;
const styles = StyleSheet.create({
  portofolioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  portofolio: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});
