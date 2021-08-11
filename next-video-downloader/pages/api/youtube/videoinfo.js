import ytdl from "ytdl-core";
import XMLHttpRequest from "xmlhttprequest";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default async function handler(req, res) {
  let start = new Date();
  let hrstart = process.hrtime();
  const videoURL = req.query.videoURL;

  try {
    const info = await ytdl.getInfo(videoURL);
    let filteredVideo = [];

    for (let i = 0; i < info.formats.length; i++) {
      if (info.formats[i].container != "mp4") {
        continue;
      }
      // if (info.formats[i].audioCodec == null) {
      //   continue;
      // }
      if (!info.formats[i].hasAudio) {
        continue;
      }
      if (!info.formats[i].qualityLabel) {
        continue;
      }
      // filteredVideo.push(info.formats[i]);
      // let isMp4 = false;
      // let fileSize = 0;
      // let xmlreq = new XMLHttpRequest.XMLHttpRequest();
      // xmlreq.open("HEAD", info.formats[i].url, false); // false = Synchronous

      // xmlreq.send(null); // it will stop here until this xmlreq request is complete

      // // when we are here, we already have a response, b/c we used Synchronous XHR

      // if (xmlreq.status === 200) {
      //   fileSize = xmlreq.getResponseHeader("content-length");
      //   info.formats[i].totalSize = formatBytes(fileSize);
      //   info.formats[i].fullSize = parseInt(fileSize);
      //   filteredVideo.push(info.formats[i]);
      // }
      filteredVideo.push(info.formats[i]);
    }
    info.filteredVideo = filteredVideo;
    res.status(200).json(info);

    // if (filteredVideo.length < 1) {
    //   console.log(info);
    //   res.status(404).json({
    //     message: "Failed to get download URL, please try again!",
    //   });
    // } else {
    //   filteredVideo = filteredVideo.sort((a, b) =>
    //     a.fullSize > b.fullSize ? 1 : -1
    //   );

    //   info.filteredVideo = filteredVideo;
    //   res.status(200).json(info);
    // }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message:
        "Video URL not Valid, please make sure you copy the correct Youtube Video URL",
    });
  }
}
