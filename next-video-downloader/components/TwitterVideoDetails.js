import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TwitterVideoDetails = ({
  thumbnail,
  videoURL,
  videoInfo,
  videoList,
  downloadFunction,
}) => {
  return (
    <div className="video-details-wrapper-vertical">
      <div className="video-details-top-vertical">
        <video
          src={thumbnail}
          style={{ width: "400px", height: "auto", margin: "10px auto" }}
          controls="controls"
        />
      </div>
      <h3>{videoInfo.full_text}</h3>
      {videoList.map((vid, index) => {
        if (vid.bitrate > 0) {
          return (
            <div key={index} className="download-options">
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>{index + 1}.</div>
                <div>{vid.resolution}</div>
              </div>
              <a
                className="custom-btn btn-3"
                onClick={(e) => {
                  e.preventDefault();
                  // downloadVideo(videoURL, vid.itag, vid.qualityLabel);
                  // downloadFile(videoURL, vid.itag, vid.qualityLabel);
                  //   alert("asu");
                  downloadFunction(vid.url, videoInfo.full_text);
                }}
              >
                <div className="btn-div">
                  <FontAwesomeIcon
                    icon={["fas", "download"]}
                    style={{ marginRight: "5px" }}
                    size="lg"
                  />
                  Download {vid.fileSize}
                </div>
              </a>
            </div>
          );
        }
      })}
    </div>
  );
};

export default TwitterVideoDetails;
