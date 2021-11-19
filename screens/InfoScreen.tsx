import React from 'react';
import { Text, View } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

export const InfoScreen = (props: props) => {
  return (
    <View>
      <Text>Vaccinated</Text>
    </View>
  )
}

interface props {
  route: RouteProp<any>;
  navigation: NavigationProp<any>
}
