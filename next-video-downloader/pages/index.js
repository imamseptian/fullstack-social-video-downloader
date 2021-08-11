import Head from "next/head";
// import styles from '../styles/Home.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="wrapper">
      {/* <h1>asu</h1> */}
      <Navbar />
      {/* <h1>ASU</h1> */}

      <div className="page-content">
        <h1>Welcome to Heroku - Next Social Video Downloader</h1>
        <h3>Select menu on the top to download video from provided website</h3>
      </div>
      {/* <div
        style={{
          width: "80vw",
          background: "red",
          height: "60vh",
          margin: "0 auto",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "500px",
            width: "250px",
            position: "relative",
            background: "blue",
          }}
        >
          <Image
            src={`https://scontent.fsrg2-1.fna.fbcdn.net/v/t1.6435-9/218366456_4123953327698286_1423914503889196706_n.jpg?_nc_cat=1&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeEhPgR-C_O_Y7PHfU1UBcbWtgY5fqxlISu2Bjl-rGUhK2NTrP9eMcESUTwmM_hByG8fvp2B8QWX6Ef-N6mHqCVu&_nc_ohc=OI-lpqU_h7gAX_0ni2M&_nc_ht=scontent.fsrg2-1.fna&oh=0af6ea1ec21fbd3ebc4a83af9692f002&oe=60F70939`}
            // height={200}
            // width={350}
            layout="fill"
            objectFit="contain"
            // className="avatar-tiktok"
          />
        </div>
     
      </div> */}
    </div>
  );
}
