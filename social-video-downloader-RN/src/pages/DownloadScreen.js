import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const DownloadScreen = () => {
  const downloadVideoDirectly = () => {
    let url = 'http://nextjs-socialita.herokuapp.com/api/youtube/downloadpost';
    // let url =
    //   'https://nextjs-socialita.herokuapp.com/api/youtube/downloadpost?downloadlink=ayayaya';
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
    //     alert('File Downloaded Successfully.');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    const body = [
      {
        name: 'data',
        data: JSON.stringify({downloadlink: 'abc'}),
        type: 'application/json',
      },
      {
        name: 'data',
        data: JSON.stringify({downloadlink: 'abc'}),
        type: 'application/json',
      },
    ];

    let mybody = {
      passcode: 'pass123',
      group_id: '1',
      file: 'ShgRG/suvA/blag.zip',
    };

    config(options)
      .fetch(
        'POST',
        url,
        {
          Authorization: 'Bearer access-token',
          otherHeader: 'foo',
          'Content-Type': 'multipart/form-data',
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

    // config(options)
    //   .fetch(
    //     'POST',
    //     url,
    //     {
    //       Authorization: 'Bearer access-token',
    //       otherHeader: 'foo',
    //       'Content-Type': 'application/json',
    //     },
    //     JSON.stringify([
    //       {name: 'name', data: 'user'},
    //       {
    //         name: 'info',
    //         data: JSON.stringify({
    //           mail: 'example@example.com',
    //           tel: '12345678',
    //         }),
    //       },
    //     ]),
    //   )
    //   .then(res => {
    //     //Showing alert after successful downloading
    //     console.log('res -> ', JSON.stringify(res));
    //     alert('Video Downloaded Successfully.');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // RNFetchBlob.fetch(
    //   'POST',
    //   request.url,
    //   {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: auth ? 'Bearer ' + auth.accessToken : '',
    //   },
    //   body,
    // ).uploadProgress({interval: 5000}, (written, total) => {
    //   console.log('uploaded', written / total);
    //   dispatch({
    //     type: 'FEED_ITEM_COMPOSER_CREATE_PROGRESS',
    //     payload: Math.round((written / total) * 100) + '',
    //   });
    // });
  };

  return (
    <View>
      <Text>AYAYA</Text>
      <Button
        onPress={() => {
          downloadVideoDirectly();
        }}
        title="Download"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({});
