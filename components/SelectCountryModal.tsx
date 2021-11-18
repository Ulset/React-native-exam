import { Button, Text, View } from 'react-native';
import React from 'react';

export const SelectCountryModal = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => {
      }} title="Dismiss" />
    </View>
  );
};

interface props {
  visible: boolean;
  setModalVisible: (b: boolean) => void;
  setCountry: (country: string) => void;
}
