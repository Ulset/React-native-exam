import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Button, View } from 'react-native';
import { SelectCountryModal } from './components/SelectCountryModal';
import { Ionicons } from '@expo/vector-icons';
import { InfectedScreen } from './screens/InfectedScreen';
import { InfoScreen } from './screens/InfoScreen';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from './screens/WelcomeScreen';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  //Welcome screen to show the faults with the API.
  const [seenWelcomeScreen, setSeenWelcomeScreen] = useState(false);
  /*TODO Uncommment this code.
  AsyncStorage.getItem('seenWelcomeScreen').then(d => {
    if(!d){
      setSeenWelcomeScreen(false)
    }
  })
  */

  if(!seenWelcomeScreen){
    return <WelcomeScreen setSeen={() => setSeenWelcomeScreen(true)}/>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

function Main() {
  const [country, setCountry] = useState('World');
  const [modalVisible, setModalVisible] = useState(false);

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

  const SetCountryButton = () => {
    return <View style={{ marginRight: 7 }}>
      {countriesLoading ? <ActivityIndicator /> :
        <Button title={country} onPress={() => setModalVisible(true)} />}
    </View>;
  };

  //Returns a simple tab navigator, plus a Modal that can be displayed to choose a different country.
  return (
    <NavigationContainer>
      <SelectCountryModal visible={modalVisible}
                          setModalVisible={setModalVisible}
                          countries={countries}
                          setCountry={setCountry} />
      <Tab.Navigator screenOptions={{ headerRight: SetCountryButton }}>
        <Tab.Screen name={'Infections'}
                    options={{ tabBarIcon: ({ size, color }) => <Ionicons name={'body-outline'} size={size} color={color} /> }}>
          {props => <InfectedScreen {...props} country={country} />}
        </Tab.Screen>
        <Tab.Screen name={'Data'}
                    options={{
                      tabBarIcon: ({ size, color }) => {
                        return <Ionicons name={'information-circle-outline'} size={size} color={color} />;
                      }
                    }}>
          {props => <InfoScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
