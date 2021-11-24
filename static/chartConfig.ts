export const chartConfig = {
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
