import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ModalCenter({
  modalOpen,
  modalContent = <Text>This is your modal</Text>,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalOpen}>
      <TouchableOpacity style={modalStyle.parent}>
        <TouchableWithoutFeedback style={modalStyle.content}>
          {modalContent}
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
  content: {
    width: 'auto',
    height: 'auto',
  },
});
