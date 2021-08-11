import fdbl from "fbdl-core";
import fbvid from "fbvideos";
import XMLHttpRequest from "xmlhttprequest";
import https from "https";
import facebookGetLink from "facebook-video-link";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function getSize(url, quality) {
  if (quality === "low") {
    let fileSize = 0;
    let videoLink = await fbvid.low(url);
    console.log(videoLink);
    // let xmlreq = new XMLHttpRequest.XMLHttpRequest();
    // xmlreq.open("HEAD", videoLink.url, false); // false = Synchronous

    // xmlreq.send(null); // it will stop here until this xmlreq request is complete

    // // when we are here, we already have a response, b/c we used Synchronous XHR

    // if (xmlreq.status === 200) {
    //   fileSize = xmlreq.getResponseHeader("content-length");
    // }
    // return fileSize;
    return {
      quality: "Low",
      //   fileSize: formatBytes(fileSize),
      url: videoLink.url,
    };
  } else {
    let fileSize = 0;
    let videoLink = await fbvid.high(url);
    console.log(videoLink);
    // let xmlreq = new XMLHttpRequest.XMLHttpRequest();
    // xmlreq.open("HEAD", videoLink.url, false); // false = Synchronous

    // xmlreq.send(null); // it will stop here until this xmlreq request is complete

    // // when we are here, we already have a response, b/c we used Synchronous XHR

    // if (xmlreq.status === 200) {
    //   fileSize = xmlreq.getResponseHeader("content-length");
    // }
    return {
      quality: "High",
      //   fileSize: formatBytes(fileSize),
      url: videoLink.url,
    };
  }
}

export default async function videoinfo(req, res) {
  const videoURL = req.query.videoURL;
  try {
    let availableVideo = [];
    let lowSize = await getSize(videoURL, "low");
    let highSize = await getSize(videoURL, "high");
    availableVideo.push(lowSize);
    availableVideo.push(highSize);
    // facebookGetLink(videoURL).then((response) => {
    //   console.log(response);
    // });

    res.status(200).json({ message: "success get video", videoList: "ayaya" });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message:
        "Video URL not Valid, please make sure you copy the correct Facebook Video URL",
    });
  }
}
