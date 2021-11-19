import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

export const SelectCountryModal = ({ visible, setModalVisible, setCountry }: props) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <TouchableWithoutFeedback onPressIn={() => setModalVisible(false)}>
          <View style={styles.topView} />
        </TouchableWithoutFeedback>
        <View style={styles.containerView}>
          <Text>Hei</Text>
        </View>
      </Modal>
    </>

  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1
  },
  containerView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24
  }
});

interface props {
  visible: boolean;
  setModalVisible: (b: boolean) => void;
  setCountry: (country: string) => void;
}
