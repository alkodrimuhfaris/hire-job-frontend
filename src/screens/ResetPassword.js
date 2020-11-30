import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';

import Logo from '../assets/img/logo-purple.png';

export default function ResetPassword() {
  return (
    <Container style={styles.parent}>
      <Content style={styles.padding}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.header}>Reset password</Text>
        <Text style={styles.subHeader}>
          You need to change your password to activate your account.
        </Text>
        <View>
          <Text style={styles.label}>Kata sandi baru</Text>
          <Item regular style={styles.fieldColor}>
            <Input
              placeholder="Masukkan kata sandi baru"
              style={styles.input}
              secureTextEntry
            />
          </Item>
        </View>
        <View style={styles.fieldMargin}>
          <Text style={styles.label}>Konfirmasi kata sandi baru</Text>
          <Item regular style={styles.fieldColor}>
            <Input
              placeholder="Masukkan konfirmasi kata sandi baru"
              style={styles.input}
              secureTextEntry
            />
          </Item>
        </View>
        <Button block style={styles.btnPrimary}>
          <Text style={styles.textBtnPrimary}>Reset password</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#F6F7F8',
  },
  padding: {
    paddingHorizontal: 16,
  },
  header: {
    color: '#46505C',
    fontSize: 32,
    lineHeight: 43,
    fontWeight: '700',
    marginBottom: 7,
  },
  subHeader: {
    color: '#858D96',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    marginBottom: 50,
  },
  logo: {
    marginTop: 40,
    marginBottom: 35,
    height: 24,
    width: 86,
    resizeMode: 'cover',
  },
  label: {
    color: '#9EA0A5',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  input: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#858D96',
  },
  fieldColor: {
    backgroundColor: '#ffffff',
  },
  btnPrimary: {
    backgroundColor: '#FBB017',
    marginTop: 70,
  },
  textBtnPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  fieldMargin: {
    marginTop: 30,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
