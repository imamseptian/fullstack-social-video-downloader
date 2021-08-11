import axios from "axios";
import { useEffect, useState } from "react";
import {
  Navbar,
  TikTokVideoDetails,
  Spinner,
  ErrorVideo,
  UrlField,
} from "../components";
import FileDownload from "js-file-download";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { webUrl } from "../MyVar/MyVar";
export default function TikTok() {
  // const webUrl = process.env.BASE_URL;
  // const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = async () => {
    axios.defaults.withCredentials = true;

    axios({
      url: `${webUrl}api/tiktok/download`,
      method: "POST",
      responseType: "blob", // Important,
      data: {
        myHeaders: JSON.stringify(videoInfo.headers),
        url: videoInfo.collector[0].videoUrl,
        videoTitle: `${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].text}`,
      },
    }).then((response) => {
      let videoTitle = `${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].text}`;
      videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");
      FileDownload(response.data, `${videoTitle}.mp4`);
    });
  };

  const getVideoInfo = async () => {
    setisLoading(true);

    try {
      let response = await axios.get(
        `${webUrl}api/tiktok/videoinfo?videoURL=${videoURL}`
      );
      console.log(response.status);
      console.log(response.data);
      setErrorStatus({
        ...errorStatus,
        isError: false,
        message: "",
      });
      setVideoInfo(response.data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      console.log(e.response.status);
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

      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <TikTokVideoDetails videoInfo={videoInfo} downloadVideo={downloadVideo} />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 style={{ marginRight: "15px" }}>Tiktok Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "tiktok"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="tiktok"
          placeholder="Paste a TikTok video URL here"
        />
        {/* <p>{JSON.stringify(videoInfo.headers)}</p> */}

        {/* detail video  */}
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
