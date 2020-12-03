import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Container, Title, Form, Label} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

import {registerWorker} from '../redux/actions/auth';

import Logo from '../assets/img/logo-purple.png';

const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter at least 2 names')
    .required('Name dibutuhkan'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Alamat email dibutuhkan'),
  phone: yup
    .number()
    .min(10, 'Phone number required minimal 10 chars')
    .max(12, 'Phone number required maximal 12 chars')
    .required('Phone number field is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password dibutuhkan'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Password doesn't match")
    .required('Confirm password field is required'),
});

const SignupWorker = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Container>
      <ScrollView>
        <View style={styles.padding}>
          <Image source={Logo} style={styles.logo} />
          <Title style={styles.title}>Signup</Title>
          <Text note>Cari pekerjaan yang sesuai impianmu</Text>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              name: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values) =>
              console.log(
                values.name,
                values.email,
                values.phone,
                values.password,
                values.confirmPassword,
              )
            }>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View style={styles.register}>
                <Form>
                  <Label style={styles.label}>Nama</Label>
                  <TextInput
                    name="name"
                    placeholder="Masukkan nama panjang"
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {errors.name && (
                    <Text style={styles.textError}>{errors.name}</Text>
                  )}
                  <Label style={styles.label}>Email</Label>
                  <TextInput
                    name="email"
                    placeholder="Masukkan alamat email"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                  <Label style={styles.label}>Phone</Label>
                  <TextInput
                    name="phone"
                    placeholder="Masukkan no handphone"
                    style={styles.textInput}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                  {errors.phone && (
                    <Text style={styles.textError}>{errors.phone}</Text>
                  )}
                  <Label style={styles.label}>Kata Sandi</Label>
                  <TextInput
                    name="password"
                    placeholder="Masukkan kata sandi"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                  <Label style={styles.label}>Konfirmasi Kata Sandi</Label>
                  <TextInput
                    name="password"
                    placeholder="Konfirmasi kata sandi"
                    style={styles.textInput}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.textError}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  <Button
                    style={styles.btnSignup}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    block
                    transparent>
                    <Text style={styles.btntext}>daftar</Text>
                  </Button>
                  <View style={styles.linkLogin}>
                    <Text style={styles.textSign}>
                      Already have a account?{' '}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.link}>Masuk Disini</Text>
                    </TouchableOpacity>
                  </View>
                </Form>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignupWorker;

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
    backgroundColor: '#F6F7F8',
    flex: 1,
  },
  logo: {
    marginTop: 40,
    height: 24,
    width: 86,
    resizeMode: 'cover',
  },
  title: {
    color: '#000000',
    paddingTop: 25,
    paddingBottom: 5,
    paddingLeft: 2,
    fontSize: 30,
    textTransform: 'capitalize',
  },
  textInput: {
    height: 50,
    borderColor: '#e2e5ed',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 10,
  },
  label: {
    marginTop: 20,
    color: '#9ea0a5',
    fontSize: 12,
  },
  btnSignup: {
    marginTop: 50,
    backgroundColor: '#fbb017',
  },
  linkLogin: {
    flexDirection: 'row',
    textTransform: 'capitalize',
    justifyContent: 'center',
    marginTop: 28,
    marginBottom: 110,
  },
  link: {
    color: '#fbb017',
  },
  btntext: {
    color: '#ffffff',
  },
  textError: {
    fontSize: 10,
    color: 'red',
  },
});
