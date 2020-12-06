import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

// import actions
import authAction from '../redux/actions/auth';

import Logo from '../assets/img/logo-purple.png';

export default function ResetPassword({navigation, route}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const {id} = route.params;

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password setidaknya terdiri dari 8 karakter')
      .required('Password dibutuhkan'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password tidak cocok')
      .required('Konfirmasi password dibutuhkan'),
  });

  function doResetPassword(values) {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };
    dispatch(authAction.resetPassword(id, data));
  }

  useEffect(() => {
    if (auth.isReset) {
      Alert.alert('Reset password berhasil!', 'Harap login...');
      navigation.navigate('Welcome');
      dispatch(authAction.clearAlert());
    }
  });

  return (
    <Container style={styles.parent}>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => doResetPassword(values)}>
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
              You need to change your password to activate your account.
            </Text>
            <View>
              <Text style={styles.label}>Kata sandi baru</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan kata sandi baru"
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
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Konfirmasi kata sandi baru</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan konfirmasi kata sandi baru"
                  style={styles.input}
                  secureTextEntry
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
              </Item>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>
            <Button block style={styles.btnPrimary} onPress={handleSubmit}>
              <Text style={styles.textBtnPrimary}>Reset password</Text>
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
  fieldMargin: {
    marginTop: 30,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
