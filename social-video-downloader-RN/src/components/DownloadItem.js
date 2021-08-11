import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DownloadItem = ({number, qualityLabel, videoSize, downloadVideo}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <Text style={[styles.textItem, {marginRight: 10}]}>{number}.</Text>
      <Text style={[styles.textItem, {marginRight: 30}]}>{qualityLabel}</Text>

      <TouchableOpacity
        style={{
          paddingVertical: 8,
          paddingHorizontal: 10,
          backgroundColor: '#86C232',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={() => {
          // downloadVideo(vid.qualityLabel);
          downloadVideo();
          // downloadVideo2();
          // console.log(vid.url);
        }}>
        <MaterialCommunityIcons name="download-circle" size={20} />
        <Text
          style={{
            color: '#474b4f',
            fontSize: 14,
            fontWeight: 'bold',
            marginLeft: 8,
          }}>
          Download
        </Text>
        <Text
          style={{
            color: '#474b4f',
            fontSize: 14,
            fontWeight: 'bold',
            marginLeft: 8,
          }}>
          {videoSize}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadItem;

const styles = StyleSheet.create({
  textItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
