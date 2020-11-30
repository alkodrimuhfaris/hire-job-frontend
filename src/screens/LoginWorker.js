import React from 'react';
import {Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Logo from '../assets/img/logo-purple.png';

export default function LoginWorker({navigation}) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email field is required'),
    password: Yup.string()
      .min(6, 'Password required minimal 6 characters')
      .required('Password field is required'),
  });

  return (
    <Container style={styles.parent}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <Content style={styles.padding}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.header}>Login</Text>
            <View>
              <Text style={styles.label}>Email</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan alamat email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </Item>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Kata Sandi</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan kata sandi"
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </Item>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text style={styles.forgot}>Lupa kata sandi?</Text>
            </TouchableOpacity>
            <Button block style={styles.btnPrimary} onPress={handleSubmit}>
              <Text style={styles.textBtnPrimary}>Masuk</Text>
            </Button>
            <View style={styles.register}>
              <Text style={styles.registerText}>Anda belum punya akun? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignupWorker')}>
                <Text style={[styles.registerText, styles.registerLink]}>
                  Daftar disini
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        )}
      </Formik>
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
  error: {
    fontSize: 12,
    color: 'red',
  },
});
