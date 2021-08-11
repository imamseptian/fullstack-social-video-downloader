import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
} from "../components";
import FileDownload from "js-file-download";
import { webUrl } from "../MyVar/MyVar";
// import FileDownload from "js-file-download";

export default function Youtube() {
  // const webUrl = process.env.BASE_URL;
  // const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (videoUrl) => {
    // let mime = "mp4";
    // let qual = quality;
    // if (quality == null) {
    //   mime = "mp3";
    //   let qual = "music";
    // }
    // console.log(
    //   `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${qual}`
    // );

    // window.open(
    //   // `${webUrl}api/youtube/download?videoURL=${videoURL}&selectedURL=${url}&itag=${itag}&mime=${mime}`
    //   `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${qual}`
    // );
    setisSubmit(true);
    axios.defaults.withCredentials = true;
    let videoTitle = videoInfo.videoDetails.title;
    videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");

    axios({
      url: `${webUrl}api/youtube/download`,
      method: "POST",
      responseType: "blob", // Important,
      data: {
        url: videoUrl,
        title: videoTitle,
      },
    })
      .then((response) => {
        FileDownload(response.data, `${videoTitle}.mp4`);
        setisSubmit(false);
      })
      .catch((error) => {
        setisSubmit(false);
      });
  };

  const getVideoInfo = async () => {
    setErrorStatus({
      ...errorStatus,
      isError: false,
      message: "",
    });
    setVideoInfo(null);
    setisLoading(true);
    try {
      let response = await axios.get(
        `${webUrl}api/youtube/videoinfo?videoURL=${videoURL}`
      );
      let data = response.data;
      // let orderedSize = data.filteredVideo;
      // orderedSize = orderedSize.sort((a, b) =>
      //   a.fullSize > b.fullSize ? 1 : -1
      // );

      setVideoList(data.filteredVideo);
      // setVideoList(orderedSize);
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
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <VerticalVideoDetails
        videoURL={videoURL}
        videoInfo={videoInfo}
        videoList={videoList}
        downloadFunction={downloadVideo}
        loading={isLoading}
      />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 className="page-title">YouTube Video Downloader </h1>

          <FontAwesomeIcon icon={["fab", "youtube"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="youtube"
          placeholder="Paste a Youtube video URL here"
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
