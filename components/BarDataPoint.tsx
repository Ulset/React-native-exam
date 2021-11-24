import React from 'react';
import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';

const BarDataPoint = ({ style, data }: props) => {
  let leftSize = data.leftCompare.amount;
  let rightSize = data.rightCompare.amount;
  while (leftSize > 10 || rightSize > 10) {
    //If the amount is eg 1231421 and 2023121, reduce both until they are below 10 so flexbox doesnt make a mess.
    leftSize /= 10;
    rightSize /= 10;
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.textContainer}>
        <Text style={{ ...styles.barLegendTest, textAlign: 'left' }}>{data.leftCompare.name}</Text>
        <Text style={{ ...styles.barLegendTest, textAlign: 'right' }}>{data.rightCompare.name}</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={{ flex: leftSize, backgroundColor: data.leftColor ?? '#77C66E', height: 10 }} />
        <View style={{ flex: rightSize, backgroundColor: data.rightColor ?? '#a92222', height: 10 }} />
      </View>
    </View>
  );
};

const dim = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: dim.width,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderColor: '#FFFFFF',
    borderBottomColor: '#dadada',
    borderWidth: 1
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  barContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  barLegendTest: {
    flex: 1,
    fontSize: 20
  }
});

interface props {
  data: BarData;
  style?: ViewStyle;
}

export interface BarData {
  rightCompare: { name: string, amount: number },
  leftCompare: { name: string, amount: number },
  rightColor?: string,
  leftColor?: string
}

export default BarDataPoint;
