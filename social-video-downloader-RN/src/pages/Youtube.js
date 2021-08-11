import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
import {UrlField, VideoDetailsSection} from '../components';

const Youtube = () => {
  const webUrl = 'https://nextjs-socialita.herokuapp.com/';
  const [videoURL, setvideoURL] = useState('');
  const [videoInfo, setvideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [videoList, setvideoList] = useState([]);

  const getVideoInfo = async () => {
    setvideoInfo(null);
    setIsLoading(true);
    try {
      let response = await axios.get(
        `${webUrl}api/youtube/videoinfo?videoURL=${videoURL}`,
      );
      let data = response.data;
      let orderedSize = data.filteredVideo;
      orderedSize = orderedSize.sort((a, b) =>
        a.fullSize > b.fullSize ? 1 : -1,
      );
      setvideoList(orderedSize);
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
      alert(e.response.data.message);
      setIsLoading(false);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted');
          downloadFile();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (error) {
        console.ward(error);
      }
    }
  };

  const downloadFile = () => {
    let imageURL =
      'https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_960_720.jpg';

    let videoURL =
      'https://r4---sn-q0c7rn76.googlevideo.com/videoplayback?expire=1626820458&ei=Cvv2YKGFA6j7xN8P-JWMmAE&ip=52.17.96.116&id=o-AO9x3eyItJHCxXSU4aNpuukF93hyTISt9h1A-UIjm9fG&itag=22&source=youtube&requiressl=yes&mh=G9&mm=31%2C26&mn=sn-q0c7rn76%2Csn-5hnekn7l&ms=au%2Conr&mv=m&mvi=4&pl=15&pcm2=yes&initcwndbps=873750&vprv=1&mime=video%2Fmp4&ns=zZa08rSqAmZ51v4rYZm3VmkG&cnr=14&ratebypass=yes&dur=1388.413&lmt=1626706183081245&mt=1626798525&fvip=4&fexp=24001373%2C24007246&c=WEB&txp=6432434&n=nDnHzyjW7IqTtxA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgBFYYC_tGghSsAi6F8BpNIapZGn3tGOm4TlPyFFEdisECIAC7X_U9LYB7SjGANrmqxxi6sRoBhjFlsv--9dUYqS4l&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKUHYqLkOj_-tex297_EYgprQkjp_gvP_DM8clZuzqHzAiEAhQKJKhxgB_wp0C_3pe2ZBrjtds3D6JoYDKgXRa1UNMo%3D';

    let date = new Date();
    let ext = getExtension(imageURL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };

    config(options)
      .fetch('GET', imageURL)
      .then(res => {
        console.log('res ->', JSON.stringify(res));
        alert('Image Download Successfully');
      });
  };

  const getExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const downloadVideo = quality => {
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, //uses the device's native download manager.
        notification: true,
        // Title of download notification.
        path: DownloadDir + '/ ' + videoInfo.videoDetails.title + '.mp4', // this is the path where your download file will be in
        description: 'Downloading file.',
      },
    };

    config(options)
      .fetch(
        'GET',
        `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${quality}`,
      )
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Video Downloaded Successfully.');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const downloadVideoDirectly = url => {
    alert('asu');
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

    // config(options)
    //   .fetch('GET', url)
    //   .then(res => {
    //     //Showing alert after successful downloading
    //     console.log('res -> ', JSON.stringify(res));
    //     alert('Video Downloaded Successfully.');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    config(options)
      .fetch(
        'POST',
        `${webUrl}api/youtube/downloadpost`,
        {
          Authorization: 'Bearer access-token',
          otherHeader: 'foo',
          'Content-Type': 'multipart/form-data',
          downloadlink: url,
        },
        [
          {name: 'name', data: 'user'},
          {
            name: 'info',
            data: JSON.stringify({
              mail: 'example@example.com',
              tel: '12345678',
            }),
          },
        ],
      )
      .then(res => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Video Downloaded Successfully.');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const VideoList = () => (
    <View style={{marginTop: 10}}>
      {videoList.map((vid, index) => {
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
            key={index}>
            <Text style={[styles.textItem, {marginRight: 10}]}>
              {index + 1}.
            </Text>
            <Text style={[styles.textItem, {marginRight: 30}]}>
              {vid.qualityLabel}
            </Text>

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
                downloadVideoDirectly(vid.url);
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
                {vid.totalSize}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );

  const VideoDetails = () =>
    videoInfo === null ? null : (
      <VideoDetailsSection
        downloadVideo={url => {
          downloadVideoDirectly(url);
        }}
        title={videoInfo.videoDetails.title}
        thumbnails={videoInfo.videoDetails.thumbnails[3].url}
        videoList={videoList}
        description={videoInfo.videoDetails.description}
        keyword="youtube"
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
    </View>
  );
};

export default Youtube;

const styles = StyleSheet.create({
  textItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
