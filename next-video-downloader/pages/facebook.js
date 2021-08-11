// import axios from "axios";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// export default function Youtube() {
//   const webUrl = "http://localhost:3000/";

//   const [videoInfo, setVideoInfo] = useState([]);
//   const [videoURL, setVideoURL] = useState("");
//   const [videoList, setVideoList] = useState([]);
//   const [isLoading, setisLoading] = useState(false);

//   const downloadVideo = (url) => {
//     // let vidquality = quality.toLowerCase();
//     // alert(quality);
//     window.open(
//       `${webUrl}api/facebook/download?videoURL=${url}&videoTitle=${videoInfo.name}`
//     );
//   };

//   const VideoList = () => {
//     return (
//       <div>
//         <ul>
//           {videoInfo.availableVideo.map((vid, i) => {
//             return (
//               <li>
//                 {`${vid.quality} - ${vid.fileSize}`} [
//                 <a
//                   className="download_link"
//                   href="/"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     downloadVideo(vid.url);
//                   }}
//                 >
//                   Download
//                 </a>
//                 ]
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   };

//   const getVideoInfo = async () => {
//     setisLoading(true);
//     setVideoList([]);
//     try {
//       let response = await axios.get(
//         `${webUrl}api/facebook/videoinfo?videoURL=${videoURL}`
//       );
//       let data = response.data;
//       console.log("DONE");
//       console.log(data);
//       console.log(data.availableVideo);
//       setVideoInfo(data);

//       setisLoading(false);
//     } catch (e) {
//       console.log(e.message);
//       alert("error");
//       setisLoading(false);
//     }

//     // window.open(`${webUrl}api/scrap?videoURL=${videoURL}`);
//   };

//   return (
//     <div>
//       <Navbar />

//       {/* <p>{JSON.stringify(user)}</p> */}
//       <div className="page-content">
//         <h1>Facebook Video Downloader</h1>
//         <input
//           type="text"
//           name="videoURL"
//           id="videoURL"
//           value={videoURL}
//           onChange={(e) => setVideoURL(e.target.value)}
//         />
//         <button onClick={getVideoInfo}>Submit</button>
//         <div>
//           <h2>{isLoading ? "Loading" : null}</h2>
//         </div>

//         <h1>{videoInfo.name ? videoInfo.name : null}</h1>
//         <p>{videoInfo.description ? videoInfo.description : null}</p>
//         {videoInfo.thumbnail ? (
//
//         ) : null}

//         {videoInfo.rawVideo ? <VideoList /> : null}

//         {/* <p>{JSON.stringify(videoList)}</p> */}
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
  FacebookVideoDetails,
} from "../components";

