import ytdl from "ytdl-core";

// export default async function handler(req, res) {
//     const videoURL = req.query.videoURL;
//     console.log(videoURL)
//   const info = await ytdl.getInfo(videoURL);
//   console.log(info)
//     // console.log('asdasd')
//   res.status(200).json({aaa:'asdasdasdas'});
// }

export default async function handler(req, res) {
  const videoURL = req.query.videoURL;

  const itag = "18";
  res.setHeader("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(videoURL, {
    filter: (format) => format.itag == itag,
  }).pipe(res);
}
