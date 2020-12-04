import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import qs from 'querystring';
import RadioForm from 'react-native-simple-radio-button';
import {Text, Button, Card, Title, Form, Label, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';

import profile from '../assets/img/profile.png';
import profileAction from '../redux/actions/profileWorker';

const options = {
  title: 'my picture',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose Photo',
};

var radio_props = [
  {label: 'Aplikasi Mobile            ', value: 0},
  {label: 'Aplikasi Web', value: 1},
];

const registerValidationSchema = yup.object().shape({
  name: yup.string().matches(/(\w.+\s).+/, 'Masukkan Lebih dari 2 nama'),
  job: yup.string(),
  domisili: yup.string(),
  TempatKerja: yup.string(),
  description: yup
    .string()
    .max(255, 'cannot more 255 character')
    .required('deskripsi dibutuhkan'),
  skill: yup.string().matches(/(\w.+\s).+/, 'Masukkan Lebih dari 2 skill'),
  Time: yup.string().required('Waktu dibutuhkan'),
  link: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Please enter website'),
  dueTime: yup.date(),
  position: yup.string().required('Position field is required'),
});

const schemaExperience = yup.object().shape({
  position: yup.string().required('posisi dibutuhkan '),
  companyName: yup.string().required('Nama perusahaan dibutuhkan '),
  startAt: yup.date().required('YYYY-MM-DD'),
  finishAt: yup.date().required('YYYY-MM-DD'),
  description: yup
    .string()
    .max(255, 'cannot more 255 character')
    .required('deskripsi dibutuhkan'),
});

const schemaPortofolio = yup.object().shape({
  name: yup.string().required('Nama Aplikasi dibutuhkan '),
  publicLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Please enter website'),
  repoLink: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Please enter website'),
  description: yup
    .string()
    .max(255, 'cannot more 255 character')
    .required('deskripsi dibutuhkan'),
  company: yup.string().required('Nama tempat kerja terkait '),
});

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(0);
  const [AvatarSource, setAvatarSource] = React.useState('');
  const [dataImage, setDataImage] = React.useState('');
  const [portofolio, setPortofolio] = React.useState('');
  const profileWorker = useSelector((state) => state.profileWorker);
  const token = useSelector((state) => state.auth.token);

  const takePictures = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatarSource(response.uri);
        const form = new FormData();
        form.append('pictures', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
      }
    });
  };

  async function addExperienceWorker(dataExperience) {
    await dispatch(profileAction.addExperience(token, dataExperience));
    if (profileWorker.experienceIsAdded) {
      Alert.alert(profileWorker.profileAlertMsg);
    }
    navigation.navigate('MainAppWorker');
  }

  async function addPortofolioWorker(dataPortofolio) {
    const formData = new FormData();
    formData.append('data', qs.stringify(dataPortofolio));
    console.log(formData);
    await dispatch(profileAction.addPortofolio(token, dataImage));
    await dispatch(profileAction.addPortofolioData(token, formData));
    if (profileWorker.experienceIsAdded) {
      Alert.alert(profileWorker.profileAlertMsg);
    }
    navigation.navigate('MainAppWorker');
  }

  return (
    <>
      <ScrollView>
        {/*Card for Profile*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={AvatarSource ? {uri: AvatarSource} : profile}
              style={styles.avatar}
            />
            <TouchableOpacity onPress={takePictures} style={styles.edit}>
              <Icon name="pencil" size={20} color="#8e8e8e" />
              <Text style={styles.textEdit}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.identity}>
            <Text style={styles.name}>Louis Tamlison</Text>
            <Text>Web developer</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={20} color="#8e8e8e" />
              <Text style={styles.map}>Purwokerto, Jawa Tengah</Text>
            </View>
            <Text style={styles.frelencer}>Freelancer</Text>
          </View>
        </Card>
        {/*Card for Data Diri*/}
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{name: '', job: '', domisili: '', TempatKerja: ''}}
          onSubmit={(values) => console.log(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <Button
                style={styles.btnSave}
                onPress={handleSubmit}
                disabled={!isValid}
                block
                transparent>
                <Text style={styles.save}>Simpan</Text>
              </Button>
              <Button
                block
                style={styles.btnCencel}
                transparent
                onPress={() => navigation.goBack()}>
                <Text style={styles.cencel}>Batal</Text>
              </Button>
              <Card style={styles.cardUp} transparent>
                <View style={styles.padding}>
                  <Title style={styles.title}>Data diri</Title>
                  <View>
                    <Form>
                      <Label style={styles.label}>Nama Lengkap</Label>
                      <TextInput
                        name="name"
                        placeholder="Masukkan nama lengkap"
                        style={styles.textInput}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                      {errors.name && (
                        <Text style={styles.textError}>{errors.name}</Text>
                      )}
                      <Label style={styles.label}>Job title</Label>
                      <TextInput
                        name="job"
                        placeholder="Masukkan Job Title"
                        style={styles.textInput}
                        onChangeText={handleChange('job')}
                        onBlur={handleBlur('job')}
                        value={values.job}
                      />
                      {errors.job && (
                        <Text style={styles.textError}>{errors.job}</Text>
                      )}
                      <Label style={styles.label}>Domisili</Label>
                      <TextInput
                        name="domisili"
                        placeholder="Masukkan domisili"
                        style={styles.textInput}
                        onChangeText={handleChange('domisili')}
                        onBlur={handleBlur('domisili')}
                        value={values.domisili}
                      />
                      {errors.domisili && (
                        <Text style={styles.textError}>{errors.domisili}</Text>
                      )}
                      <Label style={styles.label}>Tempat Kerja</Label>
                      <TextInput
                        name="TempatKerja"
                        placeholder="Masukkan Tempat Kerja"
                        style={styles.textInput}
                        onChangeText={handleChange('TempatKerja')}
                        onBlur={handleBlur('TempatKerja')}
                        value={values.TempatKerja}
                      />
                      {errors.TempatKerja && (
                        <Text style={styles.textError}>
                          {errors.TempatKerja}
                        </Text>
                      )}
                      <Label style={styles.label}>
                        Masukkan Deskripsi Singkat
                      </Label>
                      <Textarea
                        name="description"
                        placeholder="Masukkan Deskripsi Singkat"
                        style={styles.InputDesc}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                      />
                      {errors.description && (
                        <Text style={styles.textError}>
                          {errors.description}
                        </Text>
                      )}
                    </Form>
                  </View>
                </View>
              </Card>
            </>
          )}
        </Formik>
        {/*Card for Skill*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.padding}>
            <Title style={styles.title}>Skill</Title>
            <Formik
              validationSchema={registerValidationSchema}
              initialValues={{skill: ''}}
              onSubmit={(values) => this.props.registerAction(values.skill)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View style={styles.skillContainer}>
                  <Form style={styles.skillForm}>
                    <TextInput
                      name="skill"
                      placeholder="Masukkan skill"
                      style={styles.inputSkill}
                      onChangeText={handleChange('skill')}
                      onBlur={handleBlur('skill')}
                      value={values.skill}
                    />
                    {errors.skill && (
                      <Text style={styles.textError}>{errors.skill}</Text>
                    )}
                  </Form>
                  <Button
                    style={styles.btnAdd}
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    <Text>Simpan</Text>
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </Card>
        {/*Card for Experience*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.padding}>
            <Title style={styles.title}>Pengalaman Kerja</Title>
            <Formik
              validationSchema={schemaExperience}
              initialValues={{
                position: '',
                companyName: '',
                startAt: '',
                finishAt: '',
                description: '',
              }}
              onSubmit={(values) => addExperienceWorker(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
              }) => (
                <View>
                  <Form>
                    <Label style={styles.label}>Position</Label>
                    <TextInput
                      name="position"
                      placeholder="Masukkan Posisi"
                      style={styles.textInput}
                      onChangeText={handleChange('position')}
                      onBlur={handleBlur('position')}
                      value={values.position}
                    />
                    {touched.position && errors.position && (
                      <Text style={styles.textError}>{errors.position}</Text>
                    )}
                    <Label style={styles.label}>Masukkan Nama Perusahaan</Label>
                    <TextInput
                      name="companyName"
                      placeholder="PT Example"
                      style={styles.textInput}
                      onChangeText={handleChange('companyName')}
                      onBlur={handleBlur('companyName')}
                      value={values.companyName}
                    />
                    {touched.companyName && errors.companyName && (
                      <Text style={styles.textError}>{errors.companyName}</Text>
                    )}
                    <Label style={styles.label}>Masuk Pada</Label>
                    <TextInput
                      name="startAt"
                      placeholder="2000-1-1"
                      style={styles.textInput}
                      onChangeText={handleChange('startAt')}
                      onBlur={handleBlur('startAt')}
                      value={values.startAt}
                    />
                    {touched.startAt && errors.startAt && (
                      <Text style={styles.textError}>{errors.startAt}</Text>
                    )}
                    <Label style={styles.label}>Keuar pada</Label>
                    <TextInput
                      name="finishAt"
                      placeholder="2000-1-1"
                      style={styles.textInput}
                      onChangeText={handleChange('finishAt')}
                      onBlur={handleBlur('finishAt')}
                      value={values.finishAt}
                    />
                    {touched.finishAt && errors.finishAt && (
                      <Text style={styles.textError}>{errors.finishAt}</Text>
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
                    {touched.c && errors.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
                    <Button
                      style={styles.addExperience}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      block
                      transparent>
                      <Text style={styles.experience}>
                        Tambah Pengalaman Kerja
                      </Text>
                    </Button>
                  </Form>
                </View>
              )}
            </Formik>
          </View>
        </Card>
        {/*Card for Portofolio*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.padding}>
            <Title style={styles.title}>Portofolio</Title>
            <Formik
              validationSchema={schemaPortofolio}
              initialValues={{
                name: '',
                publicLink: '',
                repoLink: '',
                company: '',
                type: data,
                description: '',
              }}
              onSubmit={(values) => addPortofolioWorker(values)}>
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
                      <Text style={styles.textError}>{errors.description}</Text>
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
                      <Text style={styles.textError}>{errors.publicLink}</Text>
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
                      initial={0}
                      selectedButtonColor={'#5E50A1'}
                      buttonColor={'#5E50A1'}
                      formHorizontal={true}
                      onPress={() => setData({data: data})}
                    />
                    <Label style={styles.label}>Upload Gambar</Label>
                    {portofolio === '' ? (
                      <TouchableOpacity
                        onPress={() =>
                          ImagePicker.launchImageLibrary(
                            options,
                            async (response) => {
                              if (response.didCancel) {
                                console.log('User cancelled image picker');
                              } else {
                                setPortofolio(response.uri);
                                const form = new FormData();
                                form.append('photo', {
                                  uri: response.uri,
                                  name: response.fileName,
                                  type: response.type,
                                });
                                setDataImage(form);
                              }
                            },
                          )
                        }>
                        <View style={styles.InputImage}>
                          <Icon name="cloud-upload" size={50} color="#8e8e8e" />
                          <Text note>upload file dari penyimpanan</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          ImagePicker.launchImageLibrary(
                            options,
                            async (response) => {
                              if (response.didCancel) {
                                console.log('User cancelled image picker');
                              } else {
                                setPortofolio(response.uri);
                                const form = new FormData();
                                form.append('photo', {
                                  uri: response.uri,
                                  name: response.fileName,
                                  type: response.type,
                                });
                                setDataImage(form);
                              }
                            },
                          )
                        }>
                        <Image
                          style={styles.portofolioImg}
                          source={{uri: portofolio}}
                        />
                      </TouchableOpacity>
                    )}
                    <Button
                      block
                      style={styles.addExperience}
                      transparent
                      onPress={handleSubmit}>
                      <Text style={styles.experience}>Tambah Portofolio</Text>
                    </Button>
                  </Form>
                </View>
              )}
            </Formik>
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  cardUp: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingBottom: 20,
  },
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 50,
    borderRadius: 100,
  },
  edit: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textEdit: {
    fontSize: 20,
    marginLeft: 10,
    color: '#8e8e8e',
  },
  identity: {
    paddingLeft: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 10,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  map: {
    marginLeft: 15,
    color: '#8e8e8e',
  },
  frelencer: {
    color: '#8e8e8e',
  },
  btnSave: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: '#5E50A1',
    borderRadius: 5,
  },
  save: {
    color: '#ffffff',
  },
  btnCencel: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 5,
  },
  cencel: {
    color: '#5E50A1',
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
  InputDesc: {
    borderColor: '#e2e5ed',
    borderWidth: 1,
    height: 125,
  },
  label: {
    marginTop: 20,
    color: '#9ea0a5',
    fontSize: 15,
  },
  textError: {
    fontSize: 10,
    color: 'red',
  },
  skillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skillForm: {
    marginRight: 20,
  },
  inputSkill: {
    height: 50,
    borderColor: '#e2e5ed',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 10,
    width: 185,
  },
  btnAdd: {
    backgroundColor: '#fbb017',
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
  radioBtn: {
    marginTop: 20,
  },
  InputImage: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9ea0a5',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 1,
    position: 'relative',
    height: 175,
  },
  portofolioImg: {
    width: 287,
    height: 175,
    marginTop: 10,
    borderRadius: 10,
  },
});
