import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content} from 'native-base';

import Logo from '../assets/img/logo-white.png';
import Background from '../assets/img/welcome.png';

export default function Welcome({navigation}) {
  return (
    <ImageBackground source={Background} style={styles.backgroundImg}>
      <Container style={styles.background}>
        <Content style={styles.padding}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.header}>
            Temukan developer berbakat & terbaik di berbagai bidang keahlian
          </Text>
        </Content>
        <View style={[styles.padding, styles.btnFooter]}>
          <Button
            block
            style={styles.btnPrimary}
            onPress={() => navigation.navigate('LoginWorker')}>
            <Text style={styles.textBtnPrimary}>Masuk sebagai pekerja</Text>
          </Button>
          <Text style={styles.center}>atau</Text>
          <Button block style={styles.btnSecondary}>
            <Text style={styles.textBtnSecondary}>Masuk sebagai perekrut</Text>
          </Button>
        </View>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
  },
  background: {
    backgroundColor: '#5E50A1a0',
  },
  backgroundImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 54,
    color: '#ffffff',
    marginTop: 90,
  },
  btnFooter: {
    marginBottom: 60,
  },
  btnPrimary: {
    backgroundColor: '#ffffff',
  },
  textBtnPrimary: {
    color: '#5E50A1',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  btnSecondary: {
    backgroundColor: '#5E50A1a0',
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  textBtnSecondary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  center: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 12,
  },
  logo: {
    marginTop: 40,
    height: 24,
    width: 86,
    resizeMode: 'cover',
  },
});
