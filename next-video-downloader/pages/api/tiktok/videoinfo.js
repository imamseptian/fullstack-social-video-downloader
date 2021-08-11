const TikTokScraper = require("tiktok-scraper");
const ProxyList = require("free-proxy");

export default async function sendInfo(req, res) {
  const videoURL = req.query.videoURL;
  console.log(videoURL);

  // const proxyList = new ProxyList();
  // let data = await proxyList.randomByProtocol("https");
  // console.log(data);

  try {
    // const videoMeta = await TikTokScraper.getVideoMeta(videoURL, {
    //   // SET PROXY HERE , IF U WANT USE MORE THAN ONE JUST REPLACE IT WITH ARRAY OF PROXY
    //   proxy: `${data.ip}:${data.port}`,
    //   // proxy: "144.76.60.10:3128", //HTTP
    //   // proxy: "socks5://46.4.96.137:1080", //SOCKS5 Proxy
    // });

    // IF YOU ON LOCAL DEVELOPMENT USE THIS INSTEAD
    const videoMeta = await TikTokScraper.getVideoMeta(videoURL);

    res.status(200).json(videoMeta);
  } catch (error) {
    console.log(error);
    if (error == "Cannot read property 'split' of undefined") {
      res.status(404).json({
        message:
          "Video URL not Valid, please make sure you copy the correct TikTok Video URL",
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error, please try again later",
      });
    }
  }
}
