import { StyleSheet, Text } from 'react-native';
import React from 'react';

export const Title = ({ text }: props) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    color: '#363636'
  }
});

interface props {
  text: string;
}
