import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useQuery } from 'react-query';
import LoadingScreen from './LoadingScreen';

export const InfoScreen = (props: props) => {
  const { country } = props;
  const { data, isLoading } = useQuery<QueryReturnValue>(['countryInfo', country], () => {
    const apiString = country === 'World' ? 'all' : `countries/${country}`;
    return fetch(`https://disease.sh/v3/covid-19/${apiString}?strict=true`)
      .then(r => r.json())
      .then(d => {
        if (country === 'World') {
          //API call for the whole world return slightly different data, post-proccesing a bit
          d.country = 'World';
          d.countryInfo = {
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/700px-Flag_of_the_United_Nations.svg.png'
          };
        }
        return d;
      });
  });

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView>
        <Image source={{ uri: data.countryInfo.flag }} style={styles.flagPicture} resizeMode={'cover'} />
        <Text style={{fontSize: 40, marginLeft: 10, marginTop: 10}}>{data.country}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.95,
    alignItems: 'center',
    alignSelf: 'center'
  },
  flagPicture: {
    width: Dimensions.get('window').width,
    height: 200,
  }
});

interface props {
  route: RouteProp<any>;
  navigation: NavigationProp<any>;
  country: string;
}

interface QueryReturnValue {
  active: number,
  activePerOneMillion: number,
  affectedCountries: number,
  cases: number,
  casesPerOneMillion: number,
  critical: number,
  country: string,
  countryInfo: {
    flag: string,
  },
  criticalPerOneMillion: number,
  deaths: number,
  deathsPerOneMillion: number,
  oneCasePerPeople: number,
  oneDeathPerPeople: number,
  oneTestPerPeople: number,
  population: number,
  recovered: number,
  recoveredPerOneMillion: number,
  tests: number,
  testsPerOneMillion: number,
  todayCases: number,
  todayDeaths: number,
  todayRecovered: number,
  updated: number
}
