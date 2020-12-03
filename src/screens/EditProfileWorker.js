import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Text, Button, Card, Title, Form, Label, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import profile from '../assets/img/profile.png';
import {API_URL} from '@env';

import profileWorkerAction from '../redux/actions/profileWorker';
import skillAction from '../redux/actions/skill';

const options = {
  title: 'my picture',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose Photo',
};

var radio_props = [
  {label: 'Aplikasi Mobile            ', data: 0},
  {label: 'Aplikasi Web', data: 1},
];

const registerValidationSchema = yup.object().shape({
  Time: yup.string().required('Waktu dibutuhkan'),
  link: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!',
    )
    .required('Please enter website'),
  dueTime: yup.date(),
});

const skillValidation = yup.object().shape({
  skill: yup.string(),
});

const profileValidation = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Masukkan Lebih dari 2 nama')
    .required(),
  job: yup.string().required(),
  domisili: yup.string().required(),
  TempatKerja: yup.string().required(),
  description: yup.string().max(255, 'cannot more 255 character').required(),
});

const EditProfile = ({navigation}) => {
  const [data, setData] = React.useState(0);
  const [portofolio, setPortofolio] = React.useState('');
  const profileWorker = useSelector((state) => state.profileWorker);
  const skill = useSelector((state) => state.skill);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const takePictures = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const form = new FormData();
        form.append('photo', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          path: response.path,
        });
        await dispatch(
          profileWorkerAction.updateImageProfile(auth.token, form),
        );
        return dispatch(profileWorkerAction.getProfile(auth.token));
      }
    });
  };
  // Open Image Library:
  const pickPortofolio = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setPortofolio(response.uri);
        const form = new FormData();
        form.append('pictures', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
      }
    });
  };

  return (
    <>
      <ScrollView>
        {/*Card for Profile*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={
                profileWorker.profileData.photo
                  ? {uri: API_URL + profileWorker.profileData.photo}
                  : profile
              }
              style={styles.avatar}
            />
            <TouchableOpacity onPress={takePictures} style={styles.edit}>
              <Icon name="pencil" size={20} color="#8e8e8e" />
              <Text style={styles.textEdit}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.identity}>
            <Text style={styles.name}>{profileWorker.profileData.name}</Text>
            <Text>{profileWorker.profileData.jobTitle || 'Title'}</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={20} color="#8e8e8e" />
              <Text style={styles.map}>
                {profileWorker.profileData.address || 'Location'}
              </Text>
            </View>
            {/* <Text style={styles.frelencer}>Freelancer</Text> */}
          </View>
        </Card>
        {/*Card for Data Diri*/}
        <Formik
          validationSchema={profileValidation}
          initialValues={{
            name: profileWorker.profileData.name,
            job: profileWorker.profileData.jobTitle,
            domisili: profileWorker.profileData.address,
            TempatKerja: profileWorker.profileData.company,
            description: profileWorker.profileData.bio,
          }}
          onSubmit={async (values) => {
            console.log(values);
            const dataDiri = {
              name: values.name,
              jobTitle: values.job,
              address: values.domisili,
              company: values.TempatKerja,
              bio: values.description,
            };
            await dispatch(
              profileWorkerAction.updateProfile(auth.token, dataDiri),
            );
            await dispatch(profileWorkerAction.getProfile(auth.token));
            navigation.goBack();
          }}>
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
              validationSchema={skillValidation}
              initialValues={{skill: ''}}
              onSubmit={(values, {resetForm}) => {
                const dataSkill = {
                  name: values.skill,
                };
                dispatch(skillAction.postSkill(auth.token, dataSkill));
                dispatch(skillAction.listSkill(auth.token));
                resetForm('');
              }}>
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
                      onChange={(text) =>
                        dispatch(skillAction.getSkill(auth.token, text))
                      }
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
            {/* <View style={styles.skillsContainer}>
              {!skill.skillIsLoading &&
                !skill.skillIsError &&
                skill.skillData.length &&
                skill.skillData.map((item) => (
                  <View style={styles.skill}>
                    <Text style={styles.skillText}>{item.name}</Text>
                  </View>
                ))}
              <Text>&nbsp;</Text>
            </View> */}
          </View>
        </Card>
        {/*Card for Experience*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.padding}>
            <Title style={styles.title}>Pengalaman Kerja</Title>
            <Formik
              validationSchema={registerValidationSchema}
              initialValues={{
                posisi: '',
                perusahaan: '',
                bulan: '',
                descrption: '',
              }}
              onSubmit={(values) => console.log(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <View>
                  <Form>
                    <Label style={styles.label}>Nama</Label>
                    <TextInput
                      name="name"
                      placeholder="Masukkan Posisi"
                      style={styles.textInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && (
                      <Text style={styles.textError}>{errors.name}</Text>
                    )}
                    <Label style={styles.label}>Masukkan Nama Perusahaan</Label>
                    <TextInput
                      name="name"
                      placeholder="PT Example"
                      style={styles.textInput}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && (
                      <Text style={styles.textError}>{errors.name}</Text>
                    )}
                    <Label style={styles.label}>Bulan/ Tahun</Label>
                    <TextInput
                      name="dueTime"
                      placeholder="January 2020"
                      style={styles.textInput}
                      onChangeText={handleChange('dueTime')}
                      onBlur={handleBlur('dueTime')}
                      value={values.dueTime}
                    />
                    {errors.dueTime && (
                      <Text style={styles.textError}>{errors.dueTime}</Text>
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
                    {errors.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
                    <Button block style={styles.addExperience} transparent>
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
              validationSchema={registerValidationSchema}
              initialValues={{name: '', email: '', phone: '', password: ''}}
              onSubmit={(values) => console.log(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
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
                    {errors.name && (
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
                    {errors.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
                    <Label style={styles.label}>Link Publikasi</Label>
                    <TextInput
                      name="link"
                      placeholder="Masukkan Link Publikasi"
                      style={styles.textInput}
                      onChangeText={handleChange('link')}
                      onBlur={handleBlur('link')}
                      value={values.link}
                    />
                    {errors.link && (
                      <Text style={styles.textError}>{errors.link}</Text>
                    )}
                    <Label style={styles.label}>Link Repo</Label>
                    <TextInput
                      name="link"
                      placeholder="Masukkan Link Repo"
                      style={styles.textInput}
                      onChangeText={handleChange('link')}
                      onBlur={handleBlur('link')}
                      value={values.link}
                    />
                    {errors.link && (
                      <Text style={styles.textError}>{errors.link}</Text>
                    )}
                    <Label style={styles.label}>Tempat Kerja</Label>
                    <TextInput
                      name="TempatKerja"
                      placeholder="Tempat Kerja Terkait"
                      style={styles.textInput}
                      onChangeText={handleChange('TempatKerja')}
                      onBlur={handleBlur('TempatKerja')}
                      value={values.TempatKerja}
                    />
                    {errors.TempatKerja && (
                      <Text style={styles.textError}>{errors.TempatKerja}</Text>
                    )}
                    <Label style={styles.label}>Jenis Portofolio</Label>
                    <RadioForm
                      style={styles.radioBtn}
                      radio_props={radio_props}
                      initial={0}
                      selectedButtonColor={'#5E50A1'}
                      buttonColor={'#5E50A1'}
                      formHorizontal={true}
                      onPress={(value) => {
                        setData({data: data});
                      }}
                    />
                    <Label style={styles.label}>Upload Gambar</Label>
                    {portofolio === '' ? (
                      <TouchableOpacity onPress={pickPortofolio}>
                        <View style={styles.InputImage}>
                          <Icon name="cloud-upload" size={50} color="#8e8e8e" />
                          <Text note>upload file dari penyimpanan</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Image
                        style={styles.portofolioImg}
                        source={{uri: portofolio}}
                      />
                    )}
                    <Button block style={styles.addExperience} transparent>
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
  skillsContainer: {
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#FBB017',
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  skillText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
