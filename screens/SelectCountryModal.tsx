import { FlatList, Platform, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { NavigationProp } from '@react-navigation/native';

export const SelectCountryModal = ({ navigation, setCountry, countries }: props) => {
  //Component used for selecting a new country, is used both modally and as a full screen.

  const [search, setSearch] = useState('');

  const changeCountry = (country: string) => {
    setCountry(country);
    setSearch('');
    navigation.goBack();
  };
  const countriesFiltered = countries?.filter(el => el.toLowerCase().startsWith(search.toLowerCase()));
  const topTransparentView = () => {
    //Clicable area on top to close the modal (if the component is displayed as a modal)
    return (
      <TouchableWithoutFeedback onPressIn={() => navigation.goBack()}>
        <View style={styles.topView} />
      </TouchableWithoutFeedback>
    );
  };
  return (
    <>
      {Platform.OS !== 'android' ? topTransparentView() : null}
      <View style={styles.containerView}>
        <SearchBar value={search} onChange={setSearch} />
        <FlatList data={countriesFiltered ?? []}
                  renderItem={({ item }) => <ClickableCountry item={item} onClick={() => changeCountry(item)} />}
                  keyExtractor={(item) => item} />
      </View>
    </>
  );
};

const ClickableCountry = ({ item, onClick }: { item: string, onClick: () => void }) => {
  return (
    <TouchableHighlight onPress={onClick} activeOpacity={0.3} underlayColor={'#EFEFEF'}>
      <View style={styles.countryContainer}>
        <Text style={{ fontSize: 20 }}>{item}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1
  },
  containerView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
    paddingTop: 10
  },
  countryContainer: {
    padding: 10,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 0.5
  }
});

interface props {
  navigation: NavigationProp<any>;
  setCountry: (country: string) => void;
  countries: string[] | undefined;
}
