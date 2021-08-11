import https from "https";
const TikTokScraper = require("tiktok-scraper");

export default async function download(req, res) {
  // console.log("MY HEADERS");
  // console.log(req.headers);
  if (req.headers.isandroid) {
    console.log("IS ANDROID DETECTED");
    console.log(req.headers);
    let url = req.headers.tiktokurl;
    console.log(typeof url);
    console.log(url);
    let urlremoved = url.replace("https://", "");
    let arrword = urlremoved.split("/");

    let options = {
      hostname: arrword[0],
      path: urlremoved.replace(arrword[0], ""),
      headers: JSON.parse(req.headers.myheaders),
    };

    let videoTitle = req.headers.videotitle;
    videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${videoTitle}.mp4"`
    );
    return new Promise((resolve, reject) => {
      try {
        const request = https.get(options, function (response) {
          let kepala = response.headers;
          // console.log(response);
          res.setHeader("Content-length", kepala["content-length"]);
          res.setHeader("Content-type", kepala["content-type"]);
          response.pipe(res);
          // res.json(response);
          resolve();
        });
      } catch (error) {
        console.log("error");
        console.log(error);
        res.json(error);
        res.status(405).end();
        return resolve();
      }
    });
  } else {
    console.log("NON ANDROID DETECTED");
    let url = req.body.url;
    let urlremoved = url.replace("https://", "");
    let arrword = urlremoved.split("/");

    let options = {
      hostname: arrword[0],
      path: urlremoved.replace(arrword[0], ""),
      headers: JSON.parse(req.body.myHeaders),
    };

    let videoTitle = req.body.videoTitle;
    videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${"videoTitle"}.mp4"`
    );
    return new Promise((resolve, reject) => {
      try {
        const request = https.get(options, function (response) {
          let kepala = response.headers;
          // console.log(response);
          res.setHeader("Content-length", kepala["content-length"]);
          res.setHeader("Content-type", kepala["content-type"]);
          response.pipe(res);
          // res.json(response);
          resolve();
        });
      } catch (error) {
        console.log("error");
        console.log(error);
        res.json(error);
        res.status(405).end();
        return resolve();
      }
    });
  }
}
