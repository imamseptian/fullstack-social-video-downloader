import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const Screen1 = ({navigation}) => {
  const onButtonB = () => {
    // navigation.replace('Screen2');
    navigation.navigate('Screen2');
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Screen1</Text>
      {/* <TouchableOpacity
      style={{
        backgroundColor: 'green',
        width: 140,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Text style={{color: '#fff'}}>Go To Screen B</Text>
    </TouchableOpacity> */}
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'red' : 'blue',
          width: 140,
          alignItems: 'center',
          paddingVertical: 10,
          borderRadius: 10,
        })}
        onPress={onButtonB}>
        <Text style={{color: '#fff'}}>Go To Screen 2</Text>
      </Pressable>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
