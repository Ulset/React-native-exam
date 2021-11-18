import { StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface props {
  text: String
}

export const Title: FC<props> = ({ text }) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  }
})
