import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Text, Button, Card, Title, Form, Label, Textarea} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import {API_URL_IMAGE} from '@env';

// import actions
import portfolioAction from '../redux/actions/portfolio';

// import component
import ModalLoading from '../components/ModalLoading';

export default function EditPortfolio({route, navigation}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {token} = useSelector((state) => state.auth);
  const {
    portfolioDetailData,
    portfolioDetailIsLoading,
    isEdit,
    editIsLoading,
  } = useSelector((state) => state.portfolio);
  const [portofolio, setPortofolio] = React.useState(null);
  const [data, setData] = React.useState(portfolioDetailData.type ? 1 : 0);
  const [dataImage, setDataImage] = React.useState(null);

  let radio_props = [
    {label: 'Aplikasi Mobile            ', value: 0},
    {label: 'Aplikasi Web', value: 1},
  ];

  let options = {
    maxWidth: 300,
    maxHeight: 300,
    mediaType: 'photo',
    noData: true,
    storageOptions: {
      skipBackup: true,
    },
  };

  const schemaPortofolio = yup.object().shape({
    name: yup.string().required('Nama aplikasi dibutuhkan'),
    publicLink: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Masukkan alamat url. Contoh: http://internet.com',
      )
      .required('Alamat publikasi dibutuhkan'),
    repoLink: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Masukkan alamat repo. Contoh: http://github.com',
      )
      .required('Alamat repositori dibutuhkan'),
    description: yup
      .string()
      .max(255, 'Deskripsi tidak dapat lebih dari 255 karakter')
      .required('Deskripsi dibutuhkan'),
    company: yup.string().required('Nama tempat kerja terkait dibutuhkan'),
  });

  const pickPortofolio = () => {
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.fileSize > 2 * 1024 * 1024) {
        Alert.alert('Gagal pilih gambar!', 'File gambar harus kurang dari 2MB');
      } else {
        setPortofolio(response.uri);
        await setDataImage({
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
      }
    });
  };

  function updatePortfolio(values, img, type) {
    const form = new FormData();
    form.append('name', values.name);
    form.append('type', type === 0 ? false : true);
    form.append('description', values.description);
    form.append('publicLink', values.publicLink);
    form.append('repoLink', values.repoLink);
    form.append('company', values.company);
    if (portofolio) {
      form.append('photo', img);
    }
    dispatch(portfolioAction.updatePortfolio(token, id, form));
  }

  useEffect(() => {
    dispatch(portfolioAction.getPortfolioDetail(token, id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      dispatch(portfolioAction.clearAlert());
      dispatch(portfolioAction.getPortfolioList(token));
      navigation.navigate('ProfileWorker');
      Alert.alert('Sukses!', 'Edit portofolio berhasil.');
    }
  });

  return (
    <>
      <ScrollView>
        {Object.keys(portfolioDetailData).length > 0 && (
          <Card style={styles.cardUp} transparent>
            <View style={styles.padding}>
              <Title style={styles.title}>Portofolio</Title>
              <Formik
                validationSchema={schemaPortofolio}
                initialValues={{
                  name: portfolioDetailData.name,
                  publicLink: portfolioDetailData.publicLink,
                  repoLink: portfolioDetailData.repoLink,
                  company: portfolioDetailData.company,
                  description: portfolioDetailData.description,
                }}
                onSubmit={(values) => updatePortfolio(values, dataImage, data)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <Form>
                      <Label style={styles.label}>Nama Aplikasi</Label>
                      <TextInput
                        name="name"
                        placeholder="Nama Aplikasi"
                        style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.textError}>{errors.name}</Text>
                      )}
                      <Label style={styles.label}>Masukkan deskripsi</Label>
                      <Textarea
                        name="description"
                        placeholder="Masukkan deskripsi singkat"
                        style={styles.InputDesc}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                      />
                      {touched.description && errors.description && (
                        <Text style={styles.textError}>
                          {errors.description}
                        </Text>
                      )}
                      <Label style={styles.label}>Link Publikasi</Label>
                      <TextInput
                        name="publicLink"
                        placeholder="Masukkan Link Publikasi"
                        style={styles.textInput}
                        onChangeText={handleChange('publicLink')}
                        onBlur={handleBlur('publicLink')}
                        value={values.publicLink}
                      />
                      {touched.publicLink && errors.publicLink && (
                        <Text style={styles.textError}>
                          {errors.publicLink}
                        </Text>
                      )}
                      <Label style={styles.label}>Link Repo</Label>
                      <TextInput
                        name="repoLink"
                        placeholder="Masukkan Link Repo"
                        style={styles.textInput}
                        onChangeText={handleChange('repoLink')}
                        onBlur={handleBlur('repoLink')}
                        value={values.repoLink}
                      />
                      {touched.repoLink && errors.repoLink && (
                        <Text style={styles.textError}>{errors.repoLink}</Text>
                      )}
                      <Label style={styles.label}>Tempat Kerja</Label>
                      <TextInput
                        name="company"
                        placeholder="Tempat Kerja Terkait"
                        style={styles.textInput}
                        onChangeText={handleChange('company')}
                        onBlur={handleBlur('company')}
                        value={values.company}
                      />
                      {touched.company && errors.company && (
                        <Text style={styles.textError}>{errors.company}</Text>
                      )}
                      <Label style={styles.label}>Jenis Portofolio</Label>
                      <RadioForm
                        style={styles.radioBtn}
                        radio_props={radio_props}
                        initial={portfolioDetailData.type ? 1 : 0}
                        selectedButtonColor={'#5E50A1'}
                        buttonColor={'#5E50A1'}
                        formHorizontal={true}
                        onPress={(value) => setData(value)}
                      />
                      <Label style={styles.label}>Upload Gambar</Label>
                      <TouchableOpacity onPress={pickPortofolio}>
                        <Image
                          style={styles.portofolioImg}
                          source={
                            portofolio
                              ? {uri: portofolio}
                              : {
                                  uri: `${API_URL_IMAGE}${portfolioDetailData.photo}`,
                                }
                          }
                        />
                      </TouchableOpacity>
                      <Button
                        block
                        style={styles.addExperience}
                        transparent
                        onPress={handleSubmit}>
                        <Text style={styles.experience}>Simpan Portofolio</Text>
                      </Button>
                    </Form>
                  </View>
                )}
              </Formik>
            </View>
          </Card>
        )}
      </ScrollView>

      <ModalLoading modalOpen={portfolioDetailIsLoading || editIsLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  cardUp: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  padding: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 25,
    textTransform: 'capitalize',
    margin: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e5ed',
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
    fontSize: 15,
  },
  textError: {
    fontSize: 12,
    color: 'red',
  },
  InputDesc: {
    borderColor: '#e2e5ed',
    borderWidth: 1,
    height: 125,
  },
  radioBtn: {
    marginTop: 20,
  },
  portofolioImg: {
    width: 287,
    height: 175,
    marginTop: 10,
    borderRadius: 10,
  },
  addExperience: {
    marginTop: 25,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#fbb017',
  },
  experience: {
    color: '#fbb017',
  },
});
