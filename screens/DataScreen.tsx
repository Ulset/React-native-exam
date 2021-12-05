import React from 'react';
import { Dimensions, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import LoadingScreen from './LoadingScreen';
import BarDataPoint, { BarData } from '../components/BarDataPoint';
import { queryToBarData } from '../helpers/QueryToBarData';
import { useRefetchQuery } from '../hooks/useRefetchQuery';

export const DataScreen = ({ country }: { country: string }) => {
  //Simple info screen to show key points in a selected country

  const { data, isLoading, refetch } = useQuery<WorldometersProccesedResponse>(['countryInfo', country], () => {
    const apiString = country === 'World' ? 'all' : `countries/${country}`;
    return fetch(`https://disease.sh/v3/covid-19/${apiString}?strict=true`)
      .then(r => r.json()).then((d: WorldometersAPIResponse) => {
        if (country === 'World') {
          //API call for the whole world return slightly different data, post-proccesing a bit
          d.country = 'World';
          d.countryInfo = {
            flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/700px-Flag_of_the_United_Nations.svg.png'
          };
        }

        //Also pre-process the data used for the bar charts, so this is only done when theres new data.
        const barData = queryToBarData(d);

        return { country: { name: d.country, flag: d.countryInfo.flag }, barData };
      });
  });
  const { isRefetching, doRefresh } = useRefetchQuery(refetch);

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  const barDataPoints = data.barData.map((el, i) => {
    //Key has to be both i and the amount or the animation wont rerender
    const key = `${i} ${el.leftCompare.amount}`
    return <BarDataPoint data={el} key={key} style={{ marginBottom: 5 }} />;
  });

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={doRefresh} />}>
      <ImageBackground source={{ uri: data.country.flag }} style={styles.flagPicture} resizeMode={'cover'} />
      <ScrollView style={{ marginTop: -40, paddingTop: 20 }}>
        <View style={styles.contentContainer}>
          <Text style={styles.countryHeadline}>{data.country.name}</Text>
          {barDataPoints}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: dim.width * 0.95,
    alignItems: 'center',
    alignSelf: 'center'
  },
  flagPicture: {
    width: dim.width,
    height: 200
  },
  contentContainer: {
    width: dim.width,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 15,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.7,
    shadowRadius: 11.95,
    elevation: 15
  },
  countryHeadline: {
    fontSize: 40,
    alignSelf: 'center',
    color: '#4b4b4b',
    marginBottom: 5
  },
  dataPointContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center'
  },
  dataPoint: {
    width: '48%',
    aspectRatio: 1,
    borderColor: '#e3e3e3',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 3
  }
});

export interface WorldometersAPIResponse {
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
  updated: number,
  barData: BarData[]
}

export interface WorldometersProccesedResponse {
  country: {
    name: string,
    flag: string
  };
  barData: BarData[];
}
