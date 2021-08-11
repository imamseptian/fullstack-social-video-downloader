import "../styles/globals.css";
// import "../styles/VidCss.css";
import "../styles/Navbar.css";
import "../styles/Overall.css";
// import "node_modules/video-react/dist/video-react.css";
import "../styles/Field.css";
import "../styles/Text-heading.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faFilePdf,
  faCheckCircle,
  faDownload,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckCircle, faDownload, faExclamationTriangle);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
