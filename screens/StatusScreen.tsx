import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { GraphData } from '../components/GraphData';
import { useQuery } from 'react-query';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import LoadingScreen from './LoadingScreen';
import { months } from '../static/months';
import { useRefetchQuery } from '../hooks/useRefetchQuery';

export const StatusScreen = ({ country }: { country: string }) => {
  //Screen to show linecharts of the development of the desease.

  const { data, isLoading, refetch } = useQuery<InfectedLinechartData>(['getInfectedChartData', country], () => {
    const scope = country === 'World' ? 'all' : country;
    return fetch(`https://disease.sh/v3/covid-19/historical/${scope}?lastdays=330`)
      .then(r => r.json()).then((d) => {
        //The response is slightly different based on World vs country data
        if (country !== 'World') {
          d = d.timeline;
        }

        // Converting the API response fram day to day basis -> month by month
        Object.keys(d).forEach((type: string) => {
          const typeObject = d[type];
          const dayKeys = Object.keys(typeObject);

          //Converts to: {month: [100, 200, 300]} etc.
          let monthData: { [key: string]: number[] } = {};
          dayKeys.forEach(dateString => {
            const date = new Date(dateString);
            const month = months[date.getMonth()];
            if (month in monthData) {
              monthData[month].push(typeObject[dateString]);
            } else {
              monthData[month] = [typeObject[dateString]];
            }
          });

          //Converts to LineChartData
          const allMonths = Object.keys(monthData);
          d[type] = {
            labels: allMonths,
            datasets: [{ data: allMonths.map(month => Math.floor(Math.max(...monthData[month]))) }]
          };
        });
        return d;
      });
  });
  const { isRefetching, doRefresh } = useRefetchQuery(refetch);

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 10 }}
                  refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={doRefresh} />}>
        <GraphData name={'Infected'} data={data.cases} />
        <GraphData name={'Dead'} data={data.deaths} />
        <GraphData name={'Recovered'} data={data.recovered} />
      </ScrollView>
    </SafeAreaView>
  );
};

interface InfectedLinechartData {
  cases: LineChartData;
  deaths: LineChartData;
  recovered: LineChartData;
}

