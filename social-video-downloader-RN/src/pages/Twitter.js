import axios from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {UrlField, VideoDetailsSection} from '../components';

const Twitter = () => {
  const webUrl = 'https://next-video-downloader.herokuapp.com/';
  const [videoURL, setvideoURL] = useState('');
  const [videoInfo, setvideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [videoList, setvideoList] = useState([]);

  const getVideoInfo = async () => {
    setIsLoading(true);
    setvideoInfo(null);
    try {
      let response = await axios.get(
        `${webUrl}api/twitter/videoinfo?videoURL=${videoURL}`,
      );
      let data = response.data;
      console.log(data);
      setvideoInfo(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e.message);
      if (e.response.status === 404) {
        alert(e.response.data.message);
      } else {
        alert('Internal server error, please try again later!');
      }
      setIsLoading(false);
    }
  };

  const downloadVideoDirectly = url => {
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, //uses the device's native download manager.
        notification: true,
        // Title of download notification.
        path:
          DownloadDir +
          '/ ' +
          'video_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          '.mp4', // this is the path where your download file will be in
        description: 'Downloading file.',
      },
    };

    config(options)
      .fetch('GET', url)
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Video Downloaded Successfully.');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const VideoDetails = () =>
    videoInfo === null ? null : (
      <VideoDetailsSection
        downloadVideo={url => {
          downloadVideoDirectly(url);
        }}
        title={videoInfo.full_text}
        videoList={videoInfo.variants}
        keyword="twitter"
      />
    );

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: '#222629',
        paddingTop: 30,
        paddingHorizontal: 10,
      }}>
      <UrlField
        videoURL={videoURL}
        getVideoInfo={getVideoInfo}
        setvideoURL={value => {
          setvideoURL(value);
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#86C232"
          style={{marginTop: 100}}
        />
      ) : (
        <VideoDetails />
      )}
      {/* <VideoDetails /> */}
    </View>
  );
};

export default Twitter;

const styles = StyleSheet.create({
  textItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
