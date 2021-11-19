import { Dimensions, StyleSheet, View } from 'react-native';
import { Title } from './Title';
import { LineChart } from 'react-native-chart-kit';
import { chartConfig } from '../static/config';
import React from 'react';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

export const GraphData = ({ name, data, chartConf }: displayModuleProps) => {
  return (
    <View style={graphDataStyles.dataContainer}>
      <Title text={name} />
      <View style={graphDataStyles.lineBreakView} />
      <LineChart
        data={data}
        width={graphDataStyles.dataContainer.width - graphDataStyles.dataContainer.padding * 2}
        height={220}
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConf ? chartConf : chartConfig.config}
        style={chartConfig.style}
      />
    </View>
  );
};

interface displayModuleProps {
  name: string,
  data: LineChartData,
  chartConf?: AbstractChartConfig
}

export const graphDataStyles = StyleSheet.create({
  lineBreakView: {
    height: 1,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#949494'
  },
  dataContainer: {
    width: Dimensions.get('window').width * 0.95,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#FFFFFF'
  }
});
