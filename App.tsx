import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { SelectCountryModal } from './components/SelectCountryModal';
import { Ionicons } from '@expo/vector-icons';
import { InfectedScreen } from './screens/InfectedScreen';
import { VaccinatedScreen } from './screens/VaccinatedScreen';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

function Main() {
  const [country, setCountry] = useState('World');
  const [modalVisible, setModalVisible] = useState(false);

  const { data: countries, isLoading: countriesLoading } = useQuery('getCountries', () => {
    return new Promise((resolve => {
      setTimeout(() => resolve('ewa'), 2000);
    }));
  });

  const SetCountryButton = () => {
    return <View style={{ marginRight: 7}}>
      {countriesLoading ? <ActivityIndicator /> :
        <Button title={country} onPress={() => setModalVisible(true)} /> }
    </View>;
  };

  return (
    <NavigationContainer>
      <SelectCountryModal visible={modalVisible} setModalVisible={setModalVisible} setCountry={setCountry} />
      <Tab.Navigator screenOptions={{ headerRight: SetCountryButton }}>
        <Tab.Screen name={'Infections'}
                    options={{ tabBarIcon: ({ size, color }) => <Ionicons name={'body-outline'} size={size} color={color} /> }}>
          {props => <InfectedScreen {...props} country={country} />}
        </Tab.Screen>
        <Tab.Screen name={'Vaccinated'}
                    options={{ tabBarIcon: ({ size, color }) => <Ionicons name={'medkit-outline'} size={size} color={color} /> }}>
          {props => <VaccinatedScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
