import { BarData } from '../components/BarDataPoint';
import { WorldometersAPIResponse } from '../screens/DataScreen';

//Converts data from a query to homemade BarData, moved it out since it looked ugly in the code:)
export const queryToBarData = (data: WorldometersAPIResponse): BarData[] => {
  return [
    { leftCompare: { name: 'Cases', amount: data.cases }, rightCompare: { name: 'Population', amount: data.population } },
    {
      leftCompare: { name: 'Recovered', amount: data.recovered }, rightCompare: { name: 'Cases', amount: data.cases },
      leftColor: '#77C66E',
      rightColor: '#A92222FF'
    },
    { leftCompare: { name: 'Active cases', amount: data.active }, rightCompare: { name: 'Cases', amount: data.cases } },
    { leftCompare: { name: 'Deaths', amount: data.deaths }, rightCompare: { name: 'Cases', amount: data.cases } },
    {
      leftCompare: { name: 'Total tests', amount: data.tests }, rightCompare: { name: 'Population', amount: data.population },
      leftColor: '#3882ea'
    },
    { leftCompare: { name: 'Active cases', amount: data.active }, rightCompare: { name: 'Population', amount: data.population } },
    { leftCompare: { name: 'Critical', amount: data.critical }, rightCompare: { name: 'Active cases', amount: data.active } }
  ];
};
