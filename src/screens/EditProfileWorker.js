import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import {Text, Button, Card, Title, Form, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';

import profile from '../assets/img/profile.png';

var radio_props = [
  {label: 'Aplikasi Mobile', data: 0},
  {label: 'Aplikasi Web', data: 1},
];

const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/(\w.+\s).+/, 'Masukkan Lebih dari 2 nama')
    .required('Nama dibutuhkan'),
  job: yup.string().required('Job title dibutuhkan'),
  domisili: yup.string().required('domisili dibutuhkan'),
  TempatKerja: yup.string().required('Tempat Kerja dibutuhkan'),
  description: yup.string().required('deskripsi dibutuhkan'),
  skill: yup
    .string()
    .matches(/(\w.+\s).+/, 'Masukkan Lebih dari 2 skill')
    .required('Skill dibutuhkan'),
  Time: yup.string().required('Waktu dibutuhkan'),
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
});

const EditProfile = ({navigation}) => {
  const [data, setData] = React.useState(0);
  return (
    <>
      <ScrollView>
        {/*Card for Profile*/}
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <Image source={profile} style={styles.avatar} />
            <View style={styles.edit}>
              <Icon name="pencil" size={20} color="#8e8e8e" />
              <Text style={styles.textEdit}>Edit</Text>
            </View>
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
                      <TextInput
                        name="description"
                        placeholder="Masukkan Deskripsi Singkat"
                        style={styles.textInput}
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
              validationSchema={registerValidationSchema}
              initialValues={{
                posisi: '',
                perusahaan: '',
                bulan: '',
                descrption: '',
              }}
              onSubmit={(values) =>
                this.props.registerAction(
                  values.name,
                  values.email,
                  values.password,
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
                      name="Time"
                      placeholder="January 2020"
                      style={styles.textInput}
                      onChangeText={handleChange('Time')}
                      onBlur={handleBlur('Time')}
                      value={values.Time}
                    />
                    {errors.Time && (
                      <Text style={styles.textError}>{errors.Time}</Text>
                    )}
                    <Label style={styles.label}>Masukkan descripsi</Label>
                    <TextInput
                      name="description"
                      placeholder="Masukkan descripsi singkat"
                      style={styles.textInput}
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
              onSubmit={(values) =>
                this.props.registerAction(
                  values.name,
                  values.email,
                  values.password,
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
                    <Label style={styles.label}>Masukkan descripsi</Label>
                    <TextInput
                      name="description"
                      placeholder="Masukkan descripsi singkat"
                      style={styles.textInput}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {errors.description && (
                      <Text style={styles.textError}>{errors.description}</Text>
                    )}
                    <Label style={styles.label}>Link Publikasi</Label>
                    <TextInput
                      name="phone"
                      placeholder="Masukkan Link Publikasi"
                      style={styles.textInput}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                    {errors.phone && (
                      <Text style={styles.textError}>{errors.phone}</Text>
                    )}
                    <Label style={styles.label}>Link Repo</Label>
                    <TextInput
                      name="password"
                      placeholder="Masukkan Link Repo"
                      style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.textError}>{errors.password}</Text>
                    )}
                    <Label style={styles.label}>Tempat Kerja</Label>
                    <TextInput
                      name="password"
                      placeholder="Tempat Kerja Terkait"
                      style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.textError}>{errors.password}</Text>
                    )}
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
                    <TouchableOpacity>
                      <View style={styles.InputImage}>
                        <Icon name="cloud-upload" size={50} color="#8e8e8e" />
                        <Text note>upload file dari penyimpanan</Text>
                      </View>
                    </TouchableOpacity>
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
    height: 150,
  },
});
