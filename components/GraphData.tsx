import { Dimensions, StyleSheet, View } from 'react-native';
import { Title } from './Title';
import { LineChart } from 'react-native-chart-kit';
import React, { useState } from 'react';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

export const GraphData = ({ name, data, chartConf }: displayModuleProps) => {
  //The data number can sometimes be a bit large, especially when displaying data from the whole world
  // Therefore im post-processing it a bit.
  const [yAxisSuffix, setYAxisSuffix] = useState('');
  if(data.datasets.length === 1){
    const highestNumber = Math.max(...data.datasets[0].data)
    if(highestNumber>10000000){
      data.datasets[0].data = data.datasets[0].data.map(n => n/1000000)
      setYAxisSuffix(' M')
    } else if(highestNumber>50000){
      data.datasets[0].data = data.datasets[0].data.map(n => n/1000)
      setYAxisSuffix(' K')
    }
  }

  return (
    <View style={graphDataStyles.dataContainer}>
      <Title text={name} />
      <View style={graphDataStyles.lineBreakView} />
      <LineChart
        data={data}
        width={graphDataStyles.dataContainer.width - graphDataStyles.dataContainer.padding * 2}
        height={220}
        yAxisSuffix={yAxisSuffix}
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

const chartConfig = {
  config: {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#9f2b2b',
    backgroundGradientTo: '#d23f3f',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ff0016'
    }
  },
  style: {
    marginVertical: 8,
    borderRadius: 16
  }
};

const graphDataStyles = StyleSheet.create({
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
