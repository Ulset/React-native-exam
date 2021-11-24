import React from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = ({ setSeen }: { setSeen: () => void }) => {
  //Simple welcome screen to show problems i had with the API.

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          Im currently using 2 different covid APIs from 'https://disease.sh/'. The one used on the tab 'Status' has some faults where
          sometimes it will return 0 recovered/infected/dead in a timeframe, this isnt a bug with my code, the data simply isnt there.
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
