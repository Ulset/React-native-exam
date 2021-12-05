import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { formatNumber } from '../helpers/NumberFormatter';

const BarDataPoint = ({ style, data }: props) => {
  //Shows a comparison between two numbers with a horiozontal bar chart.

  let percent = Math.floor((data.leftCompare.amount/data.rightCompare.amount)*100);
  percent = percent>100 ? 100 : percent

  //Animate the data
  const barAnimation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(barAnimation, { useNativeDriver: false, toValue: percent, duration: 1000}).start()
  }, [barAnimation])
  const divWidth = barAnimation.interpolate({
    inputRange: [0, percent],
    outputRange: ['0%', `${percent}%`]
  })

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.textContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.compareText}>{data.leftCompare.name}</Text>
          <Text style={styles.compareValueText}>{formatNumber(data.leftCompare.amount)}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{...styles.compareText, textAlign: 'right'}}>{data.rightCompare.name}</Text>
          <Text style={{...styles.compareValueText, textAlign: 'right'}}>{formatNumber(data.rightCompare.amount)}</Text>
        </View>
      </View>
      <View style={styles.barContainer}>
        <Animated.View style={{ width: divWidth, backgroundColor: data.leftColor ?? '#A92222FF', height: 10 }} />
        <View style={{ flex: 1, backgroundColor: data.rightColor ?? '#77C66E', height: 10 }} />
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
  compareText: {
    fontSize: 20
  },
  compareValueText: {
    color: '#333333'
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
