import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchBar = ({value, onChange}: Props) => {
 return (
   <View style={styles.container}>
    <TextInput placeholder={'Search'}
               returnKeyType={'done'}
               value={value}
               onChangeText={onChange}
               autoCorrect={false}
               style={styles.textInput}/>
   </View>
 );
};

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#dcdcdc',
    padding: 2,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10
  },
  textInput: {
    height: 40,
    fontSize: 18
  }
})

export default SearchBar;
