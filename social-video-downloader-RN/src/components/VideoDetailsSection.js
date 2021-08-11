import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {DownloadItem} from './';

const VideoDetailsSection = ({
  downloadVideo,
  thumbnails,
  title,
  videoList,
  description,
  keyword,
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
            style={{height: 170, width: 266, borderRadius: 7}}
            source={{
              uri: thumbnails,
            }}
            resizeMode="cover"
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
          {/* <VideoList /> */}
          <View style={{marginTop: 10}}>
            {videoList.map((vid, index) => {
              if (keyword === 'youtube') {
                return (
                  <DownloadItem
                    key={index}
                    number={index + 1}
                    qualityLabel={vid.qualityLabel}
                    videoSize={vid.totalSize}
                    downloadVideo={() => {
                      downloadVideo(vid.url);
                    }}
                  />
                );
              } else if (keyword === 'twitter') {
                return (
                  <DownloadItem
                    key={index}
                    number={index + 1}
                    qualityLabel={vid.resolution}
                    videoSize={vid.fileSize}
                    downloadVideo={() => {
                      downloadVideo(vid.url);
                    }}
                  />
                );
              }
            })}
          </View>
          {description ? (
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: 10,
                }}>
                Video Description
              </Text>
              <Text
                style={{
                  textAlign: 'left',
                  color: 'white',

                  fontSize: 12,
                }}>
                {description}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default VideoDetailsSection;

const styles = StyleSheet.create({});
