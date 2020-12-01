import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, Button, Card, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import Avatar from '../assets/img/profile.png';

export default function EditProfileRecruiter({navigation}) {
  return (
    <>
      <ScrollView>
        <Card style={styles.cardUp} transparent>
          <View style={styles.parent}>
            <TouchableOpacity>
              <Image source={Avatar} style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.name}>PT. Martabat Jaya Abadi</Text>
            <Text style={styles.field}>Financial</Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={24} color="#8e8e8e" />
              <Text style={styles.map}>Purwokerto, Jawa Tengah</Text>
            </View>
          </View>
        </Card>
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
              />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Bidang</Text>
            <Item regular>
              <Input
                placeholder="Masukkan bidang perusahaan ex: IT"
                style={styles.input}
              />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Kota</Text>
            <Item regular>
              <Input placeholder="Masukkan kota" style={styles.input} />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Deskrpsi</Text>
            <Item regular>
              <Input
                placeholder="Tuliskan deskripsi singkat"
                style={styles.input}
                numberOfLines={5}
                multiline
              />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Email</Text>
            <Item regular>
              <Input placeholder="Masukkan email" style={styles.input} />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Instagram</Text>
            <Item regular>
              <Input placeholder="Masukkan Instagram" style={styles.input} />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Nomor telepon</Text>
            <Item regular>
              <Input
                placeholder="Masukkan nomor telepon"
                style={styles.input}
                keyboardType="phone-pad"
              />
            </Item>
          </View>
          <View style={styles.fieldMargin}>
            <Text style={styles.label}>Linkedin</Text>
            <Item regular>
              <Input placeholder="Masukkan Linkedin" style={styles.input} />
            </Item>
          </View>
        </Card>
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
});
