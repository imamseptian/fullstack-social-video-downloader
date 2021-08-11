import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const Screen2 = ({navigation}) => {
  const onButtonB = () => {
    navigation.push('Screen3');
    // navigation.goBack();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Screen2</Text>
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'red' : 'blue',
          width: 140,
          alignItems: 'center',
          paddingVertical: 10,
          borderRadius: 10,
        })}
        onPress={onButtonB}>
        <Text style={{color: '#fff'}}>Go To Screen 3</Text>
      </Pressable>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({});
