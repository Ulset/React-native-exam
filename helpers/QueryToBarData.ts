import { BarData } from '../components/BarDataPoint';
import { WorldometersAPIResponse } from '../screens/DataScreen';

//Converts data from a query to BarData
export const queryToBarData = (data: WorldometersAPIResponse): BarData[] => {
  return [
    { leftCompare: { name: 'Cases', amount: data.cases }, rightCompare: { name: 'Population', amount: data.population } },
    {
      leftCompare: { name: 'Recovered', amount: data.recovered }, rightCompare: { name: 'Cases', amount: data.cases },
      leftColor: '#77C66E',
      rightColor: '#A92222FF'
    },
    {
      leftCompare: { name: 'Total tests', amount: data.tests }, rightCompare: { name: 'Population', amount: data.population },
      leftColor: '#37a8ff',
      rightColor: '#A92222FF'
    },
    { leftCompare: { name: 'Active cases', amount: data.active }, rightCompare: { name: 'Cases', amount: data.cases } },
    { leftCompare: { name: 'Deaths', amount: data.deaths }, rightCompare: { name: 'Cases', amount: data.cases } },
    { leftCompare: { name: 'Active cases', amount: data.active }, rightCompare: { name: 'Population', amount: data.population } },
    { leftCompare: { name: 'Critical', amount: data.critical }, rightCompare: { name: 'Active cases', amount: data.active } }
  ];
};
