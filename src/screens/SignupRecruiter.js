import React, {useEffect} from 'react';
import {Image, TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import {Button, Text, Container, Content, Item, Input} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import authAction from '../redux/actions/auth';

import Logo from '../assets/img/logo-purple.png';

export default function SignupRecruiter({navigation}) {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name field is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email field is required'),
    company: Yup.string().required('Company field is required'),
    jobTitle: Yup.string().required('Position field is required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone number required minimal 10 chars')
      .max(12, 'Phone number required maximal 12 chars')
      .required('Phone number field is required'),
    password: Yup.string()
      .min(8, 'Password required minimal 8 characters')
      .required('Password field is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Password doesn't match")
      .required('Confirm password field is required'),
  });

  function doRegisterRecruiter(data) {
    dispatch(authAction.registerRecruiter(data));
    if (register.isError) {
      Alert.alert('Gagal', 'Register gagal', [
        {text: 'OK', onPress: () => console.log('OK press')},
      ]);
      dispatch(authAction.clearAlert());
    } else {
      Alert.alert(
        'Sukses',
        'Register sukses',
        [{text: 'OK', onPress: () => console.log('OK press')}],
        {cancelable: false},
      );
      dispatch(authAction.clearAlert());
      navigation.navigate('LoginRecruiter');
    }
  }

  return (
    <Container style={styles.parent}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          company: '',
          jobTitle: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => doRegisterRecruiter(values)}>
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
            <Text style={styles.header}>Signup</Text>
            <View>
              <Text style={styles.label}>Nama</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan nama panjang"
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </Item>
              {touched.name && errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
            </View>
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Email</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan alamat email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
              </Item>
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </View>
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Perusahaan</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan nama perusahaan"
                  style={styles.input}
                  onChangeText={handleChange('company')}
                  onBlur={handleBlur('company')}
                  value={values.company}
                />
              </Item>
              {touched.company && errors.company && (
                <Text style={styles.error}>{errors.company}</Text>
              )}
            </View>
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Jabatan</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Posisi di perusahaan anda"
                  style={styles.input}
                  onChangeText={handleChange('jobTitle')}
                  onBlur={handleBlur('jobTitle')}
                  value={values.jobTitle}
                />
              </Item>
              {touched.jobTitle && errors.jobTitle && (
                <Text style={styles.error}>{errors.jobTitle}</Text>
              )}
            </View>
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>No handphone</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan no handphone"
                  style={styles.input}
                  keyboardType={'phone-pad'}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
              </Item>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
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
            <View style={styles.fieldMargin}>
              <Text style={styles.label}>Konfirmasi kata Sandi</Text>
              <Item regular style={styles.fieldColor}>
                <Input
                  placeholder="Masukkan konfirmasi kata sandi"
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
              <Text style={styles.textBtnPrimary}>Daftar</Text>
            </Button>
            <View style={styles.register}>
              <Text style={styles.registerText}>Anda sudah punya akun? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginRecruiter')}>
                <Text style={[styles.registerText, styles.registerLink]}>
                  Masuk disini
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
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 110,
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
