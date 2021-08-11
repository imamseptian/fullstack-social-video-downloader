import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
const TikTokVideoDetails = ({ videoInfo, downloadVideo }) => {
  return (
    <div className="video-details-wrapper">
      <div className="video-details-left">
        <div
          style={{
            height: "500px",
            width: "200px",
            position: "relative",
            // background: "red",
          }}
        >
          <Image
            src={videoInfo.collector[0].imageUrl}
            // alt=""
            // width={"auto"}

            // layout="fill"
            layout="fill"
            objectFit="contain"
            className="video-thumbnails"
          />
        </div>
      </div>
      <div className="video-details-right">
        <div>
          <div className="tiktok-user-wrapper">
            <Image
              src={videoInfo.collector[0].authorMeta.avatar}
              height={60}
              width={60}
              className="avatar-tiktok"
            />
            <div style={{ marginLeft: "10px" }}>
              <div className="tiktok-username">
                {videoInfo.collector[0].authorMeta.name}{" "}
                <FontAwesomeIcon
                  icon={["fas", "check-circle"]}
                  style={{ marginRight: "5px" }}
                  // size="1x"
                  // color="#20d5ec"
                  // color="rgba(32,213,236,1)"
                  color={
                    videoInfo.collector[0].authorMeta.verified
                      ? "rgba(32,213,236,1)"
                      : "rgba(32,213,236,0)"
                  }
                />
              </div>
              <div className="tiktok-name">
                {videoInfo.collector[0].authorMeta.nickName}
              </div>
            </div>
          </div>

          <p className="tiktok-text-description">
            {videoInfo.collector[0].text}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            className="custom-btn btn-3"
            onClick={(e) => {
              e.preventDefault();
              downloadVideo();
            }}
          >
            <div className="btn-div">
              <FontAwesomeIcon
                icon={["fas", "download"]}
                style={{ marginRight: "5px" }}
                size="lg"
              />
              Download Video
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TikTokVideoDetails;
