import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function ModalCenter({
  modalOpen,
  setModalOpen,
  setOk = () => {},
  setCancel = () => {},
  content = '',
  okText = 'Ok',
  useOneBtn = false,
  cancelText = 'Cancel',
}) {
  const cancel = () => {
    setCancel();
    setModalOpen(false);
  };

  const proceed = () => {
    setOk();
    setModalOpen(false);
  };

  return (
    <Modal
      onRequestClose={() => setModalOpen(false)}
      animationType="fade"
      transparent={true}
      visible={modalOpen}>
      <TouchableOpacity
        onPress={() => setModalOpen(false)}
        style={modalStyle.parent}>
        <TouchableWithoutFeedback style={contents.content}>
          <View style={contents.parent}>
            <View style={contents.textWrapper}>
              <Text style={contents.content}>{content}</Text>
            </View>
            <View style={contents.buttonWrapper}>
              {useOneBtn ? (
                <View style={contents.btn}>
                  <Text style={contents.btnNo}>&nbsp;</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={cancel} style={contents.btn}>
                  <Text style={contents.btnNo}>{cancelText}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={proceed} style={contents.btn}>
                <Text style={contents.btnYes}>{okText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}

const modalStyle = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: 'auto',
    height: 'auto',
  },
});

const contents = StyleSheet.create({
  parent: {
    width: '70%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  textWrapper: {
    width: '100%',
    padding: '5%',
  },
  content: {
    color: '#999',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    padding: '5%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnYes: {
    color: '#5E50A1',
    fontSize: 14,
  },
  btnNo: {
    color: '#222',
    fontSize: 14,
  },
});
