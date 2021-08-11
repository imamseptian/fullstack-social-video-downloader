import fdbl from "fbdl-core";
import fbvid from "fbvideos";
import XMLHttpRequest from "xmlhttprequest";
import https from "https";

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
    let xmlreq = new XMLHttpRequest.XMLHttpRequest();
    xmlreq.open("HEAD", videoLink.url, false); // false = Synchronous

    xmlreq.send(null); // it will stop here until this xmlreq request is complete

    // when we are here, we already have a response, b/c we used Synchronous XHR

    if (xmlreq.status === 200) {
      fileSize = xmlreq.getResponseHeader("content-length");
    }
    // return fileSize;
    return {
      quality: "Low",
      fileSize: formatBytes(fileSize),
      url: videoLink.url,
    };
  } else {
    let fileSize = 0;
    let videoLink = await fbvid.high(url);
    let xmlreq = new XMLHttpRequest.XMLHttpRequest();
    xmlreq.open("HEAD", videoLink.url, false); // false = Synchronous

    xmlreq.send(null); // it will stop here until this xmlreq request is complete

    // when we are here, we already have a response, b/c we used Synchronous XHR

    if (xmlreq.status === 200) {
      fileSize = xmlreq.getResponseHeader("content-length");
    }
    return {
      quality: "High",
      fileSize: formatBytes(fileSize),
      url: videoLink.url,
    };
  }
}

export default async function videoinfo(req, res) {
  const videoURL = req.query.videoURL;
  const info = await fdbl.getInfo(videoURL);
  console.log(info);

  let lowSize = await getSize(videoURL, "low");
  let highSize = await getSize(videoURL, "high");
  let availableVideo = [];
  availableVideo.push(lowSize);
  availableVideo.push(highSize);

  //   await fbvid
  //     .high(videoURL)
  //     .then((vid) => {
  //       //   console.log(vid.url);
  //       const request = https.get(vid.url, function (response) {
  //         let fileSize = 0;
  //         let xmlreq = new XMLHttpRequest.XMLHttpRequest();
  //         xmlreq.open("HEAD", vid.url, false); // false = Synchronous

  //         xmlreq.send(null); // it will stop here until this xmlreq request is complete

  //         // when we are here, we already have a response, b/c we used Synchronous XHR

  //         if (xmlreq.status === 200) {
  //           fileSize = xmlreq.getResponseHeader("content-length");
  //         }
  //         console.log(fileSize);
  //         availableVideo.push({
  //           quality: "High",
  //           size: formatBytes(fileSize),
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //
  // let availableVideo = [];
  // availableVideo.push({
  //   quality: "Low",
  //   fileSize: formatBytes(lowSize),
  // });
  // availableVideo.push({
  //   quality: "High",
  //   fileSize: formatBytes(highSize),
  // });
  info.availableVideo = availableVideo;

  res.status(200).json(info);
}
