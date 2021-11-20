import React from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = ({ setSeen }: { setSeen: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          The API im using has a problem where the data isnt fully complete, this means that sometimes
          the graphs will show 0 deaths/recovered etc. This isnt a bug with the code, the data simply isnt
          there.
        </Text>
      </View>
      <View>
        <Button title={'Alright!'} onPress={setSeen} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  textContainer: {
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  text: {
    fontSize: 18
  }
});

export default WelcomeScreen;
