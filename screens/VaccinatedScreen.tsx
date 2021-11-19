import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

export const VaccinatedScreen = (props: props) => {
  return (
    <View>
      <Text>Vaccinated</Text>
    </View>
  )
}

interface props {
  route: RouteProp<any>
}
