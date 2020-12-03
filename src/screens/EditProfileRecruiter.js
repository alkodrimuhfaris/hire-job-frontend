import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Card, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import Avatar from '../assets/img/profile.png';

import {useSelector, useDispatch} from 'react-redux';

import profileAction from '../redux/actions/profileRecruiter';

import {API_URL_IMAGE} from '@env';

export default function EditProfileRecruiter({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profileState = useSelector((state) => state.profileRecruiter);
  const {profileData} = profileState;

  // state untuk companynya, mksd aku ini nnt buat ambil photo companynya
  // const companyState = useSelector((state) => state.myCompany);
  // const {companyData} = companyState;

  const [photo, setPhoto] = useState(profileData[0].photo);
  const schema = Yup.object().shape({
    companyName: Yup.string().required('Company name field is required'),
    companyField: Yup.string().required('Company field is required'),
    city: Yup.string().required('City field is required'),
    description: Yup.string().required('Description field is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email field is required'),
    instagram: Yup.string(),
    phoneNumber: Yup.string()
      .min(10, 'Phone number required minimal 10 chars')
      .max(12, 'Phone number required maximal 12 chars')
      .required('Phone number field is required'),
    linkedin: Yup.string(),
  });

  function selectImage() {
    let options = {
      maxWidth: 300,
      maxHeight: 300,
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        };

        setPhoto(source.uri);
        const form = new FormData();
        form.append('photo', source);
        dispatch(profileAction.updatePhotoCompany(auth.token, form));
        dispatch(profileAction.updatePhotoRecruiter(auth.token, form));
      }
    });
  }

  // updatenya
  function change(value) {
    // console.log(value);
    const {
      companyName,
      companyField,
      city,
      email,
      instagram,
      linkedin,
      description,
      phoneNumber,
    } = value;
    const dataRecruiter = {
      email,
      phoneNumber,
      company: companyName,
      // jobTitle: companyField,
      address: city,
      instagram,
      bio: description,
      linkedin,
    };
    const dataCompany = {
      name: companyName,
      field: companyField,
      city,
    };
    dispatch(profileAction.updateProfile(auth.token, dataRecruiter));
    dispatch(profileAction.updateCompany(auth.token, dataCompany));
  }

  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                source={photo ? {uri: `${API_URL_IMAGE}${photo}`} : Avatar}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{profileData[0].company}</Text>
            <Text style={styles.field}>Financial</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={24} color="#8e8e8e" />
              <Text style={styles.map}>{profileData[0].address}</Text>
            </View>
          </View>
        </Card>
        <Formik
          initialValues={{
            companyName: '',
            companyField: '',
            city: '',
            description: '',
            email: '',
            instagram: '',
            phoneNumber: '',
            linkedin: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => change(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View>
              <View style={styles.padding}>
                <Button block style={styles.btnPrimary} onPress={handleSubmit}>
                  <Text style={styles.textBtnPrimary}>Simpan</Text>
                </Button>
                <Button
                  block
                  style={styles.btnSecondary}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textBtnSecondary}>Batal</Text>
                </Button>
              </View>
              <Card
                style={[styles.cardUp, styles.padding, styles.paddingVertical]}
                transparent>
                <Text style={styles.header}>Data Diri</Text>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Nama Perusahaan</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan nama perusahaan"
                      style={styles.input}
                      onChangeText={handleChange('companyName')}
                      onBlur={handleBlur('companyName')}
                      value={values.companyName}
                    />
                  </Item>
                  {touched.companyName && errors.companyName && (
                    <Text style={styles.error}>{errors.companyName}</Text>
                  )}
                </View>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Bidang</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan bidang perusahaan ex: IT"
                      style={styles.input}
                      onChangeText={handleChange('companyField')}
                      onBlur={handleBlur('companyField')}
                      value={values.companyField}
                    />
                  </Item>
                  {touched.companyField && errors.companyField && (
                    <Text style={styles.error}>{errors.companyField}</Text>
                  )}
                </View>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Kota</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan kota"
                      style={styles.input}
                      onChangeText={handleChange('city')}
                      onBlur={handleBlur('city')}
                      value={values.city}
                    />
                  </Item>
                  {touched.city && errors.city && (
                    <Text style={styles.error}>{errors.city}</Text>
                  )}
                </View>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Deskrpsi</Text>
                  <Item regular>
                    <Input
                      placeholder="Tuliskan deskripsi singkat"
                      style={styles.input}
                      numberOfLines={5}
                      multiline
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                  </Item>
                  {touched.description && errors.description && (
                    <Text style={styles.error}>{errors.description}</Text>
                  )}
                </View>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Email</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan email"
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
                  <Text style={styles.label}>Instagram</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan Instagram"
                      style={styles.input}
                      onChangeText={handleChange('instagram')}
                      onBlur={handleBlur('instagram')}
                      value={values.instagram}
                    />
                  </Item>
                  {touched.instagram && errors.instagram && (
                    <Text style={styles.error}>{errors.instagram}</Text>
                  )}
                </View>
                <View style={styles.fieldMargin}>
                  <Text style={styles.label}>Nomor telepon</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan nomor telepon"
                      style={styles.input}
                      keyboardType="phone-pad"
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
                  <Text style={styles.label}>Linkedin</Text>
                  <Item regular>
                    <Input
                      placeholder="Masukkan Linkedin"
                      style={styles.input}
                      onChangeText={handleChange('linkedin')}
                      onBlur={handleBlur('linkedin')}
                      value={values.linkedin}
                    />
                  </Item>
                  {touched.linkedin && errors.linkedin && (
                    <Text style={styles.error}>{errors.linkedin}</Text>
                  )}
                </View>
              </Card>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 40,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 25,
    paddingBottom: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 20,
  },
  map: {
    marginLeft: 15,
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
  },
  field: {
    fontSize: 14,
    color: '#1F2A36',
    fontWeight: '400',
  },
  padding: {
    paddingHorizontal: 20,
  },
  btnPrimary: {
    backgroundColor: '#5E50A1',
    marginBottom: 15,
  },
  textBtnPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  btnSecondary: {
    backgroundColor: '#ffffff',
    borderColor: '#5E50A1',
    borderWidth: 1,
  },
  textBtnSecondary: {
    color: '#5E50A1',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  paddingVertical: {
    paddingVertical: 20,
  },
  header: {
    color: '#1F2A36',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
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
  fieldMargin: {
    marginTop: 30,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
