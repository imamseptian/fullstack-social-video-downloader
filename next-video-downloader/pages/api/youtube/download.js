import ytdl from "ytdl-core";
import https from "https";
import axios from "axios";

export default async function download(req, res) {
  // const videoURL = req.query.videoURL;
  // const quality = req.query.quality;
  // // const mime = req.query.mime;
  // const info = await ytdl.getInfo(videoURL);

  // const itag = req.query.itag;
  // let videoTitle = info.videoDetails.title;
  // videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");

  // let selectedVideo = info.formats.filter((vid) => {
  //   if (vid.qualityLabel === quality && vid.hasAudio) {
  //     return vid;
  //   }
  // });

  return new Promise((resolve, reject) => {
    try {
      https.get(req.body.url, function (response) {
        let kepala = response.headers;
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${req.body.title}.mp4"`
        );
        res.setHeader("Content-length", kepala["content-length"]);
        res.setHeader("Content-type", kepala["content-type"]);
        response.pipe(res);
        resolve();
      });
    } catch (error) {
      res.json(error);
      res.status(405).end();
      return resolve();
    }
  });
}
