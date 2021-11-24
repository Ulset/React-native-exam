import { ActivityIndicator, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DataScreen } from '../screens/DataScreen';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusScreen } from '../screens/StatusScreen';

const Tab = createBottomTabNavigator();
export const TabController = ({ navigation, country, loading }: TabScreenProps) => {
  const SetCountryButton = () => {
    return <View style={{ marginRight: 7 }}>
      {loading ? <ActivityIndicator color={'#999999'} /> :
        <Button title={country} onPress={() => navigation.navigate('SelectCountry')} />}
    </View>;
  };

  return (
    <Tab.Navigator screenOptions={{ headerRight: SetCountryButton }}>
      <Tab.Group>
        <Tab.Screen name={'Status'}
                    options={{ tabBarIcon: ({ size, color }) => <Ionicons name={'body-outline'} size={size} color={color} /> }}>
          {props => <StatusScreen {...props} country={country} />}
        </Tab.Screen>
        <Tab.Screen name={'Data'}
                    options={{
                      tabBarIcon: ({ size, color }) => {
                        return <Ionicons name={'information-circle-outline'} size={size} color={color} />;
                      }
                    }}>
          {props => <DataScreen {...props} country={country} />}
        </Tab.Screen>
      </Tab.Group>
    </Tab.Navigator>
  );
};

interface TabScreenProps {
  navigation: NavigationProp<any>;
  country: string;
  loading: boolean;
}
