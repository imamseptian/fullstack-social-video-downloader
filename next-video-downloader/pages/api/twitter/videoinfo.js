import XMLHttpRequest from "xmlhttprequest";
import videoUrlLink from "video-url-link";
import { async } from "regenerator-runtime";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function getSize(url) {
  let fileSize = 0;

  let xmlreq = new XMLHttpRequest.XMLHttpRequest();
  xmlreq.open("HEAD", url, false); // false = Synchronous

  xmlreq.send(null); // it will stop here until this xmlreq request is complete

  // when we are here, we already have a response, b/c we used Synchronous XHR

  if (xmlreq.status === 200) {
    fileSize = xmlreq.getResponseHeader("content-length");
  }
  return fileSize;
}

const getResolutionn = (bitrate) => {
  if (!bitrate) {
    return null;
  }
  let kilobitrate = parseInt(bitrate) / 1024;

  if (kilobitrate <= 300) {
    return "240p";
  } else if (kilobitrate > 300 && kilobitrate <= 500) {
    return "360p";
  } else if (kilobitrate > 500 && kilobitrate <= 1000) {
    return "480p";
  } else {
    return "720p";
  }
};

export default function videoinfo(req, res) {
  const videoURL = req.query.videoURL;
  return new Promise(async (resolve, reject) => {
    try {
      await videoUrlLink.twitter.getInfo(videoURL, {}, async (error, info) => {
        if (error) {
          console.error(error);
          res.status(404).json({
            message:
              "Video URL not Valid, please make sure you copy the correct Twitter Video URL",
          });
        } else {
          //   console.log(info.full_text);

          for (let i = 0; i < info.variants.length; i++) {
            info.variants[i].resolution = getResolutionn(
              info.variants[i].bitrate
            );
          }

          for (let i = 0; i < info.variants.length; i++) {
            if (info.variants[i].resolution != null) {
              info.variants[i].fileSize = formatBytes(
                await getSize(info.variants[i].url)
              );
            }
          }
          let filteredVideo = [];
          info.variants.forEach((vid) => {
            if (vid.resolution != null) {
              filteredVideo.push(vid);
            }
          });
          filteredVideo = filteredVideo.sort((a, b) =>
            a.fileSize > b.fileSize ? 1 : -1
          );
          info.variants = filteredVideo;

          res.status(200).json(info);
          resolve();
        }
      });
    } catch (error) {
      res.json(error);
      res.status(500).json({
        message: "Internal server error, please try again later",
      });
      return resolve();
    }
  });
}
