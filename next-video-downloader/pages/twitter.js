import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
  TwitterVideoDetails,
} from "../components";
import { webUrl } from "../MyVar/MyVar";
export default function Twitter() {
  // const webUrl = process.env.BASE_URL;
  // // const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (url, title) => {
    window.open(`${webUrl}api/twitter/download?videoURL=${url}&title=${title}`);
  };

  const getVideoInfo = async () => {
    setErrorStatus({
      ...errorStatus,
      isError: false,
      message: "",
    });
    setVideoInfo(null);
    setisLoading(true);
    setVideoList([]);
    try {
      let response = await axios.get(
        `${webUrl}api/twitter/videoinfo?videoURL=${videoURL}`
      );
      let data = response.data;
      let maxBit = 0;
      let thumbs = "";
      data.variants.forEach((e) => {
        if (parseInt(e.bitrate) > maxBit) {
          maxBit = parseInt(e.bitrate);
          thumbs = e.url;
        }
      });

      let videoku = data.variants;
      videoku = videoku.sort((a, b) => (a.bitrate > b.bitrate ? 1 : -1));
      console.log(videoku);
      setVideoList(videoku);

      setThumbnail(thumbs);
      console.log(data);
      setVideoInfo(data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      if (e.response.status === 404) {
        setErrorStatus({
          ...errorStatus,
          isError: true,
          message: e.response.data.message,
        });
      } else {
        setErrorStatus({
          ...errorStatus,
          isError: true,
          message: "Internal Server Error, please try again later",
        });
      }
      alert(JSON.stringify(e.status));
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <TwitterVideoDetails
        thumbnail={thumbnail}
        videoURL={videoURL}
        videoInfo={videoInfo}
        videoList={videoList}
        downloadFunction={downloadVideo}
      />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 className="page-title">Twitter Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="twitter"
          placeholder="Paste a Twitter video URL here"
        />

        {!isLoading ? <DetailVideo /> : <Spinner />}
        <ErrorVideo
          errorStatus={errorStatus}
          dismissAlert={() => {
            setErrorStatus({
              ...errorStatus,
              isError: false,
              message: "",
            });
          }}
        />
      </div>
    </div>
  );
}
