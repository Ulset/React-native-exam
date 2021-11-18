import React from 'react';
import { SafeAreaView, ScrollView} from 'react-native';
import { GraphData } from '../components/GraphData';

// @ts-ignore
export const InfectedScreen = ({country}) => {
  console.log("screen rerender");
  console.log(country);
  const testData = {
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

  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 10 }}>
        <GraphData name={country} data={testData} />
        <GraphData name={'Dead'} data={testData} />
        <GraphData name={'Recovered'} data={testData} />
      </ScrollView>
    </SafeAreaView>
  );
};


