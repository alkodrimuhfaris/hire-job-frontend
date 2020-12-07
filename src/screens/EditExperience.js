import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
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
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import Avatar from '../assets/img/company.png';

import {useSelector, useDispatch} from 'react-redux';

import experienceAction from '../redux/actions/workExperience';
import profileAction from '../redux/actions/profileWorker';

import ModalLoading from '../components/ModalLoading';

import ModalAlert from '../components/ModalAlert';

export default function EditExperience({route, navigation}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {token} = useSelector((state) => state.auth);
  const expDetail = useSelector((state) => state.workExperience.expDetail);
  const updateIsError = useSelector(
    (state) => state.workExperience.updateIsError,
  );
  const updateIsSuccess = useSelector(
    (state) => state.workExperience.updateIsSuccess,
  );
  const updateIsLoading = useSelector(
    (state) => state.workExperience.updateIsLoading,
  );

  const [textAlert, setTextAlert] = React.useState('');
  const [modalError, setModalError] = React.useState(false);
  const [updateError, setUpdateError] = React.useState(false);
  const [stillWorking, setStillWorking] = React.useState(false);
  const [start, setStart] = React.useState('');
  const [finish, setFinish] = React.useState('');

  React.useEffect(() => {
    setUpdateError(updateIsError);
  }, [updateIsError]);

  React.useEffect(() => {
    if (!updateError) {
      dispatch(experienceAction.getWorkerExpById(token, id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateError]);

  React.useEffect(() => {
    if (Object.keys(expDetail).length) {
      setStart(new Date(expDetail.startAt));
      expDetail.finishAt ? setFinish(new Date(expDetail.finishAt)) : null;
    }
  }, [expDetail]);

  const schemaExperience = yup.object().shape({
    position: yup.string('Deskripsi harus berupa kata-kata'),
    companyName: yup.string('Nama perusahaan harus berupa kata-kata'),
    description: yup
      .string()
      .max(255, 'Deskripsi tidak dapat lebih dari 255 karakter'),
  });

  function updateExp(dataExperience) {
    if (stillWorking) {
      if (start) {
        const startAt = moment(start).format('YYYY-MM-DD');
        Object.assign(dataExperience, {startAt});
        dispatch(experienceAction.updateExperience(token, id, dataExperience));
      } else {
        setTextAlert('Masukkan tanggal anda mulai bekerja!');
        setModalError(true);
      }
    } else {
      if (start && finish) {
        const startAt = moment(start).format('YYYY-MM-DD');
        const finishAt = moment(finish).format('YYYY-MM-DD');
        Object.assign(dataExperience, {startAt, finishAt});
        dispatch(experienceAction.updateExperience(token, id, dataExperience));
      } else {
        setTextAlert('Masukkan tanggal anda mulai dan berhenti bekerja!');
        setModalError(true);
      }
    }
  }

  React.useEffect(() => {
    if (updateIsSuccess) {
      dispatch(experienceAction.getWorkerExpById(token, id));
      dispatch(profileAction.getWorkerExp(token));
      Alert.alert('Sukses!', 'Edit pengalaman kerja berhasil.');
      navigation.navigate('ProfileWorker');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIsSuccess]);

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

      {/* modal alert gagal */}
      {navigation.isFocused() ? (
        <ModalAlert
          setModalOpen={setUpdateError}
          modalOpen={updateError}
          content="Penyuntingan pengalaman kerja gagal!"
          useOneBtn={true}
        />
      ) : null}

      {/* loading get skill and loading delete skill */}
      {navigation.isFocused() ? (
        <ModalLoading modalOpen={updateIsLoading} />
      ) : null}

      {Object.keys(expDetail).length ? (
        <Formik
          validationSchema={schemaExperience}
          initialValues={{
            position: expDetail.position,
            companyName: expDetail.Company.name,
            description: expDetail.description,
          }}
          onSubmit={(values) => updateExp(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <ScrollView>
              <Card style={styles.cardUp} transparent>
                <View style={styles.padding}>
                  <Title style={styles.title}>Pengalaman Kerja</Title>
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
                      <Label style={styles.label}>
                        Masukkan Nama Perusahaan
                      </Label>
                      <TextInput
                        name="companyName"
                        placeholder="PT Example"
                        style={styles.textInput}
                        onChangeText={handleChange('companyName')}
                        onBlur={handleBlur('companyName')}
                        value={values.companyName}
                      />
                      {touched.companyName && errors.companyName && (
                        <Text style={styles.textError}>
                          {errors.companyName}
                        </Text>
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
                          start ? (
                            moment(start).format('YYYY-MM-DD')
                          ) : (
                            <Icon name="calendar" size={24} color="black" />
                          )
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
                              finish ? (
                                moment(finish).format('YYYY-MM-DD')
                              ) : (
                                <Icon name="calendar" size={24} color="black" />
                              )
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
                        <Text style={styles.textError}>
                          {errors.description}
                        </Text>
                      )}
                    </Form>
                  </View>
                </View>
              </Card>
              <View>
                <View style={styles.padding}>
                  <Button
                    block
                    style={styles.btnPrimary}
                    onPress={handleSubmit}>
                    <Text style={styles.textBtnPrimary}>Simpan</Text>
                  </Button>
                  <Button
                    block
                    style={styles.btnSecondary}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.textBtnSecondary}>Batal</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      ) : (
        <ModalLoading modalOpen={Object.keys(expDetail).length} />
      )}
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
  title: {
    color: '#000000',
    fontSize: 25,
    textTransform: 'capitalize',
    margin: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e5ed',
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
  stillWorking: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  stillWorkingTxt: {
    color: '#9EA0A5',
    fontSize: 12,
  },
  checkboxStill: {
    marginRight: 10,
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
    paddingVertical: 50,
  },
  header: {
    color: '#1F2A36',
    fontSize: 25,
    lineHeight: 25,
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
