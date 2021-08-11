import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const UrlField = ({videoURL, getVideoInfo, setvideoURL}) => {
  return (
    <View>
      <TextInput
        // Inherit any props passed to it; e.g., multiline, numberOfLines below
        placeholder={`Paste a Youtube Video URL Here`}
        style={{
          backgroundColor: 'white',
          borderRadius: 7,
          paddingHorizontal: 10,
        }}
        value={videoURL}
        onChangeText={value => {
          setvideoURL(value);
        }}
      />

      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#86C232',
          paddingVertical: 10,
          borderRadius: 7,
        }}
        onPress={getVideoInfo}
        // onPress={downloadVideo}
      >
        <Text style={{fontSize: 18, color: '#474b4f', fontWeight: 'bold'}}>
          Get Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UrlField;

const styles = StyleSheet.create({});
