import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';

import Logo from '../assets/img/logo-purple.png';

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email field is required'),
  });

  function isEmailValid(data) {
    dispatch(authAction.forgotPassword(data));
  }

  useEffect(() => {
    if (auth.isEmailError) {
      Alert.alert(auth.alertMsg);
      dispatch(authAction.clearAlert());
    }

    if (auth.emailValidData.id) {
      navigation.navigate('Reset', {id: auth.emailValidData.id});
      dispatch(authAction.clearAlert());
    }
  });

  return (
    <Container style={styles.parent}>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => isEmailValid(values)}>
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
            <Text style={styles.header}>Reset password</Text>
            <Text style={styles.subHeader}>
              Enter your password user account’s verified email and we will send
              you a password reset link.
            </Text>
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
            <Button block style={styles.btnPrimary} onPress={handleSubmit}>
              <Text style={styles.textBtnPrimary}>
                Send password reset email
              </Text>
            </Button>
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
  error: {
    fontSize: 12,
    color: 'red',
  },
});
