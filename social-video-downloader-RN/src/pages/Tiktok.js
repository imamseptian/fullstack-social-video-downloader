import axios from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {UrlField, VideoDetailsSection, TikTokVideoDetails} from '../components';
// import mydata from '../tempdata/response.JSON';

// template if backend cant access proxy, delete it if unnecessary
const mycustom = {
  headers: {
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4148.150 Safari/537.36',
    referer: 'https://www.tiktok.com/',
    cookie:
      'tt_webid_v2=6942647099806042046; tt_csrf_token=YTUDcFi4F6H7mrr_ckawZWVf',
  },
  collector: [
    {
      id: '6987373801268989189',
      secretID: '6987373801268989189',
      text: '#onlinetools #websites #onlinehacks #unexpected #onlinemarketing #digitalmarketing #marketingtips #businesstips #entrepreneur #learnontiktok',
      createTime: 1626874745,
      authorMeta: {
        id: '6763214350896645125',
        secUid:
          'MS4wLjABAAAA6hzvPQI2j_UFi0w0k7QHB8MrbfeHVk6rznLTbEpH6oDIDOmh__VccvGSLi9hu3bh',
        name: 'simplydigital',
        nickName: 'Konstantinos⚡Digital Marketing',
        following: 50,
        fans: 986900,
        heart: 3900000,
        video: 206,
        digg: 3400,
        verified: false,
        private: false,
        signature:
          '🤌 Simplifying Digital Marketing \n🥇Top 32 Entrepreneur (GES2016) by US dpt',
        avatar:
          'https://p77-sign-va.tiktokcdn.com/musically-maliva-obj/8356763ce34b49b55298a843b9395ff7~c5_1080x1080.jpeg?x-expires=1627052400&x-signature=O1JNe9iHxFKoPiMdq7KQfX4xjRM%3D',
      },
      musicMeta: {
        musicId: '6839324086548563969',
        musicName: 'Blade Runner 2049',
        musicAuthor: 'Synthwave Goose',
        musicOriginal: false,
        coverThumb:
          'https://p16-sg.tiktokcdn.com/aweme/100x100/tos-alisg-v-2774/40d3513cce1941de844987c2450233fa.jpeg',
        coverMedium:
          'https://p16-sg.tiktokcdn.com/aweme/200x200/tos-alisg-v-2774/40d3513cce1941de844987c2450233fa.jpeg',
        coverLarge:
          'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-v-2774/40d3513cce1941de844987c2450233fa.jpeg',
        duration: 60,
      },
      imageUrl:
        'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/5da627db744543898f4d593f8bb8da38_1626874746~tplv-dmt-logom:tos-maliva-p-0000/4afdf4d966ea4dfa86867fa1a970f6e1.image?x-expires=1626987600&x-signature=9C9Bp7ISg6yNEl%2FGX%2FxDAX3u2Uk%3D',
      videoUrl:
        'https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c004/3a6ce159d3e5409f86a993839a3c2870/?a=1988&br=1988&bt=994&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1626990043&ft=Q9BExEDO_4ka&l=2021072215400801024512920745364B87&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=2&qs=0&rc=amtoZDo6ZnI1NjMzNzczM0ApNGQ0NGU2Ozw0NzQ2ZTs3aWdlLzRscjRnM3BgLS1kMTZzczIxY18zYTYzYmE2Xi00LjU6Yw%3D%3D&signature=747e3317d50860e0600376fe2e8ba737&tk=tt_webid_v2&vl=&vr=',
      videoUrlNoWaterMark: '',
      videoApiUrlNoWaterMark: '',
      videoMeta: {
        width: 576,
        height: 1024,
        ratio: '720p',
        duration: 35,
        duetEnabled: true,
        stitchEnabled: true,
        duetInfo: {duetFromId: '0'},
      },
      covers: {
        default:
          'https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/5da627db744543898f4d593f8bb8da38_1626874746~tplv-dmt-logom:tos-maliva-p-0000/4afdf4d966ea4dfa86867fa1a970f6e1.image?x-expires=1626987600&x-signature=9C9Bp7ISg6yNEl%2FGX%2FxDAX3u2Uk%3D',
        origin:
          'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/1abbe9d200e3474cb17fee596d040e07_1626874746?x-expires=1626987600&x-signature=X2eVI97N8h50dgNqu6JyhgrJzyo%3D',
      },
      diggCount: 1352,
      shareCount: 86,
      playCount: 18100,
      commentCount: 35,
      downloaded: false,
      mentions: [],
      hashtags: [
        {id: '1654934341373958', name: 'onlinetools', title: '', cover: ''},
        {id: '17529392', name: 'websites', title: '', cover: ''},
        {id: '52434174', name: 'onlinehacks', title: '', cover: ''},
        {
          id: '19286',
          name: 'unexpected',
          title:
            'Expect the unexpected ... 👻🧐🤣\n\nHow to shoot: \n1. Click the shoot icon. \n2. Click on “add sound”. \n3. And there you go! Select the first sound you see under “discover”.',
          cover:
            'https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/ebf4f24e6250802c5e030d986b7cbd09',
        },
        {id: '60286409', name: 'onlinemarketing', title: '', cover: ''},
        {id: '22040720', name: 'digitalmarketing', title: '', cover: ''},
        {id: '83304730', name: 'marketingtips', title: '', cover: ''},
        {id: '1605433582746629', name: 'businesstips', title: '', cover: ''},
        {
          id: '111385',
          name: 'entrepreneur',
          title:
            "Whether you're working on a side hustle, or starting your own businesses, here's to all the entrepreneurs.",
          cover:
            'https://p16-amd-va.tiktokcdn.com/obj/musically-maliva-obj/bd16f4b197c115dff074dc7c70065c2a',
        },
        {
          id: '1636483010861062',
          name: 'learnontiktok',
          title: 'Discover something new and #LearnOnTikTok.',
          cover:
            'https://p16-sg.tiktokcdn.com/obj/tiktok-obj/ef57ec6d8d6824054741ff5e58776a7a',
        },
      ],
      effectStickers: [],
    },
  ],
};
const Tiktok = () => {
  const webUrl = 'https://nextjs-socialita.herokuapp.com/';
  const [videoURL, setvideoURL] = useState('');
  const [videoInfo, setvideoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [videoList, setvideoList] = useState([]);

  const getVideoInfo = async () => {
    setIsLoading(true);

    setvideoInfo(null);
    try {
      let response = await axios.get(
        `${webUrl}api/tiktok/videoinfo?videoURL=${videoURL}`,
      );
      let data = response.data;
      console.log(data);
      //   console.log(data);
      setvideoInfo(data);
      setIsLoading(false);
    } catch (e) {
      setvideoInfo(mycustom);
      console.log(e.message);
      if (e.response.status === 404) {
        alert(e.response.data.message);
      } else {
        alert('Internal server error, please try again later!');
      }

      setIsLoading(false);
    }
  };

  const downloadVideoDirectly = () => {
    // let ayaya = JSON.stringify(videoInfo.headers);
    // console.log(JSON.parse(ayaya));
    let postendpoint = `${webUrl}api/tiktok/download`;
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
        postendpoint,
        {
          Authorization: 'Bearer access-token',
          otherHeader: 'foo',
          isandroid: 'true',
          'Content-Type': 'multipart/form-data',
          tiktokurl: videoInfo.collector[0].videoUrl,
          myheaders: JSON.stringify(videoInfo.headers),
          videotitle: `${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].text}`,
        },
        [
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

  const VideoDetails = () =>
    videoInfo === null ? null : (
      //   <View>
      //     <Text>AYAYA</Text>
      //   </View>
      <TikTokVideoDetails
        downloadVideo={url => {
          //   downloadVideoDirectly(url);
          alert('url');
        }}
        thumbnails={videoInfo.collector[0].imageUrl}
        title={`${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].authorMeta.nickName}`}
        description={videoInfo.collector[0].text}
        downloadVideo={() => {
          downloadVideoDirectly();
        }}
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

export default Tiktok;

const styles = StyleSheet.create({
  textItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
