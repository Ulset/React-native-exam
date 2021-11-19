import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { GraphData } from '../components/GraphData';
import { useQuery } from 'react-query';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

export const InfectedScreen = ({ country }: {country: string}) => {
  const { data, isLoading } = useQuery<QueryReturnType>(['getInfectedChartData', country], () => {
    const scope = country === 'World' ? 'all' : country;
    return fetch(`https://disease.sh/v3/covid-19/historical/${scope}?lastdays=30`).then(r => r.json()).then((d) => {
      // Converting the API response fram day to day basis -> month by month
      Object.keys(d).forEach((type: string) => {
        const typeObject = d[type];

        const testData: LineChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        };
        d[type] = testData
      });
      return d as QueryReturnType
    });
  });


  if(isLoading || !data){
    return <Text>Loading!</Text>
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 10 }}>
        <GraphData name={country} data={data.cases} />
        <GraphData name={'Dead'} data={data.deaths} />
        <GraphData name={'Recovered'} data={data.recovered} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface QueryReturnType {
  cases: LineChartData;
  deaths: LineChartData;
  recovered: LineChartData;
}

