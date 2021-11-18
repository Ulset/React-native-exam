import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CountriesScreen } from './screens/CountriesScreen';
import { Button } from 'react-native';
import { routes } from './static/routes';

const Tab = createBottomTabNavigator();

export default function App() {
  const [country, setCountry] = useState('World');
  const [modalVisible, setModalVisible] = useState(false);
  const SetCountryComponent = () => {
    return <Button title={country} onPress={() => setModalVisible(true)} />;
  };

  const specificDataScreens = routes.map(({ name, Component }) => {
    // These needs the currently selected country state
    return (
      <Tab.Screen name={name} key={name}>
        {props => <Component {...props} country={country} />}
      </Tab.Screen>
    );
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerRight: SetCountryComponent }}>
        {specificDataScreens}
        <Tab.Screen name="Countries" component={CountriesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
