import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Card, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as yup from 'yup';


import Avatar from '../assets/img/company.png';

import {useSelector, useDispatch} from 'react-redux';

import experienceAction from '../redux/actions/workExperience'

import ModalLoading from '../components/ModalLoading';

import ModalAlert from '../components/ModalAlert';

export default function EditExperience({route,navigation}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {token} = useSelector((state)=>state.auth)
  const {
    expDetail,expIsLoading,isEdit,ediitIsLoading
  } = useSelector((state) => state.workExperience)
  
  const [exp,setExp] =React.useState(null);
  const [data, setData] = React.useState(expDetail.type ? 1 : 0);

  const schemaExp = yup.object().shape({
    position: yup.string().required(' Jabatan anda sebagai apa')
  })

  function updateExp(values, img, type){
      const form =new FormData();
      form.append('position',values.position);
      form.append('companyName',values.companyName);
      form.append('startAt',values.startAt);
      form.append('finishAt',values.finishAt);
      form.append('description',values.description)

      dispatch(experienceAction.updateExperience(token, id, form))
  }

  useEffect(() => {
  dispatch(experienceAction.getWorkerExpById(token, id, form));
  }, [dispatch])

  useEffect(() => {
    if(isEdit){
      dispatch(experienceAction.clearAlert());
      dispatch(experienceAction.getWorkerExpById(token));
      navigation.navigate('ProfileWorker');
      Alert.alert('Berhasi','update experience success')
    }
  });
 
  return (
    <>
      <ScrollView>
        {Object.keys(expDetail)}
        <Card
          style={[styles.cardUp, styles.padding, styles.paddingVertical]}
          transparent>
          <Text style={styles.header}>Update Experience</Text>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Position</Text>
            <Item regular>
              <Input placeholder="Masukan Position" style={styles.input} />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Company Name</Text>
            <Item regular>
              <Input
                placeholder="Masukkan Company name"
                style={styles.input}
              />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>StartAt</Text>
            <Item regular>
              <Input placeholder="Masukkan StartAt" style={styles.input} />
            </Item>
          </View>

          <View style={styles.fieldMargin}>
            <Text style={styles.label}>finishAt</Text>
            <Item regular>
              <Input placeholder="Masukkan finishAt" style={styles.input} />
            </Item>
          </View>
          
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Description</Text>
            <Item regular>
              <Input
                placeholder="Tuliskan deskripsi singkat"
                style={styles.input}
                numberOfLines={5}
                multiline
              />
            </Item>
          </View>
        </Card>
        <View>
          <View style={styles.padding}>
            <Button block style={styles.btnPrimary}>
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
