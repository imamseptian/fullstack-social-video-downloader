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
    .fetch(
      'POST',
      `${webUrl}api/youtube/downloadpost`,
      {
        'Content-Type': 'application/json',
      },
      JSON.stringify({
        name: 'johan',
        email: 'johanson@gmail.com',
      }),
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
