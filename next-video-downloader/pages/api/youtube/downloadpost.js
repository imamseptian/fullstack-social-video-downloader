import ytdl from "ytdl-core";
import https from "https";

export default async function download(req, res) {
  if (req.method == "POST") {
    let downloadlink = req.body.downloadlink;
    console.log("POST METHOD DETECTED");
    console.log(req.headers);
    console.log(req.body);

    let url =
      "https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_960_720.jpg";

    return new Promise((resolve, reject) => {
      try {
        https.get(url, function (response) {
          let kepala = response.headers;
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="imageku.jpg"`
          );
          res.setHeader("Content-length", kepala["content-length"]);
          res.setHeader("Content-type", kepala["content-type"]);
          response.pipe(res);
          resolve();
        });
      } catch (error) {
        res.json({ message: error });
        res.status(405).end();
        return resolve();
      }
    });
  }
  if (req.method == "GET") {
    const videoURL = req.query.downloadlink;
    console.log("GET METHOD DETECTED");
    // console.log(videoURL);
    // console.log(req.headers);
    // console.log(req.body);
    if (req.headers.downloadlink) {
      console.log("ini downloadnya");
      console.log(req.headers.downloadlink);
      return new Promise((resolve, reject) => {
        try {
          console.log("try download");
          https.get(req.headers.downloadlink, function (response) {
            let kepala = response.headers;
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="yucub.mp4"`
            );
            res.setHeader("Content-length", kepala["content-length"]);
            console.log(kepala);
            res.setHeader("Content-type", kepala["content-type"]);
            response.pipe(res);
            resolve();
          });
        } catch (error) {
          console.log("video error");
          res.json({ message: error });
          res.status(405).end();
          return resolve();
        }
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          https.get(url, function (response) {
            let kepala = response.headers;
            res.setHeader(
              "Content-Disposition",
              `attachment; filename="imageku.jpg"`
            );
            res.setHeader("Content-length", kepala["content-length"]);
            res.setHeader("Content-type", kepala["content-type"]);
            response.pipe(res);
            resolve();
          });
        } catch (error) {
          res.json({ message: error });
          res.status(405).end();
          return resolve();
        }
      });
    }

    let url =
      "https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_960_720.jpg";
  }

  // ytdl(videoURL, {
  //   filter: (format) => format.itag == itag,
  // }).pipe(res);

  // let mytest = await axios.get(testUrl);
  // console.log(mytest.headers);
  // return new Promise((resolve, reject) => {
  //   try {
  //     https.get(downloadlink, function (response) {
  //       let kepala = response.headers;
  //       res.setHeader("Content-Disposition", `attachment; filename="asu.mp4"`);
  //       res.setHeader("Content-length", kepala["content-length"]);
  //       res.setHeader("Content-type", kepala["content-type"]);
  //       response.pipe(res);
  //       resolve();
  //     });
  //   } catch (error) {
  //     res.json(error);
  //     res.status(405).end();
  //     return resolve();
  //   }
  // });
}
