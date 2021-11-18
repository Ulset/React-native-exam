import React from 'react';

import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Title } from '../components/Title';
import { chartConfig } from '../static/config';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

export const InfectedScreen = () => {
  const testData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [
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

  return (
    <SafeAreaView>
      <ScrollView>
        <GraphData name={'Infected'} data={testData}/>
        <GraphData name={'Dead'} data={testData}/>
        <GraphData name={'Recovered'} data={testData}/>
      </ScrollView>
    </SafeAreaView>
  );
};

const GraphData = ({ name, data }: displayModuleProps) => {
  const moduleWith = Dimensions.get('window').width * 0.95;

  return (
    <View style={{ width: moduleWith, alignSelf: 'center' }}>
      <Title text={name} />
      <LineChart
        data={data}
        width={moduleWith}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConfig.config}
        bezier
        style={chartConfig.style}
      />
    </View>

  );
};

interface displayModuleProps {
  name: string,
  data: LineChartData
}
