import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CountriesScreen } from './screens/CountriesScreen';
import { Button, View } from 'react-native';
import { routes } from './static/routes';
import { SelectCountryModal } from './components/SelectCountryModal';
import { InfectedScreen } from './screens/InfectedScreen';
import { VaccinatedScreen } from './screens/VaccinatedScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [country, setCountry] = useState('World');
  const [modalVisible, setModalVisible] = useState(false);

  const SetCountryButton = () => {
    return <View style={{marginRight: 5}}>
      <Button title={country} onPress={() => setModalVisible(true)} />
    </View>;
  };

  return (
    <NavigationContainer>
      <SelectCountryModal visible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} />
      <Tab.Navigator screenOptions={{ headerRight: SetCountryButton }}>
        <Tab.Screen name={'Infections'}>
          {props => <InfectedScreen {...props} country={country} />}
        </Tab.Screen>
        <Tab.Screen name={'Vaccinated'}>
          {props => <VaccinatedScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Countries" component={CountriesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
