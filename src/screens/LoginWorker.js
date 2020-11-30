import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';

import Logo from '../assets/img/logo-purple.png';

export default function LoginWorker() {
  return (
    <Container style={styles.parent}>
      <Content style={styles.padding}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.header}>Login</Text>
        <View>
          <Text style={styles.label}>Email</Text>
          <Item regular style={styles.fieldColor}>
            <Input placeholder="Masukkan alamat email" style={styles.input} />
          </Item>
        </View>
        <View style={styles.fieldMargin}>
          <Text style={styles.label}>Kata Sandi</Text>
          <Item regular style={styles.fieldColor}>
            <Input
              placeholder="Masukkan kata sandi"
              style={styles.input}
              secureTextEntry
            />
          </Item>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Lupa kata sandi</Text>
        </TouchableOpacity>
        <Button block style={styles.btnPrimary}>
          <Text style={styles.textBtnPrimary}>Masuk</Text>
        </Button>
        <View style={styles.register}>
          <Text style={styles.registerText}>Anda belum punya akun? </Text>
          <TouchableOpacity>
            <Text style={[styles.registerText, styles.registerLink]}>
              Daftar disini
            </Text>
          </TouchableOpacity>
        </View>
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
    fontFamily: 'open sans',
  },
  fieldColor: {
    backgroundColor: '#ffffff',
  },
  fieldMargin: {
    marginTop: 30,
  },
  forgot: {
    textAlign: 'right',
    color: '#1F2A36',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    marginVertical: 24,
  },
  btnPrimary: {
    backgroundColor: '#FBB017',
  },
  textBtnPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  registerText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '400',
    color: '#1F2A36',
  },
  registerLink: {
    color: '#FBB017',
  },
});
