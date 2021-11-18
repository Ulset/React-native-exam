import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InfectedScreen } from './screens/InfectedScreen';
import { VaccinatedScreen } from './screens/VaccinatedScreen';
import { CountriesScreen } from './screens/CountriesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Infected" component={InfectedScreen} />
        <Tab.Screen name="Vaccinated" component={VaccinatedScreen} />
        <Tab.Screen name="Countries" component={CountriesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
