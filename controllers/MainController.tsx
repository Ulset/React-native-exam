import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { TabController } from './TabController';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { SelectCountryModal } from '../screens/SelectCountryModal';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export function MainController() {
  //The country being viwed, can be a supported a country defined in 'countries' variable or 'World'.
  const [country, setCountry] = useState('World');

  //Fetches available countries that can be selected to get info about.
  const { data: countries, isLoading: countriesLoading } = useQuery<string[]>('getCountries', () => {
    return fetch('https://disease.sh/v3/covid-19/jhucsse').then(r => r.json()).then(d => {
      let output: string[] = [];
      d.forEach((el: { country: string }) => {
        if (!output.includes(el.country)) {
          output.push(el.country);
        }
      });
      return ['World', ...output];
    });
  });

  //Returns a simple navigation, with a added stack group for changing country..
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name={'TabMeny'} options={{ headerShown: false }}>
            {props => <TabController {...props} country={country} loading={countriesLoading} />}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={modalStackSettings}>
          <Stack.Screen name={'SelectCountry'} options={{title: "Select country"}}>
            {props => <SelectCountryModal {...props} setCountry={setCountry} countries={countries} />}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Need special treatment for Android, modal view doesnt work for some reason.
const modalStackSettings: StackNavigationOptions = {
  presentation: Platform.OS === 'android' ? undefined : 'modal',
  headerShown: Platform.OS === 'android',
  cardStyle: { backgroundColor: Platform.OS === 'android' ? '#ffffff' : 'transparent' },
  gestureEnabled: Platform.OS === 'android'
}
