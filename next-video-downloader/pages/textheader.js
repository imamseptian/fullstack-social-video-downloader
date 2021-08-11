import axios from "axios";

export default function textheader() {
  const webUrl = "http://localhost:3000/";
  const getVideoInfo = async () => {
    console.log("triggered");
    try {
      let response = await axios.get(`${webUrl}api/testheader`);
      //   let data = response.data;
      console.log(response.headers);
    } catch (e) {
      console.log(e.message);
    }

    // window.open(`${webUrl}api/scrap?videoURL=${videoURL}`);
  };

  return (
    <div>
      <button
        onClick={() => {
          getVideoInfo();
        }}
      >
        AYAYAYA
      </button>
    </div>
  );
}