export default function TikTok() {
  const webUrl = process.env.BASE_URL;

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (url, itag, quality) => {
    let mime = "mp4";
    if (quality == null) {
      mime = "mp3";
    }
    window.open(
      `${webUrl}api/youtube/download?videoURL=${url}&itag=${itag}&mime=${mime}`
    );
  };

  const getVideoInfo = async () => {
    setisLoading(true);
    setVideoList([]);
    try {
      let response = await axios.get(
        `${webUrl}api/facebook/testvideo?videoURL=${videoURL}`
      );
      let data = response.data;
      console.log(data);
      console.log(`${webUrl}api/facebook/testvideo?videoURL=${videoURL}`);

      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      alert("error");
      setisLoading(false);
    }

    // window.open(`${webUrl}api/scrap?videoURL=${videoURL}`);
  };

  const DetailVideo = () =>
    videoList.length > 0 ? (
      <FacebookVideoDetails videoList={videoList} />
    ) : // <VerticalVideoDetails
    //   videoURL={videoURL}
    //   videoInfo={videoInfo}
    //   videoList={videoList}
    //   downloadFunction={downloadVideo}
    // />
    null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 className="page-title">Facebook Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="facebook"
          placeholder="Paste a Facebook video URL here"
        />
        {/* <video
          src={
            "https://video.fmnl3-1.fna.fbcdn.net/v/t42.1790-2/216240204_4262333940526329_893540817402680235_n.mp4?_nc_cat=107&vs=752244b2a8a3bcf7&_nc_vs=HBksFQAYJEdFeVE0d3o1YkhEMGtTUVBBS3RUbWFXamZtWU1idjRHQUFBRhUAAsgBABUAGCRHQVpLOVF3aUpHT2xGU2tCQUpwYXVZQ04yOGhWYnY0R0FBQUYVAgLIAQBLBogScHJvZ3Jlc3NpdmVfcmVjaXBlATEgbWVhc3VyZV9vcmlnaW5hbF9yZXNvbHV0aW9uX3NzaW0AKGNvbXB1dGVfc3NpbV9vbmx5X2F0X29yaWdpbmFsX3Jlc29sdXRpb24AEWRpc2FibGVfcG9zdF9wdnFzAA1zdWJzYW1wbGVfZnBzABB2bWFmX2VuYWJsZV9uc3ViABUAJQAcAAAmkPOx2euujgQVkE4oAkMzGAt2dHNfcHJldmlldxwXQF6yPXCj1woYKWRhc2hfdjNfMTI4MF9jcmZfMjNfaGlnaF8zLjFfZnJhZ18yX3ZpZGVvEgAYGHZpZGVvcy52dHMuY2FsbGJhY2sucHJvZBkcFQAVoLYEACgSVklERU9fVklFV19SRVFVRVNUGw2IFW9lbV90YXJnZXRfZW5jb2RlX3RhZwZvZXBfaGQTb2VtX3JlcXVlc3RfdGltZV9tcw0xNjI2MTgzOTYxNjY5DG9lbV9jZmdfcnVsZQd1bm11dGVkE29lbV9yb2lfcmVhY2hfY291bnQGNzA0NTI1DG9lbV9yb2lfbm90ZQtwcm9ncmVzc2l2ZRFvZW1fcm9pX3VzZXJfdGllcgAeb2VtX3JvaV9wcmVkaWN0ZWRfd2F0Y2hfdGltZV9zATAWb2VtX3JvaV9yZWNpcGVfYmVuZWZpdAUwLjAwMCVvZW1fcm9pX3N0YXRpY19iZW5lZml0X2Nvc3RfZXZhbHVhdG9yC3Byb2dyZXNzaXZlDG9lbV92aWRlb19pZBAxMTU3NDkwOTc4MDk4NDE3Em9lbV92aWRlb19hc3NldF9pZBAxMTU3NDkwOTY0NzY1MDg1FW9lbV92aWRlb19yZXNvdXJjZV9pZBAxMTU3NDkwOTYxNDMxNzUyHG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQQNDI2MjMzMzkzMDUyNjMzMCUCHBwcFfDmFxsBVQACGwFVAAIcFQIAAAAWgLq3AwAlvgEbB4gBcwQ4MzI3AmNkCjIwMjEtMDctMTMDcmNiBjcwNDUwMANhcHAGVmlkZW9zAmN0BkxFR0FDWRNvcmlnaW5hbF9kdXJhdGlvbl9zBzEyMi45MzQCdHMPb2VwX3Byb2dyZXNzaXZlAA%3D%3D&ccb=1-3&_nc_sid=b130af&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCIsInNvdXJjZV9zZWdtZW50X2hhbmRsZSI6bnVsbH0%3D&_nc_eui2=AeGmFzryeWmp6HtpwFK5-brbv1IoP7A7M2e_Uig_sDszZ4ROVLZn0KEaT1dCJOZTnlTzmwrvq6rKWlGXvzNFX03k&_nc_ohc=vbSSqqdLF9IAX_ApYlB&_nc_ht=video.fmnl3-1.fna&oh=4907bba55c063f2f29cdb2ef7681a300&oe=60EDB737&_nc_rid=14a0d4976aa0481&_nc_vts_prog=1&_nc_vts_internal=1"
          }
          style={{ height: "300px", width: "auto" }}
          controls="controls"
        /> */}

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
