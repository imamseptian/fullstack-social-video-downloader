import Link from "next/link";
// import "../styles/Navbar.css";

// export default function Navbar() {
//   return (
//     <div className="nav">
//       <input type="checkbox" id="nav-check" />
//       <div className="nav-header">
//         <Link href="/">
//           <a className="nav-title">{process.env.appName}</a>
//         </Link>
//       </div>
//       <div className="nav-btn">
//         <label htmlFor="nav-check">
//           <span />
//           <span />
//           <span />
//         </label>
//       </div>
//       <div className="nav-links">
//         <Link href="/youtube">
//           <a>Youtube</a>
//         </Link>
//         <Link href="/facebook">
//           <a>Facebook</a>
//         </Link>
//         <Link href="/twitter">
//           <a>Twitter</a>
//         </Link>
//         <Link href="/tiktok">
//           <a>TikTok</a>
//         </Link>
//       </div>
//     </div>
//   );
// }
export default function Navbar() {
  return (
    <nav className={`navbar`}>
      <div className="navbar-content">
        <div>
          <a className="portfolio-link" href="#">
            VideoDownloader
          </a>
        </div>
        <ul className="menu">
          <li>
            <Link href="/youtube">
              <a>Youtube</a>
            </Link>
          </li>
          {/* <li>
            <Link href="/facebook">
              <a>Facebook</a>
            </Link>
          </li> */}
          <li>
            <Link href="/twitter">
              <a>Twitter</a>
            </Link>
          </li>
          <li>
            <Link href="/tiktok">
              <a>TikTok</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
