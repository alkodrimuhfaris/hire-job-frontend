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
import {
  Text,
  Button,
  Card,
  Title,
  Form,
  Label,
  DatePicker,
  Textarea,
  CheckBox,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import ModalAlert from '../components/ModalAlert';

import profile from '../assets/img/profile.png';
import {API_URL_IMAGE} from '@env';

// import component
import ModalLoading from '../components/ModalLoading';

// import actions
import portfolioAction from '../redux/actions/portfolio';
import skillAction from '../redux/actions/skill';
import profileAction from '../redux/actions/profileWorker';

let options = {
  maxWidth: 300,
  maxHeight: 300,
  mediaType: 'photo',
  noData: true,
  storageOptions: {
    skipBackup: true,
  },
};

var radio_props = [
  {label: 'Aplikasi Mobile            ', value: 0},
  {label: 'Aplikasi Web', value: 1},
];

const schemaExperience = yup.object().shape({
  position: yup.string().required('Posisi terakhir dibutuhkan '),
  companyName: yup.string().required('Nama perusahaan terakhir dibutuhkan '),
  description: yup
    .string()
    .max(255, 'Deskripsi tidak dapat lebih dari 255 karakter')
    .required('Deskripsi dibutuhkan'),
});

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

const skillValidation = yup.object().shape({
  skill: yup.string(),
});

const profileValidation = yup.object().shape({
  name: yup.string(),
  job: yup.string(),
  domisili: yup.string(),
  TempatKerja: yup.string(),
  description: yup
    .string()
    .max(255, 'Deskripsi tidak dapat lebih dari 255 karakter'),
});

const schemaSosialMedia = yup.object().shape({
  email: yup.string().email('Masukkan alamat email dengan benar'),
  instagram: yup.string(),
  github: yup.string(),
  linkedin: yup.string(),
});

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(0);
  const [dataImage, setDataImage] = React.useState('');
  const [portofolio, setPortofolio] = React.useState('');
  const [avatar, setAvatar] = React.useState(profile);
  const profileWorker = useSelector((state) => state.profileWorker);
  const token = useSelector((state) => state.auth.token);

  const [start, setStart] = React.useState('');
  const [finish, setFinish] = React.useState('');
  const [stillWorking, setStillWorking] = React.useState(false);

  // set modal
  const [modalError, setModalError] = React.useState(false);
  const [textAlert, setTextAlert] = React.useState('');

  const takePictures = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
      } else if (response.fileSize > 2 * 1024 * 1024) {
        Alert.alert('Gagal pilih gambar!', 'File gambar harus kurang dari 2MB');
      } else {
        setAvatar({uri: response.uri});
        const form = new FormData();
        form.append('photo', {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
          path: response.path,
        });
        await dispatch(profileAction.updateImageProfile(token, form));
        return dispatch(profileAction.getProfile(token));
      }
    });
  };

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

  function addExperienceWorker(dataExperience) {
    if (stillWorking) {
      if (start) {
        const startAt = moment(start).format('YYYY-MM-DD');
        Object.assign(dataExperience, {startAt});
        dispatch(profileAction.addExperience(token, dataExperience));
      } else {
        setTextAlert('Masukkan tanggal anda mulai bekerja!');
        setModalError(true);
      }
    } else {
      if (start && finish) {
        const startAt = moment(start).format('YYYY-MM-DD');
        const finishAt = moment(finish).format('YYYY-MM-DD');
        Object.assign(dataExperience, {startAt, finishAt});
        dispatch(profileAction.addExperience(token, dataExperience));
      } else {
        setTextAlert('Masukkan tanggal anda mulai dan berhenti bekerja!');
        setModalError(true);
      }
    }
  }

  async function addPortofolioWorker(values, img, type) {
    const form = new FormData();
    form.append('name', values.name);
    form.append('type', type === 0 ? false : true);
    form.append('description', values.description);
    form.append('publicLink', values.publicLink);
    form.append('repoLink', values.repoLink);
    form.append('company', values.company);
    form.append('photo', img);
    await dispatch(profileAction.addPortofolio(token, form));
  }

  useEffect(() => {
    if (profileWorker.portfolioIsAdded) {
      dispatch(profileAction.clearAlert());
      dispatch(portfolioAction.getPortfolioList(token));
      navigation.navigate('ProfileWorker');
      Alert.alert('Sukses!', 'Tambah portofolio berhasil.');
    }
  });

  useEffect(() => {
    if (profileWorker.experienceIsAdded) {
      dispatch(profileAction.clearAlert());
      dispatch(profileAction.getWorkerExp(token));
      navigation.navigate('ProfileWorker');
      Alert.alert('Sukses!', 'Tambah pengalaman kerja berhasil.');
    }
  });

  React.useEffect(() => {
    if (stillWorking) {
      setFinish('');
    }
  }, [stillWorking]);

  return (
    <>
      {/* modal alert */}
      {navigation.isFocused() ? (
        <ModalAlert
          setModalOpen={setModalError}
          modalOpen={modalError}
          content={textAlert}
          useOneBtn={true}
        />
      ) : null}

      <ScrollView>
        {/*Card for Profile*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image
              source={
                profileWorker.profileData.photo
                  ? {uri: API_URL_IMAGE + profileWorker.profileData.photo}
                  : avatar
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
          onSubmit={(values) => {
            const dataDiri = {
              name: values.name,
              jobTitle: values.job,
              address: values.domisili,
              company: values.TempatKerja,
              bio: values.description,
            };
            console.log('simpan value');
            dispatch(profileAction.updateProfile(token, dataDiri));
            dispatch(profileAction.getProfile(token));
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
                {profileWorker.updateProfileIsLoading === false ? (
                  <Text style={styles.save}>Simpan</Text>
                ) : (
                  <ModalLoading />
                )}
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
                dispatch(skillAction.postSkill(token, dataSkill));
                dispatch(skillAction.listSkill(token));
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
                        dispatch(skillAction.getSkill(token, text))
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
              validationSchema={schemaExperience}
              initialValues={{
                position: '',
                companyName: '',
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
                    <DatePicker
                      formatChosenDate={(date) => {
                        return moment(date).format('YYYY-MM-DD');
                      }}
                      minimumDate={new Date('2000-1-1')}
                      maximumDate={finish ? finish : new Date()}
                      modalTransparent={false}
                      animationType={'fade'}
                      androidMode="default"
                      placeHolderText={
                        <Icon name="calendar" size={24} color="black" />
                      }
                      textStyle={styles.textInput}
                      placeHolderTextStyle={styles.textInput}
                      onDateChange={(date) => setStart(date)}
                    />
                    <View style={styles.stillWorking}>
                      <Text style={styles.stillWorkingTxt}>
                        Masih bekerja di sini
                      </Text>
                      <CheckBox
                        style={styles.checkboxStill}
                        onPress={() => setStillWorking(!stillWorking)}
                        checked={stillWorking}
                        color="#5E50A1"
                      />
                    </View>
                    {!stillWorking ? (
                      <>
                        <Label style={styles.label}>Keluar pada</Label>
                        <DatePicker
                          formatChosenDate={(date) => {
                            return moment(date).format('YYYY-MM-DD');
                          }}
                          minimumDate={start ? start : new Date('2020-10-10')}
                          maximumDate={new Date()}
                          modalTransparent={false}
                          animationType={'fade'}
                          androidMode="default"
                          placeHolderText={
                            <Icon name="calendar" size={24} color="black" />
                          }
                          textStyle={styles.textInput}
                          placeHolderTextStyle={styles.textInput}
                          onDateChange={(date) => setFinish(date)}
                        />
                      </>
                    ) : null}
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
                    <Button
                      style={styles.addExperience}
                      onPress={handleSubmit}
                      disabled={!isValid}
                      block
                      transparent>
                      {profileWorker.addExperienceIsLoading === false ? (
                        <Text style={styles.experience}>
                          Tambah Pengalaman Kerja
                        </Text>
                      ) : (
                        <ModalLoading />
                      )}
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
                description: '',
              }}
              onSubmit={(values) =>
                addPortofolioWorker(values, dataImage, data)
              }>
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
                      onPress={(value) => setData(value)}
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
                      <TouchableOpacity onPress={pickPortofolio}>
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
                      {profileWorker.addPortofolioIsLoading === false ? (
                        <Text style={styles.experience}>Tambah Portofolio</Text>
                      ) : (
                        <ModalLoading />
                      )}
                    </Button>
                  </Form>
                </View>
              )}
            </Formik>
          </View>
        </Card>
        {/* Card for sosmed */}
        <Card style={styles.cardUp} transparent>
          <View style={styles.padding}>
            <Title style={styles.title}>Sosial Media</Title>
            <Formik
              validationSchema={schemaSosialMedia}
              initialValues={{
                email: profileWorker.profileData.email,
                instagram: profileWorker.profileData.instagram
                  ? profileWorker.profileData.instagram
                      .slice(26, profileWorker.profileData.instagram.length)
                      .slice(0, -1)
                  : '',
                github: profileWorker.profileData.github
                  ? profileWorker.profileData.github.slice(
                      19,
                      profileWorker.profileData.github.length,
                    )
                  : '',
                linkedin: profileWorker.profileData.linkedin
                  ? profileWorker.profileData.linkedin
                      .slice(28, profileWorker.profileData.linkedin.length)
                      .slice(0, -1)
                  : '',
              }}
              onSubmit={async (values) => {
                const dataSosmed = {
                  email: values.email,
                  instagram: `https://www.instagram.com/${values.instagram}/`,
                  github: `https://github.com/${values.github}`,
                  linkedin: `https://www.linkedin.com/in/${values.linkedin}/`,
                };
                await dispatch(profileAction.updateProfile(token, dataSosmed));
                await dispatch(profileAction.getProfile(token));
                navigation.navigate('ProfileWorker');
                Alert.alert(
                  'Sukses!',
                  'Akun sosial media berhasil di edit!',
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                  {cancelable: false},
                );
              }}>
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
                    <Label style={styles.label}>Email</Label>
                    <TextInput
                      name="email"
                      placeholder="Email"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.textError}>{errors.email}</Text>
                    )}
                    <Label style={styles.label}>Instagram</Label>
                    <TextInput
                      name="instagram"
                      placeholder="Instagram"
                      style={styles.textInput}
                      onChangeText={handleChange('instagram')}
                      onBlur={handleBlur('instagram')}
                      value={values.instagram}
                    />
                    {touched.instagram && errors.instagram && (
                      <Text style={styles.textError}>{errors.instagram}</Text>
                    )}
                    <Label style={styles.label}>Github</Label>
                    <TextInput
                      name="github"
                      placeholder="Github"
                      style={styles.textInput}
                      onChangeText={handleChange('github')}
                      onBlur={handleBlur('github')}
                      value={values.github}
                    />
                    {touched.github && errors.github && (
                      <Text style={styles.textError}>{errors.github}</Text>
                    )}
                    <Label style={styles.label}>Linkedin</Label>
                    <TextInput
                      name="linkedin"
                      placeholder="Linkedin"
                      style={styles.textInput}
                      onChangeText={handleChange('linkedin')}
                      onBlur={handleBlur('linkedin')}
                      value={values.linkedin}
                    />
                    {touched.linkedin && errors.linkedin && (
                      <Text style={styles.textError}>{errors.linkedin}</Text>
                    )}
                  </Form>
                  <Button
                    style={styles.addExperience}
                    onPress={handleSubmit}
                    disabled={!isValid}
                    block
                    transparent>
                    <Text style={styles.experience}>Edit Sosial Media</Text>
                  </Button>
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
  stillWorking: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  stillWorkingTxt: {
    color: '#9ea0a5',
    fontSize: 15,
  },
  checkboxStill: {
    marginRight: 10,
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
