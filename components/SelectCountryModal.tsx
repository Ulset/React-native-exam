import { FlatList, Modal, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

export const SelectCountryModal = ({ visible, setModalVisible, setCountry, countries }: props) => {
  const changeCountry = (country: string) => {
    setCountry(country)
    setModalVisible(false)
  }
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <TouchableWithoutFeedback onPressIn={() => {
          setModalVisible(false);
        }}>
          <View style={styles.topView} />
        </TouchableWithoutFeedback>
        <View style={styles.containerView}>
          <FlatList data={countries ?? []}
                    renderItem={({ item }) => <ClickableCountry item={item} onClick={()=>changeCountry(item)}/>}
                    keyExtractor={(item) => item} />
        </View>
      </Modal>
    </>

  );
};

const ClickableCountry = ({ item, onClick }: { item: string, onClick: () => void }) => {
  return (
    <TouchableHighlight onPress={onClick}>
      <View>
        <Text>{item}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1
  },
  containerView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flex: 3,
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
  countries: string[] | undefined;
}
