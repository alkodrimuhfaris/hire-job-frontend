import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import portofolio from '../assets/img/portofolio.jpg';

const FirstRoute = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.portofolioContainer}>
        <TouchableOpacity
          style={styles.space}
          onPress={() => setModalVisible(true)}>
          <Image source={portofolio} style={styles.portofolio} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.space}
          onPress={() => setModalVisible(true)}>
          <Image source={portofolio} style={styles.portofolio} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={portofolio} style={styles.portofolio} />
            <Text style={styles.name}>Tokopedia</Text>
            <Text style={styles.apps}>Aplikasi mobile</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum erat orci, mollis nec gravida sed, ornare quis urna.
              Curabitur eu lacus fringilla, vestibulum risus at. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vestibulum erat orci,
              mollis nec gravida sed, ornare quis urna. Curabitur eu lacus
              fringilla, vestibulum risus at.
            </Text>
            <View style={styles.sosmed}>
              <Icon name="map-marker" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>PT. Tokopedia</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="globe" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>tokopedia.com</Text>
            </View>
            <View style={styles.sosmed}>
              <Icon name="github" size={24} color="#9EA0A5" />
              <Text style={styles.sosmedText}>github.com/tokopedia/mobile</Text>
            </View>
            <Button
              block
              style={styles.btnPrimary}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textBtnPrimary}>Close</Text>
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default FirstRoute;

const styles = StyleSheet.create({
  portofolioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  portofolio: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  space: {
    marginBottom: 20,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 32,
    paddingHorizontal: 16,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: '#5E50A1',
    marginTop: 32,
  },
  textBtnPrimary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  sosmed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sosmedText: {
    color: '#9EA0A5',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  apps: {
    fontSize: 14,
    color: '#1F2A36',
    fontWeight: '400',
    marginBottom: 10,
  },
  description: {
    color: '#9EA0A5',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
});
