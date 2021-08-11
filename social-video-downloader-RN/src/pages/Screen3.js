import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const Screen3 = ({navigation}) => {
  const onButtonB = () => {
    navigation.pop(5);
    // navigation.goBack();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Screen3</Text>
      <Pressable
        style={({pressed}) => ({
          backgroundColor: pressed ? 'red' : 'blue',
          width: 140,
          alignItems: 'center',
          paddingVertical: 10,
          borderRadius: 10,
        })}
        onPress={onButtonB}>
        <Text style={{color: '#fff'}}>Go To Screen 1</Text>
      </Pressable>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({});
