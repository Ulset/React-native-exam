import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';

interface props {
  text: string;
}

export const Title: FC<props> = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28
  }
});
