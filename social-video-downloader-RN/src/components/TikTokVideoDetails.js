import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const TikTokVideoDetails = ({
  downloadVideo,
  thumbnails,
  title,
  description,
}) => {
  return (
    <ScrollView style={{marginTop: 20}}>
      <View
        style={{
          display: 'flex',
          backgroundColor: '#474b4f',
          borderRadius: 7,
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {thumbnails ? (
          <Image
            style={{width: 250, height: 300, borderRadius: 7}}
            source={{
              uri: thumbnails,
            }}
            resizeMode="contain"
          />
        ) : null}

        <View style={{width: '100%', marginTop: 10}}>
          <Text
            style={{
              textAlign: 'left',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            {title}
          </Text>
          {description ? (
            <Text
              style={{
                textAlign: 'left',
                color: 'white',
                marginTop: 10,

                fontSize: 12,
              }}>
              {description}
            </Text>
          ) : null}

          {/* BUTTON DOWNLOAD  */}
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 10,
              backgroundColor: '#86C232',
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              //   alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={() => {
              // downloadVideo(vid.qualityLabel);
              //   alert('asu');
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
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default TikTokVideoDetails;

const styles = StyleSheet.create({});
