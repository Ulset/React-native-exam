import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { TabController } from './TabController';
import { SelectCountryModal } from '../components/SelectCountryModal';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function MainController() {
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

  //Returns a simple navigation, with a added stack group for modal view.
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name={'TabMeny'} options={{ headerShown: false }}>
            {props => <TabController {...props} country={country} loading={countriesLoading} />}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false, cardStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name={'SelectCountry'} options={{ gestureEnabled: false }}>
            {props => <SelectCountryModal {...props} setCountry={setCountry} countries={countries} />}
          </Stack.Screen>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}