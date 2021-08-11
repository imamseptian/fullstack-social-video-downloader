import fbdl from "fbdl-core";
import fbvid from "fbvideos";
import fs from "fs";
import https from "https";

export default async function download(req, res) {
  const videoURL = req.query.videoURL;
  let videoTitle = req.query.videoTitle;
  videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${videoTitle}.mp4"`
  );

  return new Promise((resolve, reject) => {
    try {
      console.log(res);
      const request = https.get(videoURL, function (response) {
        response.pipe(res);
        resolve();
      });
    } catch (error) {
      res.json(error);
      res.status(405).end();
      return resolve();
    }
  });

  // const videoURL = req.query.videoURL;
  // const quality = req.query.quality;
  // const info = await fbdl.getInfo(videoURL);

  // let videoTitle = info.name;
  // videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");

  // res.setHeader(
  //   "Content-Disposition",
  //   `attachment; filename="${videoTitle}.mp4"`
  // );
  // //   fbvid.high(videoURL).then((vid) => {
  // //     const request = https.get(vid.url, function (response) {
  // //       response.pipe(res);
  // //     });
  // //   });
  // return new Promise((resolve, reject) => {
  //   if (quality === "low") {
  //     fbvid
  //       .low(videoURL)
  //       .then((vid) => {
  //         // console.log(vid.url);
  //         const request = https.get(vid.url, function (response) {
  //           response.pipe(res);
  //           resolve();
  //         });
  //       })
  //       .catch((error) => {
  //         res.json(error);
  //         res.status(405).end();
  //         return resolve(); //in case something goes wrong in the catch block (as vijay) commented
  //       });
  //   } else {
  //     fbvid
  //       .high(videoURL)
  //       .then((vid) => {
  //         // console.log(vid.url);
  //         const request = https.get(vid.url, function (response) {
  //           response.pipe(res);
  //           resolve();
  //         });
  //       })
  //       .catch((error) => {
  //         res.json(error);
  //         res.status(405).end();
  //         return resolve(); //in case something goes wrong in the catch block (as vijay) commented
  //       });
  //   }
  // });
  // //   fbdl.download(videoURL).then((response) => {
  // //     file.pipe
  // //   });
}
